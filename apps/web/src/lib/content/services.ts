/**
 * Service Content Helpers
 * 
 * Helper functions for working with service content.
 */

import { SERVICES } from "@/content/services";
import type { Service } from "@/types/content";

// Re-export from other content helpers
export {
  getAllPosts,
  getPostsByService,
  getPostsByTags,
  getPostsByIds,
} from "./posts";

export {
  getAllPeople,
  getPeopleByService,
  getPeopleByIds,
} from "./people";

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Get related services (excluding current)
 * Priority:
 * 1. Explicit seeMoreServiceSlugs (new in Phase 5)
 * 2. Explicit relatedServiceSlugs (backward compatibility)
 * 3. Same category
 * 4. Tag intersection
 * 5. Fallback: random services
 */
export function getRelatedServices(
  currentSlug: string,
  count: number = 4
): Service[] {
  const currentService = getServiceBySlug(currentSlug);
  if (!currentService) {
    return SERVICES.filter((s) => s.slug !== currentSlug).slice(0, count);
  }

  const currentTags = currentService.tags || [];
  const allOtherServices = SERVICES.filter((s) => s.slug !== currentSlug);

  // Priority 1: Explicit seeMoreServiceSlugs (Phase 5)
  const explicitSeeMore: Service[] = [];
  if (currentService.seeMoreServiceSlugs && currentService.seeMoreServiceSlugs.length > 0) {
    explicitSeeMore.push(
      ...currentService.seeMoreServiceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter((s): s is Service => s !== undefined)
    );
  }

  // Priority 2: Explicit relatedServiceSlugs (backward compatibility)
  const explicitLinks: Service[] = [];
  if (currentService.relatedServiceSlugs && currentService.relatedServiceSlugs.length > 0) {
    explicitLinks.push(
      ...currentService.relatedServiceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter((s): s is Service => {
          // Skip if already in explicitSeeMore
          if (explicitSeeMore.some((explicit) => explicit.slug === s?.slug)) {
            return false;
          }
          return s !== undefined;
        })
    );
  }

  // Priority 3: Same category
  const sameCategory = allOtherServices.filter(
    (s) => {
      // Skip if already in explicitSeeMore or explicitLinks
      if (
        explicitSeeMore.some((explicit) => explicit.slug === s.slug) ||
        explicitLinks.some((explicit) => explicit.slug === s.slug)
      ) {
        return false;
      }
      return s.category === currentService.category;
    }
  );

  // Priority 4: Tag intersection
  const tagMatch = allOtherServices.filter((s) => {
    // Skip if already in explicitSeeMore, explicitLinks, or sameCategory
    if (
      explicitSeeMore.some((explicit) => explicit.slug === s.slug) ||
      explicitLinks.some((explicit) => explicit.slug === s.slug) ||
      sameCategory.some((same) => same.slug === s.slug)
    ) {
      return false;
    }
    const sTags = s.tags || [];
    return sTags.some((tag) => currentTags.includes(tag));
  });

  // Priority 5: Fallback - remaining services
  const fallback = allOtherServices.filter(
    (s) =>
      !explicitSeeMore.some((explicit) => explicit.slug === s.slug) &&
      !explicitLinks.some((explicit) => explicit.slug === s.slug) &&
      !sameCategory.some((same) => same.slug === s.slug) &&
      !tagMatch.some((tag) => tag.slug === s.slug)
  );

  // Combine all priorities
  const combined = [
    ...explicitSeeMore,
    ...explicitLinks,
    ...sameCategory,
    ...tagMatch,
    ...fallback,
  ];

  return combined.slice(0, count);
}

/**
 * Get services by category
 */
export function getServicesByCategory(
  category: string,
  excludeSlug?: string
): Service[] {
  return SERVICES.filter(
    (s) => s.category === category && s.slug !== excludeSlug
  );
}

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return SERVICES;
}

/**
 * Service grouping types for "Services by need"
 */
export type ServiceGroupKey = string;

export interface ServiceGroup {
  key: ServiceGroupKey;
  label: string;
  services: Service[];
}

/**
 * Get services grouped by audience (đối tượng)
 * Groups: Chủ DN, Nhân sự TCKT, DN cần tuyển
 */
export function getServicesGroupedByAudience(): ServiceGroup[] {
  const groups: Record<string, Service[]> = {
    "chủ-dn": [],
    "nhân-sự-tckt": [],
    "dn-cần-tuyển": [],
  };

  SERVICES.forEach((service) => {
    const idealClient = service.idealClient?.toLowerCase() || "";
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];

    if (idealClient.includes("chủ doanh nghiệp") || tags.includes("cfo") || tags.includes("chủ dn")) {
      groups["chủ-dn"].push(service);
    } else if (idealClient.includes("nhân sự") || idealClient.includes("kế toán") || tags.includes("kế toán")) {
      groups["nhân-sự-tckt"].push(service);
    } else if (tags.includes("tuyển dụng") || tags.includes("headhunt")) {
      groups["dn-cần-tuyển"].push(service);
    } else {
      // Default: chủ DN
      groups["chủ-dn"].push(service);
    }
  });

  return [
    { key: "chủ-dn", label: "Chủ doanh nghiệp", services: groups["chủ-dn"] },
    { key: "nhân-sự-tckt", label: "Nhân sự tài chính - kế toán", services: groups["nhân-sự-tckt"] },
    { key: "dn-cần-tuyển", label: "Doanh nghiệp cần tuyển", services: groups["dn-cần-tuyển"] },
  ].filter((group) => group.services.length > 0);
}

