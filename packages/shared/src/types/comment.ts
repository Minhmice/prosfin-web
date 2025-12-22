/**
 * Comment Types
 */

export type CommentStatus = "pending" | "approved" | "spam" | "trashed"

export interface Comment {
  id: string
  postId: string
  authorName: string
  authorEmail?: string
  content: string
  status: CommentStatus
  createdAt: Date
}

