/**
 * Get Insight By Slug
 * 
 * Returns single insight post by slug.
 */

import { getInsightPostBySlug, type InsightPost } from "@/content/insights.posts";

/**
 * Get insight by slug
 */
export function getInsightBySlug(slug: string): InsightPost | undefined {
  return getInsightPostBySlug(slug);
}

