/**
 * Services Explorer SEO Helpers
 * 
 * SEO hygiene for faceted URLs (Strategy A):
 * - All filtered URLs: canonical -> /services, robots: noindex, follow
 */

import type { ExplorerFilters } from "./params";

/**
 * Check if URL should be indexed
 * 
 * Strategy A: Return false if any filters are active
 */
export function shouldIndexUrl(filters: ExplorerFilters): boolean {
  // If any filter is active, don't index
  return (
    !filters.query &&
    !filters.audience &&
    !filters.goal &&
    !filters.format &&
    !filters.tag &&
    !filters.sort &&
    !filters.compare
  );
}

/**
 * Get canonical URL
 * 
 * Strategy A: Always return base /services URL
 */
export function getCanonicalUrl(filters: ExplorerFilters): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  return `${baseUrl}/services`;
}

/**
 * Get robots meta
 * 
 * Strategy A: noindex, follow if filters are active
 */
export function getRobotsMeta(filters: ExplorerFilters): {
  index: boolean;
  follow: boolean;
} {
  const shouldIndex = shouldIndexUrl(filters);
  return {
    index: shouldIndex,
    follow: true, // Always follow links
  };
}

