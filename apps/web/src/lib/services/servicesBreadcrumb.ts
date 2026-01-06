/**
 * Services Breadcrumb Helpers
 * 
 * Build breadcrumb items for services pages from catalog data.
 */

import type { BreadcrumbItemData } from "@/components/site/breadcrumbs";
import type { ServiceCategory, ServiceItem } from "@/content/services.catalog";

/**
 * Build breadcrumb for services hub
 */
export function buildServicesHubBreadcrumb(): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ" },
  ];
}

/**
 * Build breadcrumb for category page
 */
export function buildCategoryBreadcrumb(
  category: ServiceCategory
): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/services" },
    { label: category.label },
  ];
}

/**
 * Build breadcrumb for service detail page
 */
export function buildServiceBreadcrumb(
  service: ServiceItem,
  category: ServiceCategory
): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/services" },
    { label: category.label, href: `/services/${category.slug}` },
    { label: service.title },
  ];
}

