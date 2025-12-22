/**
 * Service Content Helpers
 * 
 * Helper functions for working with service content.
 */

import { SERVICES } from "@/content/services";
import type { Service } from "@/types/content";

// Re-export from other content helpers
export {
  getAllPosts,
  getPostsByService,
  getPostsByTags,
  getPostsByIds,
} from "./posts";

export {
  getAllPeople,
  getPeopleByService,
  getPeopleByIds,
} from "./people";

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Get related services (excluding current)
 * Priority:
 * 1. Explicit relatedServiceSlugs
 * 2. Same category
 * 3. Tag intersection
 * 4. Fallback: random services
 */
export function getRelatedServices(
  currentSlug: string,
  count: number = 4
): Service[] {
  const currentService = getServiceBySlug(currentSlug);
  if (!currentService) {
    return SERVICES.filter((s) => s.slug !== currentSlug).slice(0, count);
  }

  const currentTags = currentService.tags || [];
  const allOtherServices = SERVICES.filter((s) => s.slug !== currentSlug);

  // Priority 1: Explicit relatedServiceSlugs
  const explicitLinks: Service[] = [];
  if (currentService.relatedServiceSlugs && currentService.relatedServiceSlugs.length > 0) {
    explicitLinks.push(
      ...currentService.relatedServiceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter((s): s is Service => s !== undefined)
    );
  }

  // Priority 2: Same category
  const sameCategory = allOtherServices.filter(
    (s) => {
      // Skip if already in explicitLinks
      if (explicitLinks.some((explicit) => explicit.slug === s.slug)) {
        return false;
      }
      return s.category === currentService.category;
    }
  );

  // Priority 3: Tag intersection
  const tagMatch = allOtherServices.filter((s) => {
    // Skip if already in explicitLinks or sameCategory
    if (
      explicitLinks.some((explicit) => explicit.slug === s.slug) ||
      sameCategory.some((same) => same.slug === s.slug)
    ) {
      return false;
    }
    const sTags = s.tags || [];
    return sTags.some((tag) => currentTags.includes(tag));
  });

  // Priority 4: Fallback - remaining services
  const fallback = allOtherServices.filter(
    (s) =>
      !explicitLinks.some((explicit) => explicit.slug === s.slug) &&
      !sameCategory.some((same) => same.slug === s.slug) &&
      !tagMatch.some((tag) => tag.slug === s.slug)
  );

  // Combine all priorities
  const combined = [
    ...explicitLinks,
    ...sameCategory,
    ...tagMatch,
    ...fallback,
  ];

  return combined.slice(0, count);
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
 * Get all services
 */
export function getAllServices(): Service[] {
  return SERVICES;
}

