import type { Metadata } from "next";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  Text,
  H2,
} from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | ProsFIN",
  description: "Điều khoản sử dụng dịch vụ của ProsFIN",
  alternates: {
    canonical: canonicalForRoute("/terms"),
  },
};

/**
 * Terms of Service Page
 */
export default function TermsPage() {
  return (
    <>
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title="Điều khoản sử dụng"
          subtitle="Điều khoản và điều kiện sử dụng dịch vụ của ProsFIN"
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      <ProsfinSectionWrapper>
        <div className="prose prose-sm max-w-none">
          <H2 className="mb-4">1. Chấp nhận điều khoản</H2>
          <Text as="p" variant="body" className="mb-4">
            Bằng việc sử dụng website và dịch vụ của ProsFIN, bạn đồng ý với
            các điều khoản và điều kiện này.
          </Text>

          <H2 className="mb-4">2. Sử dụng dịch vụ</H2>
          <Text as="p" variant="body" className="mb-4">
            Bạn cam kết sử dụng dịch vụ của ProsFIN một cách hợp pháp và phù
            hợp với mục đích được cung cấp.
          </Text>

          <H2 className="mb-4">3. Quyền sở hữu trí tuệ</H2>
          <Text as="p" variant="body" className="mb-4">
            Tất cả nội dung trên website, bao gồm văn bản, hình ảnh, logo, và
            công cụ, là tài sản của ProsFIN và được bảo vệ bởi luật bản quyền.
          </Text>

          <H2 className="mb-4">4. Giới hạn trách nhiệm</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
            từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
          </Text>

          <H2 className="mb-4">5. Thay đổi điều khoản</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN có quyền thay đổi các điều khoản này bất cứ lúc nào. Việc
            tiếp tục sử dụng dịch vụ sau khi thay đổi được coi là bạn đã chấp
            nhận các điều khoản mới.
          </Text>

          <H2 className="mb-4">6. Liên hệ</H2>
          <Text as="p" variant="body" className="mb-4">
            Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ với chúng
            tôi tại{" "}
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

