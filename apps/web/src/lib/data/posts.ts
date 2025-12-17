/**
 * Public posts data adapter for web app
 * Uses the same mock data structure as admin
 */

// Import types (we'll define a shared type or duplicate)
type LexicalEditorState = {
  root: {
    children: Array<Record<string, any>>;
    direction: "ltr" | "rtl" | null;
    format: string;
    indent: number;
    type: "root";
    version: number;
  };
};

type ContentBucket = "insights" | "resources" | "knowledge";
type PostStatus = "draft" | "published" | "scheduled" | "archived";

interface Post {
  id: string;
  bucket: ContentBucket;
  title: string;
  slug: string;
  excerpt?: string;
  cover?: string;
  tags: string[];
  content: LexicalEditorState;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: PostStatus;
  scheduledFor?: string;
}

// Import mock data from admin (in real app, this would be from API)
// For now, we'll create a simple adapter that can be swapped later
let postsCache: Post[] | null = null;

async function loadPosts(): Promise<Post[]> {
  if (postsCache) return postsCache;
  
  // In Phase 3, this would fetch from API
  // For now, return empty array - posts will be loaded from admin mock data structure
  // We'll create a simple shared data file or use the same structure
  return [];
}

export async function getPostBySlug(slug: string, bucket: ContentBucket): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // For Phase 2, we'll need to share mock data or create a simple version
  // This is a placeholder that will be replaced with real data in Phase 3
  return null;
}

export async function listPublishedPosts(bucket?: ContentBucket): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // Placeholder - will be replaced with real API call in Phase 3
  return [];
}

