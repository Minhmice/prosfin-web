import type { Metadata } from "next";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  Text,
  H2,
} from "@/components/shared";
import { canonicalForRoute } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  title: "Chính sách Cookie | ProsFIN",
  description: "Chính sách sử dụng cookie của ProsFIN",
  alternates: {
    canonical: canonicalForRoute("/cookie"),
  },
};

/**
 * Cookie Policy Page
 */
export default function CookiePage() {
  return (
    <>
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          title="Chính sách Cookie"
          subtitle="Thông tin về cách ProsFIN sử dụng cookie"
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      <ProsfinSectionWrapper>
        <div className="prose prose-sm max-w-none">
          <H2 className="mb-4">1. Cookie là gì?</H2>
          <Text as="p" variant="body" className="mb-4">
            Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi
            bạn truy cập website. Cookie giúp website hoạt động hiệu quả hơn và
            cung cấp thông tin cho chủ sở hữu website.
          </Text>

          <H2 className="mb-4">2. Các loại cookie chúng tôi sử dụng</H2>
          <Text as="p" variant="body" className="mb-4">
            ProsFIN sử dụng các loại cookie sau:
          </Text>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Cookie cần thiết:</strong> Giúp website hoạt động cơ bản
            </li>
            <li>
              <strong>Cookie phân tích:</strong> Giúp chúng tôi hiểu cách người
              dùng tương tác với website
            </li>
            <li>
              <strong>Cookie chức năng:</strong> Ghi nhớ các lựa chọn của bạn
            </li>
          </ul>

          <H2 className="mb-4">3. Quản lý cookie</H2>
          <Text as="p" variant="body" className="mb-4">
            Bạn có thể quản lý hoặc xóa cookie thông qua cài đặt trình duyệt của
            mình. Tuy nhiên, việc vô hiệu hóa cookie có thể ảnh hưởng đến chức
            năng của website.
          </Text>

          <H2 className="mb-4">4. Cookie của bên thứ ba</H2>
          <Text as="p" variant="body" className="mb-4">
            Một số cookie có thể được đặt bởi các dịch vụ bên thứ ba xuất hiện
            trên trang của chúng tôi, chẳng hạn như Google Analytics.
          </Text>

          <H2 className="mb-4">5. Liên hệ</H2>
          <Text as="p" variant="body" className="mb-4">
            Nếu bạn có câu hỏi về chính sách cookie, vui lòng liên hệ với chúng
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

