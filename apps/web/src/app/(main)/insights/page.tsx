import type { Metadata } from "next";
import Link from "next/link";
import { getInsightsIndex } from "@/lib/insights/getInsightsIndex";
import { getInsightsFilters } from "@/lib/insights/getInsightsFilters";
import { buildInsightsHubMetadata } from "@/lib/insights/insightsMeta";
import { InsightsFilterBar } from "@/components/insights/insights-filter-bar";
import { InsightsGrid } from "@/components/insights/insights-grid";
import { InsightsCta } from "@/components/insights/insights-cta";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import type { InsightTopic, InsightFormat } from "@/content/insights.taxonomy";

interface InsightsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for insights hub page
 */
export async function generateMetadata(): Promise<Metadata> {
  return buildInsightsHubMetadata();
}

export default async function InsightsHubPage({
  searchParams,
}: InsightsPageProps) {
  const resolvedSearchParams = await searchParams;
  
  // Parse query params
  const topic = resolvedSearchParams.topic as InsightTopic | undefined;
  const format = resolvedSearchParams.format as InsightFormat | undefined;
  const sort = (resolvedSearchParams.sort as "newest" | "oldest") || "newest";

  // Get filters and filtered insights
  const filters = getInsightsFilters();
  const filteredInsights = getInsightsIndex({
    topic,
    format,
    sort,
  });

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="space-y-6 max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Góc nhìn
            </h1>
            <p className="text-lg text-muted-foreground">
              Phân tích thực chiến về Tài chính – Kế toán – Thuế – Kiểm soát
              nội bộ dành cho chủ doanh nghiệp.
            </p>
            <ProsfinPrimaryButton href="/request-proposal" size="lg">
              Gửi yêu cầu tư vấn
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Filter Bar */}
      <InsightsFilterBar filters={filters} />

      {/* Results Grid */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <InsightsGrid insights={filteredInsights} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Footer CTA */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <InsightsCta />
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}
