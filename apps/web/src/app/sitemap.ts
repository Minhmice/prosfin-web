import { MetadataRoute } from "next";
import { getCategories, getAllServicePaths } from "@/lib/services/getServiceCatalog";
import { getInsightsStaticParams } from "@/lib/insights/getInsightsStaticParams";
import { getAllRecruitmentPages } from "@/content/recruitment.catalog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * sitemap.ts - Dynamic sitemap.xml generation
 * 
 * Generates sitemap with all public pages:
 * - Services (hub, categories, detail)
 * - Insights (hub, detail)
 * - Recruitment (hub, pages)
 * - Request proposal
 * 
 * Note: /request-proposal/thanks is excluded (noindex)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home page
  entries.push({
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Services Hub
  entries.push({
    url: `${BASE_URL}/services`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Service Categories
  const categories = getCategories();
  for (const category of categories) {
    entries.push({
      url: `${BASE_URL}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Service Detail Pages
  const servicePaths = getAllServicePaths();
  for (const path of servicePaths) {
    entries.push({
      url: `${BASE_URL}/services/${path.category}/${path.service}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Insights Hub
  entries.push({
    url: `${BASE_URL}/insights`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Insight Detail Pages
  const insightPaths = getInsightsStaticParams();
  for (const path of insightPaths) {
    entries.push({
      url: `${BASE_URL}/insights/${path.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Recruitment Hub
  entries.push({
    url: `${BASE_URL}/recruitment`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // Recruitment Pages
  const recruitmentPages = getAllRecruitmentPages();
  for (const page of recruitmentPages) {
    entries.push({
      url: `${BASE_URL}/recruitment/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Talent Pool
  entries.push({
    url: `${BASE_URL}/recruitment/talent-pool`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // Request Proposal
  entries.push({
    url: `${BASE_URL}/request-proposal`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Note: /request-proposal/thanks is excluded (noindex)

  return entries;
}
