import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPresetBySlug, getServicesForPreset, getPresetStaticParams } from "@/lib/content/presets";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { robotsForRoute } from "@/lib/seo/robots";
import { buildOg } from "@/lib/seo/open-graph";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ServiceCardV2 } from "@/components/services/discovery/service-card-v2";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { FaqCategoryAccordion } from "@/components/faq/faq-category-accordion";
import { faqPageContent } from "@/data/faq-page";

interface PresetPageProps {
  params: Promise<{ preset: string }>;
}

/**
 * Generate static params for all presets
 */
export async function generateStaticParams() {
  return getPresetStaticParams();
}

/**
 * Generate metadata for preset page
 */
export async function generateMetadata({
  params,
}: PresetPageProps): Promise<Metadata> {
  const { preset } = await params;
  const presetData = getPresetBySlug(preset);

  if (!presetData) {
    return {
      title: "Preset Not Found | ProsFIN",
    };
  }

  const canonicalUrl = canonicalForRoute(`/services/presets/${preset}`);
  const robots = robotsForRoute({ index: true, follow: true });
  const og = buildOg({
    title: presetData.title,
    description: presetData.description,
    url: canonicalUrl,
    type: "website",
  });

  return {
    title: `${presetData.title} | ProsFIN`,
    description: presetData.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: og,
    twitter: {
      card: "summary_large_image",
      title: presetData.title,
      description: presetData.description,
    },
  };
}

/**
 * Preset Page
 * 
 * Indexable preset page with intro, recommended services, proof, FAQ, CTA.
 */
export default async function PresetPage({ params }: PresetPageProps) {
  const { preset } = await params;
  const presetData = getPresetBySlug(preset);

  if (!presetData) {
    notFound();
  }

  const services = getServicesForPreset(presetData);

  // Get FAQ items by IDs
  const faqItems = presetData.faqIds
    ? faqPageContent.items
        .filter((item) => presetData.faqIds?.includes(item.id))
        .map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answerLong,
        }))
    : [];

  // Generate ItemList schema for preset
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": presetData.title,
    "description": presetData.description,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.excerpt || service.shortDescription,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn"}/services/${service.slug}`,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="preset-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title={presetData.title}
          subtitle={presetData.description}
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      {/* Intro Section */}
      <ProsfinSectionWrapper>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground">{presetData.intro}</p>
        </div>
      </ProsfinSectionWrapper>

      {/* Recommended Services */}
      {services.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <ProsfinSectionHeading
            title="Dịch vụ được đề xuất"
            subtitle="Các dịch vụ phù hợp với nhu cầu của bạn"
            align="left"
            titleSize="lg"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCardV2 key={service.id} service={service} />
            ))}
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* FAQ Mini */}
      {faqItems.length > 0 && (
        <ProsfinSectionWrapper>
          <ProsfinSectionHeading
            title="Câu hỏi thường gặp"
            subtitle="Giải đáp các thắc mắc về dịch vụ"
            align="left"
            titleSize="lg"
          />
          <FaqCategoryAccordion items={faqItems} />
        </ProsfinSectionWrapper>
      )}

      {/* CTA Section */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <ProsfinSectionHeading
            title="Sẵn sàng bắt đầu?"
            subtitle="Liên hệ với chúng tôi để được tư vấn miễn phí"
            align="center"
            titleSize="lg"
          />
          <div className="mt-8">
            <ProsfinPrimaryButton href="/contact" size="lg">
              Đặt lịch tư vấn miễn phí
            </ProsfinPrimaryButton>
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

