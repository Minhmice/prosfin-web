/**
 * Service Filtering Logic
 * 
 * Filter services based on search params (persona, outcome, stage, format, q).
 */

import type { Service } from "@/types/content";
import type { ServiceFilters } from "./params";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";

/**
 * Filter services based on filters
 * 
 * Supports:
 * - Single-value filters: persona, outcome, stage, format
 * - Text search (q) in title, excerpt, tags
 */
export function filterServices(
  services: Service[],
  filters: ServiceFilters
): Service[] {
  let filtered = [...services];

  // Filter by persona
  if (filters.persona) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.personas?.includes(filters.persona!) ?? false;
    });
  }

  // Filter by outcome
  if (filters.outcome) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.outcomes?.includes(filters.outcome!) ?? false;
    });
  }

  // Filter by stage
  if (filters.stage) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.stages?.includes(filters.stage!) ?? false;
    });
  }

  // Filter by format
  if (filters.format) {
    filtered = filtered.filter((service) => {
      const mapped = mapServiceToTaxonomy(service);
      return mapped.formats?.includes(filters.format!) ?? false;
    });
  }

  // Text search (q) in title, excerpt, tags
  if (filters.q) {
    const query = filters.q.toLowerCase().trim();
    filtered = filtered.filter((service) => {
      const titleMatch = service.title.toLowerCase().includes(query);
      const excerptMatch = service.excerpt?.toLowerCase().includes(query) ?? false;
      const tagsMatch = service.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      ) ?? false;
      const shortDescMatch = service.shortDescription?.toLowerCase().includes(query) ?? false;

      return titleMatch || excerptMatch || tagsMatch || shortDescMatch;
    });
  }

  return filtered;
}

