/**
 * Structured Data (JSON-LD) Generation
 * 
 * Generate Article schema for research posts following Google guidelines.
 */

import type { Post } from "@/types/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * Generate Article schema (JSON-LD) for research post
 * 
 * Follows Google's Article schema guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function generateArticleSchema(post: Post): object {
  const slug = post.href?.split("/").pop() || post.id;
  const url = `${baseUrl}/research/${slug}`;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    url,
    datePublished: post.publishedAt || post.date,
    dateModified: post.updatedAt || post.publishedAt || post.date,
    publisher: {
      "@type": "Organization",
      name: "ProsFIN",
      url: baseUrl,
    },
  };

  // Author (if available)
  // In future, can add author field to Post type
  // if (post.author) {
  //   schema.author = {
  //     "@type": "Person",
  //     name: post.author.name,
  //   };
  // }

  // Image
  const imageUrl = post.cover?.src || post.coverImage;
  if (imageUrl) {
    schema.image = {
      "@type": "ImageObject",
      url: imageUrl,
      alt: post.cover?.alt || post.title,
    };
  }

  // Article section (based on type)
  if (post.type) {
    const sectionMap: Record<string, string> = {
      brief: "Research Briefs",
      playbook: "Playbooks",
      tool: "Tools & Templates",
    };
    schema.articleSection = sectionMap[post.type] || "Research";
  }

  // Keywords (from tags and topics)
  const keywords: string[] = [];
  if (post.tags) keywords.push(...post.tags);
  if (post.topics) keywords.push(...post.topics);
  if (keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  // Reading time (if available)
  if (post.readingTime) {
    const minutes =
      typeof post.readingTime === "number"
        ? post.readingTime
        : post.readingTime.minutes;
    if (minutes) {
      schema.timeRequired = `PT${minutes}M`;
    }
  }

  return schema;
}

