/**
 * Click History Management
 * 
 * localStorage helpers to track service clicks for recommendations.
 */

const CLICK_HISTORY_KEY = "prosfin_service_clicks";
const MAX_HISTORY = 50; // Keep last 50 clicks

/**
 * Record service click
 */
export function recordServiceClick(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    const history = getClickHistory();
    // Remove if already exists (to move to front)
    const filtered = history.filter((s) => s !== slug);
    // Add to front
    const updated = [slug, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem(CLICK_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn("Failed to record service click:", error);
  }
}

/**
 * Get click history
 * 
 * Returns array of service slugs in order of most recent clicks
 */
export function getClickHistory(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CLICK_HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored) as string[];
    }
  } catch (error) {
    console.warn("Failed to read click history:", error);
  }

  return [];
}

/**
 * Get top clicked services
 * 
 * Returns most frequently clicked services (by count, not recency)
 */
export function getTopClickedServices(limit: number = 3): string[] {
  const history = getClickHistory();
  
  // Count occurrences
  const counts: Record<string, number> = {};
  history.forEach((slug) => {
    counts[slug] = (counts[slug] || 0) + 1;
  });

  // Sort by count (descending)
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug);

  return sorted;
}

/**
 * Clear click history
 */
export function clearClickHistory(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CLICK_HISTORY_KEY);
  } catch (error) {
    console.warn("Failed to clear click history:", error);
  }
}

