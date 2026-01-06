/**
 * Topic Mapping
 * 
 * Maps moduleId/gateId/bundleId to topicKeys for content-to-lead loop.
 * Used to find related posts/articles.
 */

export type TopicKey =
  | "closing"
  | "bottleneck"
  | "workflow"
  | "audit-trail"
  | "controls"
  | "compliance"
  | "reporting"
  | "cfo"
  | "kpi"
  | "data-standardization"
  | "chart-of-accounts"
  | "mapping"
  | "cut-off"
  | "org-dependency"
  | "transfer"
  | "transaction-readiness"
  | "loan"
  | "fundraising"
  | "mna"
  | "baseline"
  | "data-integrity";

/**
 * Map module ID to topic keys
 */
export function getModuleTopics(moduleId: string): TopicKey[] {
  const mapping: Record<string, TopicKey[]> = {
    M1: ["baseline", "data-integrity", "data-standardization"],
    M2: ["data-standardization", "chart-of-accounts", "mapping", "cut-off"],
    M3: ["closing", "bottleneck", "workflow"],
    M4: ["audit-trail", "controls", "compliance"],
    M5: ["reporting", "cfo", "kpi"],
    M6: ["org-dependency", "transfer"],
    M7: ["data-standardization"], // Tech enablement
    M8: ["transfer", "org-dependency"],
  };

  return mapping[moduleId] || [];
}

/**
 * Map gate ID to topic keys
 */
export function getGateTopics(gateId: string): TopicKey[] {
  const mapping: Record<string, TopicKey[]> = {
    G0: ["baseline", "data-standardization"],
    G1: ["baseline", "data-integrity", "cut-off"],
    G2: ["data-standardization", "chart-of-accounts", "mapping"],
    G3: ["workflow", "controls", "closing"],
    G4: ["reporting", "cfo", "kpi", "transfer"],
  };

  return mapping[gateId] || [];
}

/**
 * Map bundle ID to topic keys
 */
export function getBundleTopics(bundleId: string): TopicKey[] {
  const mapping: Record<string, TopicKey[]> = {
    "bundle-a": ["baseline", "data-standardization", "data-integrity"],
    "bundle-b": ["workflow", "controls", "closing", "bottleneck"],
    "bundle-c": ["reporting", "cfo", "kpi", "org-dependency"],
    "bundle-d": [
      "transaction-readiness",
      "loan",
      "fundraising",
      "mna",
      "baseline",
      "controls",
      "reporting",
      "audit-trail",
    ],
  };

  return mapping[bundleId] || [];
}

/**
 * Get all topic keys for a combination of module/gate/bundle
 */
export function getAllTopics(args: {
  moduleIds?: string[];
  gateIds?: string[];
  bundleIds?: string[];
}): TopicKey[] {
  const topics = new Set<TopicKey>();

  if (args.moduleIds) {
    args.moduleIds.forEach((id) => {
      getModuleTopics(id).forEach((topic) => topics.add(topic));
    });
  }

  if (args.gateIds) {
    args.gateIds.forEach((id) => {
      getGateTopics(id).forEach((topic) => topics.add(topic));
    });
  }

  if (args.bundleIds) {
    args.bundleIds.forEach((id) => {
      getBundleTopics(id).forEach((topic) => topics.add(topic));
    });
  }

  return Array.from(topics);
}

