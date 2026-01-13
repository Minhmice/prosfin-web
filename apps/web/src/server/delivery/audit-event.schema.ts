/**
 * Audit Event Schema
 * 
 * Immutable audit trail for all important actions.
 */

import { z } from "zod";

/**
 * Audit Actor Type
 */
export const AuditActorTypeSchema = z.enum([
  "internal_user",
  "client_user",
  "system",
]);

/**
 * Audit Action Type
 */
export const AuditActionSchema = z.enum([
  "gate_status_changed",
  "task_assigned",
  "task_status_changed",
  "file_uploaded",
  "file_reviewed",
  "artifact_published",
  "artifact_superseded",
  "comment_added",
  "comment_edited",
  "comment_deleted",
  "access_granted",
  "access_revoked",
  "token_rotated",
  "invalid_access_attempt",
  "engagement_created",
  "engagement_status_changed",
  "engagement_owner_changed",
]);

/**
 * Audit Event Schema
 */
export const AuditEventSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  
  actor: AuditActorTypeSchema,
  actorId: z.string().optional(), // User ID if applicable
  
  action: AuditActionSchema,
  
  payload: z.record(z.string(), z.unknown()).optional(), // Diff, metadata, etc.
  
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  
  createdAt: z.string(),
});

/**
 * Type exports
 */
export type AuditActorType = z.infer<typeof AuditActorTypeSchema>;
export type AuditAction = z.infer<typeof AuditActionSchema>;
export type AuditEvent = z.infer<typeof AuditEventSchema>;

