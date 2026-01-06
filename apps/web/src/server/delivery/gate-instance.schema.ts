/**
 * Gate Instance Schema
 * 
 * Instance of a gate (G0-G4) for a specific engagement.
 */

import { z } from "zod";

/**
 * Gate Instance Status
 */
export const GateInstanceStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "blocked",
  "submitted",
  "approved",
]);

/**
 * Acceptance Criteria (snapshotted from config)
 */
export const AcceptanceCriteriaSchema = z.object({
  id: z.string(),
  description: z.string(),
  required: z.boolean(),
  completed: z.boolean().optional(),
  completedAt: z.string().optional(),
});

/**
 * Approval
 */
export const ApprovalSchema = z.object({
  approverId: z.string(),
  approvedAt: z.string(),
  note: z.string().optional(),
});

/**
 * Gate Instance Schema
 */
export const GateInstanceSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  gateId: z.string(), // G0, G1, G2, G3, G4
  
  status: GateInstanceStatusSchema,
  
  // Acceptance criteria (snapshotted from config at creation)
  acceptanceCriteria: z.array(AcceptanceCriteriaSchema),
  
  // Approvals
  approvals: z.array(ApprovalSchema).optional(),
  
  // Timestamps
  startedAt: z.string().optional(),
  submittedAt: z.string().optional(),
  approvedAt: z.string().optional(),
  
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type exports
 */
export type GateInstanceStatus = z.infer<typeof GateInstanceStatusSchema>;
export type AcceptanceCriteria = z.infer<typeof AcceptanceCriteriaSchema>;
export type Approval = z.infer<typeof ApprovalSchema>;
export type GateInstance = z.infer<typeof GateInstanceSchema>;

