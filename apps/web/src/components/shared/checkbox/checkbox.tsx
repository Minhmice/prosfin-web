/**
 * AppCheckbox - Wrapper cho shadcn Checkbox component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type AppCheckboxProps = React.ComponentProps<typeof BaseCheckbox>;

/**
 * AppCheckbox - Wrapper cho Checkbox component
 */
export function AppCheckbox({
  className,
  ...props
}: AppCheckboxProps) {
  return <BaseCheckbox className={cn(className)} {...props} />;
}

