/**
 * Lead Service
 * 
 * Main service layer cho lead submission.
 * Handle: normalization, deduplication, attribution enrichment, sink routing.
 */

import type {
  LeadNormalized,
  LeadSource,
  RawLeadPayload,
  Attribution,
  Meta,
} from "./lead.types";
import { normalizeLead } from "./lead.mapper";
import { getActiveSinks, type LeadSink } from "./lead.sinks";
import { findLeadByIdempotencyKey, findDuplicateLead, saveLead } from "./lead.repository";
import { routeAndAssignLead, notifyLeadAssignment } from "./routing";

/**
 * In-memory store for deduplication (MVP)
 * In production, use Redis or DB
 */
const recentLeads = new Map<
  string,
  { leadId: string; createdAt: string }
>();

// Cleanup old entries every hour
setInterval(() => {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  for (const [email, entry] of recentLeads.entries()) {
    if (new Date(entry.createdAt).getTime() < oneDayAgo) {
      recentLeads.delete(email);
    }
  }
}, 60 * 60 * 1000);

/**
 * Dedupe lead - check if email exists within 24h
 */
export function dedupeLead(
  email: string,
  createdAt: string
): { isDuplicate: boolean; duplicateOf?: string } {
  const existing = recentLeads.get(email.toLowerCase());
  
  if (existing) {
    const existingTime = new Date(existing.createdAt).getTime();
    const newTime = new Date(createdAt).getTime();
    const hoursDiff = (newTime - existingTime) / (1000 * 60 * 60);
    
    if (hoursDiff < 24) {
      return {
        isDuplicate: true,
        duplicateOf: existing.leadId,
      };
    }
  }

  return { isDuplicate: false };
}

/**
 * Enrich attribution with server-side data
 */
export function enrichAttribution(
  attribution?: Attribution,
  meta?: Meta
): Attribution {
  const now = new Date().toISOString();
  
  return {
    ...attribution,
    firstTouchAt: attribution?.firstTouchAt || now,
    lastTouchAt: now,
  };
}

/**
 * Submit lead - main entry point
 */
export async function submitLead(
  rawPayload: RawLeadPayload,
  source: LeadSource,
  attribution?: Attribution,
  meta?: Meta
): Promise<{
  lead: LeadNormalized;
  isDuplicate: boolean;
  duplicateOf?: string;
}> {
  // Phase 7: Check idempotency first
  const clientRequestId = (rawPayload.extras as any)?.clientRequestId as string | undefined;
  if (clientRequestId) {
    const existingLead = await findLeadByIdempotencyKey(clientRequestId);
    if (existingLead) {
      // Return existing lead (idempotent)
      return {
        lead: existingLead,
        isDuplicate: !!existingLead.duplicateOf,
        duplicateOf: existingLead.duplicateOf,
      };
    }
  }

  // Normalize lead
  const enrichedAttribution = enrichAttribution(attribution, meta);
  let lead = normalizeLead(rawPayload, source, enrichedAttribution, meta);

  // Phase 8: Route and assign lead
  const routing = routeAndAssignLead(lead);
  lead = {
    ...lead,
    priority: routing.priority,
    ownerId: routing.ownerId,
    sla: {
      dueAt: routing.slaDueAt,
      assignedAt: routing.ownerId ? new Date().toISOString() : undefined,
    },
    status: routing.status,
  };

  // Phase 8: Notify assignment
  notifyLeadAssignment(lead, routing.priority);

  // Phase 7: Check deduplication using repository (email+company+source within T days)
  const duplicateLead = await findDuplicateLead(
    lead.contact.email,
    lead.company?.name,
    source,
    lead.contact.phone
  );

  if (duplicateLead) {
    lead.duplicateOf = duplicateLead.id;
    // Still save as duplicate for tracking
    await saveLead(lead);
    return {
      lead,
      isDuplicate: true,
      duplicateOf: duplicateLead.id,
    };
  }

  // Fallback to in-memory dedupe (for backward compatibility)
  const dedupeResult = dedupeLead(lead.contact.email, lead.createdAt);
  
  if (dedupeResult.isDuplicate) {
    lead.duplicateOf = dedupeResult.duplicateOf;
  } else {
    // Store for future deduplication
    recentLeads.set(lead.contact.email.toLowerCase(), {
      leadId: lead.id,
      createdAt: lead.createdAt,
    });
  }

  // Save lead
  const savedLead = await saveLead(lead);

  // Save to all active sinks
  const sinks = getActiveSinks();
  const savePromises = sinks.map((sink) =>
    sink.save(savedLead).catch((error) => {
      console.error(`[LeadService] Sink failed:`, error);
      // Don't throw - allow other sinks to succeed
    })
  );

  await Promise.allSettled(savePromises);

  return {
    lead: savedLead,
    isDuplicate: dedupeResult.isDuplicate || !!duplicateLead,
    duplicateOf: dedupeResult.duplicateOf || duplicateLead?.id,
  };
}

