/**
 * Thread/Comment Schema
 * 
 * Q&A threads and comments within an engagement.
 */

import { z } from "zod";

/**
 * Thread Visibility
 */
export const ThreadVisibilitySchema = z.enum([
  "internal_only",
  "client_visible",
]);

/**
 * Comment Attachment
 */
export const CommentAttachmentSchema = z.object({
  fileAssetId: z.string().uuid(),
  filename: z.string(),
  url: z.string().optional(),
});

/**
 * Comment Schema
 */
export const CommentSchema = z.object({
  id: z.string().uuid(),
  threadId: z.string().uuid(),
  engagementId: z.string().uuid(),
  
  authorId: z.string(), // Internal user ID or client user ID
  authorType: z.enum(["internal", "client"]),
  authorName: z.string().optional(),
  
  message: z.string(),
  attachments: z.array(CommentAttachmentSchema).optional(),
  
  visibility: ThreadVisibilitySchema,
  
  editedAt: z.string().optional(),
  deletedAt: z.string().optional(),
  
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Thread Schema
 */
export const ThreadSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  gateId: z.string().optional(), // Optional: linked to gate
  
  title: z.string().optional(),
  visibility: ThreadVisibilitySchema,
  
  comments: z.array(CommentSchema).optional(), // Can be loaded separately
  
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type exports
 */
export type ThreadVisibility = z.infer<typeof ThreadVisibilitySchema>;
export type CommentAttachment = z.infer<typeof CommentAttachmentSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Thread = z.infer<typeof ThreadSchema>;

