/**
 * Services Catalog
 * 
 * Single source of truth for all services organized by categories.
 * This catalog drives navigation, routing, and content structure.
 * 
 * Status tracking:
 * - "existing": Page already exists, just needs mapping to new layout
 * - "new": Page doesn't exist yet, needs to be created
 * - "placeholder": Has skeleton/route but content is incomplete
 */

import { slugify, assertUniqueSlugs } from "@/lib/slug";

export type ServiceStatus = "existing" | "new" | "placeholder";

export interface ServiceCategory {
  id: string;
  label: string;
  slug: string;
  order: number;
  description?: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  tagline: string;
  slug: string;
  status: ServiceStatus;
  links: {
    href: string; // Canonical path: /services/{categorySlug}/{serviceSlug}
    ctaHref: string; // Default: /request-proposal?service={serviceSlug}
  };
  redirectFrom?: string[]; // Legacy slugs if any
}

export interface ServicesCatalog {
  categories: ServiceCategory[];
  items: ServiceItem[];
}

/**
 * 5 Service Categories
 * 
 * These categories organize all services and will be used for:
 * - Navigation mega menu
 * - Category pages
 * - Service filtering
 */
const CATEGORIES: Omit<ServiceCategory, "slug">[] = [
  {
    id: "tu-van-thuc-chien",
    label: "Tư vấn thực chiến",
    order: 1,
    description: "Tư vấn tài chính chiến lược, CFO Office, và coaching triển khai",
  },
  {
    id: "ke-toan-thue",
    label: "Kế toán & Thuế",
    order: 2,
    description: "Dịch vụ kế toán, thuế, và chuẩn hóa dữ liệu kế toán",
  },
  {
    id: "kiem-soat-noi-bo",
    label: "Kiểm soát nội bộ",
    order: 3,
    description: "Chuẩn hóa hệ thống, kiểm toán nội bộ, và báo cáo quản trị",
  },
  {
    id: "dao-tao-phat-trien",
    label: "Đào tạo & Phát triển",
    order: 4,
    description: "Mentoring, training, và phát triển đội ngũ tài chính",
  },
  {
    id: "danh-gia-kiem-tra",
    label: "Đánh giá & Kiểm tra",
    order: 5,
    description: "Đánh giá tài chính, kiểm tra hệ thống, và health check",
  },
];

/**
 * Service Items
 * 
 * Mapped from existing services in services.ts
 * Status determined by whether page exists:
 * - cleardata: has dedicated page → existing
 * - oneledger: has configSlug → existing
 * - advisor, consulting, etc.: use dynamic [slug] route → existing (if route works)
 * - Others: check if page exists or mark as new/placeholder
 */
