/**
 * Post Schemas
 */

import { z } from "zod"
import { POST_STATUSES } from "../constants"

export const postStatusSchema = z.enum(POST_STATUSES)

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: postStatusSchema.default("draft"),
  coverMediaId: z.string().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  authorId: z.string().min(1, "Author ID is required"),
  scheduledAt: z.coerce.date().optional(),
})

export const updatePostSchema = createPostSchema.partial().omit({ authorId: true })

export const postFilterSchema = z.object({
  q: z.string().optional(),
  status: postStatusSchema.optional(),
  categoryId: z.string().optional(),
  authorId: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostFilterInput = z.infer<typeof postFilterSchema>

