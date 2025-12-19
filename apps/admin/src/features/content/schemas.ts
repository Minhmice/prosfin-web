/**
 * Content Zod Schemas
 * Form validation schemas for Post, Media, Schedule, Comment
 */

import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  coverMediaId: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  scheduledAt: z.date().optional(),
})

export type PostFormData = z.infer<typeof postSchema>

export const mediaUploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
})

export type MediaUploadFormData = z.infer<typeof mediaUploadSchema>

export const scheduleSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  channels: z.array(z.string()).min(1, "At least one channel is required"),
  action: z.enum(["publish", "unpublish", "reminder"]),
  runAt: z.date().refine((date) => date > new Date(), {
    message: "Run date must be in the future",
  }),
  timezone: z.string().default("Asia/Bangkok"),
  notes: z.string().optional(),
})

export type ScheduleFormData = z.infer<typeof scheduleSchema>

export const commentModerationSchema = z.object({
  action: z.enum(["approve", "reject", "spam", "restore"]),
})

export type CommentModerationFormData = z.infer<typeof commentModerationSchema>

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  slug: z.string().min(1, "Slug is required"),
})

export type TagFormData = z.infer<typeof tagSchema>
