/**
 * Compare Storage Management
 * 
 * localStorage helpers for compare feature (session + persistent).
 */

const COMPARE_SESSION_KEY = "prosfin_compare_session";
const COMPARE_PERSISTENT_KEY = "prosfin_compare_persistent";
const MAX_COMPARE = 3;

/**
 * Save compare to session storage
 */
export function saveCompareSession(slugs: string[]): void {
  if (typeof window === "undefined") return;

  try {
    const limited = slugs.slice(0, MAX_COMPARE);
    sessionStorage.setItem(COMPARE_SESSION_KEY, JSON.stringify(limited));
  } catch (error) {
    console.warn("Failed to save compare session:", error);
  }
}

/**
 * Get compare from session storage
 */
export function getCompareSession(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(COMPARE_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored) as string[];
    }
  } catch (error) {
    console.warn("Failed to read compare session:", error);
  }

  return [];
}

/**
 * Save compare to persistent storage (localStorage)
 */
export function saveComparePersistent(slugs: string[]): void {
  if (typeof window === "undefined") return;

  try {
    const limited = slugs.slice(0, MAX_COMPARE);
    localStorage.setItem(COMPARE_PERSISTENT_KEY, JSON.stringify(limited));
  } catch (error) {
    console.warn("Failed to save compare persistent:", error);
  }
}

/**
 * Get compare from persistent storage
 */
export function getComparePersistent(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(COMPARE_PERSISTENT_KEY);
    if (stored) {
      return JSON.parse(stored) as string[];
    }
  } catch (error) {
    console.warn("Failed to read compare persistent:", error);
  }

  return [];
}

/**
 * Get combined compare (session + persistent, deduplicated)
 */
export function getCompareAll(): string[] {
  const session = getCompareSession();
  const persistent = getComparePersistent();
  const combined = [...new Set([...session, ...persistent])];
  return combined.slice(0, MAX_COMPARE);
}

/**
 * Clear all compare storage
 */
export function clearCompare(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(COMPARE_SESSION_KEY);
    localStorage.removeItem(COMPARE_PERSISTENT_KEY);
  } catch (error) {
    console.warn("Failed to clear compare:", error);
  }
}

/**
 * Add service to compare
 */
export function addToCompare(slug: string): void {
  const current = getCompareAll();
  if (current.includes(slug)) {
    return; // Already in compare
  }
  if (current.length >= MAX_COMPARE) {
    return; // Max reached
  }
  const updated = [...current, slug];
  saveCompareSession(updated);
  saveComparePersistent(updated);
}

/**
 * Remove service from compare
 */
export function removeFromCompare(slug: string): void {
  const current = getCompareAll();
  const updated = current.filter((s) => s !== slug);
  saveCompareSession(updated);
  saveComparePersistent(updated);
}

/**
 * Check if service is in compare
 */
export function isInCompare(slug: string): boolean {
  return getCompareAll().includes(slug);
}

