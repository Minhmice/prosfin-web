/**
 * Related Content Logic
 * 
 * Find related posts and services based on similarity.
 */

import type { Post } from "@/types/content";
import type { Service } from "@/types/content";

/**
 * Get related posts based on similarity
 * 
 * Similarity based on:
 * - Topics intersection
 * - Personas intersection
 * - Outcomes intersection
 * - Service slugs intersection
 * - Tags intersection
 */
export function getRelatedPosts(
  post: Post,
  allPosts: Post[],
  limit: number = 4
): Post[] {
  // Exclude current post
  const otherPosts = allPosts.filter((p) => p.id !== post.id);

  if (otherPosts.length === 0) {
    return [];
  }

  // Score posts by similarity
  const scored = otherPosts.map((otherPost) => {
    let score = 0;

    // Topics match
    const postTopics = post.topics || [];
    const otherTopics = otherPost.topics || [];
    const topicIntersection = postTopics.filter((t) => otherTopics.includes(t));
    score += topicIntersection.length * 5;

    // Personas match
    const postPersonas = post.personas || [];
    const otherPersonas = otherPost.personas || [];
    const personaIntersection = postPersonas.filter((p) =>
      otherPersonas.includes(p)
    );
    score += personaIntersection.length * 4;

    // Outcomes match
    const postOutcomes = post.outcomes || [];
    const otherOutcomes = otherPost.outcomes || [];
    const outcomeIntersection = postOutcomes.filter((o) =>
      otherOutcomes.includes(o)
    );
    score += outcomeIntersection.length * 3;

    // Service slugs match
    const postServices = post.serviceSlugs || [];
    const otherServices = otherPost.serviceSlugs || [];
    const serviceIntersection = postServices.filter((s) =>
      otherServices.includes(s)
    );
    score += serviceIntersection.length * 6; // Higher weight for service links

    // Tags match
    const postTags = post.tags || [];
    const otherTags = otherPost.tags || [];
    const tagIntersection = postTags.filter((t) => otherTags.includes(t));
    score += tagIntersection.length * 2;

    // Same type bonus
    if (post.type && post.type === otherPost.type) {
      score += 1;
    }

    return { post: otherPost, score };
  });

  // Sort by score (descending) and return top N
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Get related services based on post's service slugs and similarity
 * 
 * Returns services linked via serviceSlugs, plus similar services
 * based on topics/personas/outcomes
 */
export function getRelatedServices(
  post: Post,
  allServices: Service[]
): Service[] {
  const related: Service[] = [];

  // Direct links via serviceSlugs
  if (post.serviceSlugs && post.serviceSlugs.length > 0) {
    post.serviceSlugs.forEach((slug) => {
      const service = allServices.find((s) => s.slug === slug);
      if (service && !related.find((s) => s.id === service.id)) {
        related.push(service);
      }
    });
  }

  // If we have enough direct links, return them
  if (related.length >= 4) {
    return related.slice(0, 4);
  }

  // Otherwise, find similar services based on taxonomy
  const postTopics = post.topics || [];
  const postPersonas = post.personas || [];
  const postOutcomes = post.outcomes || [];

  const similar = allServices
    .filter((service) => !related.find((s) => s.id === service.id))
    .map((service) => {
      let score = 0;

      // Check if service has matching taxonomy (would need to map service taxonomy)
      // For now, use a simple approach: check if service tags match post topics
      const serviceTags = service.tags || [];
      const topicMatch = postTopics.some((topic) =>
        serviceTags.some((tag) => tag.toLowerCase().includes(topic.toLowerCase()))
      );
      if (topicMatch) score += 3;

      return { service, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4 - related.length)
    .map((item) => item.service);

  return [...related, ...similar].slice(0, 4);
}

