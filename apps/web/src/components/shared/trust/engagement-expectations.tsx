/**
 * EngagementExpectations - Micro-copy về timeline, next steps, required inputs
 * 
 * Shows engagement expectations near CTAs.
 */

import * as React from "react";
import { Clock, CheckCircle2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface EngagementExpectationsProps {
  className?: string;
}

/**
 * EngagementExpectations - Engagement expectations info
 */
export function EngagementExpectations({ className }: EngagementExpectationsProps) {
  return (
    <div className={cn("space-y-3 text-sm text-muted-foreground", className)}>
      <div className="flex items-start gap-2">
        <Clock className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <strong className="text-foreground">Thời gian phản hồi:</strong> Chúng tôi
          sẽ liên hệ trong vòng 24 giờ làm việc.
        </div>
      </div>
      <div className="flex items-start gap-2">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <strong className="text-foreground">Bước tiếp theo:</strong> Buổi trao đổi
          đầu tiên 30 phút miễn phí để đánh giá nhu cầu.
        </div>
      </div>
      <div className="flex items-start gap-2">
        <FileText className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <strong className="text-foreground">Thông tin cần thiết:</strong> Tên, email,
          số điện thoại và mô tả ngắn về nhu cầu của bạn.
        </div>
      </div>
    </div>
  );
}

