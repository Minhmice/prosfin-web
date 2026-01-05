/**
 * Reading List & Progress Management
 * 
 * localStorage-based helpers for saving posts and tracking reading progress.
 */

const READING_LIST_KEY = "prosfin_reading_list";
const READING_PROGRESS_KEY = "prosfin_reading_progress";

export interface ReadingProgress {
  lastReadAt: string; // ISO date string
  progress: number; // 0-100 percentage
}

/**
 * Save post to reading list
 */
export function saveToReadingList(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getReadingList();
    if (!existing.includes(slug)) {
      const updated = [...existing, slug];
      localStorage.setItem(READING_LIST_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.warn("Failed to save to reading list:", error);
  }
}

/**
 * Remove post from reading list
 */
export function removeFromReadingList(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getReadingList();
    const updated = existing.filter((s) => s !== slug);
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn("Failed to remove from reading list:", error);
  }
}

/**
 * Get all saved post slugs
 */
export function getReadingList(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(READING_LIST_KEY);
    if (stored) {
      return JSON.parse(stored) as string[];
    }
  } catch (error) {
    console.warn("Failed to read reading list:", error);
  }

  return [];
}

/**
 * Check if post is in reading list
 */
export function isInReadingList(slug: string): boolean {
  return getReadingList().includes(slug);
}

/**
 * Get reading progress for a post
 */
export function getReadingProgress(slug: string): ReadingProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(READING_PROGRESS_KEY);
    if (stored) {
      const allProgress = JSON.parse(stored) as Record<string, ReadingProgress>;
      return allProgress[slug] || null;
    }
  } catch (error) {
    console.warn("Failed to read reading progress:", error);
  }

  return null;
}

/**
 * Update reading progress for a post
 */
export function updateReadingProgress(
  slug: string,
  progress: number
): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(READING_PROGRESS_KEY);
    const allProgress: Record<string, ReadingProgress> = stored
      ? JSON.parse(stored)
      : {};

    allProgress[slug] = {
      lastReadAt: new Date().toISOString(),
      progress: Math.max(0, Math.min(100, progress)), // Clamp 0-100
    };

    localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.warn("Failed to update reading progress:", error);
  }
}

/**
 * Clear reading progress for a post
 */
export function clearReadingProgress(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(READING_PROGRESS_KEY);
    if (stored) {
      const allProgress = JSON.parse(stored) as Record<string, ReadingProgress>;
      delete allProgress[slug];
      localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress));
    }
  } catch (error) {
    console.warn("Failed to clear reading progress:", error);
  }
}

