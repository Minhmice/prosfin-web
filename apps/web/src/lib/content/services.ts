/**
 * Service Content Helpers
 * 
 * Helper functions for working with service content.
 */

import { SERVICES } from "@/content/services";
import { PEOPLE } from "@/content/people";
import { POSTS } from "@/content/posts";
import type { Service, Person, Post } from "@/types/content";

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Get related services (excluding current)
 * Ưu tiên services cùng category
 */
export function getRelatedServices(
  currentSlug: string,
  count: number = 4
): Service[] {
  const currentService = getServiceBySlug(currentSlug);
  if (!currentService) {
    return SERVICES.filter((s) => s.slug !== currentSlug).slice(0, count);
  }

  // Ưu tiên cùng category
  const sameCategory = SERVICES.filter(
    (s) => s.slug !== currentSlug && s.category === currentService.category
  );
  const differentCategory = SERVICES.filter(
    (s) => s.slug !== currentSlug && s.category !== currentService.category
  );

  // Kết hợp: cùng category trước, sau đó khác category
  return [...sameCategory, ...differentCategory].slice(0, count);
}

/**
 * Get services by category
 */
export function getServicesByCategory(
  category: string,
  excludeSlug?: string
): Service[] {
  return SERVICES.filter(
    (s) => s.category === category && s.slug !== excludeSlug
  );
}

/**
 * Get posts by tags
 */
export function getPostsByTags(tags: string[]): Post[] {
  if (tags.length === 0) return [];
  
  return POSTS.filter((post) =>
    tags.some((tag) => post.tags.includes(tag))
  );
}

/**
 * Get people by IDs
 */
export function getPeopleByIds(ids: string[]): Person[] {
  return PEOPLE.filter((p) => ids.includes(p.id));
}

/**
 * Get posts by IDs
 */
export function getPostsByIds(ids: string[]): Post[] {
  return POSTS.filter((p) => ids.includes(p.id));
}

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return SERVICES;
}

/**
 * Get all people
 */
export function getAllPeople(): Person[] {
  return PEOPLE;
}

/**
 * Get all posts
 */
export function getAllPosts(): Post[] {
  return POSTS;
}

