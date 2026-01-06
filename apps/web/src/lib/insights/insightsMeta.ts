/**
 * Insights Metadata Helpers
 * 
 * Build SEO metadata (title, description, OpenGraph) for insights pages.
 */

import type { Metadata } from "next";
import type { InsightPost } from "@/content/insights.posts";
import { getTopicById, getFormatById } from "@/content/insights.taxonomy";

const SITE_NAME = "ProsFIN";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * Build metadata for insights hub page
 */
export function buildInsightsHubMetadata(): Metadata {
  return {
    title: `Góc nhìn | ${SITE_NAME}`,
    description:
      "Phân tích thực chiến về Tài chính – Kế toán – Thuế – Kiểm soát nội bộ dành cho chủ doanh nghiệp.",
    openGraph: {
      title: `Góc nhìn | ${SITE_NAME}`,
      description:
        "Phân tích thực chiến về Tài chính – Kế toán – Thuế – Kiểm soát nội bộ dành cho chủ doanh nghiệp.",
      url: `${BASE_URL}/insights`,
      type: "website",
    },
  };
}

/**
 * Build metadata for insight detail page
 */
export function buildInsightMetadata(insight: InsightPost): Metadata {
  const topic = getTopicById(insight.topic);
  const format = getFormatById(insight.format);
  
  const title = `${insight.title} | Góc nhìn | ${SITE_NAME}`;
  const description = insight.summary || `${insight.title} - ${topic?.label || ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/insights/${insight.slug}`,
      type: "article",
      publishedTime: insight.publishedAt,
      images: insight.coverImage ? [insight.coverImage] : undefined,
    },
  };
}

/**
 * Build canonical URL for insight
 */
export function buildInsightCanonical(insight: InsightPost): string {
  return `${BASE_URL}/insights/${insight.slug}`;
}

