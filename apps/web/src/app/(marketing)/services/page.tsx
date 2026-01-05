import type { Metadata } from "next";
import {
  getAllServices,
  getAllPosts,
  getAllPeople,
} from "@/lib/content/services";
import { ProsfinSectionWrapper } from "@/components/shared";
import { RelatedPosts } from "@/components/services/related-posts";
import { OurPeople } from "@/components/services/our-people";
import { SeeMore } from "@/components/services/see-more";
import { ServiceCta } from "@/components/services/service-cta";
import { ServicesByNeed } from "@/components/services/services-by-need";
import { ServicesPageClient } from "@/components/services/services-page-client";
import { ServicesExplorer } from "@/components/services-explorer/services-explorer";
import { parseExplorerParams } from "@/lib/services-explorer/params";
import {
  shouldIndexUrl,
  getCanonicalUrl,
  getRobotsMeta,
} from "@/lib/services-explorer/seo";

/**
 * Services Page
 *
 * Services Explorer với filter panel, search/sort, presets, compare feature.
 * Server-first: load data, pass to client Explorer.
 */
interface ServicesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for services page
 */
export async function generateMetadata({
  searchParams,
}: ServicesPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();

  // Convert searchParams to URLSearchParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  const filters = parseExplorerParams(urlSearchParams);
  const shouldIndex = shouldIndexUrl(filters);
  const canonicalUrl = getCanonicalUrl(filters);
  const robots = getRobotsMeta(filters);

  return {
    title: "Dịch vụ ProsFIN",
    description:
      "Khám phá các dịch vụ tư vấn tài chính, kế toán thuế, kiểm soát nội bộ và CFO đồng hành cho doanh nghiệp.",
    alternates: {
      canonical: canonicalUrl,
    },
    robots: shouldIndex
      ? undefined
      : {
          index: robots.index,
          follow: robots.follow,
        },
  };
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const allServices = getAllServices();
  const posts = getAllPosts();
  const people = getAllPeople();

  // Get featured posts (union of all relatedPostIds or first 6)
  const featuredPostIds = Array.from(
    new Set(allServices.flatMap((s) => s.relatedPostIds || []))
  );
  const featuredPosts = posts
    .filter((p) => featuredPostIds.includes(p.id))
    .slice(0, 6);

  // Get featured people (union of all peopleIds or first 6)
  const featuredPeopleIds = Array.from(
    new Set(allServices.flatMap((s) => s.peopleIds || []))
  );
  const featuredPeople = people
    .filter((p) => featuredPeopleIds.includes(p.id))
    .slice(0, 6);

  return (
    <>
      {/* Hero Section with Wizard CTA */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ServicesPageClient />
      </ProsfinSectionWrapper>

      {/* Services Explorer */}
      <ServicesExplorer initialServices={allServices} />

      {/* Services by Need */}
      <ProsfinSectionWrapper>
        <ServicesByNeed />
      </ProsfinSectionWrapper>

      {/* Our Thinking */}
      {featuredPosts.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <RelatedPosts posts={featuredPosts} />
        </ProsfinSectionWrapper>
      )}

      {/* Our People */}
      {featuredPeople.length > 0 && (
        <ProsfinSectionWrapper>
          <OurPeople people={featuredPeople} />
        </ProsfinSectionWrapper>
      )}

      {/* See more services */}
      <ProsfinSectionWrapper background="muted">
        <SeeMore
          services={allServices.slice(0, 4)}
          currentSlug=""
          title="Xem thêm dịch vụ"
        />
      </ProsfinSectionWrapper>

      {/* CTA Leads */}
      <ProsfinSectionWrapper>
        <ServiceCta />
      </ProsfinSectionWrapper>
    </>
  );
}
