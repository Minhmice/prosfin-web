/**
 * PeoplePreviewSection - People preview on landing page
 * 
 * Shows 2-4 advisors with link to full people page
 */

"use client";

import * as React from "react";
import { ProsfinSectionWrapper, ProsfinSectionHeading, ProsfinSecondaryButton, Text, H3 } from "@/components/shared";
import { getAllPeople } from "@/lib/content/people";
import Link from "next/link";
import Image from "next/image";

/**
 * PeoplePreviewSection - People preview component
 */
export function PeoplePreviewSection() {
  const people = getAllPeople();
  // Get top 4 people by priority
  const featuredPeople = people
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 4);

  if (featuredPeople.length === 0) {
    return null;
  }

  return (
    <ProsfinSectionWrapper background="muted" padding="lg">
      <ProsfinSectionHeading
        eyebrow="People"
        title="Đội ngũ chuyên gia ProsFIN"
        subtitle="Đội ngũ chuyên gia tài chính với kinh nghiệm từ Big4, sẵn sàng đồng hành cùng doanh nghiệp."
        align="center"
        titleSize="lg"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featuredPeople.map((person) => (
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
            </div>
            <H3 className="mb-1 group-hover:text-primary">
              {person.name}
            </H3>
            <Text as="p" variant="muted" className="mb-2 text-sm">
              {person.title}
            </Text>
            <Text as="p" variant="muted" className="text-xs">
              {person.bioShort}
            </Text>
            {person.tags && person.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {person.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <ProsfinSecondaryButton href="/people" size="lg">
          Xem toàn bộ đội ngũ
        </ProsfinSecondaryButton>
      </div>
    </ProsfinSectionWrapper>
  );
}

