import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
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
import { ServiceTools } from "@/components/services/service-tools";
import {
  generateServiceSchema,
  generateBreadcrumbListSchema,
} from "@/components/seo/jsonld";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { buildOg } from "@/lib/seo/open-graph";

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
  const canonicalUrl = canonicalForRoute(`/services/${slug}`);
  const title = `${service.title} | ProsFIN`;
  const description = service.excerpt || service.shortDescription || "";
  const keywords = service.tags?.join(", ") || "";
  const og = buildOg({
    title,
    description,
    url: canonicalUrl,
    image: service.coverImage,
    type: "website",
  });

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: og,
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  // Generate structured data
  const serviceSchema = generateServiceSchema(
    {
      title: service.title,
      description: service.excerpt || service.shortDescription,
      slug: service.slug,
      coverImage: service.coverImage,
    },
    baseUrl
  );

  const breadcrumbSchema = generateBreadcrumbListSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href ? `${baseUrl}${item.href}` : `${baseUrl}/services/${service.slug}`,
    }))
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

      {/* Tools you can run */}
      <ProsfinSectionWrapper>
        <ServiceTools serviceSlug={slug} />
      </ProsfinSectionWrapper>

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