const SERVICE_ITEMS: Omit<ServiceItem, "slug" | "links">[] = [
  // Tư vấn thực chiến
  {
    id: "s23-advisor",
    categoryId: "tu-van-thuc-chien",
    title: "Cố vấn tài chính chiến lược",
    tagline: "Đồng hành dài hạn với doanh nghiệp trong các quyết định tài chính quan trọng",
    status: "existing", // Has dynamic route
  },
  {
    id: "s25-consulting",
    categoryId: "tu-van-thuc-chien",
    title: "Tư vấn tài chính chuyên sâu",
    tagline: "Giải pháp tư vấn tài chính chuyên sâu cho các vấn đề cụ thể của doanh nghiệp",
    status: "existing", // Has dynamic route
  },
  {
    id: "s24-execution-coaching",
    categoryId: "tu-van-thuc-chien",
    title: "Coaching triển khai tài chính",
    tagline: "Đồng hành 4 giai đoạn từ đánh giá đến triển khai, giúp doanh nghiệp thực thi các giải pháp tài chính hiệu quả",
    status: "existing", // Has dynamic route
  },
  // Kế toán & Thuế
  {
    id: "cleardata",
    categoryId: "ke-toan-thue",
    title: "ProsFIN ClearData™",
    tagline: "Dịch vụ kế toán–thuế theo chuẩn dữ liệu, giúp doanh nghiệp chuyển từ '2 sổ' sang một hệ số liệu nhất quán",
    status: "existing", // Has dedicated page at /services/cleardata
  },
  // Kiểm soát nội bộ
  {
    id: "oneledger",
    categoryId: "kiem-soat-noi-bo",
    title: "OneLedger™",
    tagline: "Một nguồn dữ liệu duy nhất. Nhiều báo cáo đúng mục tiêu. Chuẩn hóa hệ thống kế toán để CEO/CFO điều hành bằng số liệu thật",
    status: "existing", // Has configSlug and page
  },
  {
    id: "s29-audit",
    categoryId: "kiem-soat-noi-bo",
    title: "Kiểm toán nội bộ",
    tagline: "Dịch vụ kiểm toán nội bộ giúp doanh nghiệp đảm bảo tính chính xác và tuân thủ trong quản lý tài chính",
    status: "existing", // Has dynamic route
  },
  // Đào tạo & Phát triển
  {
    id: "s26-mentor",
    categoryId: "dao-tao-phat-trien",
    title: "Mentoring tài chính",
    tagline: "Đồng hành và hướng dẫn đội ngũ tài chính nội bộ phát triển năng lực chuyên môn",
    status: "existing", // Has dynamic route
  },
  {
    id: "seminar-p3",
    categoryId: "dao-tao-phat-trien",
    title: "Hội thảo và đào tạo tài chính",
    tagline: "Tổ chức hội thảo và chương trình đào tạo về quản lý tài chính cho doanh nghiệp",
    status: "existing", // Has dynamic route
  },
  // Đánh giá & Kiểm tra
  {
    id: "s28-test",
    categoryId: "danh-gia-kiem-tra",
    title: "Kiểm tra và đánh giá tài chính",
    tagline: "Dịch vụ kiểm tra và đánh giá toàn diện tình hình tài chính doanh nghiệp",
    status: "existing", // Has dynamic route
  },
];

/**
 * Generate slug for category
 */
function getCategorySlug(category: Omit<ServiceCategory, "slug">): string {
  return slugify(category.label);
}

/**
 * Generate slug for service item
 */
function getServiceSlug(item: Omit<ServiceItem, "slug" | "links">): string {
  return slugify(item.title);
}

/**
 * Generate canonical href for service
 */
function getServiceHref(categorySlug: string, serviceSlug: string): string {
  return `/services/${categorySlug}/${serviceSlug}`;
}

/**
 * Generate CTA href for service
 */
function getServiceCtaHref(serviceSlug: string): string {
  return `/request-proposal?service=${serviceSlug}`;
}

/**
 * Build complete services catalog
 */
function buildServicesCatalog(): ServicesCatalog {
  // Build categories with slugs
  const categories: ServiceCategory[] = CATEGORIES.map((cat) => ({
    ...cat,
    slug: getCategorySlug(cat),
  }));

  // Build service items with slugs and links
  const items: ServiceItem[] = SERVICE_ITEMS.map((item) => {
    const category = categories.find((c) => c.id === item.categoryId);
    if (!category) {
      throw new Error(`Category not found for service ${item.id}: ${item.categoryId}`);
    }

    const serviceSlug = getServiceSlug(item);
    const categorySlug = category.slug;

    return {
      ...item,
      slug: serviceSlug,
      links: {
        href: getServiceHref(categorySlug, serviceSlug),
        ctaHref: getServiceCtaHref(serviceSlug),
      },
    };
  });

  // Validate uniqueness
  assertUniqueSlugs(categories, (c) => c.slug);
  assertUniqueSlugs(items, (i) => i.slug);

  // Validate category references
  const categoryIds = new Set(categories.map((c) => c.id));
  for (const item of items) {
    if (!categoryIds.has(item.categoryId)) {
      throw new Error(`Invalid categoryId in service ${item.id}: ${item.categoryId}`);
    }
  }

  return {
    categories,
    items,
  };
}

/**
 * Services Catalog Export
 * 
 * This is the single source of truth for services structure.
 * Import this in navigation, routing, and content generation.
 */
export const servicesCatalog: ServicesCatalog = buildServicesCatalog();

/**
 * Helper functions to query catalog
 */
export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return servicesCatalog.categories.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesCatalog.items.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: string): ServiceItem[] {
  return servicesCatalog.items.filter((s) => s.categoryId === categoryId);
}

export function getServicesByStatus(status: ServiceStatus): ServiceItem[] {
  return servicesCatalog.items.filter((s) => s.status === status);
}

