import * as React from "react";
import Link from "next/link";
import { Download, ArrowLeft, Calendar } from "lucide-react";
import { ProsfinSectionWrapper, ProsfinSectionHeading, ProsfinPrimaryButton, ProsfinSecondaryButton } from "@/components/shared";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";

/**
 * Thanks Page - Thank you page với download link checklist
 */
export default function ClearDataThanksPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "ProsFIN ClearData™", href: "/services/cleardata" },
    { label: "Cảm ơn" },
  ];

  // TODO: Replace with actual checklist download link
  const checklistDownloadLink = "/downloads/cleardata-checklist.pdf";

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper padding="sm" background="default">
        <SiteBreadcrumbs items={breadcrumbItems} />
      </ProsfinSectionWrapper>

      {/* Thanks Content */}
      <ProsfinSectionWrapper background="muted" padding="xl">
        <div className="max-w-2xl mx-auto text-center">
          <ProsfinSectionHeading
            title="Cảm ơn bạn. Checklist CLEAR đã được ghi nhận."
            subtitle="Chúng tôi sẽ gửi checklist qua email/Zalo. Nếu bạn muốn đi nhanh hơn, đặt lịch tư vấn 15–30 phút."
            align="center"
            titleSize="xl"
          />

          {/* Download Button */}
          <div className="mt-10 mb-8">
            <a
              href={checklistDownloadLink}
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Tải Checklist CLEAR</span>
            </a>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <ProsfinPrimaryButton href="/contact" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch tư vấn</span>
            </ProsfinPrimaryButton>

            <ProsfinSecondaryButton href="/services/cleardata" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang</span>
            </ProsfinSecondaryButton>
          </div>

          {/* Note */}
          <p className="text-sm text-muted-foreground">
            Nếu không thấy email, hãy kiểm tra Spam/Promotions.
          </p>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

