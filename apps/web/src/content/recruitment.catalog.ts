/**
 * Recruitment Catalog
 * 
 * Catalog for recruitment services (Tuyển dụng).
 * Includes 2 main branches: brokerage (môi giới) and training (đào tạo chuyên môn).
 * Also includes talent pool schema for public basic view.
 * 
 * Note: Recruitment is treated as a service, but organized separately
 * because it has different structure (pages vs services).
 */

import { slugify, assertUniqueSlugs } from "@/lib/slug";

export interface RecruitmentPage {
  id: string;
  label: string;
  slug: string;
  description?: string;
  order: number;
}

/**
 * Talent Pool Candidate Schema
 * 
 * Privacy-by-design: Only includes non-PII data for public view.
 * Public can see candidate cards but not personal information.
 * 
 * NO PII fields: no email, phone, address, real name.
 */
export interface TalentPoolCandidate {
  candidateCode: string; // Public ID, not real name (e.g., "PF-TAL-00023")
  roleTitle: string; // e.g., "Kế toán tổng hợp", "KTT", "FP&A", "CFO"
  level: "junior" | "mid" | "senior" | "lead";
  skillTags: string[]; // Tags like ["VAT", "CIT", "Internal Controls", "Costing"]
  industryTags: string[]; // Tags like ["F&B", "Trading", "Manufacturing"]
  location: string; // Province/city or region (e.g., "Hà Nội", "TP.HCM", "Remote")
  availability: "available" | "interviewing" | "not-available";
  experienceYearsRange?: string; // e.g., "3–5"
  languages?: string[]; // e.g., ["VN", "EN"]
  summary?: string; // 1–2 câu, không được chứa PII
  badges?: string[]; // e.g., ["Đã đào tạo ProsFIN", "KTT", "CFO track"]
  updatedAt: string; // ISO date string
  status: "public-basic" | "hidden" | "archived";
}

export interface RecruitmentCatalog {
  pages: RecruitmentPage[];
  talentPool: {
    enabled: boolean;
    candidates: TalentPoolCandidate[]; // Will be populated later
  };
  ctaDefaults: {
    brokerage: string;
    training: string;
    talentPool: string;
  };
}

/**
 * Recruitment Pages (2 nhánh)
 */
const RECRUITMENT_PAGES: Omit<RecruitmentPage, "slug">[] = [
  {
    id: "brokerage",
    label: "Môi giới tuyển dụng",
    description: "Hỗ trợ doanh nghiệp tìm kiếm và tuyển dụng nhân sự tài chính phù hợp",
    order: 1,
  },
  {
    id: "training",
    label: "Đào tạo chuyên môn",
    description: "Đào tạo và phát triển đội ngũ tài chính, kế toán theo nhu cầu doanh nghiệp",
    order: 2,
  },
];

/**
 * Build recruitment catalog
 */
function buildRecruitmentCatalog(): RecruitmentCatalog {
  const pages: RecruitmentPage[] = RECRUITMENT_PAGES.map((page) => ({
    ...page,
    slug: slugify(page.label),
  }));

  // Validate uniqueness
  assertUniqueSlugs(pages, (p) => p.slug);

  return {
    pages,
    talentPool: {
      enabled: true, // Talent pool feature is enabled
      candidates: [], // Will be populated in Phase 2+ or via CMS
    },
    ctaDefaults: {
      brokerage: "/request-proposal?service=recruitment-brokerage",
      training: "/request-proposal?service=recruitment-training",
      talentPool: "/request-proposal?service=recruitment-brokerage",
    },
  };
}

/**
 * Recruitment Catalog Export
 * 
 * This is the single source of truth for recruitment structure.
 * Import this in navigation and routing.
 */
export const recruitmentCatalog: RecruitmentCatalog = buildRecruitmentCatalog();

/**
 * Helper functions to query catalog
 */
export function getRecruitmentPageBySlug(slug: string): RecruitmentPage | undefined {
  return recruitmentCatalog.pages.find((p) => p.slug === slug);
}

export function getRecruitmentPageById(id: string): RecruitmentPage | undefined {
  return recruitmentCatalog.pages.find((p) => p.id === id);
}

export function getAllRecruitmentPages(): RecruitmentPage[] {
  return [...recruitmentCatalog.pages];
}

export function getTalentPoolCandidates(): TalentPoolCandidate[] {
  return recruitmentCatalog.talentPool.candidates.filter(
    (candidate) => candidate.status === "public-basic"
  );
}

/**
 * Routing conventions for recruitment:
 * - Hub: /recruitment
 * - Brokerage: /recruitment/brokerage
 * - Training: /recruitment/training
 * - Talent Pool: /recruitment/talent-pool
 * 
 * Talent pool will show public basic view with candidate cards.
 * CTA on each card leads to request proposal form.
 */

