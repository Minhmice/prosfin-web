/**
 * Process Page Metadata
 */

import type { Metadata } from "next";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { robotsForRoute } from "@/lib/seo/robots";
import { buildOg } from "@/lib/seo/open-graph";

export const processMetadata: Metadata = {
  title: "Quy trình làm việc | ProsFIN",
  description:
    "Khám phá quy trình làm việc chuyên nghiệp của ProsFIN: từ Discovery Call, Financial Health Check, đến Action Plan và Ongoing Support.",
  alternates: {
    canonical: canonicalForRoute("/process"),
  },
  robots: robotsForRoute({ index: true, follow: true }),
  openGraph: buildOg({
    title: "Quy trình làm việc | ProsFIN",
    description:
      "Khám phá quy trình làm việc chuyên nghiệp của ProsFIN: từ Discovery Call, Financial Health Check, đến Action Plan và Ongoing Support.",
    url: canonicalForRoute("/process"),
    type: "website",
  }),
};

