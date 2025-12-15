import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProsfinBadgeProps extends BadgeProps {
  /**
   * Badge variant for different use cases
   * @default "default"
   */
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
}

/**
 * ProsfinBadge - Badge wrapper component
 * 
 * Wrap shadcn Badge với style thống nhất cho ProsFIN.
 * Dùng cho awards, credentials, tags.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinBadge({
  badgeVariant = "default",
  className,
  variant,
  ...props
}: ProsfinBadgeProps) {
  const variantMap: Record<string, BadgeProps["variant"]> = {
    default: "default",
    primary: "default",
    success: "default",
    warning: "outline",
    info: "secondary",
  };

  const colorClasses = {
    default: "",
    primary: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <Badge
      variant={variant || variantMap[badgeVariant]}
      className={cn(
        colorClasses[badgeVariant],
        "font-medium",
        className
      )}
      {...props}
    />
  );
}

