/**
 * Research Collections Data
 * 
 * Curated "playlists" of related posts for guided reading.
 */

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  postSlugs: string[]; // Ordered list of post slugs
  estimatedTime?: string; // "15 phút"
  difficulty?: "beginner" | "intermediate" | "advanced";
}

/**
 * Hardcoded collections for Phase 2
 * 
 * In Phase 3, these can be fetched from API/CMS
 */
export const COLLECTIONS: Collection[] = [
  {
    id: "cashflow-fundamentals",
    slug: "cashflow-fundamentals",
    title: "Cashflow Fundamentals",
    description: "5 bài viết cơ bản về quản lý dòng tiền cho chủ doanh nghiệp",
    estimatedTime: "15 phút",
    difficulty: "beginner",
    postSlugs: [
      // Placeholder slugs - will be replaced with actual post slugs
      "cashflow-basics",
      "cashflow-forecasting",
      "cashflow-optimization",
      "cashflow-troubleshooting",
      "cashflow-best-practices",
    ],
  },
  {
    id: "tax-readiness-2026",
    slug: "tax-readiness-2026",
    title: "Tax Readiness 2026",
    description: "Chuẩn bị thuế năm 2026: từ cơ bản đến nâng cao",
    estimatedTime: "20 phút",
    difficulty: "intermediate",
    postSlugs: [
      "tax-planning-2026",
      "tax-deductions",
      "tax-compliance",
      "tax-optimization",
    ],
  },
  {
    id: "owner-monthly-rhythm",
    slug: "owner-monthly-rhythm",
    title: "Owner's Monthly Finance Rhythm",
    description: "Nhịp điệu tài chính hàng tháng cho chủ doanh nghiệp",
    estimatedTime: "25 phút",
    difficulty: "beginner",
    postSlugs: [
      "monthly-finance-checklist",
      "monthly-reports-review",
      "monthly-cashflow-check",
      "monthly-tax-preparation",
    ],
  },
];

/**
 * Get collection by slug
 */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/**
 * Get all collections
 */
export function getAllCollections(): Collection[] {
  return COLLECTIONS;
}

