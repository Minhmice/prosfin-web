import * as React from "react";
import { H2, ProsfinPrimaryButton } from "@/components/shared";

export function ProcessFinalCta() {
  return (
    <div className="text-center">
      <H2 className="mb-4">Bắt đầu từ bước 1: Khám sức khỏe tài chính</H2>
      <ProsfinPrimaryButton href="/contact" size="lg">
        Đặt lịch trao đổi
      </ProsfinPrimaryButton>
    </div>
  );
}


