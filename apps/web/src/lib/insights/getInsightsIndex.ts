/**
 * Get Insights Index
 * 
 * Returns all insights with metadata for hub page.
 */

import { getAllInsightPosts, type InsightPost } from "@/content/insights.posts";
import type { InsightTopic, InsightFormat } from "@/content/insights.taxonomy";

export interface InsightsFilterParams {
  topic?: InsightTopic;
  format?: InsightFormat;
  sort?: "newest" | "oldest";
}

/**
 * Filter insights by params
 */
export function filterInsights(
  posts: InsightPost[],
  params: InsightsFilterParams
): InsightPost[] {
  let filtered = [...posts];

  // Filter by topic
  if (params.topic) {
    filtered = filtered.filter((post) => post.topic === params.topic);
  }

  // Filter by format
  if (params.format) {
    filtered = filtered.filter((post) => post.format === params.format);
  }

  // Sort
  if (params.sort === "oldest") {
    filtered.sort((a, b) => {
      const aDate = new Date(a.publishedAt);
      const bDate = new Date(b.publishedAt);
      return aDate.getTime() - bDate.getTime();
    });
  } else {
    // Default: newest first
    filtered.sort((a, b) => {
      const aDate = new Date(a.publishedAt);
      const bDate = new Date(b.publishedAt);
      return bDate.getTime() - aDate.getTime();
    });
  }

  return filtered;
}

/**
 * Get all insights (for hub page)
 */
export function getInsightsIndex(params?: InsightsFilterParams): InsightPost[] {
  const allPosts = getAllInsightPosts();
  
  if (!params) {
    // Default: newest first, no filters
    return filterInsights(allPosts, { sort: "newest" });
  }

  return filterInsights(allPosts, params);
}

