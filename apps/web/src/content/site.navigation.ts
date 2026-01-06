/**
 * Site Navigation
 * 
 * Single source of truth for site navigation structure.
 * 
 * IMPORTANT: This file does NOT hardcode service lists.
 * It imports from catalog files and generates navigation dynamically.
 * 
 * This ensures:
 * - Navigation stays in sync with catalog data
 * - No duplicate maintenance
 * - Easy updates when catalog changes
 */

import { servicesCatalog } from "./services.catalog";
import { recruitmentCatalog } from "./recruitment.catalog";
import { insightsTaxonomy } from "./insights.taxonomy";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: NavItem[]; // For mega menu / dropdown
}

export interface SiteNavigation {
  mainNav: NavItem[];
  footerNav?: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Generate services mega menu from catalog
 * 
 * Groups services by category for mega menu display.
 */
function generateServicesNav(): NavItem {
  const categories = [...servicesCatalog.categories].sort((a, b) => a.order - b.order);

  const categoryNavItems: NavItem[] = categories.map((category) => {
    const servicesInCategory = servicesCatalog.items.filter(
      (item) => item.categoryId === category.id
    );

    return {
      id: `services-category-${category.id}`,
      label: category.label,
      href: `/services/${category.slug}`,
      description: category.description,
      children: servicesInCategory.map((service) => ({
        id: `service-${service.id}`,
        label: service.title,
        href: service.links.href,
        description: service.tagline,
      })),
    };
  });

  return {
    id: "services",
    label: "Dịch vụ",
    href: "/services",
    description: "Các dịch vụ tài chính, kế toán, và tư vấn của ProsFIN",
    children: categoryNavItems,
  };
}

/**
 * Generate insights navigation with quick links
 * 
 * Uses insights taxonomy to create quick links to topics.
 */
function generateInsightsNav(): NavItem {
  const topicQuickLinks: NavItem[] = insightsTaxonomy.topics.map((topic) => ({
    id: `insights-topic-${topic.id}`,
    label: topic.label,
    href: `/insights?topic=${topic.slug}`,
    description: topic.description,
  }));

  return {
    id: "insights",
    label: "Góc nhìn",
    href: "/insights",
    description: "Nghiên cứu và insights về tài chính doanh nghiệp",
    children: topicQuickLinks,
  };
}

/**
 * Generate recruitment navigation
 * 
 * Includes brokerage, training, and talent pool links.
 */
function generateRecruitmentNav(): NavItem {
  const recruitmentPages = [...recruitmentCatalog.pages].sort((a, b) => a.order - b.order);

  const pageNavItems: NavItem[] = recruitmentPages.map((page) => ({
    id: `recruitment-${page.id}`,
    label: page.label,
    href: `/recruitment/${page.slug}`,
    description: page.description,
  }));

  // Add talent pool if enabled
  if (recruitmentCatalog.talentPool.enabled) {
    pageNavItems.push({
      id: "recruitment-talent-pool",
      label: "Talent Pool",
      href: "/recruitment/talent-pool",
      description: "Xem bể nhân sự tài chính có sẵn",
    });
  }

  return {
    id: "recruitment",
    label: "Tuyển dụng",
    href: "/recruitment",
    description: "Môi giới tuyển dụng và đào tạo chuyên môn",
    children: pageNavItems,
  };
}

/**
 * Generate main navigation
 * 
 * Builds complete navigation structure from catalog data.
 */
/**
 * Generate About navigation with sub-items
 */
function generateAboutNav(): NavItem {
  return {
    id: "about",
    label: "Về ProsFIN",
    href: "/about",
    description: "Giới thiệu về ProsFIN và đội ngũ",
    children: [
      {
        id: "about-overview",
        label: "Tổng quan",
        href: "/about",
        description: "Giới thiệu về ProsFIN",
      },
      {
        id: "about-vision",
        label: "Tầm nhìn & sứ mệnh",
        href: "/about#vision",
        description: "Tầm nhìn và sứ mệnh của ProsFIN",
      },
      {
        id: "about-team",
        label: "Đội ngũ",
        href: "/about#team",
        description: "Đội ngũ chuyên gia ProsFIN",
      },
      {
        id: "about-contact",
        label: "Liên hệ",
        href: "/contact",
        description: "Liên hệ với ProsFIN",
      },
    ],
  };
}

function generateMainNav(): NavItem[] {
  return [
    generateServicesNav(),
    generateAboutNav(),
    generateInsightsNav(),
    generateRecruitmentNav(),
  ];
}

/**
 * Generate footer navigation (optional, can be extended later)
 */
function generateFooterNav(): NavItem[] {
  // Footer nav can reuse main nav structure or have different organization
  // For now, return simplified version
  return [
    {
      id: "footer-services",
      label: "Dịch vụ",
      href: "/services",
    },
    {
      id: "footer-about",
      label: "Về ProsFIN",
      href: "/about",
    },
    {
      id: "footer-insights",
      label: "Góc nhìn",
      href: "/insights",
    },
    {
      id: "footer-recruitment",
      label: "Tuyển dụng",
      href: "/recruitment",
    },
    {
      id: "footer-contact",
      label: "Liên hệ",
      href: "/contact",
    },
  ];
}

/**
 * Get site navigation
 * 
 * Main function to get complete navigation structure.
 * This is the single source of truth for navigation.
 * 
 * @returns Complete navigation structure
 */
export function getSiteNavigation(): SiteNavigation {
  return {
    mainNav: generateMainNav(),
    footerNav: generateFooterNav(),
    cta: {
      label: "Gửi yêu cầu tư vấn",
      href: "/request-proposal",
    },
  };
}

/**
 * Site Navigation Export
 * 
 * Pre-computed navigation for convenience.
 * Can also call getSiteNavigation() directly if needed.
 */
export const siteNavigation: SiteNavigation = getSiteNavigation();

