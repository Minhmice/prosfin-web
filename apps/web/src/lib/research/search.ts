/**
 * Research Search Logic
 * 
 * Full-text search for posts with simple scoring.
 */

import type { Post } from "@/types/content";

/**
 * Score a post based on search query
 * 
 * Returns score from 0 to max (higher = better match)
 * Searches in: title, excerpt, tags, topics
 */
export function scorePost(post: Post, query: string): number {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return 0;

  let score = 0;
  const queryWords = lowerQuery.split(/\s+/);

  // Title match: highest weight
  const titleLower = post.title.toLowerCase();
  if (titleLower.includes(lowerQuery)) {
    score += 10;
  }
  queryWords.forEach((word) => {
    if (titleLower.includes(word)) {
      score += 3;
    }
  });

  // Excerpt match
  const excerptLower = post.excerpt?.toLowerCase() || "";
  if (excerptLower.includes(lowerQuery)) {
    score += 5;
  }
  queryWords.forEach((word) => {
    if (excerptLower.includes(word)) {
      score += 1;
    }
  });

  // Tags match
  post.tags?.forEach((tag) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes(lowerQuery)) {
      score += 4;
    }
    queryWords.forEach((word) => {
      if (tagLower.includes(word)) {
        score += 2;
      }
    });
  });

  // Topics match
  post.topics?.forEach((topic) => {
    const topicLower = topic.toLowerCase();
    if (topicLower.includes(lowerQuery)) {
      score += 3;
    }
    queryWords.forEach((word) => {
      if (topicLower.includes(word)) {
        score += 1;
      }
    });
  });

  return score;
}

/**
 * Search posts based on query
 * 
 * Returns posts sorted by relevance (score descending)
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) {
    return posts;
  }

  // Score all posts
  const scored = posts.map((post) => ({
    post,
    score: scorePost(post, query),
  }));

  // Filter out zero scores and sort by score (descending)
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post);
}

