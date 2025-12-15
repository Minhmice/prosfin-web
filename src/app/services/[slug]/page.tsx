import { notFound } from "next/navigation";
import { servicesDetailMap } from "@/data/services-detail";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/prosfin-secondary-button";
import { ProsfinFaqAccordion } from "@/components/shared/accordion/prosfin-faq-accordion";
import Link from "next/link";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Service Detail Page
 * 
 * Trang chi tiết từng dịch vụ.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesDetailMap[slug];

  if (!service) {
    notFound();
  }

  const {
    hero,
    problems,
    outcomes,
    steps,
    deliverables,
    exclusions,
    timeline,
    format,
    requirementsFromClient,
    pricingNote,
    relatedCases,
    faqs,
  } = service;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {hero.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          <ul className="mb-8 space-y-3 max-w-3xl">
            {hero.summaryBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  •
                </span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ProsfinPrimaryButton href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ProsfinPrimaryButton>
            <ProsfinSecondaryButton href={hero.secondaryCta.href} size="lg">
              {hero.secondaryCta.label}
            </ProsfinSecondaryButton>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Problem → Outcome */}
      <ProsfinSectionWrapper>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Vấn đề bạn đang gặp
            </h2>
            <ul className="space-y-3">
              {problems.map((problem, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-destructive" aria-hidden="true">
                    •
                  </span>
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Sau khi hoàn thành gói, bạn sẽ...
            </h2>
            <ul className="space-y-3">
              {outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary" aria-hidden="true">
                    ✓
                  </span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Steps */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Chi tiết nội dung gói
          </h2>
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                    aria-label={`Bước ${idx + 1}`}
                  >
                    {idx + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div>
                  <p className="mb-2 text-sm font-medium">Deliverables:</p>
                  <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                    {step.deliverables.map((deliverable, i) => (
                      <li key={i}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Deliverables & Exclusions */}
      <ProsfinSectionWrapper>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Deliverables
            </h2>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              {deliverables.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {exclusions && exclusions.length > 0 && (
            <div className="max-w-2xl">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                Không bao gồm
              </h2>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
                {exclusions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ProsfinSectionWrapper>

      {/* Timeline, Format, Requirements */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Thời gian thực hiện
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {timeline}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Hình thức làm việc
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {format}
              </p>
            </div>
            {pricingNote && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">Phí tham khảo</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {pricingNote}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">
              Khách cần chuẩn bị:
            </h3>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              {requirementsFromClient.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Related Cases */}
      {relatedCases && relatedCases.length > 0 && (
        <ProsfinSectionWrapper>
          <div>
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Case study liên quan
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedCases.map((caseItem) => (
                <div
                  key={caseItem.slug}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold">
                    {caseItem.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-sm text-muted-foreground">
                    {caseItem.summary}
                  </p>
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
        </ProsfinSectionWrapper>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <div>
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Câu hỏi thường gặp về gói này
            </h2>
            <ProsfinFaqAccordion
              items={faqs.map((faq) => ({
                id: faq.question,
                question: faq.question,
                answer: faq.answer,
              }))}
            />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Final CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Mô tả ngắn gọn tình hình hiện tại
          </h2>
          <p className="mb-6 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            ProsFIN sẽ đề xuất xem gói này có phù hợp không.
          </p>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch trao đổi
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}
