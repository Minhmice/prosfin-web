/**
 * Posts Content Helpers
 * 
 * Helper functions for working with post content.
 */

import { POSTS } from "@/content/posts";
import { SERVICES } from "@/content/services";
import type { Post } from "@/types/content";

/**
 * Get all posts
 */
export function getAllPosts(): Post[] {
  return POSTS;
}

/**
 * Get posts by service slug
 * Priority:
 * 1. Posts with serviceSlugs matching the slug
 * 2. Posts with tags intersecting service tags
 * Sorted by publishedAt desc
 */
export function getPostsByService(slug: string, limit?: number): Post[] {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return [];
  }

  // Priority 1: Direct serviceSlugs match
  const directMatch = POSTS.filter(
    (post) => post.serviceSlugs && post.serviceSlugs.includes(slug)
  );

  // Priority 2: Tag intersection
  const serviceTags = service.tags || [];
  const tagMatch = POSTS.filter((post) => {
    // Skip if already in directMatch
    if (directMatch.some((p) => p.id === post.id)) {
      return false;
    }
    // Check if post tags intersect with service tags
    return post.tags && post.tags.some((tag) => serviceTags.includes(tag));
  });

  // Combine: direct matches first, then tag matches
  const combined = [...directMatch, ...tagMatch];

  // Sort by date (newest first)
  const sorted = combined.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Apply limit if provided
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get posts by tags
 */
export function getPostsByTags(tags: string[]): Post[] {
  if (!tags || tags.length === 0) return [];
  
  return POSTS.filter((post) =>
    tags.some((tag) => post.tags.includes(tag))
  );
}

/**
 * Get posts by IDs
 */
export function getPostsByIds(ids: string[]): Post[] {
  if (!ids || ids.length === 0) return [];
  return POSTS.filter((p) => ids.includes(p.id));
}

