/**
 * AppLabel - Wrapper cho shadcn Label component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Label as BaseLabel } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type AppLabelProps = React.ComponentProps<typeof BaseLabel>;

/**
 * AppLabel - Wrapper cho Label component
 */
export function AppLabel({
  className,
  ...props
}: AppLabelProps) {
  return <BaseLabel className={cn(className)} {...props} />;
}

