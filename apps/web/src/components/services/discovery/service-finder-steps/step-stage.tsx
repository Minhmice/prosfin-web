"use client";

import * as React from "react";
import { Rocket, TrendingUp, Building2 } from "lucide-react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface StepStageProps {
  value?: string;
  onChange: (value: string) => void;
}

const STAGE_OPTIONS = [
  {
    value: "early",
    label: "Khởi nghiệp",
    description: "Doanh nghiệp mới thành lập hoặc đang trong giai đoạn đầu",
    icon: Rocket,
  },
  {
    value: "growth",
    label: "Tăng trưởng",
    description: "Doanh nghiệp đang phát triển và mở rộng quy mô",
    icon: TrendingUp,
  },
  {
    value: "scale",
    label: "Quy mô",
    description: "Doanh nghiệp đã ổn định và muốn tối ưu hóa hệ thống",
    icon: Building2,
  },
];

/**
 * StepStage - Wizard step for selecting business stage
 */
export function StepStage({ value, onChange }: StepStageProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Giai đoạn doanh nghiệp của bạn?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Chọn giai đoạn phát triển hiện tại của doanh nghiệp
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-1">
        {STAGE_OPTIONS.map((option) => {
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

