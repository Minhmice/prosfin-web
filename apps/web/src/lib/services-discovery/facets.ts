/**
 * Service Facets
 * 
 * Extract unique filter options from services for rendering filter chips.
 */

import type { Service } from "@/types/content";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";

/**
 * Service facets - unique values for each taxonomy dimension
 */
export interface ServiceFacets {
  personas: string[];
  outcomes: string[];
  stages: string[];
  formats: string[];
}

/**
 * Get facets from services
 * 
 * Extracts unique values for personas, outcomes, stages, formats
 * to render filter options
 */
export function getFacets(services: Service[]): ServiceFacets {
  const personasSet = new Set<string>();
  const outcomesSet = new Set<string>();
  const stagesSet = new Set<string>();
  const formatsSet = new Set<string>();

  services.forEach((service) => {
    const mapped = mapServiceToTaxonomy(service);

    mapped.personas?.forEach((p) => personasSet.add(p));
    mapped.outcomes?.forEach((o) => outcomesSet.add(o));
    mapped.stages?.forEach((s) => stagesSet.add(s));
    mapped.formats?.forEach((f) => formatsSet.add(f));
  });

  return {
    personas: Array.from(personasSet).sort(),
    outcomes: Array.from(outcomesSet).sort(),
    stages: Array.from(stagesSet).sort(),
    formats: Array.from(formatsSet).sort(),
  };
}

/**
 * Get label for persona value
 */
export function getPersonaLabel(persona: string): string {
  const labels: Record<string, string> = {
    owner: "Chủ doanh nghiệp",
    cfo: "CFO",
    "chief-accountant": "Kế toán trưởng",
  };
  return labels[persona] || persona;
}

/**
 * Get label for outcome value
 */
export function getOutcomeLabel(outcome: string): string {
  const labels: Record<string, string> = {
    profit: "Tối ưu lợi nhuận",
    compliance: "Tuân thủ",
    cashflow: "Quản lý dòng tiền",
    tax: "Tối ưu thuế",
    risk: "Kiểm soát rủi ro",
  };
  return labels[outcome] || outcome;
}

/**
 * Get label for stage value
 */
export function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    early: "Khởi nghiệp",
    growth: "Tăng trưởng",
    scale: "Quy mô",
  };
  return labels[stage] || stage;
}

/**
 * Get label for format value
 */
export function getFormatLabel(format: string): string {
  const labels: Record<string, string> = {
    advisory: "Cố vấn",
    consulting: "Tư vấn",
    coaching: "Coaching",
    audit: "Kiểm toán",
    assessment: "Đánh giá",
  };
  return labels[format] || format;
}

