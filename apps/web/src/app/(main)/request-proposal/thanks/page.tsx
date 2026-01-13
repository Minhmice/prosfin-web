import type { Metadata } from "next";
import Link from "next/link";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";

interface ThanksPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for thank-you page
 * 
 * Note: This page is noindex to avoid indexing confirmation pages.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cảm ơn bạn | ProsFIN",
    description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm nhất.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const resolvedSearchParams = await searchParams;
  const submissionId = resolvedSearchParams.submissionId as string | undefined;

  return (
    <ProsfinSectionWrapper background="default" padding="lg">
      <ProsfinContainer>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Chúng tôi đã nhận được yêu cầu
            </h1>
            <p className="text-lg text-muted-foreground">
              Cảm ơn bạn đã gửi yêu cầu đề xuất dịch vụ cho ProsFIN.
            </p>
          </div>

          {submissionId && (
            <div className="rounded-lg border bg-muted/50 p-4 text-sm">
              <p className="text-muted-foreground">
                Mã yêu cầu: <span className="font-mono font-medium">{submissionId}</span>
              </p>
            </div>
          )}

          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-xl font-semibold mb-2">Điều gì sẽ xảy ra tiếp theo?</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • ProsFIN sẽ xem xét yêu cầu của bạn và phản hồi trong vòng 24-48
                  giờ làm việc.
                </li>
                <li>
                  • Nếu cần, đội ngũ sẽ liên hệ để yêu cầu bổ sung thông tin hoặc tài
                  liệu.
                </li>
                <li>
                  • Chúng tôi sẽ gửi đề xuất dịch vụ chi tiết phù hợp với nhu cầu của
                  bạn.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trong thời gian chờ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProsfinPrimaryButton href="/services" variant="outline" className="w-full">
                Xem các dịch vụ
              </ProsfinPrimaryButton>
              <ProsfinPrimaryButton href="/insights" variant="outline" className="w-full">
                Đọc góc nhìn
              </ProsfinPrimaryButton>
            </div>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Nếu bạn có câu hỏi khẩn cấp, vui lòng{" "}
              <Link href="/contact" className="text-primary underline hover:no-underline">
                liên hệ trực tiếp
              </Link>{" "}
              với chúng tôi.
            </p>
          </div>
        </div>
      </ProsfinContainer>
    </ProsfinSectionWrapper>
  );
}

