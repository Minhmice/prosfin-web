import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/services/getServiceCatalog";
import { buildServicesHubMetadata } from "@/lib/services/serviceMeta";
import { buildServicesHubBreadcrumb } from "@/lib/services/servicesBreadcrumb";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";

/**
 * Services Hub Page
 * 
 * Main services page với 5 pillars grid (categories).
 * Data-driven từ services.catalog.ts
 */
export async function generateMetadata(): Promise<Metadata> {
  return buildServicesHubMetadata();
}

export default async function ServicesHubPage() {
  const categories = getCategories();
  const breadcrumbs = buildServicesHubBreadcrumb();

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <SiteBreadcrumbs items={breadcrumbs} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Hero Section */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="space-y-6 max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Dịch vụ ProsFIN
            </h1>
            <p className="text-lg text-muted-foreground">
              Chuẩn pháp luật – tăng lợi nhuận – giảm rủi ro. Các dịch vụ tài
              chính, kế toán, và tư vấn chuyên nghiệp cho doanh nghiệp.
            </p>
            <ProsfinPrimaryButton href="/request-proposal" size="lg">
              Gửi yêu cầu tư vấn
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* 5 Pillars Grid */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Khám phá các nhóm dịch vụ</h2>
              <p className="text-muted-foreground">
                Chọn nhóm dịch vụ phù hợp với nhu cầu của bạn
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/services/${category.slug}`}
                  className={cn(
                    "group relative rounded-lg border bg-card p-6 transition-all",
                    "hover:border-primary hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {index + 1}.
                      </span>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.label}
                      </h3>
                    </div>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                      Xem các dịch vụ →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Proof Strip */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold">Tiêu chuẩn làm việc</h3>
              <p className="text-sm text-muted-foreground">
                Tuân thủ chuẩn mực Big4 và quy định pháp luật
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Bảo mật</h3>
              <p className="text-sm text-muted-foreground">
                Bảo mật thông tin và dữ liệu doanh nghiệp
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Thực chiến</h3>
              <p className="text-sm text-muted-foreground">
                Kinh nghiệm từ các dự án thực tế
              </p>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Final CTA */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">
              Bạn cần tư vấn về dịch vụ nào?
            </h2>
            <p className="text-muted-foreground">
              Liên hệ với chúng tôi để được tư vấn miễn phí về các giải pháp
              phù hợp với doanh nghiệp của bạn.
            </p>
            <ProsfinPrimaryButton href="/request-proposal" size="lg">
              Gửi yêu cầu tư vấn
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}
