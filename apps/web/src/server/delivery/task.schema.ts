/**
 * Task Schema
 * 
 * Task within an engagement, optionally linked to a gate or module.
 */

import { z } from "zod";

/**
 * Task Status
 */
export const TaskStatusSchema = z.enum([
  "todo",
  "doing",
  "done",
  "blocked",
]);

/**
 * Checklist Item
 */
export const ChecklistItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  completed: z.boolean(),
  completedAt: z.string().optional(),
});

/**
 * Task Link
 */
export const TaskLinkSchema = z.object({
  type: z.enum(["file", "artifact", "comment", "external"]),
  id: z.string(),
  url: z.string().optional(),
  label: z.string().optional(),
});

/**
 * Task Schema
 */
export const TaskSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  gateId: z.string().optional(), // Optional: linked to gate
  moduleId: z.string().optional(), // Optional: linked to module
  
  title: z.string(),
  description: z.string().optional(),
  
  status: TaskStatusSchema,
  assigneeId: z.string().optional(),
  dueAt: z.string().optional(), // ISO timestamp
  priority: z.enum(["P0", "P1", "P2"]).optional(),
  
  checklistItems: z.array(ChecklistItemSchema).optional(),
  links: z.array(TaskLinkSchema).optional(),
  
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type exports
 */
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
export type TaskLink = z.infer<typeof TaskLinkSchema>;
export type Task = z.infer<typeof TaskSchema>;

