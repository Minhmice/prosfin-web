/**
 * Service Scoring & Recommendation Logic
 * 
 * Scoring algorithm for matching services with wizard answers.
 * Weighting: outcome=5, persona=3, stage=2, format=1, priority=0-2
 */

import type { Service } from "@/types/content";
import type { WizardAnswers } from "./params";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";

/**
 * Score a service based on wizard answers
 * 
 * Returns score from 0 to max (higher = better match)
 */
export function scoreService(service: Service, answers: WizardAnswers): number {
  const mapped = mapServiceToTaxonomy(service);
  let score = 0;

  // Outcome match: 5 points
  if (answers.outcome && mapped.outcomes?.includes(answers.outcome)) {
    score += 5;
  }

  // Persona match: 3 points
  if (answers.persona && mapped.personas?.includes(answers.persona)) {
    score += 3;
  }

  // Stage match: 2 points
  if (answers.stage && mapped.stages?.includes(answers.stage)) {
    score += 2;
  }

  // Format match: 1 point
  if (answers.format && mapped.formats?.includes(answers.format)) {
    score += 1;
  }

  // Priority tie-breaker: 0-2 points
  if (mapped.priority !== undefined) {
    score += mapped.priority;
  }

  return score;
}

/**
 * Get top recommended services based on wizard answers
 * 
 * Returns services sorted by score (descending), limited to top N
 */
export function recommendServices(
  services: Service[],
  answers: WizardAnswers,
  limit: number = 6
): Service[] {
  // Score all services
  const scored = services.map((service) => ({
    service,
    score: scoreService(service, answers),
  }));

  // Sort by score (descending), then by priority, then by isFeatured
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie-breaker: priority
    const aPriority = a.service.priority ?? 0;
    const bPriority = b.service.priority ?? 0;
    if (bPriority !== aPriority) {
      return bPriority - aPriority;
    }
    // Final tie-breaker: isFeatured
    if (a.service.isFeatured && !b.service.isFeatured) return -1;
    if (!a.service.isFeatured && b.service.isFeatured) return 1;
    return 0;
  });

  // Return top N
  return scored.slice(0, limit).map((item) => item.service);
}

/**
 * Get recommendation reasons for explainability
 * 
 * Returns 2-3 reason strings explaining why service matches
 */
export function getRecommendationReasons(
  service: Service,
  answers: WizardAnswers
): string[] {
  const mapped = mapServiceToTaxonomy(service);
  const reasons: string[] = [];

  if (answers.persona && mapped.personas?.includes(answers.persona)) {
    const personaLabels: Record<string, string> = {
      owner: "Dành cho chủ doanh nghiệp",
      cfo: "Dành cho CFO",
      "chief-accountant": "Dành cho kế toán trưởng",
    };
    reasons.push(personaLabels[answers.persona] || `Phù hợp với ${answers.persona}`);
  }

  if (answers.outcome && mapped.outcomes?.includes(answers.outcome)) {
    const outcomeLabels: Record<string, string> = {
      profit: "Tối ưu lợi nhuận",
      compliance: "Đảm bảo tuân thủ",
      cashflow: "Quản lý dòng tiền",
      tax: "Tối ưu thuế",
      risk: "Kiểm soát rủi ro",
    };
    reasons.push(outcomeLabels[answers.outcome] || `Đạt mục tiêu ${answers.outcome}`);
  }

  if (mapped.timeToValue?.label) {
    reasons.push(`Time-to-value: ${mapped.timeToValue.label}`);
  } else if (mapped.timeToValue?.minWeeks || mapped.timeToValue?.maxWeeks) {
    const min = mapped.timeToValue.minWeeks || 0;
    const max = mapped.timeToValue.maxWeeks || min;
    if (min === max) {
      reasons.push(`Time-to-value: ${min} tuần`);
    } else {
      reasons.push(`Time-to-value: ${min}-${max} tuần`);
    }
  }

  // Ensure at least 2 reasons
  if (reasons.length === 0) {
    reasons.push("Dịch vụ được đề xuất");
  }

  return reasons.slice(0, 3); // Max 3 reasons
}

