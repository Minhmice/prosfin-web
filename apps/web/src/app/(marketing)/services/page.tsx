import {
  getAllServices,
  getAllPosts,
  getAllPeople,
} from "@/lib/content/services";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
} from "@/components/shared";
import { ServiceCard } from "@/components/services/service-card";
import { RelatedPosts } from "@/components/services/related-posts";
import { OurPeople } from "@/components/services/our-people";
import { SeeMore } from "@/components/services/see-more";
import { ServiceCta } from "@/components/services/service-cta";

/**
 * Services Page
 *
 * Trang tổng quan về các dịch vụ của ProsFIN.
 * Layout: Hero, Services Grid, Our Thinking, Our People, See more, CTA
 */
export default function ServicesPage() {
  const services = getAllServices();
  const posts = getAllPosts();
  const people = getAllPeople();

  // Get featured posts (union of all relatedPostIds or first 6)
  const featuredPostIds = Array.from(
    new Set(services.flatMap((s) => s.relatedPostIds))
  );
  const featuredPosts = posts
    .filter((p) => featuredPostIds.includes(p.id))
    .slice(0, 6);

  // Get featured people (union of all peopleIds or first 6)
  const featuredPeopleIds = Array.from(
    new Set(services.flatMap((s) => s.peopleIds))
  );
  const featuredPeople = people
    .filter((p) => featuredPeopleIds.includes(p.id))
    .slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title="Dịch vụ ProsFIN"
          subtitle="Các giải pháp ProsFIN đồng hành cùng tài chính doanh nghiệp. Từ khám sức khỏe tài chính đến đồng hành dài hạn, ProsFIN thiết kế gói dịch vụ phù hợp với từng giai đoạn phát triển của doanh nghiệp."
          align="center"
          titleSize="xl"
        />
        <div className="mt-8 flex justify-center">
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn miễn phí
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Services Grid */}
      <ProsfinSectionWrapper>
        <div className="space-y-8">
          <ProsfinSectionHeading
            title="Các dịch vụ"
            align="left"
            titleSize="lg"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
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
          services={services.slice(0, 4)}
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
