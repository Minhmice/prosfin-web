import * as React from "react";
import { Section } from "../section";
import { PageContainer } from "../page-container";
import { cn } from "@/lib/utils";

export interface ProsfinSectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section ID for anchor links (e.g., "#problems", "#services")
   */
  id?: string;
  /**
   * Padding variant
   * @default "default"
   */
  padding?: "none" | "sm" | "default" | "lg" | "xl";
  /**
   * Background variant
   * @default "default"
   */
  background?: "default" | "muted" | "primary";
  children: React.ReactNode;
}

/**
 * ProsfinSectionWrapper - Wrapper component cho tất cả sections
 * 
 * Cung cấp container chung với max width, padding responsive cho tất cả sections.
 * Sử dụng cho Problems, Services, Process, Team, etc.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinSectionWrapper({
  id,
  padding = "default",
  background = "default",
  className,
  children,
  ...props
}: ProsfinSectionWrapperProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8 sm:py-12",
    default: "py-16 sm:py-20 lg:py-24",
    lg: "py-20 sm:py-24 lg:py-32",
    xl: "py-24 sm:py-32 lg:py-40",
  };

  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    primary: "bg-primary/5",
  };

  return (
    <Section
      id={id}
      className={cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      <PageContainer>{children}</PageContainer>
    </Section>
  );
}

