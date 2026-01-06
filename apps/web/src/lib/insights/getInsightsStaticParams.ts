/**
 * Get Insights Static Params
 * 
 * Returns all slugs for generateStaticParams.
 */

import { getAllInsightPosts } from "@/content/insights.posts";

/**
 * Get all insight slugs for static generation
 */
export function getInsightsStaticParams(): Array<{ slug: string }> {
  const allPosts = getAllInsightPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

