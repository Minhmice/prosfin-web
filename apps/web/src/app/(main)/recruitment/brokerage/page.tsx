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
 * Generate static params for brokerage page
 */
export async function generateStaticParams() {
  return [{ slug: "moi-gioi-tuyen-dung" }];
}

/**
 * Generate metadata for brokerage page
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = getRecruitmentPageBySlug("moi-gioi-tuyen-dung");
  if (!page) {
    return {
      title: "Môi giới tuyển dụng | ProsFIN",
    };
  }
  return getRecruitmentPageMetadata(page);
}

export default async function BrokeragePage() {
  const page = getRecruitmentPageBySlug("moi-gioi-tuyen-dung");

  if (!page) {
    notFound();
  }

  const breadcrumbs = getRecruitmentPageBreadcrumb(page);

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
            <h1 className="text-4xl font-bold tracking-tight">{page.label}</h1>
            {page.description && (
              <p className="text-lg text-muted-foreground">
                {page.description}
              </p>
            )}
            <ProsfinPrimaryButton href={recruitmentCatalog.ctaDefaults.brokerage} size="lg">
              Gửi yêu cầu tuyển dụng
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Problem Framing */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Vấn đề thường gặp</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Doanh nghiệp không cần nhân sự "giỏi nhất" trên thị trường, mà cần
                nhân sự <strong>phù hợp</strong> với nhu cầu quản trị hiện tại và
                tương lai của doanh nghiệp.
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>
                  Khó tìm ứng viên có đủ năng lực chuyên môn và phù hợp với văn hóa
                  doanh nghiệp
                </li>
                <li>
                  Không biết cách đánh giá ứng viên một cách toàn diện (năng lực +
                  hành vi)
                </li>
                <li>
                  Tốn nhiều thời gian và chi phí cho quy trình tuyển dụng nhưng không
                  tìm được người phù hợp
                </li>
                <li>
                  Nhân sự được tuyển không đáp ứng được kỳ vọng sau khi vào làm việc
                </li>
              </ul>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Dành cho */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Dành cho</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Chủ doanh nghiệp
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                CEO
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                CFO
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Kế toán trưởng (KTT)
              </span>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* ProsFIN cung cấp */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">ProsFIN cung cấp</h2>
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Thu thập nhu cầu:</strong> Phân tích nhu cầu quản trị của
                doanh nghiệp và chuẩn hóa JD theo năng lực quản trị
              </li>
              <li>
                <strong>Sàng lọc & đánh giá:</strong> Đánh giá toàn diện năng lực
                chuyên môn và hành vi/tính cách của ứng viên
              </li>
              <li>
                <strong>Shortlist:</strong> Đề xuất danh sách ứng viên phù hợp với
                tiêu chí và phối hợp phỏng vấn
              </li>
              <li>
                <strong>Hỗ trợ onboarding:</strong> Hỗ trợ quá trình thử việc và
                onboarding (optional)
              </li>
            </ul>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Quy trình 5 bước */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Quy trình 5 bước</h2>
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </span>
                  <h3 className="text-lg font-semibold">Brief</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Thu thập nhu cầu và phân tích yêu cầu quản trị của doanh nghiệp.
                  Chuẩn hóa JD theo năng lực quản trị.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </span>
                  <h3 className="text-lg font-semibold">Screening</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Sàng lọc ứng viên từ nhiều nguồn và đánh giá sơ bộ năng lực chuyên
                  môn.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </span>
                  <h3 className="text-lg font-semibold">Shortlist</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Đánh giá toàn diện (năng lực + hành vi) và đề xuất danh sách ứng
                  viên phù hợp.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </span>
                  <h3 className="text-lg font-semibold">Interview loop</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Phối hợp phỏng vấn và hỗ trợ doanh nghiệp đánh giá ứng viên.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    5
                  </span>
                  <h3 className="text-lg font-semibold">Offer/Onboard</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Hỗ trợ thương lượng offer và onboarding (optional).
                </p>
              </div>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* SLA/Nguyên tắc làm việc */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Nguyên tắc làm việc</h2>
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Thời gian phản hồi:</strong> Phản hồi trong vòng 24-48 giờ
                sau khi nhận brief
              </li>
              <li>
                <strong>Số lượng shortlist:</strong> Đề xuất 3-5 ứng viên phù hợp nhất
                cho mỗi vị trí
              </li>
              <li>
                <strong>Vòng thay thế:</strong> Nếu ứng viên không phù hợp, ProsFIN
                sẽ tiếp tục tìm kiếm và đề xuất ứng viên mới
              </li>
            </ul>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">
              Sẵn sàng tìm nhân sự phù hợp?
            </h2>
            <p className="text-muted-foreground">
              Liên hệ với ProsFIN để được tư vấn về dịch vụ môi giới tuyển dụng nhân
              sự tài chính.
            </p>
            <ProsfinPrimaryButton href={recruitmentCatalog.ctaDefaults.brokerage} size="lg">
              Gửi yêu cầu tuyển dụng
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

