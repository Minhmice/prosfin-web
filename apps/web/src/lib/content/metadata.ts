import type { Metadata } from "next";

/**
 * Post metadata for web app
 */
export interface PostMetadata {
  title: string;
  slug: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
  publishedAt?: string;
  bucket: "insights" | "resources" | "knowledge";
}

/**
 * Generate metadata for post pages
 * Handles draft preview vs published content
 */
export function generatePostMetadata(
  post: PostMetadata | null,
  isDraftPreview: boolean,
  baseUrl: string = "https://prosfin.vn"
): Metadata {
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Draft preview: noindex, canonical to published version
  if (isDraftPreview) {
    const publishedUrl = post.publishedAt
      ? `${baseUrl}/${post.bucket}/${post.slug}`
      : undefined;

    return {
      title: `${post.seoTitle || post.title} (Draft Preview)`,
      description: post.seoDescription || post.excerpt,
      robots: {
        index: false,
        follow: false,
      },
      ...(publishedUrl && {
        alternates: {
          canonical: publishedUrl,
        },
      }),
    };
  }

  // Published: normal metadata
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    ...(post.canonical && {
      alternates: {
        canonical: post.canonical,
      },
    }),
    ...(post.noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...(!post.noindex && {
      robots: {
        index: true,
        follow: true,
      },
    }),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: `${baseUrl}/${post.bucket}/${post.slug}`,
      ...(post.publishedAt && {
        publishedTime: post.publishedAt,
      }),
    },
  };
}

