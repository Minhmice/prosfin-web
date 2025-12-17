import * as React from "react";
import { H2, ProsfinPrimaryButton, Text } from "@/components/shared";

export function ServiceFinalCta() {
  return (
    <div className="text-center">
      <H2 className="mb-4">Mô tả ngắn gọn tình hình hiện tại</H2>
      <Text as="p" variant="lead" className="mb-6 mx-auto max-w-2xl">
        ProsFIN sẽ đề xuất xem gói này có phù hợp không.
      </Text>
      <ProsfinPrimaryButton href="/contact" size="lg">
        Đặt lịch trao đổi
      </ProsfinPrimaryButton>
    </div>
  );
}


