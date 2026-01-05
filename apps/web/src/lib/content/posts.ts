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
 * 1. Service has relatedPostSlugs (Phase 5) - posts matching those slugs
 * 2. Posts with serviceSlugs matching the slug
 * 3. Posts with tags intersecting service tags
 * 4. Service has relatedPostIds (backward compatibility)
 * Sorted by publishedAt desc
 */
export function getPostsByService(slug: string, limit?: number): Post[] {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return [];
  }

  // Priority 1: Service has relatedPostSlugs (Phase 5)
  const relatedBySlugs: Post[] = [];
  if (service.relatedPostSlugs && service.relatedPostSlugs.length > 0) {
    relatedBySlugs.push(
      ...POSTS.filter((post) => {
        // Match by href (which contains slug) or by extracting slug from href
        return service.relatedPostSlugs!.some((postSlug) => {
          // href format: /insights/slug or /knowledge/slug or /resources/slug
          return post.href.includes(`/${postSlug}`) || post.href.endsWith(postSlug);
        });
      })
    );
  }

  // Priority 2: Direct serviceSlugs match
  const directMatch = POSTS.filter((post) => {
    // Skip if already in relatedBySlugs
    if (relatedBySlugs.some((p) => p.id === post.id)) {
      return false;
    }
    return post.serviceSlugs && post.serviceSlugs.includes(slug);
  });

  // Priority 3: Tag intersection
  const serviceTags = service.tags || [];
  const tagMatch = POSTS.filter((post) => {
    // Skip if already in relatedBySlugs or directMatch
    if (
      relatedBySlugs.some((p) => p.id === post.id) ||
      directMatch.some((p) => p.id === post.id)
    ) {
      return false;
    }
    // Check if post tags intersect with service tags
    return post.tags && post.tags.some((tag) => serviceTags.includes(tag));
  });

  // Priority 4: relatedPostIds (backward compatibility)
  const relatedByIds: Post[] = [];
  if (service.relatedPostIds && service.relatedPostIds.length > 0) {
    relatedByIds.push(
      ...POSTS.filter((post) => {
        // Skip if already included
        if (
          relatedBySlugs.some((p) => p.id === post.id) ||
          directMatch.some((p) => p.id === post.id) ||
          tagMatch.some((p) => p.id === post.id)
        ) {
          return false;
        }
        return service.relatedPostIds!.includes(post.id);
      })
    );
  }

  // Combine: relatedBySlugs first, then directMatch, tagMatch, relatedByIds
  const combined = [...relatedBySlugs, ...directMatch, ...tagMatch, ...relatedByIds];

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

/**
 * Get all research posts (Phase 2)
 * 
 * Returns all posts, migrated from insights/knowledge/resources
 */
export function getAllResearchPosts(): Post[] {
  return POSTS;
}

/**
 * Get post by slug
 * 
 * Extracts slug from href (format: /insights/slug, /knowledge/slug, /resources/slug)
 * or matches by slug directly if href is /research/[slug]
 */
export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => {
    // Check if href ends with slug or contains /slug
    if (post.href.endsWith(`/${slug}`) || post.href.endsWith(slug)) {
      return true;
    }
    // Also check if post has a slug field (if added in future)
    return false;
  });
}

/**
 * Get posts by type
 */
export function getPostsByType(
  type: "brief" | "playbook" | "tool"
): Post[] {
  return POSTS.filter((post) => post.type === type);
}

/**
 * Map old type to new type (migration helper)
 * 
 * Maps: insight -> brief, knowledge -> playbook, resource -> tool
 */
export function mapOldTypeToNew(
  oldType: string
): "brief" | "playbook" | "tool" {
  const mapping: Record<string, "brief" | "playbook" | "tool"> = {
    insight: "brief",
    insights: "brief",
    knowledge: "playbook",
    resource: "tool",
    resources: "tool",
  };

  return mapping[oldType.toLowerCase()] || "brief";
}

