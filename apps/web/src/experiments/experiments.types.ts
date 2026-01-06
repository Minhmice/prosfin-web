/**
 * Experiment Types
 * 
 * Type definitions for A/B/n experiments infrastructure.
 */

export type ExperimentKey =
  | "oneledger_hero_value_prop"
  | "oneledger_scan_design"
  | "oneledger_cta_copy";

export type VariantKey = "v1" | "v2" | "v3" | "control";

export interface Experiment {
  key: ExperimentKey;
  variants: VariantKey[];
  rollout: number; // 0-100 percentage
  startDate: string; // ISO date string
  endDate?: string; // ISO date string (optional)
  primaryMetric: string; // e.g., "lead_submit_rate", "scan_completion_rate"
  secondaryMetrics?: string[];
}

export interface ExperimentAssignment {
  experimentKey: ExperimentKey;
  variant: VariantKey;
  assignedAt: string; // ISO timestamp
  expiresAt?: string; // ISO timestamp (optional, for cookie expiration)
}

export interface ExperimentContext {
  assignments: Map<ExperimentKey, VariantKey>;
}

