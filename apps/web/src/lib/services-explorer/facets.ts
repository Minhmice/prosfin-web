/**
 * Services Explorer Facets
 * 
 * Extract unique filter options for explorer (audience, goal, format, tags).
 */

import type { Service } from "@/types/content";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";

/**
 * Explorer facets
 */
export interface ExplorerFacets {
  audiences: { value: string; label: string; count: number }[];
  goals: { value: string; label: string; count: number }[];
  formats: { value: string; label: string; count: number }[];
  tags: { value: string; label: string; count: number }[];
}

const audienceLabels: Record<string, string> = {
  owner: "Chủ DN",
  finance_team: "Đội ngũ tài chính",
  hiring: "Tuyển dụng",
};

const goalLabels: Record<string, string> = {
  profit: "Lợi nhuận",
  cashflow: "Dòng tiền",
  tax: "Thuế",
  risk: "Rủi ro",
  compliance: "Tuân thủ",
};

const formatLabels: Record<string, string> = {
  advisory: "Cố vấn",
  consulting: "Tư vấn",
  coaching: "Coaching",
  test: "Đánh giá",
  audit: "Kiểm toán",
};

/**
 * Get explorer facets from services
 */
export function getExplorerFacets(services: Service[]): ExplorerFacets {
  const audienceCounts: Record<string, number> = {};
  const goalCounts: Record<string, number> = {};
  const formatCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};

  services.forEach((service) => {
    const mapped = mapServiceToTaxonomy(service);

    // Count audiences
    mapped.personas?.forEach((p) => {
      if (p === "owner") {
        audienceCounts["owner"] = (audienceCounts["owner"] || 0) + 1;
      } else if (p === "cfo" || p === "chief-accountant") {
        audienceCounts["finance_team"] = (audienceCounts["finance_team"] || 0) + 1;
      }
    });

    // Count goals
    mapped.outcomes?.forEach((o) => {
      if (["profit", "cashflow", "tax", "risk", "compliance"].includes(o)) {
        goalCounts[o] = (goalCounts[o] || 0) + 1;
      }
    });

    // Count formats
    mapped.formats?.forEach((f) => {
      if (["advisory", "consulting", "coaching", "test", "audit"].includes(f)) {
        formatCounts[f] = (formatCounts[f] || 0) + 1;
      }
    });

    // Count tags
    service.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return {
    audiences: Object.entries(audienceCounts)
      .map(([value, count]) => ({
        value,
        label: audienceLabels[value] || value,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    goals: Object.entries(goalCounts)
      .map(([value, count]) => ({
        value,
        label: goalLabels[value] || value,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    formats: Object.entries(formatCounts)
      .map(([value, count]) => ({
        value,
        label: formatLabels[value] || value,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    tags: Object.entries(tagCounts)
      .map(([value, count]) => ({
        value,
        label: value,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20), // Top 20 tags
  };
}

