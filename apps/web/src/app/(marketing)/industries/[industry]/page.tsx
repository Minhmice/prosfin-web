import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustryBySlug, getAllIndustries } from "@/data/industries";
import { getAllServices } from "@/lib/content/services";
import { getAllResearchPosts } from "@/lib/content/posts";
import { getAllTools } from "@/lib/tools";
import { caseStudiesContent } from "@/data/case-studies";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
  ProsfinSecondaryButton,
  Text,
  H2,
  H3,
} from "@/components/shared";
import Link from "next/link";
import { canonicalForRoute } from "@/lib/seo/canonical";

interface IndustryDetailPageProps {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryDetailPageProps): Promise<Metadata> {
  const { industry } = await params;
  const industryData = getIndustryBySlug(industry);

  if (!industryData) {
    return {
      title: "Industry Not Found | ProsFIN",
    };
  }

  return {
    title: `${industryData.name} | ProsFIN`,
    description: industryData.description,
    alternates: {
      canonical: canonicalForRoute(`/industries/${industry}`),
    },
  };
}

/**
 * Industry Detail Page
 * 
 * Shows industry-specific challenges, recommended services, and related content
 */
export default async function IndustryDetailPage({
  params,
}: IndustryDetailPageProps) {
  const { industry } = await params;
  const industryData = getIndustryBySlug(industry);

  if (!industryData) {
    notFound();
  }

  const allServices = getAllServices();
  const allPosts = getAllResearchPosts();
  const allTools = getAllTools();
  const allCases = caseStudiesContent.cases;

  // Get related services
  const relatedServices = allServices.filter((service) =>
    industryData.relatedServiceSlugs.includes(service.slug)
  );

  // Get related posts
  const relatedPosts = allPosts.filter((post) =>
    industryData.relatedPostIds.includes(post.id)
  );

  // Get related tools
  const relatedTools = allTools.filter((tool) =>
    industryData.relatedToolSlugs.includes(tool.slug)
  );

  // Get related case studies
  const relatedCases = allCases.filter((caseItem) =>
    industryData.relatedCaseStudySlugs.includes(caseItem.slug)
  );

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={industryData.name}
          title={`Giải pháp tài chính cho ${industryData.name}`}
          subtitle={industryData.description}
          align="center"
          titleSize="xl"
        />
        <div className="mt-8 text-center">
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Top Pains */}
      <ProsfinSectionWrapper>
        <H2 className="mb-6">Thách thức tài chính chính</H2>
        <div className="grid gap-4 md:grid-cols-2">
          {industryData.topPains.map((pain, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <Text as="p" variant="body">
                {pain}
              </Text>
            </div>
          ))}
        </div>
      </ProsfinSectionWrapper>

      {/* Recommended Services */}
      {relatedServices.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <H2 className="mb-6">Dịch vụ được đề xuất</H2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <H3 className="mb-2 group-hover:text-primary">
                  {service.title}
                </H3>
                <Text as="p" variant="muted" className="text-sm">
                  {service.shortDescription}
                </Text>
                <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                  Tìm hiểu thêm →
                </div>
              </Link>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <ProsfinSectionWrapper>
          <H2 className="mb-6">Công cụ hữu ích</H2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <H3 className="mb-2 group-hover:text-primary">
                  {tool.title}
                </H3>
                <Text as="p" variant="muted" className="text-sm">
                  {tool.description}
                </Text>
                <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                  Sử dụng công cụ →
                </div>
              </Link>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Related Case Studies */}
      {relatedCases.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <H2 className="mb-6">Câu chuyện khách hàng</H2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedCases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/case-studies/${caseItem.slug}`}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <H3 className="mb-2 group-hover:text-primary">
                  {caseItem.title}
                </H3>
                <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                  Xem chi tiết →
                </div>
              </Link>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <H2 className="mb-4">Sẵn sàng cải thiện tài chính cho ngành của bạn?</H2>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ProsfinPrimaryButton href="/contact" size="lg">
              Đặt lịch tư vấn
            </ProsfinPrimaryButton>
            <ProsfinSecondaryButton href="/services" size="lg">
              Xem tất cả dịch vụ
            </ProsfinSecondaryButton>
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

