import Link from "next/link";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { ProsfinContainer } from "@/components/layout/prosfin-container";

/**
 * NotFound - 404 page component
 * 
 * Page hiển thị khi route không tồn tại.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ProsfinContainer>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Trang bạn tìm không tồn tại
          </h2>
          <p className="max-w-md text-muted-foreground">
            Có thể link đã sai hoặc nội dung đã được cập nhật.
          </p>
          <ProsfinPrimaryButton href="/">
            Quay về trang chủ
          </ProsfinPrimaryButton>
        </div>
      </ProsfinContainer>
    </div>
  );
}

