/**
 * Open Graph Helpers
 * 
 * Site-wide helpers for generating Open Graph metadata.
 */

import type { Metadata } from "next";

export interface OgConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  siteName?: string;
  locale?: string;
}

/**
 * Build Open Graph metadata from config
 * 
 * @param config - Open Graph configuration
 * @returns Metadata openGraph object
 */
export function buildOg(config: OgConfig): Metadata["openGraph"] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const imageUrl = config.image
    ? config.image.startsWith("http")
      ? config.image
      : `${baseUrl}${config.image.startsWith("/") ? config.image : `/${config.image}`}`
    : `${baseUrl}/og-image.png`;

  return {
    type: config.type || "website",
    locale: config.locale || "vi_VN",
    url: config.url.startsWith("http") ? config.url : `${baseUrl}${config.url}`,
    siteName: config.siteName || "ProsFIN",
    title: config.title,
    description: config.description,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: config.title,
      },
    ],
  };
}

