/**
 * JSON-LD Structured Data Components
 * 
 * Components and helpers for generating JSON-LD structured data.
 */

/**
 * Generate Organization schema
 * 
 * @param baseUrl - Base URL of the site
 * @returns Organization schema object
 */
export function generateOrganizationSchema(baseUrl?: string): object {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProsFIN",
    url: base,
    logo: `${base}/logo.png`,
    description:
      "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@prosfin.vn",
      availableLanguage: ["Vietnamese"],
    },
    sameAs: [
      // Add social media links if available
      // "https://www.linkedin.com/company/prosfin",
      // "https://www.facebook.com/prosfin",
    ],
  };
}

/**
 * Generate WebSite schema
 * 
 * @param baseUrl - Base URL of the site
 * @returns WebSite schema object
 */
export function generateWebSiteSchema(baseUrl?: string): object {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProsFIN",
    url: base,
    description:
      "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
    // potentialAction can be added later if search functionality is implemented
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: {
    //     "@type": "EntryPoint",
    //     urlTemplate: `${base}/search?q={search_term_string}`,
    //   },
    //   "query-input": "required name=search_term_string",
    // },
  };
}

/**
 * Generate Service schema
 * 
 * @param service - Service object
 * @param baseUrl - Base URL of the site
 * @returns Service schema object
 */
export function generateServiceSchema(
  service: {
    title: string;
    description?: string;
    slug: string;
    coverImage?: string;
  },
  baseUrl?: string
): object {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const serviceUrl = `${base}/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || "",
    provider: {
      "@type": "Organization",
      name: "ProsFIN",
      url: base,
    },
    url: serviceUrl,
    ...(service.coverImage && {
      image: service.coverImage.startsWith("http")
        ? service.coverImage
        : `${base}${service.coverImage}`,
    }),
  };
}

/**
 * Generate BreadcrumbList schema
 * 
 * @param items - Array of breadcrumb items { name, url }
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate ItemList schema for preset pages
 * 
 * @param name - List name
 * @param description - List description
 * @param items - Array of service items
 * @param baseUrl - Base URL of the site
 * @returns ItemList schema object
 */
export function generateItemListSchema(
  name: string,
  description: string,
  items: Array<{
    title: string;
    description?: string;
    slug: string;
  }>,
  baseUrl?: string
): object {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.title,
        description: item.description || "",
        url: `${base}/services/${item.slug}`,
      },
    })),
  };
}

/**
 * Generate FAQPage schema
 * 
 * @param faqItems - Array of FAQ items { q: string, a: string }
 * @param baseUrl - Base URL of the site
 * @returns FAQPage schema object
 */
export function generateFaqPageSchema(
  faqItems: Array<{ q: string; a: string }>,
  baseUrl?: string
): object {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

