/**
 * Research Metadata Generation
 * 
 * Generate SEO metadata for research posts.
 */

import type { Metadata } from "next";
import type { Post } from "@/types/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * Generate metadata for research post
 */
export function generateResearchMetadata(post: Post | null): Metadata {
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  // Extract slug from href or use id
  const slug = post.href?.split("/").pop() || post.id;
  const canonicalUrl = `${baseUrl}/research/${slug}`;

  // Use SEO fields if available, otherwise fallback to post fields
  const title = post.seo?.title || post.title;
  const description =
    post.seo?.description || post.excerpt || "ProsFIN Research article";

  // Cover image
  const imageUrl = post.cover?.src || post.coverImage || undefined;
  const imageAlt = post.cover?.alt || post.title;

  // Published date
  const publishedTime = post.publishedAt || post.date;
  const modifiedTime = post.updatedAt || post.publishedAt || post.date;

  return {
    title,
    description,
    alternates: {
      canonical: post.seo?.canonical || canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ProsFIN",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: imageAlt,
            },
          ]
        : [],
      type: "article",
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

