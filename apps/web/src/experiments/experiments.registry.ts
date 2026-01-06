/**
 * Experiments Registry
 * 
 * Central registry for all A/B/n experiments.
 * Defines experiments with rollout %, start/end dates, and primary metrics.
 */

import type { Experiment, ExperimentKey } from "./experiments.types";

/**
 * Rollout stages: 5% → 25% → 100%
 * Phase 8: Implement gradual rollout policy
 */
export type RolloutStage = "test" | "partial" | "full";

export function getRolloutPercentage(stage: RolloutStage): number {
  switch (stage) {
    case "test":
      return 5;
    case "partial":
      return 25;
    case "full":
      return 100;
  }
}

const EXPERIMENTS: Record<ExperimentKey, Experiment> = {
  oneledger_hero_value_prop: {
    key: "oneledger_hero_value_prop",
    variants: ["v1", "v2", "v3"],
    rollout: 100, // Currently at full rollout
    startDate: "2024-01-01T00:00:00Z",
    primaryMetric: "lead_submit_rate",
    secondaryMetrics: ["scan_completion_rate", "cta_modal_open_rate", "time_to_first_action"],
  },
  oneledger_scan_design: {
    key: "oneledger_scan_design",
    variants: ["v1", "v2", "v3"],
    rollout: 25, // Phase 8: Start at 25% (partial rollout)
    startDate: "2024-01-01T00:00:00Z",
    primaryMetric: "lead_quality_proxy", // % leads with riskLevel in high/critical
    secondaryMetrics: ["scan_completion_rate", "response_time", "close_rate"],
  },
  oneledger_cta_copy: {
    key: "oneledger_cta_copy",
    variants: ["v1", "v2", "v3"],
    rollout: 100, // Full rollout
    startDate: "2024-01-01T00:00:00Z",
    primaryMetric: "hero_cta_click_through",
    secondaryMetrics: ["submit_completion_rate"],
  },
};

/**
 * Get experiment by key
 */
export function getExperiment(key: ExperimentKey): Experiment | undefined {
  return EXPERIMENTS[key];
}

/**
 * Get all active experiments
 */
export function getActiveExperiments(): Experiment[] {
  const now = new Date().toISOString();
  return Object.values(EXPERIMENTS).filter((exp) => {
    if (exp.startDate > now) return false;
    if (exp.endDate && exp.endDate < now) return false;
    return true;
  });
}

/**
 * Check if experiment is active
 */
export function isExperimentActive(key: ExperimentKey): boolean {
  const exp = getExperiment(key);
  if (!exp) return false;

  const now = new Date().toISOString();
  if (exp.startDate > now) return false;
  if (exp.endDate && exp.endDate < now) return false;
  return true;
}

/**
 * Get all experiments
 */
export function getAllExperiments(): Experiment[] {
  return Object.values(EXPERIMENTS);
}

