/**
 * Content Mock Provider
 * Server-ready interface for Phase 3 backend integration
 */

import type {
  Post,
  MediaAsset,
  ScheduleItem,
  Comment,
  Category,
  Tag,
} from "../types"
import { mockPosts as basePosts } from "@/data/posts"
import { parseSort, type SortConfig } from "@/lib/url-state"

// Convert existing mock data to new format
const posts: Post[] = basePosts.map((p) => ({
  ...p,
  excerpt: p.title.substring(0, 100) + "...",
  content: `# ${p.title}\n\nContent for ${p.title}...`,
  coverMediaId: undefined,
  category: undefined,
  tags: [],
  authorId: "author-1",
  authorName: "Admin User",
  scheduledAt: p.status === "scheduled" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined,
}))

// Mock media assets
const mediaAssets: MediaAsset[] = []
for (let i = 1; i <= 20; i++) {
  mediaAssets.push({
    id: `media-${i}`,
    type: i % 3 === 0 ? "video" : i % 2 === 0 ? "file" : "image",
    name: `media-file-${i}.${i % 3 === 0 ? "mp4" : i % 2 === 0 ? "pdf" : "jpg"}`,
    size: Math.floor(Math.random() * 5000000) + 100000,
    mime: i % 3 === 0 ? "video/mp4" : i % 2 === 0 ? "application/pdf" : "image/jpeg",
    url: `/media/media-${i}.${i % 3 === 0 ? "mp4" : i % 2 === 0 ? "pdf" : "jpg"}`,
    width: i % 2 === 0 ? 1920 : undefined,
    height: i % 2 === 0 ? 1080 : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    createdBy: "admin",
  })
}

// Mock schedules
const schedules: ScheduleItem[] = posts
  .filter((p) => p.status === "scheduled" && p.scheduledAt)
  .map((p) => ({
    id: `schedule-${p.id}`,
    postId: p.id,
    scheduledAt: p.scheduledAt!,
    status: "queued" as ScheduleStatus,
  }))

// Mock comments
const comments: Comment[] = []
posts.slice(0, 15).forEach((post) => {
  const commentCount = Math.floor(Math.random() * 5) + 1
  for (let i = 0; i < commentCount; i++) {
    comments.push({
      id: `comment-${post.id}-${i}`,
      postId: post.id,
      authorName: `User ${i + 1}`,
      authorEmail: `user${i + 1}@example.com`,
      content: `This is a comment on "${post.title}"`,
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      status: i % 4 === 0 ? "pending" : i % 4 === 1 ? "approved" : i % 4 === 2 ? "spam" : "trashed",
    })
  }
})

// Mock categories
const categories: Category[] = [
  { id: "cat-1", name: "Financial Planning", slug: "financial-planning", postCount: 12 },
  { id: "cat-2", name: "Tax Services", slug: "tax-services", postCount: 8 },
  { id: "cat-3", name: "Accounting", slug: "accounting", postCount: 15 },
  { id: "cat-4", name: "Investment", slug: "investment", postCount: 5 },
]

// Mock tags
const tags: Tag[] = [
  { id: "tag-1", name: "beginner", slug: "beginner", postCount: 10 },
  { id: "tag-2", name: "advanced", slug: "advanced", postCount: 8 },
  { id: "tag-3", name: "guide", slug: "guide", postCount: 15 },
  { id: "tag-4", name: "tips", slug: "tips", postCount: 12 },
]

type ScheduleStatus = "queued" | "sent" | "cancelled"

interface ListPostsParams {
  q?: string
  status?: string
  author?: string
  tag?: string
  category?: string
  page?: number
  pageSize?: number
  sort?: string
}

interface ListMediaParams {
  q?: string
  type?: string
  page?: number
  pageSize?: number
}

interface ListSchedulesParams {
  dateFrom?: Date
  dateTo?: Date
  q?: string
}

interface ListCommentsParams {
  q?: string
  postId?: string
  status?: string
  page?: number
  pageSize?: number
}

export interface ListResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

