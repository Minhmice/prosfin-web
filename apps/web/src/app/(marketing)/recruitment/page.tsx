import type { Metadata } from "next";
import Link from "next/link";
import { getRecruitmentHubMetadata, getRecruitmentHubBreadcrumb } from "@/lib/recruitment/getRecruitmentRoutes";
import { getAllRecruitmentPages, recruitmentCatalog } from "@/content/recruitment.catalog";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";

/**
 * Generate metadata for recruitment hub page
 */
export async function generateMetadata(): Promise<Metadata> {
  return getRecruitmentHubMetadata();
}

export default async function RecruitmentHubPage() {
  const pages = getAllRecruitmentPages();
  const breadcrumbs = getRecruitmentHubBreadcrumb();

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
              Giải pháp Tuyển dụng Nhân sự Tài chính cho Doanh nghiệp
            </h1>
            <p className="text-lg text-muted-foreground">
              Kết nối đúng người – đúng giai đoạn – đúng nhu cầu quản trị
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={recruitmentCatalog.ctaDefaults.brokerage}>
                Gửi yêu cầu tuyển dụng
              </Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* 2 Service Cards */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/recruitment/${page.slug}`}
                className={cn(
                  "group rounded-lg border bg-card p-6 transition-all",
                  "hover:border-primary hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {page.label}
                  </h3>
                  {page.description && (
                    <p className="text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                    Tìm hiểu thêm →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Highlight Strip: Vì sao khác biệt */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">
              Vì sao khác biệt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Phương pháp đánh giá năng lực + hành vi</h3>
                <p className="text-sm text-muted-foreground">
                  ProsFIN không chỉ đánh giá kỹ năng chuyên môn mà còn phân tích hành vi và tính cách để tìm ứng viên phù hợp với văn hóa doanh nghiệp.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Hiểu tiêu chí quản trị</h3>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi hiểu rõ nhu cầu quản trị của từng doanh nghiệp ở các giai đoạn khác nhau, từ đó đề xuất nhân sự phù hợp nhất.
                </p>
              </div>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">
              Sẵn sàng tìm nhân sự phù hợp?
            </h2>
            <p className="text-muted-foreground">
              Liên hệ với ProsFIN để được tư vấn về giải pháp tuyển dụng nhân sự tài chính phù hợp với doanh nghiệp của bạn.
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={recruitmentCatalog.ctaDefaults.brokerage}>
                Gửi yêu cầu tuyển dụng
              </Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

