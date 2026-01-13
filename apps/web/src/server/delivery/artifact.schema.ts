/**
 * Artifact Schema
 * 
 * Deliverables/Documents generated for an engagement.
 */

import { z } from "zod";

/**
 * Artifact Kind
 */
export const ArtifactKindSchema = z.enum([
  "assessment_pack",
  "scope",
  "data_request_list",
  "mapping_sheet",
  "reporting_pack",
  "handover_kit",
  "memo",
]);

/**
 * Artifact Status
 */
export const ArtifactStatusSchema = z.enum([
  "draft",
  "published",
  "superseded",
]);

/**
 * Storage Configuration
 */
export const StorageConfigSchema = z.object({
  provider: z.enum(["vercel_blob", "s3", "r2", "local"]),
  key: z.string(),
  url: z.string().optional(), // Public URL if available
});

/**
 * Generated From Metadata
 */
export const GeneratedFromSchema = z.object({
  configVersion: z.string().optional(),
  scanHash: z.string().optional(),
  templateVersion: z.string().optional(),
});

/**
 * Artifact Schema
 */
export const ArtifactSchema = z.object({
  id: z.string().uuid(),
  engagementId: z.string().uuid(),
  
  kind: ArtifactKindSchema,
  version: z.string(), // semver or v1/v2/v3
  title: z.string(),
  description: z.string().optional(),
  
  storage: StorageConfigSchema,
  generatedFrom: GeneratedFromSchema.optional(),
  
  status: ArtifactStatusSchema,
  
  // Content (JSON canonical format)
  content: z.record(z.string(), z.unknown()).optional(),
  
  // Superseded by
  supersededById: z.string().uuid().optional(),
  
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
});

/**
 * Type exports
 */
export type ArtifactKind = z.infer<typeof ArtifactKindSchema>;
export type ArtifactStatus = z.infer<typeof ArtifactStatusSchema>;
export type StorageConfig = z.infer<typeof StorageConfigSchema>;
export type GeneratedFrom = z.infer<typeof GeneratedFromSchema>;
export type Artifact = z.infer<typeof ArtifactSchema>;

