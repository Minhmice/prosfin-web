"use client";

import * as React from "react";
import { ProsfinPrimaryButton } from "../button/prosfin-primary-button";
import { ProsfinGhostButton } from "../button/prosfin-ghost-button";
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
  const [isVisible, setIsVisible] = React.useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem("prosfin-cookie-consent");
  });

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

