"use client";

import * as React from "react";
import { ProsfinPrimaryButton } from "../button/primary-button";
import { ProsfinGhostButton } from "../button/ghost-button";
import { cn } from "@/lib/utils";

export interface ProsfinCookieBannerProps {
  /**
   * Privacy policy link
   */
  privacyHref?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinCookieBanner - Cookie consent banner component
 * 
 * Hiển thị cookie/privacy notice ở cạnh đáy trang.
 * Dùng cho compliance với privacy regulations.
 * Component riêng cho layout.
 */
export function ProsfinCookieBanner({
  privacyHref = "/privacy",
  className,
}: ProsfinCookieBannerProps) {
  // Tránh hydration mismatch: lần render đầu trên server và client phải ra cùng markup.
  // Sau khi mount mới đọc localStorage để quyết định ẩn/hiện.
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    try {
      const hasConsent = !!localStorage.getItem("prosfin-cookie-consent");
      if (hasConsent) setIsVisible(false);
    } catch {
      // Nếu localStorage bị chặn (privacy mode), giữ banner để người dùng có thể chấp nhận.
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("prosfin-cookie-consent", "accepted");
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          ProsFIN sử dụng cookie để cải thiện trải nghiệm. Bạn có thể xem chi
          tiết tại{" "}
          <a
            href={privacyHref}
            className="font-medium text-foreground underline hover:no-underline"
          >
            Chính sách bảo mật
          </a>
          .
        </p>
        <div className="flex gap-3">
          <ProsfinGhostButton onClick={handleAccept} size="sm">
            Từ chối
          </ProsfinGhostButton>
          <ProsfinPrimaryButton onClick={handleAccept} size="sm">
            Đồng ý
          </ProsfinPrimaryButton>
        </div>
      </div>
    </div>
  );
}

