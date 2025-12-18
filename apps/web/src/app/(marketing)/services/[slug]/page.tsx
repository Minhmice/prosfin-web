import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getServiceBySlug,
  getRelatedServices,
  getPeopleByIds,
  getPostsByIds,
  getAllServices,
  getPostsByTags,
} from "@/lib/content/services";
import { ProsfinSectionWrapper } from "@/components/shared";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ServiceRenderer } from "@/components/services/service-renderer";
import { RelatedPosts } from "@/components/services/related-posts";
import { OurPeople } from "@/components/services/our-people";
import { SeeMore } from "@/components/services/see-more";
import { ServiceCta } from "@/components/services/service-cta";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all service slugs
 */
export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/**
 * Generate metadata for service page
 */
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | ProsFIN",
    };
  }

  const title = `${service.title} | ProsFIN`;
  const description = service.excerpt || service.shortDescription;

  return {
    title,
    description,
    keywords: service.tags?.join(", "),
    openGraph: {
      title,
      description,
      images: service.coverImage
        ? [
            {
              url: service.coverImage,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : undefined,
    },
  };
}

/**
 * Service Detail Page
 * 
 * Trang chi tiết từng dịch vụ với breadcrumb, ServiceRenderer, và các modules.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get related data
  // Combine posts from IDs and tags
  const postsByIds = getPostsByIds(service.relatedPostIds || []);
  const postsByTags = service.relatedPostTags
    ? getPostsByTags(service.relatedPostTags)
    : [];
  // Merge and deduplicate
  const allRelatedPosts = [...postsByIds, ...postsByTags];
  const uniquePosts = Array.from(
    new Map(allRelatedPosts.map((post) => [post.id, post])).values()
  );
  const relatedPosts = uniquePosts.slice(0, 6); // Limit to 6 posts

  const relatedPeople = getPeopleByIds(service.peopleIds || []);
  const allServices = getAllServices();

  // Build breadcrumb
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper padding="sm" background="default">
        <SiteBreadcrumbs items={breadcrumbItems} />
      </ProsfinSectionWrapper>

      {/* Hero + Service Content */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ServiceRenderer service={service} />
      </ProsfinSectionWrapper>

      {/* Our Thinking */}
      {relatedPosts.length > 0 && (
        <ProsfinSectionWrapper>
          <RelatedPosts posts={relatedPosts} />
        </ProsfinSectionWrapper>
      )}

      {/* Our People */}
      {relatedPeople.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <OurPeople people={relatedPeople} />
        </ProsfinSectionWrapper>
      )}

      {/* See more services */}
      <ProsfinSectionWrapper>
        <SeeMore services={allServices} currentSlug={slug} />
      </ProsfinSectionWrapper>

      {/* CTA Leads */}
      <ProsfinSectionWrapper background="muted">
        <ServiceCta cta={service.cta} />
      </ProsfinSectionWrapper>
    </>
  );
}
