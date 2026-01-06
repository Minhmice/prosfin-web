/**
 * Engagement Service
 * 
 * Create engagement from qualified lead, seed GateInstances and Tasks.
 */

import { randomUUID } from "crypto";
import type { LeadNormalized } from "../leads/lead.schema";
import type { Engagement, EngagementStatus } from "./engagement.schema";
import type { GateInstance } from "./gate-instance.schema";
import type { Task } from "./task.schema";
import type { Artifact } from "./artifact.schema";
import { oneledgerConfig } from "@/content/services/oneledger/config";
import { generateAssessmentPack } from "./artifact.service";

/**
 * Create engagement from qualified lead
 */
export async function createEngagementFromLead(
  lead: LeadNormalized,
  ownerId?: string
): Promise<{
  engagement: Engagement;
  gateInstances: GateInstance[];
  tasks: Task[];
  artifacts: Artifact[];
}> {
  const now = new Date().toISOString();

  // Extract intent data
  const selectedBundleId = (lead.intent as any)?.bundleId as string | undefined;
  const selectedModuleIds = (lead.intent as any)?.moduleIds as string[] || [];
  const recommendedGateId = (lead.intent as any)?.gateId as string | undefined;
  const scan = (lead.extras as any)?.oneledgerScan || (lead.meta as any)?.extras?.oneledgerScan;

  // Create engagement
  const engagement: Engagement = {
    id: randomUUID(),
    serviceSlug: "oneledger",
    leadId: lead.id,
    clientOrgId: null, // Will be set when client org is created
    
    status: "draft",
    ownerId: ownerId || lead.ownerId,
    teamIds: [],
    
    selectedBundleId,
    selectedModuleIds,
    recommendedGateId,
    
    startAt: undefined,
    targetEndAt: undefined,
    slaPolicy: undefined,
    
    metadata: {
      experiments: (lead.attribution as any)?.experiments,
      persona: (lead.intent as any)?.persona,
      triggerEvents: (lead.intent as any)?.triggerEvents,
    },
    
    createdAt: now,
    updatedAt: now,
  };

  // Create GateInstances (G0-G4)
  const gateInstances: GateInstance[] = [];
  const gates = oneledgerConfig.gates || [];
  
  gates.forEach((gate) => {
    // Snapshot acceptance criteria from config
    const acceptanceCriteria = gate.successDefinition?.map((def, idx) => ({
      id: `criteria_${gate.id}_${idx}`,
      description: def,
      required: true,
      completed: false,
    })) || [];

    const gateInstance: GateInstance = {
      id: randomUUID(),
      engagementId: engagement.id,
      gateId: gate.id,
      status: "not_started",
      acceptanceCriteria,
      approvals: [],
      startedAt: undefined,
      submittedAt: undefined,
      approvedAt: undefined,
      createdAt: now,
      updatedAt: now,
    };

    gateInstances.push(gateInstance);
  });

  // Create Tasks (template tasks from gates/modules)
  const tasks: Task[] = [];
  
  // Task for G0 (Discovery)
  const g0Gate = gates.find((g) => g.id === "G0");
  if (g0Gate) {
    tasks.push({
      id: randomUUID(),
      engagementId: engagement.id,
      gateId: "G0",
      title: "Discovery & Scope Lock",
      description: g0Gate.title,
      status: "todo",
      assigneeId: ownerId,
      dueAt: undefined,
      priority: "P1",
      checklistItems: g0Gate.inputs?.map((input, idx) => ({
        id: `checklist_g0_${idx}`,
        label: input,
        completed: false,
      })),
      links: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  // Tasks for selected modules
  selectedModuleIds.forEach((moduleId) => {
    const module = oneledgerConfig.modules?.find((m) => m.id === moduleId);
    if (module) {
      tasks.push({
        id: randomUUID(),
        engagementId: engagement.id,
        moduleId: module.id,
        title: module.name,
        description: module.promise,
        status: "todo",
        assigneeId: undefined,
        dueAt: undefined,
        priority: "P2",
        checklistItems: module.clientInputs?.map((input, idx) => ({
          id: `checklist_${module.id}_${idx}`,
          label: input,
          completed: false,
        })),
        links: [],
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  // Generate initial artifacts
  const artifacts: Artifact[] = [];

  // Assessment Pack v1
  const assessmentPack = await generateAssessmentPack(engagement, scan);
  if (assessmentPack) {
    artifacts.push(assessmentPack);
  }

  // Data Request List v1 (will be generated separately)

  return {
    engagement,
    gateInstances,
    tasks,
    artifacts,
  };
}

/**
 * Get engagement by ID (template - implement with actual DB query)
 */
export async function getEngagementById(engagementId: string): Promise<Engagement | null> {
  // TODO: Implement with actual database query
  return null;
}

/**
 * Get engagement by lead ID
 */
export async function getEngagementByLeadId(leadId: string): Promise<Engagement | null> {
  // TODO: Implement with actual database query
  return null;
}

/**
 * Update engagement status
 */
export async function updateEngagementStatus(
  engagementId: string,
  status: EngagementStatus
): Promise<Engagement | null> {
  // TODO: Implement with actual database update
  return null;
}

