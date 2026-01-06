/**
 * Get Insights Filters
 * 
 * Returns filter options with counts for filter UI.
 */

import { getAllInsightPosts } from "@/content/insights.posts";
import { insightsTaxonomy, type InsightTopic, type InsightFormat } from "@/content/insights.taxonomy";

export interface FilterOption {
  id: string;
  label: string;
  slug: string;
  count: number;
}

export interface InsightsFilters {
  topics: FilterOption[];
  formats: FilterOption[];
}

/**
 * Get filter options with counts
 */
export function getInsightsFilters(): InsightsFilters {
  const allPosts = getAllInsightPosts();

  // Count posts per topic
  const topicCounts = new Map<InsightTopic, number>();
  allPosts.forEach((post) => {
    topicCounts.set(post.topic, (topicCounts.get(post.topic) || 0) + 1);
  });

  // Count posts per format
  const formatCounts = new Map<InsightFormat, number>();
  allPosts.forEach((post) => {
    formatCounts.set(post.format, (formatCounts.get(post.format) || 0) + 1);
  });

  // Build topic options
  const topics: FilterOption[] = insightsTaxonomy.topics.map((topic) => ({
    id: topic.id,
    label: topic.label,
    slug: topic.slug,
    count: topicCounts.get(topic.id) || 0,
  }));

  // Build format options
  const formats: FilterOption[] = insightsTaxonomy.formats.map((format) => ({
    id: format.id,
    label: format.label,
    slug: format.slug,
    count: formatCounts.get(format.id) || 0,
  }));

  return {
    topics,
    formats,
  };
}

