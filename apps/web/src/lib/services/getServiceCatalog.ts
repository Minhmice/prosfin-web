/**
 * Service Catalog Data Access Layer
 * 
 * Server-safe helper functions to query services catalog.
 * UI components should use these helpers instead of importing catalog directly.
 * 
 * This ensures:
 * - Single source of truth
 * - Consistent data access patterns
 * - Easy to swap catalog source later (API/DB)
 */

import {
  servicesCatalog,
  type ServiceCategory,
  type ServiceItem,
  type ServicesCatalog,
} from "@/content/services.catalog";

/**
 * Get all categories
 */
export function getCategories(): ServiceCategory[] {
  return [...servicesCatalog.categories].sort((a, b) => a.order - b.order);
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(categorySlug: string): ServiceCategory | undefined {
  return servicesCatalog.categories.find((c) => c.slug === categorySlug);
}

/**
 * Get services by category ID
 */
export function getServicesByCategory(categoryId: string): ServiceItem[] {
  return servicesCatalog.items
    .filter((item) => item.categoryId === categoryId)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get service by category slug and service slug
 */
export function getServiceBySlugs(
  categorySlug: string,
  serviceSlug: string
): ServiceItem | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  return servicesCatalog.items.find(
    (item) => item.categoryId === category.id && item.slug === serviceSlug
  );
}

/**
 * Get all service paths for static generation
 * 
 * Returns array of { category, service } for generateStaticParams
 */
export function getAllServicePaths(): Array<{
  category: string;
  service: string;
}> {
  const paths: Array<{ category: string; service: string }> = [];

  for (const category of servicesCatalog.categories) {
    const services = getServicesByCategory(category.id);
    for (const service of services) {
      paths.push({
        category: category.slug,
        service: service.slug,
      });
    }
  }

  return paths;
}

/**
 * Get all category paths for static generation
 */
export function getAllCategoryPaths(): Array<{ category: string }> {
  return servicesCatalog.categories.map((cat) => ({
    category: cat.slug,
  }));
}

/**
 * Get full catalog (for advanced use cases)
 */
export function getCatalog(): ServicesCatalog {
  return servicesCatalog;
}

