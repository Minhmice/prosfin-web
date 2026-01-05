/**
 * Canonical URL Helpers
 * 
 * Site-wide helpers for generating canonical URLs.
 */

/**
 * Generate canonical URL for a route
 * 
 * @param path - Route path (e.g., "/services", "/services/consulting")
 * @param baseUrl - Optional base URL (defaults to NEXT_PUBLIC_SITE_URL or https://prosfin.vn)
 * @returns Full canonical URL
 */
export function canonicalForRoute(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

