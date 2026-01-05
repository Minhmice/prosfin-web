/**
 * Service Taxonomy Helpers
 * 
 * Helper functions for mapping and validating service taxonomy fields.
 * Auto-maps from existing fields (category, tags, idealClient) as fallback.
 */

import type { Service } from "@/types/content";

/**
 * Map service to taxonomy by inferring from existing fields
 * 
 * Maps personas, outcomes, stages, formats from:
 * - category, tags, idealClient, layoutVariant
 */
export function mapServiceToTaxonomy(service: Service): Service {
  const mapped: Partial<Service> = {};

  // Map personas from idealClient and tags
  if (!service.personas || service.personas.length === 0) {
    const personas: string[] = [];
    const idealClient = service.idealClient?.toLowerCase() || "";
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];

    if (idealClient.includes("chủ doanh nghiệp") || tags.includes("cfo") || tags.includes("chủ dn") || tags.includes("owner")) {
      personas.push("owner");
    }
    if (tags.includes("cfo") || idealClient.includes("cfo") || idealClient.includes("giám đốc tài chính")) {
      personas.push("cfo");
    }
    if (tags.includes("kế toán trưởng") || idealClient.includes("kế toán trưởng") || idealClient.includes("chief-accountant")) {
      personas.push("chief-accountant");
    }
    if (personas.length > 0) {
      mapped.personas = personas;
    }
  }

  // Map outcomes from tags and category
  if (!service.outcomes || service.outcomes.length === 0) {
    const outcomes: string[] = [];
    const title = service.title.toLowerCase();
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];
    const category = service.category?.toLowerCase() || "";

    if (tags.includes("lợi nhuận") || tags.includes("profit") || title.includes("lợi nhuận")) {
      outcomes.push("profit");
    }
    if (tags.includes("tuân thủ") || tags.includes("compliance") || category.includes("kiểm toán")) {
      outcomes.push("compliance");
    }
    if (tags.includes("dòng tiền") || tags.includes("cashflow") || title.includes("dòng tiền")) {
      outcomes.push("cashflow");
    }
    if (tags.includes("thuế") || tags.includes("tax") || title.includes("thuế")) {
      outcomes.push("tax");
    }
    if (tags.includes("rủi ro") || tags.includes("risk") || tags.includes("kiểm soát")) {
      outcomes.push("risk");
    }
    if (outcomes.length > 0) {
      mapped.outcomes = outcomes;
    }
  }

  // Map stages from tags and category
  if (!service.stages || service.stages.length === 0) {
    const stages: string[] = [];
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];
    const idealClient = service.idealClient?.toLowerCase() || "";

    if (tags.includes("startup") || tags.includes("khởi nghiệp") || idealClient.includes("startup")) {
      stages.push("early");
    }
    if (tags.includes("tăng trưởng") || tags.includes("growth") || idealClient.includes("tăng trưởng")) {
      stages.push("growth");
    }
    if (tags.includes("quy mô") || tags.includes("scale") || idealClient.includes("quy mô")) {
      stages.push("scale");
    }
    // Default to growth if no specific stage
    if (stages.length === 0) {
      stages.push("growth");
    }
    mapped.stages = stages;
  }

  // Map formats from layoutVariant and category
  if (!service.formats || service.formats.length === 0) {
    const formats: string[] = [];
    const layoutVariant = service.layoutVariant.toLowerCase();
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];
    const category = service.category?.toLowerCase() || "";

    if (layoutVariant.includes("advisor") || tags.includes("cố vấn")) {
      formats.push("advisory");
    }
    if (layoutVariant.includes("consulting") || tags.includes("tư vấn")) {
      formats.push("consulting");
    }
    if (layoutVariant.includes("coaching") || tags.includes("coaching") || tags.includes("huấn luyện")) {
      formats.push("coaching");
    }
    if (layoutVariant.includes("audit") || tags.includes("kiểm toán") || category.includes("kiểm toán")) {
      formats.push("audit");
    }
    if (layoutVariant.includes("test") || tags.includes("đánh giá") || tags.includes("assessment")) {
      formats.push("assessment");
    }
    // Default to consulting if no specific format
    if (formats.length === 0) {
      formats.push("consulting");
    }
    mapped.formats = formats;
  }

  return { ...service, ...mapped };
}

/**
 * Validate service taxonomy - ensures required fields exist
 * 
 * Returns true if service has minimum required taxonomy fields.
 */
export function validateServiceTaxonomy(service: Service): boolean {
  const mapped = mapServiceToTaxonomy(service);
  
  // Minimum: at least one persona, outcome, stage, format
  const hasPersonas = mapped.personas && mapped.personas.length > 0;
  const hasOutcomes = mapped.outcomes && mapped.outcomes.length > 0;
  const hasStages = mapped.stages && mapped.stages.length > 0;
  const hasFormats = mapped.formats && mapped.formats.length > 0;

  return hasPersonas && hasOutcomes && hasStages && hasFormats;
}

