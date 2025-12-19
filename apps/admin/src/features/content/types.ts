/**
 * Content Domain Types
 * Types for Post, Media, Schedule, Comment, and Taxonomy
 */

export type PostStatus = "draft" | "scheduled" | "published" | "archived"

export interface UTMPreset {
  source: string
  medium: string
  campaign: string
  content?: string
}

export interface PostMetrics {
  views: number
  engagement: number
  clicks: number
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: PostStatus
  content: string // Markdown string or JSON doc
  coverMediaId?: string
  heroMediaId?: string
  category?: string
  tags: string[]
  channels: string[] // facebook, tiktok, linkedin, etc.
  campaign?: string
  utmPreset?: UTMPreset
  metrics?: PostMetrics
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
  altText?: string
  tags: string[]
  license?: string
  source?: string
  usedInPosts: string[] // postIds
  createdAt: Date
  createdBy: string
}

export type ScheduleStatus = "pending" | "running" | "done" | "failed" | "canceled"
export type ScheduleAction = "publish" | "unpublish" | "reminder"

export interface ScheduleItem {
  id: string
  postId: string
  channels: string[] // Multi-channel support
  action: ScheduleAction
  runAt: Date // UTC
  timezone: string // Default "Asia/Bangkok"
  status: ScheduleStatus
  attempts: number
  lastError?: string
  createdAt: Date
  updatedAt: Date
  createdBy?: string
  payloadSnapshot?: { // For quick display
    title: string
    slug: string
  }
  // Legacy fields for backward compatibility
  scheduledAt?: Date
  channel?: string
  assignee?: string
  utmLink?: string
}

export type CommentStatus = "pending" | "approved" | "hidden" | "spam"

export interface Comment {
  id: string
  postId: string
  channel: string // facebook, tiktok, linkedin
  authorName: string
  authorEmail?: string
  content: string
  status: CommentStatus
  assignee?: string
  replies?: Comment[] // thread support
  parentId?: string // for replies
  createdAt: Date
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
