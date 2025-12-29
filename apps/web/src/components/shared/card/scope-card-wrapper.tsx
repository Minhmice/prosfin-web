import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinScopeCardWrapperProps {
  /**
   * Card title
   */
  title: string;
  /**
   * List of items (bullet points)
   */
  items: string[];
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
}

/**
 * ProsfinScopeCardWrapper - Wrapper component cho Scope Cards
 * 
 * Wrap shadcn Card với style thống nhất cho scope/what's included cards.
 * Layout: icon + title + items list.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinScopeCardWrapper({
  title,
  items,
  icon,
  className,
  variant = "default",
}: ProsfinScopeCardWrapperProps) {
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
      <CardHeader>
        {icon && (
          <div className="mb-4 text-muted-foreground">{icon}</div>
        )}
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-muted-foreground/50 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

