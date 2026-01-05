/**
 * PrivacyPanel - Privacy & Data Use mini panel
 * 
 * Collapsible panel showing what data is collected and how it's used.
 */

"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrivacyPanelProps {
  className?: string;
}

/**
 * PrivacyPanel - Privacy information panel
 */
export function PrivacyPanel({ className }: PrivacyPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("rounded-lg border bg-muted/50 p-4", className)}>
      <Button
        variant="ghost"
        className="w-full justify-between p-0 h-auto font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Bảo mật & Sử dụng dữ liệu</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      {isOpen && (
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Dữ liệu chúng tôi thu thập:</strong> Tên, email, số điện thoại,
            tên công ty, và thông tin bạn cung cấp trong form.
          </p>
          <p>
            <strong>Cách sử dụng:</strong> Để liên hệ và tư vấn cho bạn, cải thiện
            dịch vụ, và gửi thông tin liên quan (nếu bạn đồng ý).
          </p>
          <p>
            <strong>Thời gian phản hồi:</strong> Chúng tôi sẽ liên hệ trong vòng 24
            giờ làm việc.
          </p>
          <p className="text-xs">
            Xem chi tiết tại{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Chính sách bảo mật
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

