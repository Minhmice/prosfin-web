/**
 * Insights Taxonomy
 * 
 * Taxonomy structure for Insights (Góc nhìn) content.
 * Defines topics (chủ đề) and formats (loại nội dung) for organizing insights.
 * 
 * This taxonomy drives:
 * - Insights hub filtering
 * - Navigation quick links
 * - Related content recommendations
 * - SEO structure
 */

import { slugify, assertUniqueSlugs } from "@/lib/slug";

/**
 * Insight Topics (4 chủ đề)
 * 
 * These topics categorize insights by subject matter.
 */
export type InsightTopic = "tai-chinh" | "ke-toan" | "thue" | "kiem-soat-noi-bo";

/**
 * Insight Formats (4 loại nội dung)
 * 
 * These formats categorize insights by content type.
 */
export type InsightFormat = "bai-viet" | "an-pham" | "case-study" | "su-kien";

export interface InsightTopicConfig {
  id: InsightTopic;
  label: string;
  slug: string;
  description?: string;
}

export interface InsightFormatConfig {
  id: InsightFormat;
  label: string;
  slug: string;
  description?: string;
}

/**
 * Insight Metadata Contract
 * 
 * This is the contract for insight/post metadata.
 * Actual posts will be managed separately (in posts.ts or CMS),
 * but they should conform to this structure.
 */
export interface InsightMetadata {
  slug: string;
  title: string;
  topic: InsightTopic;
  format: InsightFormat;
  publishedAt: string; // ISO date string
  summary: string;
  readingTime?: number; // minutes
  relatedServiceIds?: string[]; // Reference to service IDs from services.catalog.ts
}

export interface InsightsTaxonomy {
  topics: InsightTopicConfig[];
  formats: InsightFormatConfig[];
}

/**
 * Topic Definitions (4 chủ đề)
 */
const TOPIC_CONFIGS: Omit<InsightTopicConfig, "slug">[] = [
  {
    id: "tai-chinh",
    label: "Tài chính",
    description: "Tài chính doanh nghiệp, dòng tiền, vốn, cấu trúc tài chính, và quản lý tài chính",
  },
  {
    id: "ke-toan",
    label: "Kế toán",
    description: "Kế toán, sổ sách, báo cáo tài chính, và hệ thống kế toán",
  },
  {
    id: "thue",
    label: "Thuế",
    description: "Thuế, tối ưu thuế, quyết toán thuế, và tuân thủ thuế",
  },
  {
    id: "kiem-soat-noi-bo",
    label: "Kiểm soát nội bộ",
    description: "Kiểm soát nội bộ, kiểm toán nội bộ, quản lý rủi ro, và tuân thủ",
  },
];

/**
 * Format Definitions (4 loại nội dung)
 */
const FORMAT_CONFIGS: Omit<InsightFormatConfig, "slug">[] = [
  {
    id: "bai-viet",
    label: "Bài viết",
    description: "Perspective articles, insights, và phân tích chuyên sâu",
  },
  {
    id: "an-pham",
    label: "Ấn phẩm",
    description: "Playbook, checklist, guide, và tài liệu thực hành",
  },
  {
    id: "case-study",
    label: "Case Study",
    description: "Case studies, case studies, và ví dụ thực tế",
  },
  {
    id: "su-kien",
    label: "Sự kiện",
    description: "Events, webinars, workshops, và hội thảo (optional)",
  },
];

/**
 * Build insights taxonomy with slugs
 */
function buildInsightsTaxonomy(): InsightsTaxonomy {
  const topics: InsightTopicConfig[] = TOPIC_CONFIGS.map((topic) => ({
    ...topic,
    slug: slugify(topic.label),
  }));

  const formats: InsightFormatConfig[] = FORMAT_CONFIGS.map((format) => ({
    ...format,
    slug: slugify(format.label),
  }));

  // Validate uniqueness
  assertUniqueSlugs(topics, (t) => t.slug);
  assertUniqueSlugs(formats, (f) => f.slug);

  return {
    topics,
    formats,
  };
}

/**
 * Insights Taxonomy Export
 * 
 * This is the single source of truth for insights structure.
 * Import this in navigation, filtering, and content organization.
 */
export const insightsTaxonomy: InsightsTaxonomy = buildInsightsTaxonomy();

/**
 * Helper functions to query taxonomy
 */
export function getTopicBySlug(slug: string): InsightTopicConfig | undefined {
  return insightsTaxonomy.topics.find((t) => t.slug === slug);
}

export function getTopicById(id: InsightTopic): InsightTopicConfig | undefined {
  return insightsTaxonomy.topics.find((t) => t.id === id);
}

export function getFormatBySlug(slug: string): InsightFormatConfig | undefined {
  return insightsTaxonomy.formats.find((f) => f.slug === slug);
}

export function getFormatById(id: InsightFormat): InsightFormatConfig | undefined {
  return insightsTaxonomy.formats.find((f) => f.id === id);
}

/**
 * Routing conventions for insights:
 * - Hub: /insights
 * - Detail: /insights/{slug}
 * 
 * Filtering can be done via query params:
 * - /insights?topic=tai-chinh
 * - /insights?format=bai-viet
 * - /insights?topic=tai-chinh&format=an-pham
 */

