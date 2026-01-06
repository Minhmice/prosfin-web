/**
 * Engagement Schema
 * 
 * Core entity for delivery engagements.
 * Created when lead is qualified.
 */

import { z } from "zod";

/**
 * Engagement Status
 */
export const EngagementStatusSchema = z.enum([
  "draft",
  "active",
  "paused",
  "completed",
  "archived",
]);

/**
 * Engagement Schema
 */
export const EngagementSchema = z.object({
  id: z.string().uuid(),
  serviceSlug: z.string(), // "oneledger"
  leadId: z.string().uuid().nullable(), // Link to original lead
  clientOrgId: z.string().uuid().nullable(), // Link to client org (if exists)
  
  status: EngagementStatusSchema,
  ownerId: z.string().optional(), // Assigned advisor/owner
  teamIds: z.array(z.string()).optional(), // Team members
  
  // Selected configuration
  selectedBundleId: z.string().optional(),
  selectedModuleIds: z.array(z.string()).optional(),
  recommendedGateId: z.string().optional(),
  
  // Timeline
  startAt: z.string().optional(), // ISO timestamp
  targetEndAt: z.string().optional(), // ISO timestamp
  slaPolicy: z.string().optional(), // SLA policy ID or name
  
  // Metadata
  metadata: z.object({
    experiments: z.record(z.string()).optional(), // Experiment variants
    persona: z.string().optional(),
    triggerEvents: z.array(z.string()).optional(),
  }).optional(),
  
  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type exports
 */
export type EngagementStatus = z.infer<typeof EngagementStatusSchema>;
export type Engagement = z.infer<typeof EngagementSchema>;

