"use client";

import * as React from "react";
import { MessageSquare, Lightbulb, GraduationCap, FileCheck, ClipboardCheck } from "lucide-react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface StepFormatProps {
  value?: string;
  onChange: (value: string) => void;
}

const FORMAT_OPTIONS = [
  {
    value: "advisory",
    label: "Cố vấn",
    description: "Đồng hành dài hạn trong các quyết định tài chính",
    icon: MessageSquare,
  },
  {
    value: "consulting",
    label: "Tư vấn",
    description: "Tư vấn chuyên sâu cho các vấn đề cụ thể",
    icon: Lightbulb,
  },
  {
    value: "coaching",
    label: "Coaching",
    description: "Huấn luyện và triển khai giải pháp",
    icon: GraduationCap,
  },
  {
    value: "audit",
    label: "Kiểm toán",
    description: "Kiểm tra và đánh giá hệ thống tài chính",
    icon: FileCheck,
  },
  {
    value: "assessment",
    label: "Đánh giá",
    description: "Đánh giá toàn diện tình hình tài chính",
    icon: ClipboardCheck,
  },
];

/**
 * StepFormat - Wizard step for selecting service format
 * 
 * Optional step - user can skip if unsure
 */
export function StepFormat({ value, onChange }: StepFormatProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Bạn cần theo hình thức nào?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Chọn hình thức dịch vụ phù hợp (có thể bỏ qua nếu chưa chắc)
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-1">
        {FORMAT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="mt-1">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
              </div>
              {isSelected && (
                <AppBadge variant="default" className="ml-auto">
                  Đã chọn
                </AppBadge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

