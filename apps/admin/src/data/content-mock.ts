/**
 * Content Mock Data
 * Comprehensive mock data for Posts, Schedules, Comments, and Media with relationships
 */

import type {
  Post,
  ScheduleItem,
  Comment,
  MediaAsset,
  PostMetrics,
  UTMPreset,
} from "@/features/content/types"

const channels = ["facebook", "tiktok", "linkedin", "twitter", "instagram"]
const campaigns = [
  "Q1-2024-Promotion",
  "Tax-Season-2024",
  "Summer-Services",
  "Holiday-Special",
  undefined,
]

const utmPresets: (UTMPreset | undefined)[] = [
  {
    source: "facebook",
    medium: "social",
    campaign: "Q1-2024-Promotion",
    content: "post-1",
  },
  {
    source: "tiktok",
    medium: "social",
    campaign: "Tax-Season-2024",
  },
  {
    source: "linkedin",
    medium: "social",
    campaign: "Summer-Services",
  },
  undefined,
]

function generateMetrics(): PostMetrics {
  return {
    views: Math.floor(Math.random() * 10000) + 100,
    engagement: Math.floor(Math.random() * 500) + 10,
    clicks: Math.floor(Math.random() * 200) + 5,
  }
}

// Generate Posts with full fields
export const mockPosts: Post[] = Array.from({ length: 40 }, (_, i) => {
  const id = `post-${i + 1}`
  const title = `Post ${i + 1}: Financial Planning Guide ${i + 1}`
  const slug = `post-${i + 1}-financial-planning-guide-${i + 1}`
  const statuses: Post["status"][] = ["draft", "scheduled", "published", "archived"]
  const status = statuses[i % 4]
  const now = new Date()
  const createdAt = new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000)
  const updatedAt = new Date(createdAt.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000)
  const publishedAt = status === "published" 
    ? new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    : undefined
  const scheduledAt = status === "scheduled"
    ? new Date(now.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000)
    : undefined

  // Random channels (1-3 channels per post)
  const postChannels = channels
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1)

  return {
    id,
    title,
    slug,
    excerpt: `This is an excerpt for ${title}. It provides a brief overview of the content.`,
    status,
    content: `# ${title}\n\nFull content for ${title}...`,
    coverMediaId: i % 3 === 0 ? `media-${Math.floor(i / 3) + 1}` : undefined,
    heroMediaId: i % 4 === 0 ? `media-${Math.floor(i / 4) + 1}` : undefined,
    category: i % 4 === 0 ? `cat-${(i % 4) + 1}` : undefined,
    tags: [`tag-${(i % 4) + 1}`, `tag-${((i + 1) % 4) + 1}`],
    channels: postChannels,
    campaign: campaigns[i % campaigns.length],
    utmPreset: utmPresets[i % utmPresets.length],
    metrics: status === "published" ? generateMetrics() : undefined,
    authorId: "author-1",
    authorName: "Admin User",
    scheduledAt,
    publishedAt,
    updatedAt,
    createdAt,
  }
})

// Generate Schedules with channels
export const mockSchedules: ScheduleItem[] = mockPosts
  .filter((p) => p.status === "scheduled" && p.scheduledAt)
  .flatMap((post) => {
    // Create schedule for each channel the post is assigned to
    return post.channels.map((channel, idx) => ({
      id: `schedule-${post.id}-${channel}`,
      postId: post.id,
      scheduledAt: new Date(
        post.scheduledAt!.getTime() + idx * 60 * 60 * 1000
      ), // Stagger by hour
      status: "queued" as ScheduleItem["status"],
      channel,
      assignee: idx % 2 === 0 ? "admin" : undefined,
      utmLink: post.utmPreset
        ? `https://example.com?utm_source=${post.utmPreset.source}&utm_medium=${post.utmPreset.medium}&utm_campaign=${post.utmPreset.campaign}`
        : undefined,
    }))
  })

// Generate Comments with status and relationships
export const mockComments: Comment[] = mockPosts
  .slice(0, 20)
  .flatMap((post) => {
    const commentCount = Math.floor(Math.random() * 5) + 1
    const postChannels = post.channels.length > 0 ? post.channels : ["facebook"]
    
    return Array.from({ length: commentCount }, (_, i) => {
      const commentId = `comment-${post.id}-${i}`
      const statuses: Comment["status"][] = ["pending", "approved", "hidden", "spam"]
      const status = statuses[i % 4]
      
      // Some comments have replies
      const hasReplies = i % 3 === 0 && status === "approved"
      const replies: Comment[] = hasReplies
        ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
            id: `${commentId}-reply-${j}`,
            postId: post.id,
            channel: postChannels[0],
            authorName: `Reply Author ${j + 1}`,
            authorEmail: `reply${j + 1}@example.com`,
            content: `This is a reply to the comment.`,
            status: "approved" as Comment["status"],
            parentId: commentId,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          }))
        : []

      return {
        id: commentId,
        postId: post.id,
        channel: postChannels[i % postChannels.length],
        authorName: `User ${i + 1}`,
        authorEmail: `user${i + 1}@example.com`,
        content: `This is a comment on "${post.title}". Great content!`,
        status,
        assignee: status === "pending" && i % 2 === 0 ? "admin" : undefined,
        replies: replies.length > 0 ? replies : undefined,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      }
    })
  })

// Generate Media Assets with usage tracking
export const mockMedia: MediaAsset[] = Array.from({ length: 30 }, (_, i) => {
  const id = `media-${i + 1}`
  const type = i % 3 === 0 ? "video" : i % 2 === 0 ? "file" : "image"
  const extension = type === "video" ? "mp4" : type === "file" ? "pdf" : "jpg"
  
  // Track which posts use this media
  const usedInPosts: string[] = []
  if (i < 10) {
    // First 10 media items are used by posts
    mockPosts.slice(0, 5).forEach((post) => {
      if (post.coverMediaId === id || post.heroMediaId === id) {
        usedInPosts.push(post.id)
      }
    })
  }

  return {
    id,
    type,
    name: `media-file-${i + 1}.${extension}`,
    size: Math.floor(Math.random() * 5000000) + 100000,
    mime: type === "video" ? "video/mp4" : type === "file" ? "application/pdf" : "image/jpeg",
    url: `/media/media-${i + 1}.${extension}`,
    width: type === "image" ? 1920 : undefined,
    height: type === "image" ? 1080 : undefined,
    altText: i % 2 === 0 ? `Alt text for media ${i + 1}` : undefined,
    tags: [`tag-${(i % 4) + 1}`, `tag-${((i + 1) % 4) + 1}`],
    license: i % 3 === 0 ? "CC BY 4.0" : undefined,
    source: i % 4 === 0 ? "Unsplash" : undefined,
    usedInPosts,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    createdBy: "admin",
  }
})
