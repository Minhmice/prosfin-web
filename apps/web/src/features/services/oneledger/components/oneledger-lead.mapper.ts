/**
 * OneLedger Lead Mapper
 * 
 * Maps form data + scan results to /api/leads request payload.
 * Ensures sourceDetail and scan context are properly attached.
 */

import type { LeadsApiRequest } from "@/features/leads/client/leads-api.client";

export type OneLedgerScanResult = {
  score?: number;
  riskLevel?: "low" | "medium" | "high" | "critical";
  topRisks?: string[];
  recommendedModuleIds?: string[];
  recommendedGateId?: string;
  selectedQuestionIds?: string[];
  selectedEvents?: string[];
};

export type OneLedgerFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  persona?: string;
  revenueRange?: string;
  triggerEvents?: string[];
  priorities?: string[];
  notes?: string;
};

export type BuildOneLedgerLeadRequestArgs = {
  form: OneLedgerFormData;
  scan?: OneLedgerScanResult;
  sourceDetail: string; // hero_primary | hero_scan_submit | big_cta | module_dialog:${moduleId}
  bundleId?: string; // Phase 6: Selected bundle ID
  attribution?: Record<string, unknown>;
  turnstileToken?: string;
  pagePath?: string;
};

/**
 * Build OneLedger lead request for /api/leads
 */
export function buildOneLedgerLeadRequest(
  args: BuildOneLedgerLeadRequestArgs
): LeadsApiRequest {
  const { form, scan, sourceDetail, bundleId, attribution, turnstileToken, pagePath } = args;

  // Payload design: place extensions in extras to avoid schema conflicts
  const payload: Record<string, unknown> = {
    // Common identity fields (match LeadNormalizedSchema expected keys)
    name: form.name,
    company: form.company,
    email: form.email,
    phone: form.phone,

    // Intent fields
    persona: form.persona,
    revenueRange: form.revenueRange,
    triggerEvents: form.triggerEvents ?? [],
    priorities: form.priorities ?? [],
    notes: form.notes,

    // Intent mapping (if system uses intent)
    intent: {
      serviceSlugs: ["oneledger"],
      sourceDetail,
      // Phase 6: Add OneLedger-specific intent fields
      persona: form.persona,
      triggerEvents: form.triggerEvents ?? [],
      priorities: form.priorities ?? [],
      moduleIds: scan?.recommendedModuleIds ?? [],
      gateId: scan?.recommendedGateId,
      bundleId: bundleId,
    },

    // Safe extension bucket
    extras: {
      pagePath,
      oneledgerScan: scan
        ? {
            selectedQuestionIds: scan.selectedQuestionIds ?? [],
            selectedEvents: scan.selectedEvents ?? [],
            score: scan.score,
            riskLevel: scan.riskLevel,
            topRisks: scan.topRisks ?? [],
            recommendedModuleIds: scan.recommendedModuleIds ?? [],
            recommendedGateId: scan.recommendedGateId,
          }
        : undefined,
    },
  };

  return {
    source: "oneledger",
    payload,
    attribution,
    turnstileToken,
  };
}

