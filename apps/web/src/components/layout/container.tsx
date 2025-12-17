import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProsfinContainerProps {
  /**
   * Children content
   */
  children: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Max width variant
   * @default "xl"
   */
  maxWidth?: "lg" | "xl" | "2xl" | "full";
}

/**
 * ProsfinContainer - Container wrapper chuẩn cho max-width
 * 
 * Chuẩn hóa max-width và padding ngang cho toàn bộ site.
 * Sử dụng trong các section và layout.
 */
export function ProsfinContainer({
  children,
  className,
  maxWidth = "xl",
}: ProsfinContainerProps) {
  const maxWidthClasses = {
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

