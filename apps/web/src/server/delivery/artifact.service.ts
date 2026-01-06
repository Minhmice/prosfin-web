/**
 * Artifact Service
 * 
 * Generate artifacts (Assessment Pack, Scope, etc.)
 */

import { randomUUID } from "crypto";
import type { Engagement } from "./engagement.schema";
import type { Artifact } from "./artifact.schema";
import { oneledgerConfig } from "@/content/services/oneledger/config";

/**
 * Generate Assessment Pack artifact
 */
export async function generateAssessmentPack(
  engagement: Engagement,
  scan?: any
): Promise<Artifact | null> {
  const now = new Date().toISOString();

  // Get recommended modules
  const recommendedModules = (engagement.selectedModuleIds || [])
    .map((id) => oneledgerConfig.modules?.find((m) => m.id === id))
    .filter(Boolean)
    .slice(0, 4);

  // Get recommended gate
  const recommendedGate = engagement.recommendedGateId
    ? oneledgerConfig.gates?.find((g) => g.id === engagement.recommendedGateId)
    : undefined;

  // Get bundle if selected
  const bundle = engagement.selectedBundleId
    ? oneledgerConfig.bundles?.find((b) => b.id === engagement.selectedBundleId)
    : undefined;

  // Executive brief
  const executiveBrief = {
    problem: scan?.topRisks?.length > 0
      ? `Các rủi ro chính: ${scan.topRisks.slice(0, 3).join(", ")}`
      : "Cần đánh giá hệ thống kế toán hiện tại",
    priority: engagement.metadata?.triggerEvents?.includes("mna") ? "P0" : "P1",
    riskLevel: scan?.riskLevel || "medium",
    nextStep: recommendedGate
      ? `Bắt đầu với ${recommendedGate.title}`
      : "Khảo sát ban đầu",
  };

  // Build content
  const content = {
    executiveBrief,
    recommendedModules: recommendedModules.map((module) => ({
      id: module?.id,
      name: module?.name,
      promise: module?.promise,
      deliverables: module?.deliverables || [],
    })),
    bundle: bundle ? {
      id: bundle.id,
      name: bundle.name,
      moduleIds: bundle.moduleIds,
      outcomes: bundle.outcomes,
      timeframe: bundle.timeframe,
    } : undefined,
    acceptanceGatesRoadmap: oneledgerConfig.gates
      ?.filter((g) => {
        if (recommendedGate) {
          const gateIndex = oneledgerConfig.gates?.findIndex((g) => g.id === recommendedGate.id) || 0;
          return oneledgerConfig.gates?.indexOf(g) <= gateIndex + 1;
        }
        return oneledgerConfig.gates?.indexOf(g) < 5;
      })
      .map((gate) => ({
        id: gate.id,
        title: gate.title,
        description: gate.description,
        deliverables: gate.deliverables || [],
        successDefinition: gate.successDefinition || [],
      })),
    engagementRules: [
      "Không làm thay kế toán",
      "Không ghi sổ hộ",
      "Không chạy báo cáo 'đối phó'",
      "Tập trung vào chuẩn hoá quy trình và hệ thống",
    ],
  };

  // Create artifact
  const artifact: Artifact = {
    id: randomUUID(),
    engagementId: engagement.id,
    kind: "assessment_pack",
    version: "v1",
    title: "Assessment Pack - OneLedger™",
    description: "Executive brief, recommended modules, and acceptance gates roadmap",
    storage: {
      provider: "local", // Will be updated when file is generated
      key: `assessment_pack_${engagement.id}_v1.json`,
    },
    generatedFrom: {
      configVersion: "1.0",
      scanHash: scan ? JSON.stringify(scan).substring(0, 32) : undefined,
      templateVersion: "1.0",
    },
    status: "draft",
    content,
    createdAt: now,
    updatedAt: now,
  };

  return artifact;
}

/**
 * Get artifact by ID (template - implement with actual DB query)
 */
export async function getArtifactById(artifactId: string): Promise<Artifact | null> {
  // TODO: Implement with actual database query
  return null;
}

/**
 * Get artifacts by engagement ID
 */
export async function getArtifactsByEngagementId(engagementId: string): Promise<Artifact[]> {
  // TODO: Implement with actual database query
  return [];
}

