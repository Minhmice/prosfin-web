import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinFeatureCardWrapperProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Optional icon (ReactNode)
   */
  icon?: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Card variant
   * @default "default"
   */
  variant?: "default" | "bordered" | "elevated";
  /**
   * Center align content
   * @default false
   */
  centerAlign?: boolean;
}

/**
 * ProsfinFeatureCardWrapper - Wrapper component cho Feature Cards
 * 
 * Wrap shadcn Card với style thống nhất cho feature/commitment cards.
 * Layout: icon + title + description, hỗ trợ center alignment.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinFeatureCardWrapper({
  title,
  description,
  icon,
  className,
  variant = "default",
  centerAlign = false,
}: ProsfinFeatureCardWrapperProps) {
  const variantClasses = {
    default: "border-border shadow-sm",
    bordered: "border-2 border-border shadow-none",
    elevated: "border-border shadow-md",
  };

  return (
    <Card
      className={cn(
        "h-full transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:border-primary/50",
        variantClasses[variant],
        className
      )}
    >
      <CardHeader className={centerAlign ? "text-center" : ""}>
        {icon && (
          <div className={cn("mb-4 flex", centerAlign ? "justify-center" : "")}>
            <div className="text-muted-foreground">{icon}</div>
          </div>
        )}
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className={centerAlign ? "text-center" : ""}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

