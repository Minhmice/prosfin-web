"use client";

import type { RiskKey, ScanConfig, TriggerEventKey } from "@/content/services/types";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ScanResult {
  score: number;
  riskLevel: RiskLevel;
  topRisks: string[];
  recommendedModules: string[];
  callouts: string[];
}

const DEFAULT_WEIGHT = 10;

export function computeLedgerScan(config: ScanConfig, selectedIds: Set<string>): ScanResult {
  const weights = config.questions.reduce<Record<string, number>>((map, q) => {
    map[q.id] = q.weight ?? DEFAULT_WEIGHT;
    return map;
  }, {});

  const maxScore = config.questions.reduce((total, q) => total + (q.weight ?? DEFAULT_WEIGHT), 0);
  const achieved = Array.from(selectedIds).reduce((sum, id) => sum + (weights[id] ?? DEFAULT_WEIGHT), 0);
  const score = Math.min(100, Math.round((achieved / maxScore) * 100));

  const riskCounts: Record<string, number> = {};
  config.questions.forEach((q) => {
    if (!selectedIds.has(q.id)) return;
    (q.riskTags || []).forEach((tag) => {
      riskCounts[tag] = (riskCounts[tag] || 0) + 1;
    });
  });

  const topRisks = Object.entries(riskCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 3);

  const recommendedFromQuestions = Array.from(selectedIds).flatMap(
    (id) => config.recommendMap[id] ?? []
  );
  const recommendedFromRisks = topRisks.flatMap((risk) => config.riskMap[risk] ?? []);
  const recommendedModules = Array.from(
    new Set([...recommendedFromQuestions, ...recommendedFromRisks])
  ).slice(0, 4);

  const callouts: string[] = [];
  if (score >= config.thresholds.high && config.callouts?.highScore) {
    callouts.push(config.callouts.highScore);
  }
  if (selectedIds.has("q9") && config.callouts?.mnaTrigger) {
    callouts.push(config.callouts.mnaTrigger);
  }

  return {
    score,
    riskLevel: toRiskLevel(score, config.thresholds),
    topRisks,
    recommendedModules,
    callouts,
  };
}

function toRiskLevel(
  score: number,
  thresholds: { medium: number; high: number; critical: number }
): RiskLevel {
  if (score >= thresholds.critical) return "critical";
  if (score >= thresholds.high) return "high";
  if (score >= thresholds.medium) return "medium";
  return "low";
}

// Phase 3 enhanced scan engine (pure function)
export type ScanResultV2 = {
  score: number;
  riskLevel: RiskLevel;
  topRisks: RiskKey[];
  recommendedModuleIds: string[];
  recommendedGateId?: string;
  insights: string[];
};

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export function runLedgerScan(args: {
  scan: ScanConfig;
  selectedQuestionIds: string[];
  selectedEvents?: TriggerEventKey[];
}): ScanResultV2 {
  const { scan, selectedQuestionIds, selectedEvents = [] } = args;
  const selectedQs = scan.questions.filter((q) => selectedQuestionIds.includes(q.id));

  let score = 0;
  const risks: RiskKey[] = [];
  const recModules: string[] = [];
  const insights: string[] = [];

  for (const q of selectedQs) {
    score += q.weight ?? 0;
    if (q.risks) risks.push(...q.risks);
    if (q.recommendedModuleIds) recModules.push(...q.recommendedModuleIds);
  }

  for (const ev of selectedEvents) {
    const boost = scan.eventToRiskBoosts?.[ev];
    if (!boost) continue;
    score += boost.addScore;
    if (boost.addRisks) risks.push(...boost.addRisks);
  }

  score = Math.min(100, Math.round(score));

  const thresholds =
    scan.scoreThresholds || { low: 20, medium: 45, high: 70, critical: 85 };
  const riskLevel =
    score >= thresholds.critical
      ? "critical"
      : score >= thresholds.high
      ? "high"
      : score >= thresholds.medium
      ? "medium"
      : "low";

  const freq = new Map<RiskKey, number>();
  for (const r of risks) freq.set(r, (freq.get(r) ?? 0) + 1);
  const topRisks = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  const fromRisks = topRisks.flatMap((r) => scan.riskToModules?.[r] ?? []);
  let recommendedModuleIds = uniq([...recModules, ...fromRisks]).slice(0, 4);

  let recommendedGateId: string | undefined;
  if (topRisks.includes("data_integrity")) recommendedGateId = "G1";
  else if (topRisks.includes("process_bottlenecks") || topRisks.includes("control_weakness"))
    recommendedGateId = "G3";
  else if (topRisks.includes("no_management_reporting")) recommendedGateId = "G4";

  if (riskLevel === "critical")
    insights.push("Ưu tiên chốt baseline và làm sạch dữ liệu nền trước khi mở rộng báo cáo.");
  if (selectedEvents.includes("mna"))
    insights.push("M&A/thẩm định yêu cầu số liệu nhất quán và truy xuất được: ưu tiên audit trail + controls.");
  if (topRisks.includes("org_dependency"))
    insights.push("Rủi ro phụ thuộc 1 người: cần Org design + chuyển giao vận hành.");

  if (topRisks.includes("high_stakes_event") && !recommendedModuleIds.includes("M1")) {
    recommendedModuleIds = uniq(["M1", ...recommendedModuleIds]);
  }

  return { score, riskLevel, topRisks, recommendedModuleIds, recommendedGateId, insights };
}

