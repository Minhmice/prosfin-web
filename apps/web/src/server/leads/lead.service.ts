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
    firstTouchAt: attribution?.firstTouchAt || attribution?.timestamp || now,
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
  // Normalize lead
  const enrichedAttribution = enrichAttribution(attribution, meta);
  const lead = normalizeLead(rawPayload, source, enrichedAttribution, meta);

  // Check deduplication
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

  // Save to all active sinks
  const sinks = getActiveSinks();
  const savePromises = sinks.map((sink) =>
    sink.save(lead).catch((error) => {
      console.error(`[LeadService] Sink failed:`, error);
      // Don't throw - allow other sinks to succeed
    })
  );

  await Promise.allSettled(savePromises);

  return {
    lead,
    isDuplicate: dedupeResult.isDuplicate,
    duplicateOf: dedupeResult.duplicateOf,
  };
}

