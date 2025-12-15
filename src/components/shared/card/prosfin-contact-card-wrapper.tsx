import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinContactCardWrapperProps {
  /**
   * Children content
   */
  children: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinContactCardWrapper - Wrapper component cho Contact Card
 * 
 * Wrapper cho khối contact (form + info) với style nổi bật.
 * Background hơi nâng, border rõ, padding lớn.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinContactCardWrapper({
  children,
  className,
}: ProsfinContactCardWrapperProps) {
  return (
    <Card
      className={cn(
        "border-2 bg-card shadow-lg",
        className
      )}
    >
      <div className="p-6 sm:p-8">{children}</div>
    </Card>
  );
}

