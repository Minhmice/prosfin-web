"use client";

import * as React from "react";
import { H2, H3, Text } from "@/components/shared";

/**
 * What You Need to Prepare Section
 * 
 * Lists what clients need to prepare before starting
 */
export function WhatYouNeedSection() {
  const items = [
    {
      title: "Báo cáo tài chính",
      description:
        "Báo cáo tài chính 2-3 quý gần nhất, bao gồm bảng cân đối kế toán, báo cáo kết quả kinh doanh, và báo cáo lưu chuyển tiền tệ.",
    },
    {
      title: "Hệ thống kế toán",
      description:
        "Access vào hệ thống kế toán (nếu có) hoặc file Excel/Google Sheets chứa dữ liệu kế toán chi tiết.",
    },
    {
      title: "Thông tin doanh nghiệp",
      description:
        "Thông tin về ngành nghề, quy mô, mô hình kinh doanh, và các thách thức tài chính hiện tại.",
    },
    {
      title: "Mục tiêu & Kỳ vọng",
      description:
        "Mục tiêu tài chính cụ thể, kỳ vọng về kết quả, và timeline mong muốn.",
    },
    {
      title: "Đội ngũ liên hệ",
      description:
        "Thông tin liên hệ của người phụ trách tài chính/kế toán để phối hợp làm việc.",
    },
  ];

  return (
    <div className="space-y-6">
      <H2 className="mb-6">Những gì bạn cần chuẩn bị</H2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <H3 className="mb-2">{item.title}</H3>
            <Text as="p" variant="muted" className="text-sm">
              {item.description}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

