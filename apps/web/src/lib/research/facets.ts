/**
 * Research Facets
 * 
 * Extract unique filter options from posts for rendering filter chips.
 */

import type { Post } from "@/types/content";

/**
 * Research facets - unique values for each taxonomy dimension
 */
export interface ResearchFacets {
  types: string[];
  topics: string[];
  personas: string[];
  outcomes: string[];
}

/**
 * Get facets from posts
 * 
 * Extracts unique values for types, topics, personas, outcomes
 * to render filter options
 */
export function getFacets(posts: Post[]): ResearchFacets {
  const typesSet = new Set<string>();
  const topicsSet = new Set<string>();
  const personasSet = new Set<string>();
  const outcomesSet = new Set<string>();

  posts.forEach((post) => {
    if (post.type) {
      typesSet.add(post.type);
    }
    post.topics?.forEach((topic) => topicsSet.add(topic));
    post.personas?.forEach((persona) => personasSet.add(persona));
    post.outcomes?.forEach((outcome) => outcomesSet.add(outcome));
  });

  return {
    types: Array.from(typesSet).sort(),
    topics: Array.from(topicsSet).sort(),
    personas: Array.from(personasSet).sort(),
    outcomes: Array.from(outcomesSet).sort(),
  };
}

/**
 * Get label for type value
 */
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    brief: "Brief",
    playbook: "Playbook",
    tool: "Tool & Template",
  };
  return labels[type] || type;
}

/**
 * Get label for topic value
 */
export function getTopicLabel(topic: string): string {
  const labels: Record<string, string> = {
    cashflow: "Dòng tiền",
    tax: "Thuế",
    compliance: "Tuân thủ",
    risk: "Rủi ro",
    capital: "Vốn",
  };
  return labels[topic] || topic;
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

