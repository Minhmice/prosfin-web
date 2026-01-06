import type { Metadata } from "next";
import Link from "next/link";
import { RfpForm } from "@/components/rfp/rfp-form";
import { parseServiceFromQuery } from "@/lib/rfp/rfp.utils";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";

interface RequestProposalPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for request proposal page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yêu cầu đề xuất dịch vụ (RFP) | ProsFIN",
    description:
      "Gửi yêu cầu đề xuất dịch vụ cho ProsFIN. Tải lên tài liệu để làm rõ nhu cầu của bạn.",
    openGraph: {
      title: "Yêu cầu đề xuất dịch vụ (RFP) | ProsFIN",
      description:
        "Gửi yêu cầu đề xuất dịch vụ cho ProsFIN. Tải lên tài liệu để làm rõ nhu cầu của bạn.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn"}/request-proposal`,
      type: "website",
    },
  };
}

export default async function RequestProposalPage({
  searchParams,
}: RequestProposalPageProps) {
  const resolvedSearchParams = await searchParams;
  const preselectedService = parseServiceFromQuery(resolvedSearchParams.service);

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Yêu cầu đề xuất dịch vụ (RFP)
              </h1>
              <h2 className="text-2xl font-semibold text-muted-foreground">
                ProsFIN có thể hỗ trợ doanh nghiệp bạn như thế nào?
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cảm ơn bạn đã quan tâm tới dịch vụ của ProsFIN. Vui lòng dành ít
                phút hoàn tất biểu mẫu này. Bạn có thể tải lên tài liệu để làm rõ
                nhu cầu.
              </p>
              <p>
                <strong>Lưu ý:</strong> Hộp thư này chỉ tiếp nhận các yêu cầu đề
                xuất dịch vụ phù hợp; các liên hệ khác vui lòng chuyển qua trang{" "}
                <Link href="/contact" className="text-primary underline hover:no-underline">
                  Liên hệ
                </Link>
                .
              </p>
              <p className="text-sm">
                <span className="text-destructive">*</span> Các trường có dấu (*)
                là bắt buộc.
              </p>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Form Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card p-6">
                <RfpForm preselectedService={preselectedService} />
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* What happens next */}
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-lg font-semibold">Điều gì sẽ xảy ra tiếp theo?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <strong>ProsFIN sẽ phản hồi</strong> trong vòng 24-48 giờ làm
                    việc.
                  </li>
                  <li>
                    Nếu cần, đội ngũ sẽ yêu cầu bổ sung tài liệu để làm rõ phạm vi
                    dịch vụ.
                  </li>
                  <li>
                    Các thông tin được xử lý theo{" "}
                    <Link
                      href="/privacy"
                      className="text-primary underline hover:no-underline"
                    >
                      Chính sách quyền riêng tư
                    </Link>
                    .
                  </li>
                </ul>
              </div>

              {/* Not sure? */}
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-lg font-semibold">Chưa chắc bạn đang cần gì?</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Xem các dịch vụ của ProsFIN để hiểu rõ hơn về giải pháp phù hợp
                    với bạn.
                  </p>
                  <ProsfinPrimaryButton asChild size="sm" className="w-full">
                    <Link href="/services">Xem dịch vụ</Link>
                  </ProsfinPrimaryButton>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Bạn muốn trao đổi nhanh? Liên hệ trực tiếp với chúng tôi.
                  </p>
                  <ProsfinPrimaryButton asChild variant="outline" size="sm" className="w-full">
                    <Link href="/contact">Liên hệ</Link>
                  </ProsfinPrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

