import type { Metadata } from "next";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  Text,
  H2,
} from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | ProsFIN",
  description: "Chính sách bảo mật thông tin của ProsFIN",
  alternates: {
    canonical: canonicalForRoute("/privacy"),
  },
};

/**
 * Privacy Policy Page
 */
export default function PrivacyPage() {
  return (
    <>
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title="Chính sách bảo mật"
          subtitle="ProsFIN cam kết bảo vệ thông tin cá nhân của bạn"
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      <ProsfinSectionWrapper>
        <div className="prose prose-sm max-w-none">
          <H2 className="mb-4">1. Thu thập thông tin</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN thu thập thông tin cá nhân khi bạn:
          </Text>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Điền form liên hệ hoặc đăng ký tư vấn</li>
            <li>Sử dụng các công cụ và tính năng trên website</li>
            <li>Liên hệ với chúng tôi qua email hoặc điện thoại</li>
          </ul>

          <H2 className="mb-4">2. Sử dụng thông tin</H2>
          <Text as="p" variant="body" className="mb-4">
            Thông tin cá nhân của bạn được sử dụng để:
          </Text>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Cung cấp dịch vụ tư vấn và hỗ trợ</li>
            <li>Gửi thông tin về dịch vụ và cập nhật</li>
            <li>Cải thiện trải nghiệm người dùng</li>
            <li>Tuân thủ các yêu cầu pháp lý</li>
          </ul>

          <H2 className="mb-4">3. Bảo mật thông tin</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin
            cá nhân của bạn khỏi truy cập trái phép, thay đổi, tiết lộ hoặc
            phá hủy.
          </Text>

          <H2 className="mb-4">4. Chia sẻ thông tin</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn
            với bên thứ ba, trừ khi:
          </Text>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Bạn đã đồng ý</li>
            <li>Yêu cầu bởi pháp luật</li>
            <li>Bảo vệ quyền và tài sản của ProsFIN</li>
          </ul>

          <H2 className="mb-4">5. Quyền của bạn</H2>
          <Text as="p" variant="body" className="mb-4">
            Bạn có quyền:
          </Text>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Truy cập và chỉnh sửa thông tin cá nhân</li>
            <li>Yêu cầu xóa thông tin cá nhân</li>
            <li>Từ chối nhận thông tin marketing</li>
          </ul>

          <H2 className="mb-4">6. Liên hệ</H2>
          <Text as="p" variant="body" className="mb-4">
            Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ với
            chúng tôi tại{" "}
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

