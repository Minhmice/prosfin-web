/**
 * AppSeparator - Wrapper cho shadcn Separator component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Separator as BaseSeparator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type AppSeparatorProps = React.ComponentProps<typeof BaseSeparator>;

/**
 * AppSeparator - Wrapper cho Separator component
 */
export function AppSeparator({
  className,
  ...props
}: AppSeparatorProps) {
  return <BaseSeparator className={cn(className)} {...props} />;
}

