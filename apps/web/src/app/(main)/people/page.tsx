import type { Metadata } from "next";
import { getAllPeople } from "@/lib/content/people";
import { getAllCapabilities } from "@/data/capabilities";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  Text,
  H3,
} from "@/components/shared";
import Link from "next/link";
import Image from "next/image";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "People | ProsFIN",
  description:
    "Đội ngũ chuyên gia tài chính với kinh nghiệm từ Big4, sẵn sàng đồng hành cùng doanh nghiệp.",
  alternates: {
    canonical: canonicalForRoute("/people"),
  },
};

/**
 * People Listing Page
 * 
 * Lists all team members with filters by capability/industry
 */
export default function PeoplePage() {
  const people = getAllPeople();
  const capabilities = getAllCapabilities();

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow="People"
          title="Đội ngũ chuyên gia ProsFIN"
          subtitle="Đội ngũ chuyên gia tài chính với kinh nghiệm từ Big4, sẵn sàng đồng hành cùng doanh nghiệp trong các thách thức tài chính."
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      {/* People Grid */}
      <ProsfinSectionWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <Link
              key={person.id}
              href={`/people/${person.id}`}
              className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start gap-4">
                {person.avatarUrl ? (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={person.avatarUrl}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                    <Text as="span" variant="large" className="text-muted-foreground">
                      {person.name.charAt(0)}
                    </Text>
                  </div>
                )}
                <div className="flex-1">
                  <H3 className="mb-1 group-hover:text-primary">
                    {person.name}
                  </H3>
                  <Text as="p" variant="muted" className="text-sm">
                    {person.title}
                  </Text>
                </div>
              </div>
              <Text as="p" variant="muted" className="mb-4 text-sm">
                {person.bioShort}
              </Text>
              {person.focusAreas && person.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {person.focusAreas.slice(0, 3).map((area, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                Xem profile →
              </div>
            </Link>
          ))}
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <Text as="p" variant="large" className="mb-4">
            Muốn làm việc với đội ngũ ProsFIN?
          </Text>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Liên hệ với chúng tôi
          </Link>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

