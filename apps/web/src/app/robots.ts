import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * robots.ts - Dynamic robots.txt generation
 * 
 * Generates robots.txt with sitemap URL.
 * Allows all public routes, disallows admin/private routes if any.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API routes
          "/admin/", // Admin dashboard (if exists)
          "/_next/", // Next.js internal
          "/request-proposal/thanks", // Thank-you page (noindex)
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
