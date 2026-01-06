import type { Metadata } from "next";
import { getAllIndustries } from "@/data/industries";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinSecondaryButton,
  Text,
  H3,
} from "@/components/shared";
import Link from "next/link";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "Industries | ProsFIN",
  description:
    "Giải pháp tài chính theo ngành nghề. F&B, Thương mại, Sản xuất, Dịch vụ và Xây dựng.",
  alternates: {
    canonical: canonicalForRoute("/industries"),
  },
};

/**
 * Industries Hub Page
 * 
 * Lists all industries with their top pains and recommended capabilities
 */
export default function IndustriesPage() {
  const industries = getAllIndustries();

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow="Industries"
          title="Giải pháp tài chính theo ngành nghề"
          subtitle="Mỗi ngành có những thách thức tài chính riêng. ProsFIN hiểu rõ đặc thù từng ngành và cung cấp giải pháp phù hợp."
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      {/* Industries Grid */}
      <ProsfinSectionWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <H3 className="mb-2 group-hover:text-primary">
                {industry.name}
              </H3>
              <Text as="p" variant="muted" className="mb-4 text-sm">
                {industry.shortDescription}
              </Text>
              <div className="space-y-2">
                <Text as="p" variant="muted" className="text-xs font-medium">
                  Thách thức chính:
                </Text>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {industry.topPains.slice(0, 3).map((pain, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground" />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                Xem chi tiết →
              </div>
            </Link>
          ))}
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <Text as="p" variant="large" className="mb-4">
            Không thấy ngành của bạn?
          </Text>
          <ProsfinSecondaryButton href="/contact" size="lg">
            Liên hệ với ProsFIN
          </ProsfinSecondaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

