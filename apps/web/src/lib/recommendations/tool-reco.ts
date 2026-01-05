/**
 * Tool Recommendations
 * 
 * Glue layer connecting Tools ↔ Services ↔ Research.
 */

import type { ToolResult } from "@/types/tools";
import { getAllServices, getServiceBySlug } from "@/lib/content/services";
import { getPostsByTags, getPostsByIds } from "@/lib/content/posts";

/**
 * Get recommended services based on tool result
 */
export function getRecommendedServices(
  result: ToolResult
): Array<{ slug: string; title: string; href: string }> {
  const allServices = getAllServices();
  const recommended: Array<{ slug: string; title: string; href: string }> = [];

  // Use explicit recommended service slugs from result
  result.recommendedServiceSlugs.forEach((slug) => {
    const service = getServiceBySlug(slug);
    if (service) {
      recommended.push({
        slug: service.slug,
        title: service.title,
        href: `/services/${service.slug}`,
      });
    }
  });

  // If no explicit recommendations, infer from flags
  if (recommended.length === 0) {
    result.flags.forEach((flag) => {
      if (flag.action?.href) {
        const href = flag.action.href;
        if (href.startsWith("/services/")) {
          const slug = href.replace("/services/", "");
          const service = getServiceBySlug(slug);
          if (service) {
            recommended.push({
              slug: service.slug,
              title: service.title,
              href: `/services/${service.slug}`,
            });
          }
        }
      }
    });
  }

  // Remove duplicates
  const unique = Array.from(
    new Map(recommended.map((s) => [s.slug, s])).values()
  );

  return unique.slice(0, 6); // Limit to 6
}

/**
 * Get recommended research posts based on tool result
 */
export function getRecommendedPosts(
  result: ToolResult
): Array<{ id: string; title: string; href: string }> {
  const recommended: Array<{ id: string; title: string; href: string }> = [];

  // Use explicit recommended post IDs from result
  if (result.recommendedPostIds.length > 0) {
    const posts = getPostsByIds(result.recommendedPostIds);
    posts.forEach((post) => {
      recommended.push({
        id: post.id,
        title: post.title,
        href: `/research/${post.slug || post.id}`,
      });
    });
  }

  // Infer from tool context (map flags/metrics to tags)
  const tags: string[] = [];
  result.flags.forEach((flag) => {
    if (flag.message.includes("dòng tiền") || flag.message.includes("cashflow")) {
      tags.push("cashflow");
    }
    if (flag.message.includes("lợi nhuận") || flag.message.includes("profit")) {
      tags.push("profit");
    }
    if (flag.message.includes("thuế") || flag.message.includes("tax")) {
      tags.push("tax");
    }
    if (flag.message.includes("tuân thủ") || flag.message.includes("compliance")) {
      tags.push("compliance");
    }
  });

  if (tags.length > 0 && recommended.length < 3) {
    const postsByTags = getPostsByTags(tags);
    postsByTags.slice(0, 3 - recommended.length).forEach((post) => {
      if (!recommended.find((r) => r.id === post.id)) {
        recommended.push({
          id: post.id,
          title: post.title,
          href: `/research/${post.slug || post.id}`,
        });
      }
    });
  }

  return recommended.slice(0, 6); // Limit to 6
}

/**
 * Get recommended tools for a service
 */
export function getRecommendedTools(
  serviceSlug: string
): Array<{ slug: string; title: string; href: string }> {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];

  // Map service goals/tags to tools
  const toolMap: Record<string, string[]> = {
    cashflow: ["cashflow-runway", "working-capital"],
    profit: ["profit-levers", "break-even"],
    compliance: ["tax-readiness", "finance-health-check"],
    risk: ["finance-health-check"],
  };

  const recommended: Array<{ slug: string; title: string; href: string }> = [];

  // Check service tags and goals
  const tags = service.tags || [];
  tags.forEach((tag) => {
    if (toolMap[tag]) {
      toolMap[tag].forEach((toolSlug) => {
        recommended.push({
          slug: toolSlug,
          title: toolSlug.replace(/-/g, " "),
          href: `/tools/${toolSlug}`,
        });
      });
    }
  });

  // Remove duplicates
  const unique = Array.from(
    new Map(recommended.map((t) => [t.slug, t])).values()
  );

  return unique.slice(0, 3); // Limit to 3
}

