/**
 * Service Metadata Helpers
 * 
 * Build SEO metadata (title, description, OpenGraph) from catalog data.
 */

import type { Metadata } from "next";
import type { ServiceCategory, ServiceItem } from "@/content/services.catalog";

const SITE_NAME = "ProsFIN";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * Build metadata for services hub page
 */
export function buildServicesHubMetadata(): Metadata {
  return {
    title: `Dịch vụ | ${SITE_NAME}`,
    description:
      "Các dịch vụ tài chính, kế toán, và tư vấn của ProsFIN. Từ tư vấn thực chiến, kế toán thuế, kiểm soát nội bộ đến đào tạo và phát triển đội ngũ.",
    openGraph: {
      title: `Dịch vụ | ${SITE_NAME}`,
      description:
        "Các dịch vụ tài chính, kế toán, và tư vấn của ProsFIN. Chuẩn pháp luật – tăng lợi nhuận – giảm rủi ro.",
      url: `${BASE_URL}/services`,
      type: "website",
    },
  };
}

/**
 * Build metadata for category page
 */
export function buildCategoryMetadata(category: ServiceCategory): Metadata {
  const title = `${category.label} | Dịch vụ | ${SITE_NAME}`;
  const description =
    category.description ||
    `Các dịch vụ ${category.label.toLowerCase()} của ProsFIN. ${category.label} chuyên nghiệp, chuẩn mực.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/services/${category.slug}`,
      type: "website",
    },
  };
}

/**
 * Build metadata for service detail page
 */
export function buildServiceMetadata(
  service: ServiceItem,
  category: ServiceCategory
): Metadata {
  const title = `${service.title} | ${category.label} | ${SITE_NAME}`;
  const description = service.tagline || `${service.title} - ${category.label}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${service.links.href}`,
      type: "website",
    },
  };
}

/**
 * Build canonical URL for service
 */
export function buildServiceCanonical(service: ServiceItem): string {
  return `${BASE_URL}${service.links.href}`;
}

/**
 * Build canonical URL for category
 */
export function buildCategoryCanonical(category: ServiceCategory): string {
  return `${BASE_URL}/services/${category.slug}`;
}

