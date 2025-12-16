import Link from "next/link";
import { H1, H2, ProsfinPrimaryButton, Text } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";

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
          <H1>404</H1>
          <H2>Trang bạn tìm không tồn tại</H2>
          <Text as="p" variant="lead" className="max-w-md">
            Có thể link đã sai hoặc nội dung đã được cập nhật.
          </Text>
          <ProsfinPrimaryButton href="/">
            Quay về trang chủ
          </ProsfinPrimaryButton>
        </div>
      </ProsfinContainer>
    </div>
  );
}

