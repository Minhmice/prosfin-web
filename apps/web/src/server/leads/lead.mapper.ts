/**
 * Lead Mapper
 * 
 * Map từ các form payload khác nhau → LeadNormalized.
 * Handle mapping cho từng source với fallback logic.
 */

import { randomUUID } from "crypto";
import type {
  LeadNormalized,
  LeadSource,
  RawLeadPayload,
  Contact,
  Company,
  Intent,
  Attribution,
  Meta,
  Consent,
} from "./lead.types";

/**
 * Map raw payload to Contact
 */
function mapContact(payload: RawLeadPayload): Contact {
  return {
    fullName: (payload.fullName || payload.name || "") as string,
    email: (payload.email || "") as string,
    phone: (payload.phone || undefined) as string | undefined,
  };
}

/**
 * Map raw payload to Company
 */
function mapCompany(payload: RawLeadPayload): Company | undefined {
  const company: Company = {};
  
  if (payload.company || payload.companyName) {
    company.name = (payload.company || payload.companyName) as string;
  }
  if (payload.industry) {
    company.industry = payload.industry as string;
  }
  if (payload.companySize || payload.size) {
    company.size = (payload.companySize || payload.size) as string;
  }
  if (payload.revenueRange) {
    company.revenueRange = payload.revenueRange as string;
  }
  if (payload.yearsActive) {
    company.yearsActive = payload.yearsActive as string;
  }

  return Object.keys(company).length > 0 ? company : undefined;
}

/**
 * Map raw payload to Intent
 */
function mapIntent(payload: RawLeadPayload, source: LeadSource): Intent | undefined {
  const intent: Intent = {};

  if (payload.serviceSlugs || payload.serviceSlug) {
    intent.serviceSlugs = Array.isArray(payload.serviceSlugs)
      ? payload.serviceSlugs
      : [payload.serviceSlug || payload.serviceSlugs].filter(Boolean) as string[];
  }
  if (payload.message || payload.concern || payload.interest) {
    intent.message = (payload.message || payload.concern || payload.interest) as string;
  }
  if (payload.painPoints) {
    intent.painPoints = Array.isArray(payload.painPoints)
      ? payload.painPoints
      : [payload.painPoints].filter(Boolean) as string[];
  }
  if (payload.goals || payload.goal) {
    intent.goals = Array.isArray(payload.goals)
      ? payload.goals
      : [payload.goal || payload.goals].filter(Boolean) as string[];
  }

  // Tool lead magnet context
  if (source === "tool_lead_magnet" && payload.toolContext) {
    const toolContext = payload.toolContext as {
      toolSlug?: string;
      inputs?: Record<string, unknown>;
      outputs?: Record<string, unknown>;
    };
    if (toolContext.toolSlug) {
      intent.serviceSlugs = [...(intent.serviceSlugs || []), toolContext.toolSlug];
    }
  }

  return Object.keys(intent).length > 0 ? intent : undefined;
}

/**
 * Normalize lead from raw payload
 */
export function normalizeLead(
  payload: RawLeadPayload,
  source: LeadSource,
  attribution?: Attribution,
  meta?: Meta
): LeadNormalized {
  const now = new Date().toISOString();

  const consent: Consent = {
    privacyAccepted: true,
    timestamp: now,
    marketing: (payload.marketingConsent as boolean) || false,
  };

  return {
    id: randomUUID(),
    createdAt: now,
    source,
    contact: mapContact(payload),
    company: mapCompany(payload),
    intent: mapIntent(payload, source),
    attribution: attribution || undefined,
    meta: meta || undefined,
    consent,
    status: "new",
  };
}

