import { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { ToolsHubHero } from "@/components/tools/tools-hub-hero";
import { ToolCard } from "@/components/tools/tool-card";
import { ProsfinSectionWrapper } from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { ToolsHubSearch } from "@/components/tools/tools-hub-search";

export const metadata: Metadata = {
  title: "Công cụ tài chính | ProsFIN",
  description:
    "Sử dụng các công cụ tài chính chuyên nghiệp để đánh giá và tối ưu hóa tình hình tài chính của doanh nghiệp.",
  alternates: {
    canonical: canonicalForRoute("/tools"),
  },
};

/**
 * Tools Hub Page
 */
export default function ToolsHubPage() {
  const tools = getAllTools();

  return (
    <>
      {/* Hero */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div className="container mx-auto max-w-6xl">
          <ToolsHubHero />
        </div>
      </ProsfinSectionWrapper>

      {/* Tools Grid */}
      <ProsfinSectionWrapper>
        <div className="container mx-auto max-w-6xl">
          <Suspense>
            <ToolsHubSearch tools={tools} />
          </Suspense>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

