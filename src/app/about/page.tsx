import { aboutPageContent } from "@/data/about-page";
import { aboutSectionContent } from "@/data/about-content";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";
import { ProsfinMetricPill } from "@/components/shared/stat/prosfin-metric-pill";
import { TeamGrid } from "@/components/landing/about/team-grid";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";

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
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Câu chuyện hình thành
          </h2>
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
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    {item.period}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Principles */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Triết lý & nguyên tắc làm việc
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Stats */}
      <ProsfinSectionWrapper>
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            ProsFIN trong số liệu
          </h2>
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
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Đội ngũ</h2>
          <TeamGrid team={team} />
        </div>
      </ProsfinSectionWrapper>

      {/* Compliance */}
      <ProsfinSectionWrapper>
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Compliance & Professional Standards
          </h2>
          <div className="space-y-6">
            {complianceNotes.map((note, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{note.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Gặp gỡ ProsFIN trong buổi tư vấn đầu tiên
          </h2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch tư vấn
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

