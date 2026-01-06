import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getInsightBySlug } from "@/lib/insights/getInsightsBySlug";
import { getInsightsIndex } from "@/lib/insights/getInsightsIndex";
import { getRelatedServicesForTopic } from "@/lib/insights/serviceMapping";
import { buildInsightMetadata } from "@/lib/insights/insightsMeta";
import { getTopicById, getFormatById } from "@/content/insights.taxonomy";
import { InsightsRelated } from "@/components/insights/insights-related";
import { InsightsCta } from "@/components/insights/insights-cta";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";
import { getInsightsStaticParams } from "@/lib/insights/getInsightsStaticParams";

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all insight slugs
 */
export async function generateStaticParams() {
  const params = getInsightsStaticParams();
  return params;
}

/**
 * Generate metadata for insight detail page
 */
export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found | ProsFIN",
    };
  }

  return buildInsightMetadata(insight);
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const topic = getTopicById(insight.topic);
  const format = getFormatById(insight.format);
  const publishedDate = new Date(insight.publishedAt).toLocaleDateString(
    "vi-VN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Get related insights (same topic)
  const allInsights = getInsightsIndex({ topic: insight.topic });
  const relatedInsights = allInsights
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 6);

  // Get related services
  const relatedServices = getRelatedServicesForTopic(insight.topic);

  return (
    <>
      {/* Header Section */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {topic && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {topic.label}
                </span>
              )}
              {format && (
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  {format.label}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight">{insight.title}</h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{publishedDate}</span>
              {insight.readingTime && (
                <>
                  <span>•</span>
                  <span>{insight.readingTime} phút đọc</span>
                </>
              )}
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* TL;DR Section */}
      {insight.tldr && insight.tldr.length > 0 && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <ProsfinContainer>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold">Tóm tắt</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {insight.tldr.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </ProsfinContainer>
        </ProsfinSectionWrapper>
      )}

      {/* Body Content */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            {insight.body ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: insight.body }}
              />
            ) : (
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nội dung đang được hoàn thiện. Chúng tôi đang chuẩn bị thông
                  tin chi tiết về chủ đề này.
                </p>
              </div>
            )}

            {/* Action Items */}
            {insight.actionItems && insight.actionItems.length > 0 && (
              <div className="space-y-4 mt-8 p-6 rounded-lg border bg-muted/50">
                <h3 className="font-semibold">Hành động khuyến nghị</h3>
                <ul className="space-y-2">
                  {insight.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <ProsfinContainer>
            <InsightsRelated
              insights={relatedInsights}
              currentSlug={insight.slug}
            />
          </ProsfinContainer>
        </ProsfinSectionWrapper>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <ProsfinSectionWrapper background="default" padding="lg">
          <ProsfinContainer>
            <div className="max-w-3xl space-y-6">
              <h2 className="text-2xl font-semibold">Dịch vụ liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedServices.slice(0, 4).map((service) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className={cn(
                      "block rounded-lg border bg-card p-4 transition-all",
                      "hover:border-primary hover:shadow-md"
                    )}
                  >
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    {service.tagline && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.tagline}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </ProsfinContainer>
        </ProsfinSectionWrapper>
      )}

      {/* CTA */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <InsightsCta />
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}
