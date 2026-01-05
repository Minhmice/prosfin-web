/**
 * About Page Metadata
 */

import type { Metadata } from "next";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { robotsForRoute } from "@/lib/seo/robots";
import { buildOg } from "@/lib/seo/open-graph";

export const aboutMetadata: Metadata = {
  title: "Về ProsFIN | ProsFIN",
  description:
    "Tìm hiểu về ProsFIN: câu chuyện hình thành, triết lý làm việc, đội ngũ và cam kết về chất lượng dịch vụ tư vấn tài chính.",
  alternates: {
    canonical: canonicalForRoute("/about"),
  },
  robots: robotsForRoute({ index: true, follow: true }),
  openGraph: buildOg({
    title: "Về ProsFIN | ProsFIN",
    description:
      "Tìm hiểu về ProsFIN: câu chuyện hình thành, triết lý làm việc, đội ngũ và cam kết về chất lượng dịch vụ tư vấn tài chính.",
    url: canonicalForRoute("/about"),
    type: "website",
  }),
};

