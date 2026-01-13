import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCapabilityBySlug, getAllCapabilities } from "@/data/capabilities";
import { getAllServices } from "@/lib/content/services";
import { getAllResearchPosts } from "@/lib/content/posts";
import { getAllTools } from "@/lib/tools";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
  Text,
  H2,
  H3,
} from "@/components/shared";
import Link from "next/link";
import { canonicalForRoute } from "@/lib/seo/canonical";

interface CapabilityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const capabilities = getAllCapabilities();
  return capabilities.map((capability) => ({
    slug: capability.slug,
  }));
}

export async function generateMetadata({
  params,
}: CapabilityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const capabilityData = getCapabilityBySlug(slug);

  if (!capabilityData) {
    return {
      title: "Capability Not Found | ProsFIN",
    };
  }

  return {
    title: `${capabilityData.name} | ProsFIN`,
    description: capabilityData.description,
    alternates: {
      canonical: canonicalForRoute(`/capabilities/${slug}`),
    },
  };
}

/**
 * Capability Landing Page
 * 
 * Shows capability overview with sub-services, typical client situations, and related content
 */
export default async function CapabilityDetailPage({
  params,
}: CapabilityDetailPageProps) {
  const { slug } = await params;
  const capabilityData = getCapabilityBySlug(slug);

  if (!capabilityData) {
    notFound();
  }

  const allServices = getAllServices();
  const allPosts = getAllResearchPosts();
  const allTools = getAllTools();

  // Get sub-services
  const subServices = allServices.filter((service) =>
    capabilityData.serviceSlugs.includes(service.slug)
  );

  // Get related posts
  const relatedPosts = allPosts.filter((post) =>
    capabilityData.relatedPostIds.includes(post.id)
  );

  // Get related tools
  const relatedTools = allTools.filter((tool) =>
    capabilityData.relatedToolSlugs.includes(tool.slug)
  );

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={capabilityData.name}
          title={capabilityData.name}
          subtitle={capabilityData.description}
          align="center"
          titleSize="xl"
        />
        <div className="mt-8 text-center">
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Sub-services */}
      {subServices.length > 0 && (
        <ProsfinSectionWrapper>
          <H2 className="mb-6">Dịch vụ trong nhóm này</H2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subServices.map((service) => (
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
        <ProsfinSectionWrapper background="muted">
          <H2 className="mb-6">Công cụ liên quan</H2>
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

      {/* Related Insights */}
      {relatedPosts.length > 0 && (
        <ProsfinSectionWrapper>
          <H2 className="mb-6">Insights liên quan</H2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={post.href || `/insights/${post.id}`}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <H3 className="mb-2 group-hover:text-primary">
                  {post.title}
                </H3>
                <Text as="p" variant="muted" className="text-sm">
                  {post.excerpt}
                </Text>
                <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                  Đọc thêm →
                </div>
              </Link>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <H2 className="mb-4">Sẵn sàng bắt đầu với {capabilityData.name}?</H2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

