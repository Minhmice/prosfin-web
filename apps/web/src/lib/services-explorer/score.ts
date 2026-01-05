/**
 * Services Explorer Scoring Logic
 * 
 * Score services for recommendations based on preset and click history.
 */

import type { Service } from "@/types/content";
import type { ExplorerFilters } from "./params";
import type { ServicePreset } from "@/data/service-presets";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";
import { getClickHistory, getTopClickedServices } from "./click-history";

/**
 * Score a service based on preset filters and click history
 */
export function scoreRecommended(
  service: Service,
  preset?: ServicePreset,
  clickHistory?: string[]
): number {
  let score = 0;
  const mapped = mapServiceToTaxonomy(service);

  // Base score from priority
  score += service.priority ?? 0;

  // Featured boost
  if (service.isFeatured) {
    score += 10;
  }

  // Preset matching
  if (preset) {
    const filters = preset.filters;

    // Audience match
    if (filters.audience) {
      const personas = mapped.personas || [];
      if (filters.audience === "owner" && personas.includes("owner")) {
        score += 5;
      } else if (
        filters.audience === "finance_team" &&
        (personas.includes("cfo") || personas.includes("chief-accountant"))
      ) {
        score += 5;
      }
    }

    // Goal match
    if (filters.goal && mapped.outcomes?.includes(filters.goal)) {
      score += 5;
    }

    // Format match
    if (filters.format && mapped.formats?.includes(filters.format)) {
      score += 3;
    }

    // Tag match
    if (filters.tag && filters.tag.length > 0) {
      const serviceTags = service.tags?.map((t) => t.toLowerCase()) || [];
      const matchedTags = filters.tag.filter((tag) =>
        serviceTags.some((st) => st.includes(tag.toLowerCase()))
      );
      score += matchedTags.length * 2;
    }
  }

  // Click history boost
  if (clickHistory) {
    const history = clickHistory.length > 0 ? clickHistory : getClickHistory();
    const index = history.indexOf(service.slug);
    if (index !== -1) {
      // More recent clicks = higher score
      score += (history.length - index) * 2;
    }
  }

  return score;
}

/**
 * Get recommended services based on preset and click history
 */
export function getRecommendedServices(
  services: Service[],
  preset?: ServicePreset,
  limit: number = 3
): Service[] {
  const clickHistory = getClickHistory();
  const topClicked = getTopClickedServices(5);

  // Score all services
  const scored = services.map((service) => ({
    service,
    score: scoreRecommended(service, preset, clickHistory),
  }));

  // Sort by score (descending)
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie-breaker: prefer top clicked
    const aInTop = topClicked.includes(a.service.slug);
    const bInTop = topClicked.includes(b.service.slug);
    if (aInTop && !bInTop) return -1;
    if (!aInTop && bInTop) return 1;
    return 0;
  });

  return scored.slice(0, limit).map((item) => item.service);
}

