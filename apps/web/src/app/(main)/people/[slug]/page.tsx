import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPeople, getPeopleByIds } from "@/lib/content/people";
import { getAllServices } from "@/lib/content/services";
import { getAllResearchPosts } from "@/lib/content/posts";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
  Text,
  H2,
  H3,
} from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { canonicalForRoute } from "@/lib/seo/canonical";

interface PeopleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const people = getAllPeople();
  return people.map((person) => ({
    slug: person.id,
  }));
}

export async function generateMetadata({
  params,
}: PeopleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const people = getAllPeople();
  const person = people.find((p) => p.id === slug);

  if (!person) {
    return {
      title: "Person Not Found | ProsFIN",
    };
  }

  return {
    title: `${person.name} - ${person.title} | ProsFIN`,
    description: person.bioShort || person.tooltipBio,
    alternates: {
      canonical: canonicalForRoute(`/people/${slug}`),
    },
  };
}

/**
 * People Detail Page
 * 
 * Shows person profile with focus areas, experience, and related content
 */
export default async function PeopleDetailPage({
  params,
}: PeopleDetailPageProps) {
  const { slug } = await params;
  const people = getAllPeople();
  const person = people.find((p) => p.id === slug);

  if (!person) {
    notFound();
  }

  const allServices = getAllServices();
  const allPosts = getAllResearchPosts();

  // Get related services
  const relatedServices = person.serviceSlugs
    ? allServices.filter((service) => person.serviceSlugs!.includes(service.slug))
    : [];

  // Get related posts (if person has relatedPostIds in future)
  const relatedPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          {person.avatarUrl ? (
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-muted">
              <Text as="span" variant="large" className="text-4xl text-muted-foreground">
                {person.name.charAt(0)}
              </Text>
            </div>
          )}
          <div className="flex-1">
            <ProsfinSectionHeading
              title={person.name}
              subtitle={person.title}
              align={undefined}
            />
            {person.tags && person.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {person.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Bio */}
      <ProsfinSectionWrapper>
        <H2 className="mb-4">Giới thiệu</H2>
        <Text as="p" variant="body" className="leading-relaxed">
          {person.bioLong || person.bioShort}
        </Text>
      </ProsfinSectionWrapper>

      {/* Focus Areas */}
      {person.focusAreas && person.focusAreas.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <H2 className="mb-4">Lĩnh vực chuyên sâu</H2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {person.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-card p-4 shadow-sm"
              >
                <Text as="p" variant="body">{area}</Text>
              </div>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Best For */}
      {person.bestFor && person.bestFor.length > 0 && (
        <ProsfinSectionWrapper>
          <H2 className="mb-4">Phù hợp với</H2>
          <div className="flex flex-wrap gap-2">
            {person.bestFor.map((item, idx) => (
              <span
                key={idx}
                className="rounded-full bg-muted px-3 py-1 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <H2 className="mb-6">Dịch vụ liên quan</H2>
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

      {/* Contact */}
      <ProsfinSectionWrapper>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <H2 className="mb-4">Liên hệ</H2>
          <div className="space-y-2">
            {person.email && (
              <Text as="p" variant="body">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${person.email}`}
                  className="text-primary hover:underline"
                >
                  {person.email}
                </a>
              </Text>
            )}
            {person.phone && (
              <Text as="p" variant="body">
                <strong>Điện thoại:</strong>{" "}
                <a
                  href={`tel:${person.phone}`}
                  className="text-primary hover:underline"
                >
                  {person.phone}
                </a>
              </Text>
            )}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <Text as="p" variant="large" className="mb-4">
            Muốn làm việc với {person.name}?
          </Text>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

