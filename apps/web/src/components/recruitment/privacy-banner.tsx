"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PrivacyBannerProps {
  className?: string;
}

/**
 * PrivacyBanner - Banner hiển thị thông báo về privacy trên talent pool pages
 */
export function PrivacyBanner({ className }: PrivacyBannerProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground",
        className
      )}
    >
      <p>
        <strong>Lưu ý:</strong> Thông tin hiển thị là mức cơ bản. Liên hệ ProsFIN
        để nhận hồ sơ chi tiết theo quy trình bảo mật.
      </p>
      {/* Note: Privacy/Terms links sẽ được thêm sau khi có legal pages */}
    </div>
  );
}

