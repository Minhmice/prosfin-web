"use client";

import * as React from "react";
import { User, Briefcase, Calculator } from "lucide-react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface StepPersonaProps {
  value?: string;
  onChange: (value: string) => void;
}

const PERSONA_OPTIONS = [
  {
    value: "owner",
    label: "Chủ doanh nghiệp",
    description: "Bạn là người sáng lập hoặc chủ sở hữu doanh nghiệp",
    icon: User,
  },
  {
    value: "cfo",
    label: "CFO",
    description: "Bạn là Giám đốc Tài chính hoặc phụ trách tài chính",
    icon: Briefcase,
  },
  {
    value: "chief-accountant",
    label: "Kế toán trưởng",
    description: "Bạn là Kế toán trưởng hoặc phụ trách kế toán",
    icon: Calculator,
  },
];

/**
 * StepPersona - Wizard step for selecting persona
 */
export function StepPersona({ value, onChange }: StepPersonaProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Bạn là ai?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Chọn vai trò của bạn để chúng tôi đề xuất dịch vụ phù hợp
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-1">
        {PERSONA_OPTIONS.map((option) => {
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

