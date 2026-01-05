"use client";

import * as React from "react";
import { TrendingUp, Shield, DollarSign, FileText, AlertTriangle } from "lucide-react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface StepOutcomeProps {
  value?: string;
  onChange: (value: string) => void;
}

const OUTCOME_OPTIONS = [
  {
    value: "profit",
    label: "Tối ưu lợi nhuận",
    description: "Tăng lợi nhuận và hiệu quả kinh doanh",
    icon: TrendingUp,
  },
  {
    value: "compliance",
    label: "Tuân thủ",
    description: "Đảm bảo tuân thủ quy định và chuẩn mực",
    icon: Shield,
  },
  {
    value: "cashflow",
    label: "Quản lý dòng tiền",
    description: "Tối ưu dòng tiền và quản trị vốn",
    icon: DollarSign,
  },
  {
    value: "tax",
    label: "Tối ưu thuế",
    description: "Tối ưu hóa nghĩa vụ thuế hợp pháp",
    icon: FileText,
  },
  {
    value: "risk",
    label: "Kiểm soát rủi ro",
    description: "Giảm thiểu và quản lý rủi ro tài chính",
    icon: AlertTriangle,
  },
];

/**
 * StepOutcome - Wizard step for selecting outcome
 */
export function StepOutcome({ value, onChange }: StepOutcomeProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Mục tiêu chính của bạn?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Chọn mục tiêu quan trọng nhất bạn muốn đạt được
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-1">
        {OUTCOME_OPTIONS.map((option) => {
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

