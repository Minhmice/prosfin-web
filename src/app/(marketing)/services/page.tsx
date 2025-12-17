import { servicesPageContent } from "@/data/services-page";
import {
  H2,
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
  ProsfinSecondaryButton,
  ProsfinServiceCardWrapper,
  Text,
} from "@/components/shared";
import Link from "next/link";

/**
 * Services Page
 * 
 * Trang tổng quan về các dịch vụ của ProsFIN.
 */
export default function ServicesPage() {
  const { hero, packages, valueProps, miniCases, faqs } =
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
          <H2 className="mb-8">Các gói dịch vụ</H2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <H2 className="mb-8">ProsFIN làm việc khác biệt như thế nào?</H2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div
                key={prop.id}
                className="rounded-lg border bg-card p-4 shadow-sm md:p-6"
              >
                <Text as="p" variant="large" className="mb-2">
                  {prop.title}
                </Text>
                <Text as="p" variant="muted" className="leading-relaxed">
                  {prop.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Mini Cases */}
      <ProsfinSectionWrapper>
        <div>
          <H2 className="mb-8">Câu chuyện khách hàng</H2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {miniCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="rounded-lg border bg-card p-4 shadow-sm md:p-6"
              >
                <Text as="p" variant="muted" className="mb-2 font-medium">
                  Tình huống
                </Text>
                <Text as="p" variant="body" className="mb-4">
                  {caseItem.situation}
                </Text>
                <Text as="p" variant="muted" className="mb-2 font-medium">
                  Kết quả
                </Text>
                <Text as="p" variant="body" className="mb-4">
                  {caseItem.result}
                </Text>
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
          <H2 className="mb-8">Câu hỏi thường gặp về dịch vụ</H2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-lg border bg-card p-4 shadow-sm md:p-6"
              >
                <Text as="p" variant="large" className="mb-2">
                  {faq.question}
                </Text>
                <Text as="p" variant="muted" className="leading-relaxed">
                  {faq.answer}
                </Text>
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

