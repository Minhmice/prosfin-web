import type { Metadata } from "next";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  Text,
  H2,
} from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "Tuyên bố miễn trừ trách nhiệm | ProsFIN",
  description: "Tuyên bố miễn trừ trách nhiệm của ProsFIN",
  alternates: {
    canonical: canonicalForRoute("/disclaimer"),
  },
};

/**
 * Disclaimer Page
 */
export default function DisclaimerPage() {
  return (
    <>
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title="Tuyên bố miễn trừ trách nhiệm"
          subtitle="Thông tin chung, không thay thế tư vấn chuyên nghiệp"
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      <ProsfinSectionWrapper>
        <div className="prose prose-sm max-w-none">
          <H2 className="mb-4">Thông tin chung</H2>
          <Text as="p" variant="body" className="mb-4">
            Các thông tin, công cụ, và nội dung trên website ProsFIN được cung
            cấp với mục đích tham khảo và giáo dục. Chúng không phải là tư vấn
            tài chính, kế toán, thuế, hoặc pháp lý chuyên nghiệp.
          </Text>

          <H2 className="mb-4">Không thay thế tư vấn chuyên nghiệp</H2>
          <Text as="p" variant="body" className="mb-4">
            Bạn nên tham khảo ý kiến của các chuyên gia tài chính, kế toán,
            thuế, hoặc pháp lý có trình độ trước khi đưa ra bất kỳ quyết định
            quan trọng nào liên quan đến tài chính doanh nghiệp của bạn.
          </Text>

          <H2 className="mb-4">Không đảm bảo kết quả</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN không đảm bảo rằng việc sử dụng các công cụ, thông tin, hoặc
            dịch vụ của chúng tôi sẽ dẫn đến kết quả tài chính cụ thể. Kết quả
            có thể khác nhau tùy thuộc vào tình hình cụ thể của từng doanh
            nghiệp.
          </Text>

          <H2 className="mb-4">Độ chính xác thông tin</H2>
          <Text as="p" variant="body" className="mb-4">
            Mặc dù ProsFIN cố gắng đảm bảo tính chính xác của thông tin, chúng
            tôi không đảm bảo rằng tất cả thông tin trên website là hoàn toàn
            chính xác, đầy đủ, hoặc cập nhật.
          </Text>

          <H2 className="mb-4">Rủi ro</H2>
          <Text as="p" variant="body" className="mb-4">
            Việc sử dụng thông tin và công cụ trên website là rủi ro của bạn.
            ProsFIN không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
            từ việc sử dụng hoặc dựa vào thông tin trên website.
          </Text>

          <H2 className="mb-4">Liên hệ</H2>
          <Text as="p" variant="body" className="mb-4">
            Để được tư vấn chuyên nghiệp phù hợp với tình hình cụ thể của doanh
            nghiệp bạn, vui lòng liên hệ với chúng tôi tại{" "}
            <a href="/contact" className="text-primary hover:underline">
              /contact
            </a>
            .
          </Text>

          <Text as="p" variant="muted" className="mt-8 text-sm">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
          </Text>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

