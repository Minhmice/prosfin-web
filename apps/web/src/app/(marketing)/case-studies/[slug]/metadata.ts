/**
 * Case Study Detail Page Metadata Helper
 */

import type { Metadata } from "next";
import { caseStudyDetailMap } from "@/data/case-detail";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { robotsForRoute } from "@/lib/seo/robots";
import { buildOg } from "@/lib/seo/open-graph";

/**
 * Generate metadata for case study detail page
 */
export function generateCaseStudyMetadata(slug: string): Metadata {
  const caseStudy = caseStudyDetailMap[slug];

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | ProsFIN",
    };
  }

  const canonicalUrl = canonicalForRoute(`/case-studies/${slug}`);
  const description = `Case study: ${caseStudy.hero.title}. ${caseStudy.context.background}`;

  return {
    title: `${caseStudy.hero.title} | ProsFIN Case Study`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsForRoute({ index: true, follow: true }),
    openGraph: buildOg({
      title: caseStudy.hero.title,
      description,
      url: canonicalUrl,
      type: "article",
    }),
  };
}

