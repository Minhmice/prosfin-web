/**
 * Media Schemas
 */

import { z } from "zod"

export const mediaTypeSchema = z.enum(["image", "video", "file"])

export const createMediaAssetSchema = z.object({
  type: mediaTypeSchema,
  name: z.string().min(1, "Name is required"),
  size: z.number().int().positive(),
  mime: z.string().min(1, "MIME type is required"),
  url: z.string().url("Invalid URL"),
  key: z.string().min(1, "Key is required"),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  createdBy: z.string().min(1, "Created by is required"),
})

export const presignMediaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mime: z.string().min(1, "MIME type is required"),
  size: z.number().int().positive(),
  type: mediaTypeSchema,
})

export const finalizeMediaSchema = z.object({
  key: z.string().min(1, "Key is required"),
  name: z.string().min(1, "Name is required"),
  mime: z.string().min(1, "MIME type is required"),
  size: z.number().int().positive(),
  type: mediaTypeSchema,
  url: z.string().url("Invalid URL"),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})

export type CreateMediaAssetInput = z.infer<typeof createMediaAssetSchema>
export type PresignMediaInput = z.infer<typeof presignMediaSchema>
export type FinalizeMediaInput = z.infer<typeof finalizeMediaSchema>

