import * as React from "react";
import Link from "next/link";
import { H2, Text } from "@/components/shared";

export type RelatedCase = {
  slug: string;
  title: string;
  summary: string;
};

export function RelatedCasesSection({ cases }: { cases: RelatedCase[] }) {
  return (
    <div>
      <H2 className="mb-8">Case study liên quan</H2>
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((caseItem) => (
          <div
            key={caseItem.slug}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <Text as="p" variant="large" className="mb-2">
              {caseItem.title}
            </Text>
            <Text as="p" variant="muted" className="mb-4">
              {caseItem.summary}
            </Text>
            <Link
              href={`/case-studies/${caseItem.slug}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              aria-label={`Xem câu chuyện chi tiết: ${caseItem.title}`}
            >
              Xem câu chuyện chi tiết →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


