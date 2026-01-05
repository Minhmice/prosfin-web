/**
 * Services Compare Logic
 * 
 * Normalize service data for comparison table.
 */

import type { Service } from "@/types/content";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";
import {
  getPersonaLabel,
  getOutcomeLabel,
} from "@/lib/services-discovery/facets";

/**
 * Compare row data structure
 */
export interface CompareRow {
  field: string;
  label: string;
  values: string[];
}

/**
 * Normalize services data for comparison
 * 
 * Returns rows with fields:
 * - whoItFor (personas)
 * - outcomes
 * - deliverables (from sections or excerpt)
 * - timeline (timeToValue)
 * - engagementModel (format)
 * - relatedPostsCount
 * - cta (CTA label)
 */
export function normalizeCompareData(services: Service[]): CompareRow[] {
  if (services.length === 0) {
    return [];
  }

  const rows: CompareRow[] = [];

  // Who it's for (personas)
  const personaValues = services.map((service) => {
    const mapped = mapServiceToTaxonomy(service);
    const personas = mapped.personas || [];
    return personas.map((p) => getPersonaLabel(p)).join(", ") || "—";
  });
  rows.push({
    field: "whoItFor",
    label: "Dành cho",
    values: personaValues,
  });

  // Outcomes
  const outcomeValues = services.map((service) => {
    const mapped = mapServiceToTaxonomy(service);
    const outcomes = mapped.outcomes || [];
    return outcomes.map((o) => getOutcomeLabel(o)).join(", ") || "—";
  });
  rows.push({
    field: "outcomes",
    label: "Kết quả",
    values: outcomeValues,
  });

  // Deliverables (from excerpt or shortDescription)
  const deliverableValues = services.map((service) => {
    return service.excerpt || service.shortDescription || "—";
  });
  rows.push({
    field: "deliverables",
    label: "Nội dung",
    values: deliverableValues,
  });

  // Timeline (timeToValue)
  const timelineValues = services.map((service) => {
    const mapped = mapServiceToTaxonomy(service);
    if (mapped.timeToValue?.label) {
      return mapped.timeToValue.label;
    }
    if (mapped.timeToValue?.minWeeks && mapped.timeToValue?.maxWeeks) {
      if (mapped.timeToValue.minWeeks === mapped.timeToValue.maxWeeks) {
        return `${mapped.timeToValue.minWeeks} tuần`;
      }
      return `${mapped.timeToValue.minWeeks}-${mapped.timeToValue.maxWeeks} tuần`;
    }
    return "—";
  });
  rows.push({
    field: "timeline",
    label: "Thời gian",
    values: timelineValues,
  });

  // Engagement model (format)
  const engagementValues = services.map((service) => {
    const mapped = mapServiceToTaxonomy(service);
    const formats = mapped.formats || [];
    const formatLabels: Record<string, string> = {
      advisory: "Cố vấn",
      consulting: "Tư vấn",
      coaching: "Coaching",
      audit: "Kiểm toán",
      assessment: "Đánh giá",
    };
    return formats.map((f) => formatLabels[f] || f).join(", ") || "—";
  });
  rows.push({
    field: "engagementModel",
    label: "Hình thức",
    values: engagementValues,
  });

  // Related posts count
  const relatedPostsValues = services.map((service) => {
    const count =
      (service.relatedPostIds?.length || 0) +
      (service.relatedPostSlugs?.length || 0);
    return count > 0 ? `${count} bài viết` : "—";
  });
  rows.push({
    field: "relatedPostsCount",
    label: "Tài liệu liên quan",
    values: relatedPostsValues,
  });

  // CTA
  const ctaValues = services.map((service) => {
    return service.cta?.label || service.ctaLabel || "Liên hệ";
  });
  rows.push({
    field: "cta",
    label: "Hành động",
    values: ctaValues,
  });

  return rows;
}

