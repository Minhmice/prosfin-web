import { servicesPageContent } from "@/data/services-page";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/prosfin-secondary-button";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/prosfin-service-card-wrapper";
import Link from "next/link";

/**
 * Services Page
 * 
 * Trang tổng quan về các dịch vụ của ProsFIN.
 */
export default function ServicesPage() {
  const { hero, packages, segments, valueProps, miniCases, faqs } =
    servicesPageContent;

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
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ProsfinPrimaryButton href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </ProsfinPrimaryButton>
          <ProsfinSecondaryButton href={hero.secondaryCta.href} size="lg">
            {hero.secondaryCta.label}
          </ProsfinSecondaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Service Packages Grid */}
      <ProsfinSectionWrapper>
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Các gói dịch vụ</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <ProsfinServiceCardWrapper
                key={pkg.id}
                title={pkg.title}
                description={pkg.scope}
                benefits={pkg.benefits}
                idealClient={pkg.targetAudience.join(", ")}
                cta={
                  <ProsfinSecondaryButton
                    href={`/services/${pkg.slug}`}
                    className="w-full"
                  >
                    Xem chi tiết
                  </ProsfinSecondaryButton>
                }
              />
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Value Props */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            ProsFIN làm việc khác biệt như thế nào?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div
                key={prop.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Mini Cases */}
      <ProsfinSectionWrapper>
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Câu chuyện khách hàng
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {miniCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Tình huống
                </p>
                <p className="mb-4 leading-relaxed">{caseItem.situation}</p>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Kết quả
                </p>
                <p className="mb-4 leading-relaxed">{caseItem.result}</p>
                <Link
                  href={`/case-studies/${caseItem.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  aria-label={`Xem chi tiết case study: ${caseItem.slug}`}
                >
                  Xem chi tiết →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ProsfinSecondaryButton href="/case-studies">
              Xem thêm câu chuyện khách hàng
            </ProsfinSecondaryButton>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* FAQ */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Câu hỏi thường gặp về dịch vụ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ProsfinSecondaryButton href="/faq">
              Xem thêm câu hỏi thường gặp
            </ProsfinSecondaryButton>
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

