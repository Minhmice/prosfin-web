import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRecruitmentPageMetadata,
  getRecruitmentPageBreadcrumb,
} from "@/lib/recruitment/getRecruitmentRoutes";
import {
  getRecruitmentPageBySlug,
  recruitmentCatalog,
} from "@/content/recruitment.catalog";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";

/**
 * Generate static params for training page
 */
export async function generateStaticParams() {
  return [{ slug: "dao-tao-chuyen-mon" }];
}

/**
 * Generate metadata for training page
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = getRecruitmentPageBySlug("dao-tao-chuyen-mon");
  if (!page) {
    return {
      title: "Đào tạo chuyên môn | ProsFIN",
    };
  }
  return getRecruitmentPageMetadata(page);
}

export default async function TrainingPage() {
  const page = getRecruitmentPageBySlug("dao-tao-chuyen-mon");

  if (!page) {
    notFound();
  }

  const breadcrumbs = getRecruitmentPageBreadcrumb(page);

  const trainingAreas = [
    {
      title: "Năng lực tài chính DN",
      description:
        "Đào tạo về quản lý tài chính doanh nghiệp, dòng tiền, cấu trúc vốn, và phân tích tài chính.",
    },
    {
      title: "Kế toán quản trị",
      description:
        "Đào tạo về kế toán quản trị, costing, budgeting, và báo cáo quản trị.",
    },
    {
      title: "Thuế & tuân thủ",
      description:
        "Đào tạo về thuế (VAT, CIT, PIT), tuân thủ pháp luật, và quản lý rủi ro thuế.",
    },
    {
      title: "Kiểm soát nội bộ",
      description:
        "Đào tạo về xây dựng hệ thống kiểm soát nội bộ, đánh giá rủi ro, và compliance.",
    },
    {
      title: "Kỹ năng mềm",
      description:
        "Đào tạo về báo cáo, tư duy hệ thống, ownership, và kỹ năng làm việc nhóm.",
    },
  ];

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
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Đào tạo chuyên môn để hình thành nguồn nhân sự Tài chính – Kế toán chất
              lượng
            </h1>
            <p className="text-lg text-muted-foreground">
              {page.description}
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={recruitmentCatalog.ctaDefaults.training}>
                Đăng ký chương trình đào tạo
              </Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Các mảng đào tạo */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Các mảng đào tạo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingAreas.map((area, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-6 space-y-2"
                >
                  <h3 className="font-semibold">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Cơ chế "up talent" */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">
              Cơ chế "up talent" (Pipeline)
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </span>
                  <h3 className="text-lg font-semibold">Đào tạo</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Đào tạo chuyên môn theo các mảng: Tài chính, Kế toán, Thuế, Kiểm
                  soát nội bộ, và Kỹ năng mềm.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </span>
                  <h3 className="text-lg font-semibold">Đánh giá</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Đánh giá năng lực sau đào tạo để xác định mức độ thành thạo và khả
                  năng áp dụng kiến thức.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </span>
                  <h3 className="text-lg font-semibold">Gắn badge</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Gắn badge cho ứng viên đã hoàn thành đào tạo và đạt yêu cầu (VD: "Đã
                  đào tạo ProsFIN", "KTT", "CFO track").
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </span>
                  <h3 className="text-lg font-semibold">Đưa vào talent pool</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Đưa ứng viên vào talent pool public (basic profile) để doanh nghiệp
                  có thể xem và yêu cầu hồ sơ chi tiết.
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
              Sẵn sàng tham gia chương trình đào tạo?
            </h2>
            <p className="text-muted-foreground">
              Liên hệ với ProsFIN để đăng ký chương trình đào tạo chuyên môn và phát
              triển năng lực tài chính – kế toán.
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={recruitmentCatalog.ctaDefaults.training}>
                Đăng ký chương trình đào tạo
              </Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

