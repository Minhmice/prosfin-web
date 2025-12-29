import type { MetadataRoute } from "next";

/**
 * Generate robots.txt for SEO
 * 
 * Allows all crawlers and points to sitemap
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/onboarding/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

