import type { MetadataRoute } from "next";
import {
  getAllServices,
  getAllPosts,
} from "@/lib/content/services";
import { getAllResearchPosts } from "@/lib/content/posts";
import { getAllPresets } from "@/lib/content/presets";

/**
 * Generate sitemap for SEO
 * 
 * Includes all static and dynamic routes:
 * - Static pages (/, /services, /about, etc.)
 * - Service detail pages (/services/[slug])
 * - Research pages (/research, /research/[slug])
 * 
 * Note: Old routes (/insights, /knowledge, /resources) are redirected,
 * so they are not included in sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Service detail pages
  const services = getAllServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Preset pages (/services/presets/[preset])
  const presets = getAllPresets();
  const presetRoutes: MetadataRoute.Sitemap = presets.map((preset) => ({
    url: `${baseUrl}/services/presets/${preset.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Research post pages (/research/[slug])
  const posts = getAllResearchPosts();
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.href || post.id) // Only include posts with valid identifier
    .map((post) => {
      // Extract slug from href or use id
      const slug = post.href?.split("/").pop() || post.id;
      const url = `${baseUrl}/research/${slug}`;

      // Use publishedAt or updatedAt if available, otherwise fallback to date
      const lastModified = post.updatedAt
        ? new Date(post.updatedAt)
        : post.publishedAt
          ? new Date(post.publishedAt)
          : post.date
            ? new Date(post.date)
            : new Date();

      return {
        url,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

  return [...staticRoutes, ...serviceRoutes, ...presetRoutes, ...postRoutes];
}

