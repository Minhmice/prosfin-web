import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinProblemCardWrapperProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Optional impact statement
   */
  impact?: string;
  /**
   * Optional solution statement (displayed as italic text)
   */
  solution?: string;
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
 * ProsfinProblemCardWrapper - Wrapper component cho Problem Cards
 * 
 * Wrap shadcn Card với style thống nhất cho mọi "ProblemCard".
 * Sau này nếu có section khác dùng card "kiểu problem" thì reuse.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinProblemCardWrapper({
  title,
  description,
  impact,
  solution,
  icon,
  className,
  variant = "default",
}: ProsfinProblemCardWrapperProps) {
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
        {icon && <div className="mb-2">{icon}</div>}
        <CardTitle className="text-xl leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
        {impact && (
          <div className="mt-2 rounded-md bg-destructive/5 p-3 text-sm text-destructive/90">
            <span className="font-medium">Tác động: </span>
            {impact}
          </div>
        )}
        {solution && (
          <p className="mt-3 text-xs italic text-muted-foreground">{solution}</p>
        )}
      </CardContent>
    </Card>
  );
}

