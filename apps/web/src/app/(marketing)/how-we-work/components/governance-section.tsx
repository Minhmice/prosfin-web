"use client";

import * as React from "react";
import { H2, H3, Text } from "@/components/shared";

/**
 * Governance Section
 * 
 * Shows cadence, SLA, and reporting structure
 */
export function GovernanceSection() {
  return (
    <div className="space-y-6">
      <H2 className="mb-6">Governance & Quy trình làm việc</H2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <H3 className="mb-2">Cadence Review</H3>
          <Text as="p" variant="muted" className="text-sm">
            Review định kỳ hàng tuần/tháng tùy theo gói dịch vụ. Đảm bảo tiến độ
            và chất lượng công việc.
          </Text>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <H3 className="mb-2">SLA & Cam kết</H3>
          <Text as="p" variant="muted" className="text-sm">
            Thời gian phản hồi trong 24h. Bàn giao deliverables đúng hạn. Hỗ trợ
            khẩn cấp khi cần.
          </Text>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <H3 className="mb-2">Báo cáo & Tracking</H3>
          <Text as="p" variant="muted" className="text-sm">
            Báo cáo tiến độ định kỳ. Dashboard theo dõi metrics. Báo cáo tổng
            kết cuối dự án.
          </Text>
        </div>
      </div>
    </div>
  );
}

