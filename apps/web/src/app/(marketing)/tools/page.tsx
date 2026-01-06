import { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { ToolsHubHero } from "@/components/tools/tools-hub-hero";
import { ToolCard } from "@/components/tools/tool-card";
import { ProsfinSectionWrapper } from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { ToolsHubSearch } from "@/components/tools/tools-hub-search";
import type { ToolDefinition } from "@/types/tools";

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
type ToolDefinitionForClient = Omit<ToolDefinition, "inputs" | "compute"> & {
  inputs: Omit<ToolDefinition["inputs"], "schema">;
};

export default function ToolsHubPage() {
  const tools = getAllTools();
  
  // Strip Zod schemas and compute functions before passing to client components
  const toolsForClient: ToolDefinitionForClient[] = tools.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    description: tool.description,
    shortDescription: tool.shortDescription,
    category: tool.category,
    icon: tool.icon,
    inputs: {
      fields: tool.inputs.fields,
      presets: tool.inputs.presets,
    },
    insights: tool.insights,
    cta: tool.cta,
    seo: tool.seo,
  }));

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
            <ToolsHubSearch tools={toolsForClient as unknown as ToolDefinition[]} />
          </Suspense>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

