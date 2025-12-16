import { caseStudiesContent } from "@/data/case-studies";
import {
  H2,
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinMetricPill,
  ProsfinSecondaryButton,
  Text,
} from "@/components/shared";
import Link from "next/link";

/**
 * Case Studies Page
 * 
 * Trang danh sách câu chuyện khách hàng.
 */
export default function CaseStudiesPage() {
  const { hero, cases, stats } = caseStudiesContent;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          align="center"
          titleSize="xl"
        />
        {hero.cta && (
          <div className="mt-8 text-center">
            <ProsfinSecondaryButton href={hero.cta.href} size="lg">
              {hero.cta.label}
            </ProsfinSecondaryButton>
          </div>
        )}
      </ProsfinSectionWrapper>

      {/* Stats */}
      <ProsfinSectionWrapper>
        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <ProsfinMetricPill
                key={stat.id}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Case Studies Grid */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <H2 className="mb-8">Câu chuyện khách hàng</H2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <Text as="p" variant="large" className="mb-4">
                  {caseItem.title}
                </Text>
                <div className="mb-4 flex gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {caseItem.industry}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {caseItem.size}
                  </span>
                </div>
                <div className="mb-4">
                  <Text as="p" variant="muted" className="mb-2 font-medium">
                    Vấn đề:
                  </Text>
                  <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                    {caseItem.problems.map((problem, idx) => (
                      <li key={idx}>{problem}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <Text as="p" variant="muted" className="mb-2 font-medium">
                    Kết quả:
                  </Text>
                  <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                    {caseItem.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/case-studies/${caseItem.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  aria-label={`Xem chi tiết case study: ${caseItem.title}`}
                >
                  Xem chi tiết →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <H2 className="mb-4">Kể cho ProsFIN câu chuyện của bạn</H2>
          <ProsfinSecondaryButton href="/contact" size="lg">
            Liên hệ với ProsFIN
          </ProsfinSecondaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

