import type {
  Post,
  PostFilters,
  PostFormData,
  ContentBucket,
  PostStatus,
  PostRevision,
  PostActivityEvent,
} from "@/types/content";
import { mockPosts } from "@/mocks/posts";

/**
 * Data adapter cho Posts
 * 
 * UI components chỉ import từ đây, không import mocks trực tiếp.
 * Có thể swap sang API calls trong Phase 3.
 */

let postsData: Post[] = [...mockPosts];

/**
 * List posts with optional filters
 */
export async function listPosts(
  bucket?: ContentBucket,
  filters?: PostFilters
): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = [...postsData];

  // Filter by bucket
  if (bucket) {
    filtered = filtered.filter((post) => post.bucket === bucket);
  }

  // Apply filters
  if (filters) {
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((post) => filters.status!.includes(post.status));
    }

    if (filters.bucket && filters.bucket.length > 0) {
      filtered = filtered.filter((post) => filters.bucket!.includes(post.bucket));
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((post) =>
        filters.tags!.some((tag) => post.tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower) ||
          post.slug.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (post) => post.updatedAt >= filters.dateFrom! || post.createdAt >= filters.dateFrom!
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (post) => post.updatedAt <= filters.dateTo! || post.createdAt <= filters.dateTo!
      );
    }
  }

  return filtered;
}

/**
 * Get post by slug and bucket
 */
export async function getPost(slug: string, bucket: ContentBucket): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return postsData.find((post) => post.slug === slug && post.bucket === bucket) || null;
}

/**
 * Get post by ID
 */
export async function getPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return postsData.find((post) => post.id === id) || null;
}

/**
 * Check if slug is unique within bucket
 */
export async function isSlugUnique(
  slug: string,
  bucket: ContentBucket,
  excludeId?: string
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  const existing = postsData.find(
    (post) => post.slug === slug && post.bucket === bucket && post.id !== excludeId
  );
  return !existing;
}

/**
 * Save draft (create or update)
 */
export async function saveDraft(postData: PostFormData, existingId?: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const now = new Date().toISOString();

  if (existingId) {
    // Update existing
    const existing = postsData.find((p) => p.id === existingId);
    if (!existing) {
      throw new Error(`Post with id ${existingId} not found`);
    }

    const updated: Post = {
      ...existing,
      ...postData,
      id: existingId,
      updatedAt: now,
      // Preserve createdAt and author
      createdAt: existing.createdAt,
      author: existing.author,
    };

    postsData = postsData.map((p) => (p.id === existingId ? updated : p));
    return updated;
  } else {
    // Create new
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      author: {
        id: "user-1",
        name: "Admin User",
        email: "admin@prosfin.vn",
      },
    };

    postsData = [...postsData, newPost];
    return newPost;
  }
}

/**
 * Publish post
 */
