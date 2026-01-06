/**
 * Lead Scoring
 * 
 * Rule-based lead priority calculation.
 * P0: critical/high-stakes, P1: high priority, P2: normal/nurture
 */

import type { LeadNormalized } from "./lead.types";

export type LeadPriority = "P0" | "P1" | "P2";

/**
 * Calculate lead priority based on scan results, trigger events, and bundle
 */
export function calculateLeadPriority(lead: LeadNormalized): LeadPriority {
  // Extract scan data from extras
  const scan = (lead.meta as any)?.extras?.oneledgerScan || (lead as any).extras?.oneledgerScan;
  const riskLevel = scan?.riskLevel as "low" | "medium" | "high" | "critical" | undefined;
  const triggerEvents = (lead.intent as any)?.triggerEvents as string[] | undefined;
  const bundleId = (lead.intent as any)?.bundleId as string | undefined;

  // P0: Critical risk OR (M&A/fundraising) + high risk
  if (riskLevel === "critical") {
    return "P0";
  }

  if (riskLevel === "high") {
    // High-stakes events boost to P0
    if (
      triggerEvents?.includes("mna") ||
      triggerEvents?.includes("fundraising") ||
      bundleId === "bundle-d" // Transaction Readiness
    ) {
      return "P0";
    }
    // High risk without transaction = P1
    return "P1";
  }

  // P1: Medium risk with transaction events
  if (riskLevel === "medium") {
    if (
      triggerEvents?.includes("mna") ||
      triggerEvents?.includes("fundraising") ||
      triggerEvents?.includes("bank_loan")
    ) {
      return "P1";
    }
  }

  // P2: Low/medium risk without high-stakes events
  return "P2";
}

/**
 * Get priority label (Vietnamese)
 */
export function getPriorityLabel(priority: LeadPriority): string {
  switch (priority) {
    case "P0":
      return "Ưu tiên cao (Critical)";
    case "P1":
      return "Ưu tiên trung bình (High)";
    case "P2":
      return "Ưu tiên thấp (Normal)";
  }
}

