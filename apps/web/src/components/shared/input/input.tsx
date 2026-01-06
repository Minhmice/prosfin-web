/**
 * AppInput - Wrapper cho shadcn Input component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type AppInputProps = React.ComponentProps<typeof BaseInput>;

/**
 * AppInput - Wrapper cho Input component
 */
export function AppInput({
  className,
  ...props
}: AppInputProps) {
  return <BaseInput className={cn(className)} {...props} />;
}

