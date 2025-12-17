"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function StepIndicator({
  current,
  className,
}: {
  current: 1 | 2 | 3;
  className?: string;
}) {
  const steps = [
    { id: 1, label: "Gửi thông tin nhanh" },
    { id: 2, label: "Kiểm tra email" },
    { id: 3, label: "Bổ sung chi tiết" },
  ] as const;

  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
      {steps.map((s, idx) => {
        const done = s.id < current;
        const active = s.id === current;
        return (
          <React.Fragment key={s.id}>
            <div
              className={cn(
                "rounded-full border px-2 py-1",
                done && "border-primary/30 bg-primary/5 text-primary",
                active && "border-primary/50 bg-primary/10 text-primary",
                !done && !active && "border-border"
              )}
            >
              {s.id}. {s.label}
            </div>
            {idx < steps.length - 1 && <span className="opacity-60">→</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}


