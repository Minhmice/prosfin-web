/**
 * Gate Workflow Service
 * 
 * Gate workflow engine with state machine transitions and approvals.
 */

import type { GateInstance, GateInstanceStatus } from "./gate-instance.schema";
import type { Approval } from "./gate-instance.schema";
import type { AuditEvent } from "./audit-event.schema";
import { createAuditEvent } from "./audit.service";
import { notifyGateSubmitted, notifyGateBlocked, notifyGateApproved } from "./notification.service";
import { getEngagementById } from "./engagement.service";

/**
 * Valid state transitions
 */
const VALID_TRANSITIONS: Record<GateInstanceStatus, GateInstanceStatus[]> = {
  not_started: ["in_progress"],
  in_progress: ["submitted", "blocked"],
  blocked: ["in_progress"],
  submitted: ["approved", "blocked"],
  approved: [], // Final state
};

/**
 * Check if transition is valid
 */
function isValidTransition(
  currentStatus: GateInstanceStatus,
  newStatus: GateInstanceStatus
): boolean {
  return VALID_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
}

/**
 * Validate prerequisites for gate submission
 */
function validatePrerequisites(gateInstance: GateInstance): {
  valid: boolean;
  missingItems: string[];
} {
  const missingItems: string[] = [];

  // Check required acceptance criteria
  gateInstance.acceptanceCriteria.forEach((criteria) => {
    if (criteria.required && !criteria.completed) {
      missingItems.push(criteria.description);
    }
  });

  return {
    valid: missingItems.length === 0,
    missingItems,
  };
}

/**
 * Transition gate status
 */
export async function transitionGateStatus(
  gateInstance: GateInstance,
  newStatus: GateInstanceStatus,
  actorId: string,
  actorType: "internal" | "client",
  note?: string
): Promise<{
  success: boolean;
  gateInstance?: GateInstance;
  error?: string;
  auditEvent?: AuditEvent;
}> {
  // Validate transition
  if (!isValidTransition(gateInstance.status, newStatus)) {
    return {
      success: false,
      error: `Invalid transition from ${gateInstance.status} to ${newStatus}`,
    };
  }

  // Validate prerequisites for submission
  if (newStatus === "submitted") {
    const validation = validatePrerequisites(gateInstance);
    if (!validation.valid) {
      return {
        success: false,
        error: `Missing required items: ${validation.missingItems.join(", ")}`,
      };
    }
  }

  const now = new Date().toISOString();

  // Update gate instance
  const updatedGateInstance: GateInstance = {
    ...gateInstance,
    status: newStatus,
    updatedAt: now,
  };

  // Update timestamps based on status
  if (newStatus === "in_progress" && !gateInstance.startedAt) {
    updatedGateInstance.startedAt = now;
  } else if (newStatus === "submitted" && !gateInstance.submittedAt) {
    updatedGateInstance.submittedAt = now;
  } else if (newStatus === "approved" && !gateInstance.approvedAt) {
    updatedGateInstance.approvedAt = now;
    
    // Add approval
    const approval: Approval = {
      approverId: actorId,
      approvedAt: now,
      note,
    };
    updatedGateInstance.approvals = [...(gateInstance.approvals || []), approval];
  }

  // Create audit event
  const auditEvent = await createAuditEvent({
    engagementId: gateInstance.engagementId,
    actor: actorType === "internal" ? "internal_user" : "client_user",
    actorId,
    action: "gate_status_changed",
    payload: {
      gateId: gateInstance.gateId,
      fromStatus: gateInstance.status,
      toStatus: newStatus,
      note,
    },
  });

  // Phase 9: Send notifications
  if (newStatus === "submitted" && actorType === "client") {
    const engagement = await getEngagementById(gateInstance.engagementId);
    if (engagement) {
      await notifyGateSubmitted(updatedGateInstance, engagement);
    }
  } else if (newStatus === "blocked" && actorType === "internal" && note) {
    // Get client email from engagement
    const engagement = await getEngagementById(gateInstance.engagementId);
    if (engagement) {
      // TODO: Get client email from lead/engagement
      // await notifyGateBlocked(updatedGateInstance, clientEmail, note);
    }
  } else if (newStatus === "approved" && actorType === "internal") {
    // Get client email from engagement
    const engagement = await getEngagementById(gateInstance.engagementId);
    if (engagement) {
      // TODO: Get client email from lead/engagement
      // await notifyGateApproved(updatedGateInstance, clientEmail);
    }
  }

  return {
    success: true,
    gateInstance: updatedGateInstance,
    auditEvent,
  };
}

/**
 * Approve gate
 */
export async function approveGate(
  gateInstance: GateInstance,
  approverId: string,
  note?: string
): Promise<{
  success: boolean;
  gateInstance?: GateInstance;
  error?: string;
}> {
  if (gateInstance.status !== "submitted") {
    return {
      success: false,
      error: `Gate must be in 'submitted' status to approve. Current status: ${gateInstance.status}`,
    };
  }

  const result = await transitionGateStatus(
    gateInstance,
    "approved",
    approverId,
    "internal",
    note
  );

  return result;
}

/**
 * Block gate (request more info)
 */
export async function blockGate(
  gateInstance: GateInstance,
  actorId: string,
  actorType: "internal" | "client",
  note: string
): Promise<{
  success: boolean;
  gateInstance?: GateInstance;
  error?: string;
}> {
  if (gateInstance.status !== "submitted" && gateInstance.status !== "in_progress") {
    return {
      success: false,
      error: `Gate must be in 'submitted' or 'in_progress' status to block. Current status: ${gateInstance.status}`,
    };
  }

  const result = await transitionGateStatus(
    gateInstance,
    "blocked",
    actorId,
    actorType,
    note
  );

  return result;
}

/**
 * Get gate instance by ID (template - implement with actual DB query)
 */
export async function getGateInstanceById(gateInstanceId: string): Promise<GateInstance | null> {
  // TODO: Implement with actual database query
  return null;
}

/**
 * Get gate instances by engagement ID
 */
export async function getGateInstancesByEngagementId(
  engagementId: string
): Promise<GateInstance[]> {
  // TODO: Implement with actual database query
  return [];
}

