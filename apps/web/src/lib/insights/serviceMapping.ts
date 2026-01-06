/**
 * Topic → Service Mapping
 * 
 * Maps insight topics to related service categories.
 * Used for "Related Services" section in insight detail pages.
 */

import type { InsightTopic } from "@/content/insights.taxonomy";
import { getCategories, getServicesByCategory } from "@/lib/services/getServiceCatalog";

/**
 * Map insight topic to service category IDs
 */
const TOPIC_TO_CATEGORY_MAP: Record<InsightTopic, string[]> = {
  "tai-chinh": ["tu-van-thuc-chien"], // Tài chính → Tư vấn thực chiến
  "ke-toan": ["ke-toan-thue"], // Kế toán → Kế toán & Thuế
  "thue": ["ke-toan-thue"], // Thuế → Kế toán & Thuế
  "kiem-soat-noi-bo": ["kiem-soat-noi-bo"], // Kiểm soát nội bộ → Kiểm soát nội bộ
};

/**
 * Get related services for an insight topic
 */
export function getRelatedServicesForTopic(topic: InsightTopic) {
  const categoryIds = TOPIC_TO_CATEGORY_MAP[topic] || [];
  const allCategories = getCategories();
  
  const relatedServices = categoryIds.flatMap((categoryId) => {
    const category = allCategories.find((c) => c.id === categoryId);
    if (!category) return [];
    
    return getServicesByCategory(categoryId).map((service) => ({
      id: service.id,
      title: service.title,
      href: service.links.href,
      tagline: service.tagline,
    }));
  });

  return relatedServices;
}

