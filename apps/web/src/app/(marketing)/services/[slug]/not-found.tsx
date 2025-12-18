import Link from "next/link";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";

/**
 * Not Found page for service detail
 * 
 * Hiển thị khi slug không tồn tại
 */
export default function ServiceNotFound() {
  return (
    <ProsfinSectionWrapper padding="lg" background="default">
      <div className="mx-auto max-w-2xl text-center">
        <ProsfinSectionHeading
          title="Dịch vụ không tìm thấy"
          subtitle="Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
          align="center"
          titleSize="xl"
        />

        <div className="mt-8 space-y-4">
          <p className="text-muted-foreground">
            Có thể dịch vụ này đã được thay đổi hoặc bạn đã nhập sai đường dẫn.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ProsfinPrimaryButton href="/services" size="lg">
              Xem tất cả dịch vụ
            </ProsfinPrimaryButton>
            <Link
              href="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

