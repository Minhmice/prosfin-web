/**
 * People Content Helpers
 * 
 * Helper functions for working with people/team content.
 */

import { PEOPLE } from "@/content/people";
import type { Person } from "@/types/content";

/**
 * Get all people
 */
export function getAllPeople(): Person[] {
  return PEOPLE;
}

/**
 * Get people by service slug
 * Filter by serviceSlugs, sort by priority desc then name asc
 */
export function getPeopleByService(slug: string, limit?: number): Person[] {
  const filtered = PEOPLE.filter(
    (person) => person.serviceSlugs && person.serviceSlugs.includes(slug)
  );

  // Sort: priority desc (higher number = higher priority), then name asc
  const sorted = filtered.sort((a, b) => {
    // First sort by priority (higher number first)
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    // Then sort by name alphabetically
    return a.name.localeCompare(b.name);
  });

  // Apply limit if provided
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get people by IDs
 */
export function getPeopleByIds(ids: string[]): Person[] {
  if (!ids || ids.length === 0) return [];
  return PEOPLE.filter((p) => ids.includes(p.id));
}