function filterAndSort<T>(
  items: T[],
  filterFn: (item: T) => boolean,
  sortConfig: SortConfig | null
): T[] {
  let result = items.filter(filterFn)

  if (sortConfig) {
    result = [...result].sort((a, b) => {
      const aVal = (a as any)[sortConfig.field]
      const bVal = (b as any)[sortConfig.field]
      if (aVal === bVal) return 0
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1
      const comparison = aVal < bVal ? -1 : 1
      return sortConfig.direction === "asc" ? comparison : -comparison
    })
  }

  return result
}

export const contentProvider = {
  // Posts
  async listPosts(params: ListPostsParams): Promise<ListResult<Post>> {
    const {
      q,
      status,
      author,
      tag,
      category,
      page = 1,
      pageSize = 10,
      sort,
    } = params

    const sortConfig = parseSort(sort)

    let filtered = filterAndSort(
      posts,
      (post) => {
        if (q && !post.title.toLowerCase().includes(q.toLowerCase()) &&
            !post.slug.toLowerCase().includes(q.toLowerCase())) {
          return false
        }
        if (status && post.status !== status) return false
        if (author && post.authorName !== author) return false
        if (tag && !post.tags.includes(tag)) return false
        if (category && post.category !== category) return false
        return true
      },
      sortConfig
    )

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return { data, total, page, pageSize }
  },

  async getPost(id: string): Promise<Post | null> {
    return posts.find((p) => p.id === id) || null
  },

  async createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post> {
    const newPost: Post = {
      ...data,
      id: `post-${posts.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    posts.push(newPost)
    return newPost
  },

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Post not found")
    posts[index] = { ...posts[index], ...data, updatedAt: new Date() }
    return posts[index]
  },

  async deletePost(id: string): Promise<void> {
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Post not found")
    posts.splice(index, 1)
  },

  async publishPost(id: string): Promise<Post> {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error("Post not found")
    post.status = "published"
    post.publishedAt = new Date()
    post.updatedAt = new Date()
    return post
  },

  async schedulePost(id: string, datetime: Date): Promise<Post> {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error("Post not found")
    post.status = "scheduled"
    post.scheduledAt = datetime
    post.updatedAt = new Date()
    
    // Add/update schedule item
    const scheduleIndex = schedules.findIndex((s) => s.postId === id)
    if (scheduleIndex >= 0) {
      schedules[scheduleIndex].scheduledAt = datetime
    } else {
      schedules.push({
        id: `schedule-${id}`,
        postId: id,
        scheduledAt: datetime,
        status: "queued",
      })
    }
    
    return post
  },

  async unschedulePost(id: string): Promise<Post> {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error("Post not found")
    post.status = "draft"
    post.scheduledAt = undefined
    post.updatedAt = new Date()
    
    // Remove schedule item
    const scheduleIndex = schedules.findIndex((s) => s.postId === id)
    if (scheduleIndex >= 0) {
      schedules.splice(scheduleIndex, 1)
    }
    
    return post
  },

  async unpublishPost(id: string): Promise<Post> {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error("Post not found")
    post.status = "draft"
    post.publishedAt = undefined
    post.updatedAt = new Date()
    return post
  },

  async duplicatePost(id: string): Promise<Post> {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error("Post not found")
    const newPost: Post = {
      ...post,
      id: `post-${posts.length + 1}`,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      status: "draft",
      publishedAt: undefined,
      scheduledAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    posts.push(newPost)
    return newPost
  },

  // Media
  async listMedia(params: ListMediaParams): Promise<ListResult<MediaAsset>> {
    const { q, type, page = 1, pageSize = 20 } = params

    let filtered = mediaAssets.filter((media) => {
      if (q && !media.name.toLowerCase().includes(q.toLowerCase())) {
        return false
      }
      if (type && media.type !== type) return false
      return true
    })

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return { data, total, page, pageSize }
  },

  async uploadMedia(files: File[]): Promise<MediaAsset[]> {
    const newMedia: MediaAsset[] = []
    for (const file of files) {
      const media: MediaAsset = {
        id: `media-${mediaAssets.length + newMedia.length + 1}`,
        type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file",
        name: file.name,
        size: file.size,
        mime: file.type,
        url: URL.createObjectURL(file),
        width: undefined,
        height: undefined,
        createdAt: new Date(),
        createdBy: "admin",
      }
      newMedia.push(media)
      mediaAssets.push(media)
    }
    return newMedia
  },

  async deleteMedia(id: string): Promise<void> {
    const index = mediaAssets.findIndex((m) => m.id === id)
    if (index === -1) throw new Error("Media not found")
    mediaAssets.splice(index, 1)
  },

  // Schedules
  async listSchedules(params: ListSchedulesParams): Promise<ScheduleItem[]> {
    const { dateFrom, dateTo, q } = params

    return schedules.filter((schedule) => {
      if (dateFrom && schedule.scheduledAt < dateFrom) return false
      if (dateTo && schedule.scheduledAt > dateTo) return false
      if (q) {
        const post = posts.find((p) => p.id === schedule.postId)
        if (!post || !post.title.toLowerCase().includes(q.toLowerCase())) {
          return false
        }
      }
      return true
    })
  },

  async reschedule(postId: string, newDatetime: Date): Promise<ScheduleItem> {
    const schedule = schedules.find((s) => s.postId === postId)
    if (!schedule) throw new Error("Schedule not found")
    schedule.scheduledAt = newDatetime
    
    const post = posts.find((p) => p.id === postId)
    if (post) {
      post.scheduledAt = newDatetime
      post.updatedAt = new Date()
    }
    
    return schedule
  },

  async cancelSchedule(postId: string): Promise<void> {
    const index = schedules.findIndex((s) => s.postId === postId)
    if (index === -1) throw new Error("Schedule not found")
    schedules.splice(index, 1)
    
    const post = posts.find((p) => p.id === postId)
    if (post) {
      post.status = "draft"
      post.scheduledAt = undefined
      post.updatedAt = new Date()
    }
  },

  async publishNow(postId: string): Promise<Post> {
    const post = posts.find((p) => p.id === postId)
    if (!post) throw new Error("Post not found")
    post.status = "published"
    post.publishedAt = new Date()
    post.scheduledAt = undefined
    post.updatedAt = new Date()
    
    // Remove schedule
    const scheduleIndex = schedules.findIndex((s) => s.postId === postId)
    if (scheduleIndex >= 0) {
      schedules.splice(scheduleIndex, 1)
    }
    
    return post
  },

  // Comments
  async listComments(params: ListCommentsParams): Promise<ListResult<Comment>> {
    const { q, postId, status, page = 1, pageSize = 10 } = params

    let filtered = comments.filter((comment) => {
      if (q && !comment.content.toLowerCase().includes(q.toLowerCase()) &&
          !comment.authorName.toLowerCase().includes(q.toLowerCase())) {
        return false
      }
      if (postId && comment.postId !== postId) return false
      if (status && comment.status !== status) return false
      return true
    })

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return { data, total, page, pageSize }
  },

  async moderateComment(id: string, action: "approve" | "reject" | "spam" | "restore"): Promise<Comment> {
    const comment = comments.find((c) => c.id === id)
    if (!comment) throw new Error("Comment not found")
    
    switch (action) {
      case "approve":
        comment.status = "approved"
        break
      case "reject":
        comment.status = "trashed"
        break
      case "spam":
        comment.status = "spam"
        break
      case "restore":
        comment.status = "pending"
        break
    }
    
    return comment
  },

  async bulkModerate(ids: string[], action: "approve" | "reject" | "spam" | "restore"): Promise<void> {
    ids.forEach((id) => {
      this.moderateComment(id, action).catch(() => {})
    })
  },

  // Taxonomy
  async listCategories(): Promise<Category[]> {
    return [...categories]
  },

  async createCategory(data: Omit<Category, "id" | "postCount">): Promise<Category> {
    const category: Category = {
      ...data,
      id: `cat-${categories.length + 1}`,
      postCount: 0,
    }
    categories.push(category)
    return category
  },

  async listTags(params?: { q?: string }): Promise<Tag[]> {
    const { q } = params || {}
    if (!q) return [...tags]
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(q.toLowerCase()) ||
      tag.slug.toLowerCase().includes(q.toLowerCase())
    )
  },

  async createTag(data: Omit<Tag, "id" | "postCount">): Promise<Tag> {
    const tag: Tag = {
      ...data,
      id: `tag-${tags.length + 1}`,
      postCount: 0,
    }
    tags.push(tag)
    return tag
  },
}
