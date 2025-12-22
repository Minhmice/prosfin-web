import type { MetadataRoute } from "next";
import {
  getAllServices,
  getAllPosts,
} from "@/lib/content/services";

/**
 * Generate sitemap for SEO
 * 
 * Includes all static and dynamic routes:
 * - Static pages (/, /services, /about, etc.)
 * - Service detail pages (/services/[slug])
 * - Post pages (/insights/[slug], /knowledge/[slug], /resources/[slug])
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
  ];

  // Service detail pages
  const services = getAllServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Post pages (insights, knowledge, resources)
  const posts = getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.href) // Only include posts with valid href
    .map((post) => {
      // Extract route type from href (e.g., /insights/slug, /knowledge/slug)
      const url = post.href.startsWith("/")
        ? `${baseUrl}${post.href}`
        : `${baseUrl}/${post.href}`;

      return {
        url,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}

