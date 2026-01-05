/**
 * Services Explorer Filtering Logic
 * 
 * Filter services based on explorer filters (query, audience, goal, format, tags, sort).
 */

import type { Service } from "@/types/content";
import type { ExplorerFilters } from "./params";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";

/**
 * Filter services based on explorer filters
 * 
 * Supports:
 * - query: text search in title, excerpt, tags, shortDescription
 * - audience: single select (owner, finance_team, hiring)
 * - goal: single select (profit, cashflow, tax, risk, compliance)
 * - format: single select (advisory, consulting, coaching, test, audit)
 * - tag: multi-select tags
 * - sort: recommended, latest, a-z
 */
export function filterServices(
  services: Service[],
  filters: ExplorerFilters
): Service[] {
  let filtered = [...services];

  // Text search (query)
  if (filters.query) {
    const query = filters.query.toLowerCase().trim();
    filtered = filtered.filter((service) => {
      const titleMatch = service.title.toLowerCase().includes(query);
      const excerptMatch = service.excerpt?.toLowerCase().includes(query) ?? false;
      const shortDescMatch = service.shortDescription?.toLowerCase().includes(query) ?? false;
      const tagsMatch = service.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      ) ?? false;

      return titleMatch || excerptMatch || shortDescMatch || tagsMatch;
    });
  }

  // Audience filter
  if (filters.audience) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      const personas = mapped.personas || [];

      if (filters.audience === "owner") {
        return personas.includes("owner");
      } else if (filters.audience === "finance_team") {
        return personas.includes("cfo") || personas.includes("chief-accountant");
      } else if (filters.audience === "hiring") {
        // Services related to hiring/recruitment
        return (
          service.tags?.some((tag) =>
            tag.toLowerCase().includes("tuyển dụng") || tag.toLowerCase().includes("headhunt")
          ) ?? false
        );
      }
      return false;
    });
  }

  // Goal filter
  if (filters.goal) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.outcomes?.includes(filters.goal!) ?? false;
    });
  }

  // Format filter
  if (filters.format) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.formats?.includes(filters.format!) ?? false;
    });
  }

  // Tags filter (multi-select)
  if (filters.tag && filters.tag.length > 0) {
    filtered = filtered.filter((service) => {
      const serviceTags = service.tags?.map((t) => t.toLowerCase()) || [];
      return filters.tag!.some((tag) =>
        serviceTags.some((st) => st.includes(tag.toLowerCase()))
      );
    });
  }

  // Sort
  if (filters.sort === "a-z") {
    filtered.sort((a, b) => a.title.localeCompare(b.title, "vi"));
  } else if (filters.sort === "latest") {
    // Sort by priority or isFeatured (mock latest)
    filtered.sort((a, b) => {
      const aPriority = a.priority ?? 0;
      const bPriority = b.priority ?? 0;
      if (bPriority !== aPriority) {
        return bPriority - aPriority;
      }
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  } else {
    // Default: recommended (by priority + isFeatured)
    filtered.sort((a, b) => {
      const aPriority = a.priority ?? 0;
      const bPriority = b.priority ?? 0;
      if (bPriority !== aPriority) {
        return bPriority - aPriority;
      }
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }

  return filtered;
}

