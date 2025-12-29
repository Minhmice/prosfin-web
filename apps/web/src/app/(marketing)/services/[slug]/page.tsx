import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getServiceBySlug,
  getAllServices,
  getPostsByService,
  getPeopleByService,
  // Fallback for backward compatibility
  getPeopleByIds,
  getPostsByIds,
  getPostsByTags,
} from "@/lib/content/services";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ServiceRenderer } from "@/components/services/service-renderer";
import { RelatedPosts } from "@/components/services/related-posts";
import { OurPeople } from "@/components/services/our-people";
import { SeeMore } from "@/components/services/see-more";
import { ServiceCta } from "@/components/services/service-cta";
import { BigLeadCta } from "@/components/services/big-lead-cta";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const canonicalUrl = `${baseUrl}/services/${slug}`;
  const title = `${service.title} | ProsFIN`;
  const description = service.excerpt || service.shortDescription;
  const keywords = service.tags?.join(", ") || "";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ProsFIN",
      images: service.coverImage
        ? [
            {
              url: service.coverImage,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : [
            {
              url: `${baseUrl}/services/${slug}/opengraph-image`, // Dynamic OG image
              width: 1200,
              height: 630,
              alt: service.title || "ProsFIN",
            },
          ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.coverImage
        ? [service.coverImage]
        : [`${baseUrl}/services/${slug}/opengraph-image`],
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
  // Priority: use serviceSlugs relationship, fallback to IDs/tags for backward compatibility
  const postsByService = getPostsByService(slug, 6);
  
  // Fallback: combine posts from IDs and tags if no serviceSlugs match
  let relatedPosts = postsByService;
  if (relatedPosts.length === 0) {
    const postsByIds = getPostsByIds(service.relatedPostIds || []);
    const postsByTags = service.relatedPostTags
      ? getPostsByTags(service.relatedPostTags)
      : [];
    const allRelatedPosts = [...postsByIds, ...postsByTags];
    relatedPosts = Array.from(
      new Map(allRelatedPosts.map((post) => [post.id, post])).values()
    ).slice(0, 6);
  }

  // Get people by service, fallback to IDs
  let relatedPeople = getPeopleByService(slug, 6);
  // Phase 5: Try supportPeopleIds first, then fallback to peopleIds
  if (relatedPeople.length === 0) {
    const peopleIdsToUse = service.supportPeopleIds || service.peopleIds || [];
    if (peopleIdsToUse.length > 0) {
      relatedPeople = getPeopleByIds(peopleIdsToUse);
    }
  }
  const allServices = getAllServices();

  // Build breadcrumb
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  return (
    <>
      {/* Hero + Service Content */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ServiceRenderer service={service} breadcrumbItems={breadcrumbItems} />
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

      {/* Big CTA Leads */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <BigLeadCta cta={service.cta} />
      </ProsfinSectionWrapper>
    </>
  );
}
