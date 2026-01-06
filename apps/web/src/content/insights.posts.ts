/**
 * Insights Posts Registry
 * 
 * Single source of truth for all insights content.
 * Maps existing posts from posts.ts to InsightMetadata format.
 * 
 * This registry conforms to insights.taxonomy.ts contract.
 */

import type { InsightMetadata, InsightTopic, InsightFormat } from "./insights.taxonomy";
import { POSTS } from "./posts";
import { slugify } from "@/lib/slug";

/**
 * Extended Insight Post with body content
 */
export interface InsightPost extends InsightMetadata {
  body?: string; // Markdown hoặc content blocks (placeholder for now)
  tldr?: string[]; // TL;DR bullets (3-5 items)
  actionItems?: string[]; // Hành động khuyến nghị checklist
  coverImage?: string;
}

/**
 * Map old category to insight topic
 */
function mapCategoryToTopic(category: string): InsightTopic {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes("tài chính") || categoryLower.includes("tai chinh") || categoryLower.includes("vốn") || categoryLower.includes("dòng tiền")) {
    return "tai-chinh";
  }
  if (categoryLower.includes("kế toán") || categoryLower.includes("ke toan") || categoryLower.includes("báo cáo")) {
    return "ke-toan";
  }
  if (categoryLower.includes("thuế") || categoryLower.includes("thue")) {
    return "thue";
  }
  if (categoryLower.includes("kiểm soát") || categoryLower.includes("kiem soat") || categoryLower.includes("kiểm toán") || categoryLower.includes("kiem toan")) {
    return "kiem-soat-noi-bo";
  }
  
  // Default mapping based on common patterns
  if (categoryLower.includes("tư vấn") || categoryLower.includes("tu van") || categoryLower.includes("chiến lược")) {
    return "tai-chinh";
  }
  if (categoryLower.includes("đào tạo") || categoryLower.includes("dao tao") || categoryLower.includes("mentoring")) {
    return "ke-toan"; // Hoặc có thể là topic khác tùy context
  }
  
  // Default to tai-chinh
  return "tai-chinh";
}

/**
 * Map old category to format
 * Default: "bai-viet" (article)
 */
function mapCategoryToFormat(category: string): InsightFormat {
  const categoryLower = category.toLowerCase();
  
  // Có thể extend sau để map case studies, playbooks, etc.
  // For now, all posts are "bai-viet"
  return "bai-viet";
}

/**
 * Extract slug from href
 */
function extractSlugFromHref(href: string): string {
  // href format: "/insights/slug-here"
  const parts = href.split("/");
  return parts[parts.length - 1] || slugify(href);
}

/**
 * Map service slugs to service IDs
 * Note: This is a simple mapping, can be enhanced later
 */
function mapServiceSlugsToIds(serviceSlugs: string[]): string[] {
  // For now, return service slugs as IDs
  // In Phase 3, we have service IDs in catalog, but for backward compat, use slugs
  return serviceSlugs;
}

/**
 * Build insights posts from existing posts
 */
function buildInsightsPosts(): InsightPost[] {
  return POSTS.map((post) => {
    const slug = extractSlugFromHref(post.href);
    const topic = mapCategoryToTopic(post.category || "Tư vấn");
    const format = mapCategoryToFormat(post.category || "Tư vấn");
    
    return {
      slug,
      title: post.title,
      topic,
      format,
      publishedAt: post.date, // ISO date string
      summary: post.excerpt,
      readingTime: post.readingTime,
      relatedServiceIds: post.serviceSlugs ? mapServiceSlugsToIds(post.serviceSlugs) : undefined,
      coverImage: post.coverImage,
      // Placeholder content - will be populated later
      body: undefined,
      tldr: undefined,
      actionItems: undefined,
    };
  });
}

/**
 * Insights Posts Registry
 * 
 * This is the single source of truth for insights content.
 * Import this in data access layer, not directly in UI components.
 */
export const INSIGHTS_POSTS: InsightPost[] = buildInsightsPosts();

/**
 * Helper to get post by slug
 */
export function getInsightPostBySlug(slug: string): InsightPost | undefined {
  return INSIGHTS_POSTS.find((post) => post.slug === slug);
}

/**
 * Helper to get all posts
 */
export function getAllInsightPosts(): InsightPost[] {
  return [...INSIGHTS_POSTS];
}