/**
 * Get services grouped by goal (mục tiêu)
 * Groups: Tối ưu lợi nhuận, Quản trị vốn, Thuế, Rủi ro, Chuẩn hóa
 */
export function getServicesGroupedByGoal(): ServiceGroup[] {
  const groups: Record<string, Service[]> = {
    "tối-ưu-lợi-nhuận": [],
    "quản-trị-vốn": [],
    "thuế": [],
    "rủi-ro": [],
    "chuẩn-hóa": [],
  };

  SERVICES.forEach((service) => {
    const title = service.title.toLowerCase();
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];
    const category = service.category?.toLowerCase() || "";

    if (tags.includes("thuế") || title.includes("thuế") || category.includes("thuế")) {
      groups["thuế"].push(service);
    } else if (tags.includes("dòng tiền") || tags.includes("vốn") || title.includes("vốn")) {
      groups["quản-trị-vốn"].push(service);
    } else if (tags.includes("rủi ro") || tags.includes("kiểm toán") || tags.includes("kiểm soát")) {
      groups["rủi-ro"].push(service);
    } else if (tags.includes("chuẩn hóa") || tags.includes("hệ thống") || category.includes("kiểm toán")) {
      groups["chuẩn-hóa"].push(service);
    } else {
      // Default: tối ưu lợi nhuận (tư vấn, coaching)
      groups["tối-ưu-lợi-nhuận"].push(service);
    }
  });

  return [
    { key: "tối-ưu-lợi-nhuận", label: "Tối ưu lợi nhuận", services: groups["tối-ưu-lợi-nhuận"] },
    { key: "quản-trị-vốn", label: "Quản trị vốn", services: groups["quản-trị-vốn"] },
    { key: "thuế", label: "Thuế", services: groups["thuế"] },
    { key: "rủi-ro", label: "Rủi ro", services: groups["rủi-ro"] },
    { key: "chuẩn-hóa", label: "Chuẩn hóa hệ thống", services: groups["chuẩn-hóa"] },
  ].filter((group) => group.services.length > 0);
}

/**
 * Get services grouped by format (hình thức)
 * Groups: Cố vấn dài hạn, Tư vấn sự vụ, Huấn luyện, Kiểm tra, Kiểm toán
 */
export function getServicesGroupedByFormat(): ServiceGroup[] {
  const groups: Record<string, Service[]> = {
    "cố-vấn-dài-hạn": [],
    "tư-vấn-sự-vụ": [],
    "huấn-luyện": [],
    "kiểm-tra": [],
    "kiểm-toán": [],
  };

  SERVICES.forEach((service) => {
    const title = service.title.toLowerCase();
    const tags = service.tags?.map((t) => t.toLowerCase()) || [];
    const category = service.category?.toLowerCase() || "";
    const layoutVariant = service.layoutVariant.toLowerCase();

    if (tags.includes("coaching") || tags.includes("huấn luyện") || layoutVariant.includes("coaching")) {
      groups["huấn-luyện"].push(service);
    } else if (tags.includes("kiểm toán") || title.includes("kiểm toán") || category.includes("kiểm toán")) {
      groups["kiểm-toán"].push(service);
    } else if (tags.includes("đánh giá") || tags.includes("khám") || title.includes("health check")) {
      groups["kiểm-tra"].push(service);
    } else if (tags.includes("cố vấn") || title.includes("cố vấn") || layoutVariant.includes("advisor")) {
      groups["cố-vấn-dài-hạn"].push(service);
    } else {
      // Default: tư vấn sự vụ
      groups["tư-vấn-sự-vụ"].push(service);
    }
  });

  return [
    { key: "cố-vấn-dài-hạn", label: "Cố vấn dài hạn", services: groups["cố-vấn-dài-hạn"] },
    { key: "tư-vấn-sự-vụ", label: "Tư vấn sự vụ", services: groups["tư-vấn-sự-vụ"] },
    { key: "huấn-luyện", label: "Huấn luyện", services: groups["huấn-luyện"] },
    { key: "kiểm-tra", label: "Kiểm tra & Đánh giá", services: groups["kiểm-tra"] },
    { key: "kiểm-toán", label: "Kiểm toán", services: groups["kiểm-toán"] },
  ].filter((group) => group.services.length > 0);
}

