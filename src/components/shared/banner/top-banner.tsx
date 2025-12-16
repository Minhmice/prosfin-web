"use client";

import * as React from "react";
import { X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProsfinTopBannerProps {
  /**
   * Banner message
   */
  message: string;
  /**
   * Optional action link
   */
  actionLabel?: string;
  /**
   * Action link href
   */
  actionHref?: string;
  /**
   * Dismissible
   * @default true
   */
  dismissible?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinTopBanner - Top notification banner component
 * 
 * Hiển thị disclaimer/notification ở top của trang.
 * Dùng cho legal notices, important announcements.
 * Component riêng cho layout.
 */
export function ProsfinTopBanner({
  message,
  actionLabel,
  actionHref,
  dismissible = true,
  className,
}: ProsfinTopBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-b bg-muted/50 px-4 py-2 text-sm",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-muted-foreground">
            {message}
            {actionLabel && actionHref && (
              <a
                href={actionHref}
                className="ml-2 font-medium text-foreground underline hover:no-underline"
              >
                {actionLabel}
              </a>
            )}
          </p>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

