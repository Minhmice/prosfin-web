/**
 * Post Types
 */

export type PostStatus = "draft" | "scheduled" | "published" | "archived"

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: PostStatus
  content: string
  coverMediaId?: string
  categoryId?: string
  category?: string
  tags: string[]
  authorId: string
  authorName: string
  scheduledAt?: Date
  publishedAt?: Date
  updatedAt: Date
  createdAt: Date
}