export async function publish(id: string, scheduledFor?: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  const now = new Date().toISOString();
  const publishedAt = scheduledFor || now;

  const updated: Post = {
    ...post,
    status: scheduledFor ? "scheduled" : "published",
    publishedAt,
    scheduledFor: scheduledFor || undefined,
    updatedAt: now,
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Unpublish post (set to draft)
 */
export async function unpublish(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updated: Post = {
    ...post,
    status: "draft",
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Duplicate post
 */
export async function duplicatePost(slug: string, bucket: ContentBucket): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const original = await getPost(slug, bucket);
  if (!original) {
    throw new Error(`Post with slug ${slug} in bucket ${bucket} not found`);
  }

  const now = new Date().toISOString();
  const newSlug = `${original.slug}-copy-${Date.now()}`;

  const duplicated: Post = {
    ...original,
    id: `post-${Date.now()}`,
    slug: newSlug,
    title: `${original.title} (Copy)`,
    status: "draft",
    publishedAt: undefined,
    scheduledFor: undefined,
    createdAt: now,
    updatedAt: now,
  };

  postsData = [...postsData, duplicated];
  return duplicated;
}

/**
 * Delete post
 */
export async function deletePost(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  postsData = postsData.filter((p) => p.id !== id);
}

/**
 * Update post status
 */
export async function updatePostStatus(id: string, status: PostStatus): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updated: Post = {
    ...post,
    status,
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const allTags = postsData.flatMap((post) => post.tags);
  return Array.from(new Set(allTags)).sort();
}

/**
 * Archive post
 */
export async function archivePost(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updated: Post = {
    ...post,
    status: "archived",
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Restore archived post to draft
 */
export async function restorePost(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  if (post.status !== "archived") {
    throw new Error(`Post with id ${id} is not archived`);
  }

  const updated: Post = {
    ...post,
    status: "draft",
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Reschedule post
 */
export async function reschedulePost(id: string, scheduledFor: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updated: Post = {
    ...post,
    status: "scheduled",
    scheduledFor,
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Cancel schedule (scheduled → draft)
 */
export async function cancelSchedule(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  if (post.status !== "scheduled") {
    throw new Error(`Post with id ${id} is not scheduled`);
  }

  const updated: Post = {
    ...post,
    status: "draft",
    scheduledFor: undefined,
    updatedAt: new Date().toISOString(),
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Publish now (scheduled → published)
 */
export async function publishNow(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  if (post.status !== "scheduled") {
    throw new Error(`Post with id ${id} is not scheduled`);
  }

  const now = new Date().toISOString();
  const updated: Post = {
    ...post,
    status: "published",
    publishedAt: now,
    scheduledFor: undefined,
    updatedAt: now,
  };

  postsData = postsData.map((p) => (p.id === id ? updated : p));
  return updated;
}

/**
 * Create draft revision from published post
 */
export async function createDraftRevision(postId: string, data: PostFormData): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const original = postsData.find((p) => p.id === postId);
  if (!original) {
    throw new Error(`Post with id ${postId} not found`);
  }

  const now = new Date().toISOString();
  const draftRevision: Post = {
    ...original,
    ...data,
    id: `post-${Date.now()}`,
    status: "draft",
    publishedAt: original.publishedAt, // Preserve original published date
    scheduledFor: undefined,
    createdAt: now,
    updatedAt: now,
  };

  postsData = [...postsData, draftRevision];
  return draftRevision;
}

/**
 * Update published post immediately
 */
export async function updatePublishedPost(postId: string, data: PostFormData): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = postsData.find((p) => p.id === postId);
  if (!post) {
    throw new Error(`Post with id ${postId} not found`);
  }

  if (post.status !== "published") {
    throw new Error(`Post with id ${postId} is not published`);
  }

  const now = new Date().toISOString();
  const updated: Post = {
    ...post,
    ...data,
    status: "published", // Keep published status
    publishedAt: post.publishedAt, // Preserve original published date
    updatedAt: now,
  };

  postsData = postsData.map((p) => (p.id === postId ? updated : p));
  return updated;
}

/**
 * Get post revisions (mock - returns empty array for Phase 2)
 */
export async function getPostRevisions(postId: string): Promise<PostRevision[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  // Phase 2: Return empty array, Phase 3 will implement real revision tracking
  return [];
}

/**
 * Get post activity log
 */
export async function getPostActivity(postId: string): Promise<PostActivityEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const post = postsData.find((p) => p.id === postId);
  if (!post) {
    return [];
  }

  // Generate mock activity log
  const activities: PostActivityEvent[] = [];

  // Created event
  activities.push({
    id: `activity-${postId}-created`,
    type: "created",
    title: "Post created",
    timestamp: post.createdAt,
    actor: post.author.name,
  });

  // Published event (if published)
  if (post.publishedAt) {
    activities.push({
      id: `activity-${postId}-published`,
      type: "published",
      title: "Post published",
      timestamp: post.publishedAt,
      actor: post.author.name,
      payload: {
        publishedAt: post.publishedAt,
      },
    });
  }

  // Scheduled event (if scheduled)
  if (post.scheduledFor) {
    activities.push({
      id: `activity-${postId}-scheduled`,
      type: "scheduled",
      title: "Post scheduled",
      timestamp: post.scheduledFor,
      actor: post.author.name,
      payload: {
        scheduledFor: post.scheduledFor,
      },
    });
  }

  // Archived event (if archived)
  if (post.status === "archived") {
    activities.push({
      id: `activity-${postId}-archived`,
      type: "archived",
      title: "Post archived",
      timestamp: post.updatedAt,
      actor: post.author.name,
      payload: {
        oldStatus: "published",
        newStatus: "archived",
      },
    });
  }

  // Edited events (based on updatedAt)
  if (post.updatedAt !== post.createdAt && post.status !== "archived") {
    activities.push({
      id: `activity-${postId}-edited`,
      type: "edited",
      title: "Post edited",
      timestamp: post.updatedAt,
      actor: post.author.name,
    });
  }

  // Sort by timestamp (newest first)
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

