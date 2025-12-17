import { aboutPageContent } from "@/data/about-page";
import { aboutSectionContent } from "@/data/about-content";
import {
  H2,
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinMetricPill,
  Text,
} from "@/components/shared";
import { TeamGrid } from "@/components/landing/about/team-grid";
import { ProsfinPrimaryButton } from "@/components/shared";

/**
 * About Page
 * 
 * Trang về ProsFIN chi tiết.
 */
export default function AboutPage() {
  const { hero, storyTimeline, principles, stats, complianceNotes } =
    aboutPageContent;
  const { team } = aboutSectionContent;

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
      </ProsfinSectionWrapper>

      {/* Story Timeline */}
      <ProsfinSectionWrapper>
        <div>
          <H2 className="mb-8">Câu chuyện hình thành</H2>
          <div className="space-y-8">
            {storyTimeline.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="h-4 w-4 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {idx < storyTimeline.length - 1 && (
                    <div className="h-full w-0.5 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <Text as="p" variant="muted" className="mb-2 font-medium">
                    {item.period}
                  </Text>
                  <Text as="p" variant="large" className="mb-2">
                    {item.title}
                  </Text>
                  <Text as="p" variant="body" className="text-muted-foreground">
                    {item.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Principles */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <H2 className="mb-8">Triết lý & nguyên tắc làm việc</H2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <Text as="p" variant="large" className="mb-2">
                  {principle.title}
                </Text>
                <Text as="p" variant="muted" className="leading-relaxed">
                  {principle.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Stats */}
      <ProsfinSectionWrapper>
        <div>
          <H2 className="mb-8">ProsFIN trong số liệu</H2>
          <div className="grid gap-6 md:grid-cols-3">
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

      {/* Team */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <H2 className="mb-8">Đội ngũ</H2>
          <TeamGrid team={team} />
        </div>
      </ProsfinSectionWrapper>

      {/* Compliance */}
      <ProsfinSectionWrapper>
        <div>
          <H2 className="mb-8">Compliance & Professional Standards</H2>
          <div className="space-y-6">
            {complianceNotes.map((note, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <Text as="p" variant="large" className="mb-2">
                  {note.title}
                </Text>
                <Text as="p" variant="muted" className="leading-relaxed">
                  {note.content}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <H2 className="mb-4">Gặp gỡ ProsFIN trong buổi tư vấn đầu tiên</H2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

