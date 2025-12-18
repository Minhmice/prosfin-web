/**
 * Content Domain Types
 * Types for Post, Media, Schedule, Comment, and Taxonomy
 */

export type PostStatus = "draft" | "scheduled" | "published" | "archived"

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: PostStatus
  content: string // Markdown string or JSON doc
  coverMediaId?: string
  category?: string
  tags: string[]
  authorId: string
  authorName: string
  scheduledAt?: Date
  publishedAt?: Date
  updatedAt: Date
  createdAt: Date
}

export type MediaType = "image" | "video" | "file"

export interface MediaAsset {
  id: string
  type: MediaType
  name: string
  size: number
  mime: string
  url: string
  width?: number
  height?: number
  createdAt: Date
  createdBy: string
}

export type ScheduleStatus = "queued" | "sent" | "cancelled"

export interface ScheduleItem {
  id: string
  postId: string
  scheduledAt: Date
  status: ScheduleStatus
  channel?: string
}

export type CommentStatus = "pending" | "approved" | "spam" | "trashed"

export interface Comment {
  id: string
  postId: string
  authorName: string
  authorEmail?: string
  content: string
  createdAt: Date
  status: CommentStatus
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount?: number
}
