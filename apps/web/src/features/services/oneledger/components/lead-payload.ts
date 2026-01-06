import type { LeadPayload } from "./lead-schema";

export function buildLeadPayload(partial: Partial<LeadPayload>): LeadPayload {
  return {
    name: partial.name ?? "",
    company: partial.company ?? "",
    email: partial.email ?? "",
    phone: partial.phone ?? "",
    persona: (partial.persona as any) ?? "owner",
    revenueRange: partial.revenueRange,
    triggerEvents: partial.triggerEvents ?? [],
    priorities: partial.priorities ?? [],
    scan: partial.scan,
    source: partial.source ?? "oneledger",
    sourceDetail: partial.sourceDetail,
    pagePath: partial.pagePath,
    referrer: partial.referrer,
    utm: partial.utm,
    notes: partial.notes,
  };
}

