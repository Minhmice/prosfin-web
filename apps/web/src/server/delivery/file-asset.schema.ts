/**
 * File Asset Schema
 * 
 * Uploaded files (client or internal).
 */

import { z } from "zod";

/**
 * Uploader Type
 */
export const UploaderTypeSchema = z.enum([
  "client",
  "internal",
]);

/**
 * File Classification
 */
export const FileClassificationSchema = z.enum([
  "financial",
  "tax",
  "ops",
  "hr",
  "other",
]);

/**
 * File Review Status
 */
export const FileReviewStatusSchema = z.enum([
  "pending",
  "accepted",
  "needs_clarification",
  "rejected",
]);

/**
 * File Asset Schema
 */
export const FileAssetSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  gateId: z.string().optional(), // Optional: linked to gate
  taskId: z.string().uuid().optional(), // Optional: linked to task
  
  uploader: UploaderTypeSchema,
  uploaderId: z.string().optional(), // Client user ID or internal user ID
  
  filename: z.string(),
  mime: z.string(),
  size: z.number(), // bytes
  checksum: z.string().optional(), // SHA-256 hash
  
  storageKey: z.string(), // Storage provider key
  storageProvider: z.enum(["vercel_blob", "s3", "r2", "local"]),
  
  classification: FileClassificationSchema,
  
  flags: z.object({
    containsPII: z.boolean().optional(),
    requiresReview: z.boolean().optional(),
  }).optional(),
  
  reviewStatus: FileReviewStatusSchema.optional(),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional(),
  reviewNote: z.string().optional(),
  
  uploadedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type exports
 */
export type UploaderType = z.infer<typeof UploaderTypeSchema>;
export type FileClassification = z.infer<typeof FileClassificationSchema>;
export type FileReviewStatus = z.infer<typeof FileReviewStatusSchema>;
export type FileAsset = z.infer<typeof FileAssetSchema>;

