/**
 * Comment Schemas
 */

import { z } from "zod"
import { COMMENT_STATUSES } from "../constants"

export const commentStatusSchema = z.enum(COMMENT_STATUSES)

export const createCommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  authorName: z.string().min(1, "Author name is required"),
  authorEmail: z.string().email("Invalid email").optional(),
  content: z.string().min(1, "Content is required"),
  status: commentStatusSchema.default("pending"),
})

export const updateCommentSchema = z.object({
  status: commentStatusSchema,
})

export const commentFilterSchema = z.object({
  postId: z.string().optional(),
  status: commentStatusSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
export type CommentFilterInput = z.infer<typeof commentFilterSchema>

