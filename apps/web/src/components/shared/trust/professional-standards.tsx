/**
 * ProfessionalStandards - Badge row với professional standards
 * 
 * Shows professional credentials and standards badges.
 */

import * as React from "react";
import { Award, CheckCircle2, Shield } from "lucide-react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { cn } from "@/lib/utils";

interface ProfessionalStandardsProps {
  className?: string;
}

/**
 * ProfessionalStandards - Professional standards badges
 */
export function ProfessionalStandards({ className }: ProfessionalStandardsProps) {
  const standards = [
    {
      icon: Shield,
      label: "Bảo mật dữ liệu",
      description: "Tuân thủ quy định bảo vệ dữ liệu",
    },
    {
      icon: Award,
      label: "Chuẩn Big4",
      description: "Kinh nghiệm từ Big4",
    },
    {
      icon: CheckCircle2,
      label: "Cam kết chất lượng",
      description: "Đảm bảo dịch vụ chuyên nghiệp",
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {standards.map((standard, index) => {
        const Icon = standard.icon;
        return (
          <div key={index} className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">{standard.label}</div>
              <div className="text-xs text-muted-foreground">
                {standard.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

