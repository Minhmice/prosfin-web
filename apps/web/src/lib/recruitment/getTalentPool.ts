/**
 * Talent Pool Data Access
 * 
 * Functions to query and filter talent pool candidates.
 */

import type { TalentPoolCandidate } from "@/content/recruitment.catalog";
import { MOCK_TALENT_POOL } from "@/content/talent-pool.mock";

export interface TalentPoolFilters {
  roleTitle?: string;
  level?: "junior" | "mid" | "senior" | "lead";
  skillTags?: string[];
  industryTags?: string[];
  location?: string;
  availability?: "available" | "interviewing" | "not-available";
}

export interface TalentPoolFilterOptions {
  roles: Array<{ value: string; label: string; count: number }>;
  levels: Array<{ value: string; label: string; count: number }>;
  skillTags: Array<{ value: string; label: string; count: number }>;
  industryTags: Array<{ value: string; label: string; count: number }>;
  locations: Array<{ value: string; label: string; count: number }>;
  availability: Array<{ value: string; label: string; count: number }>;
}

/**
 * Get all public-basic candidates
 * 
 * Note: In production, this will fetch from API/CMS.
 * For now, uses mock data.
 */
export function getTalentPoolCandidates(): TalentPoolCandidate[] {
  // In production: fetch from API/CMS
  // For now: use mock data
  return MOCK_TALENT_POOL.filter((candidate) => candidate.status === "public-basic");
}

/**
 * Filter talent pool by criteria
 */
export function filterTalentPool(
  candidates: TalentPoolCandidate[],
  filters: TalentPoolFilters
): TalentPoolCandidate[] {
  let filtered = [...candidates];

  // Filter by roleTitle
  if (filters.roleTitle) {
    filtered = filtered.filter((candidate) =>
      candidate.roleTitle.toLowerCase().includes(filters.roleTitle!.toLowerCase())
    );
  }

  // Filter by level
  if (filters.level) {
    filtered = filtered.filter((candidate) => candidate.level === filters.level);
  }

  // Filter by skillTags (any match)
  if (filters.skillTags && filters.skillTags.length > 0) {
    filtered = filtered.filter((candidate) =>
      filters.skillTags!.some((tag) =>
        candidate.skillTags.some((candidateTag) =>
          candidateTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  // Filter by industryTags (any match)
  if (filters.industryTags && filters.industryTags.length > 0) {
    filtered = filtered.filter((candidate) =>
      filters.industryTags!.some((tag) =>
        candidate.industryTags.some((candidateTag) =>
          candidateTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  // Filter by location
  if (filters.location) {
    filtered = filtered.filter((candidate) =>
      candidate.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Filter by availability
  if (filters.availability) {
    filtered = filtered.filter(
      (candidate) => candidate.availability === filters.availability
    );
  }

  return filtered;
}

/**
 * Get candidate by code
 */
export function getTalentPoolCandidateByCode(
  code: string
): TalentPoolCandidate | undefined {
  const candidates = getTalentPoolCandidates();
  return candidates.find((candidate) => candidate.candidateCode === code);
}

/**
 * Get filter options with counts
 */
export function getTalentPoolFilters(): TalentPoolFilterOptions {
  const candidates = getTalentPoolCandidates();

  // Collect unique values and counts
  const roleCounts = new Map<string, number>();
  const levelCounts = new Map<string, number>();
  const skillTagCounts = new Map<string, number>();
  const industryTagCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();
  const availabilityCounts = new Map<string, number>();

  candidates.forEach((candidate) => {
    // Roles
    roleCounts.set(
      candidate.roleTitle,
      (roleCounts.get(candidate.roleTitle) || 0) + 1
    );

    // Levels
    levelCounts.set(candidate.level, (levelCounts.get(candidate.level) || 0) + 1);

    // Skill tags
    candidate.skillTags.forEach((tag) => {
      skillTagCounts.set(tag, (skillTagCounts.get(tag) || 0) + 1);
    });

    // Industry tags
    candidate.industryTags.forEach((tag) => {
      industryTagCounts.set(tag, (industryTagCounts.get(tag) || 0) + 1);
    });

    // Locations
    locationCounts.set(
      candidate.location,
      (locationCounts.get(candidate.location) || 0) + 1
    );

    // Availability
    availabilityCounts.set(
      candidate.availability,
      (availabilityCounts.get(candidate.availability) || 0) + 1
    );
  });

  // Build options arrays
  const roles = Array.from(roleCounts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count);

  const levels = [
    { value: "junior", label: "Junior", count: levelCounts.get("junior") || 0 },
    { value: "mid", label: "Mid-level", count: levelCounts.get("mid") || 0 },
    { value: "senior", label: "Senior", count: levelCounts.get("senior") || 0 },
    { value: "lead", label: "Lead", count: levelCounts.get("lead") || 0 },
  ].filter((level) => level.count > 0);

  const skillTags = Array.from(skillTagCounts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count);

  const industryTags = Array.from(industryTagCounts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count);

  const locations = Array.from(locationCounts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count);

  const availability = [
    {
      value: "available",
      label: "Có sẵn",
      count: availabilityCounts.get("available") || 0,
    },
    {
      value: "interviewing",
      label: "Đang phỏng vấn",
      count: availabilityCounts.get("interviewing") || 0,
    },
    {
      value: "not-available",
      label: "Không có sẵn",
      count: availabilityCounts.get("not-available") || 0,
    },
  ].filter((avail) => avail.count > 0);

  return {
    roles,
    levels,
    skillTags,
    industryTags,
    locations,
    availability,
  };
}

