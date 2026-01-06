/**
 * AppTextarea - Wrapper cho shadcn Textarea component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Textarea as BaseTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type AppTextareaProps = React.ComponentProps<typeof BaseTextarea>;

/**
 * AppTextarea - Wrapper cho Textarea component
 */
export function AppTextarea({
  className,
  ...props
}: AppTextareaProps) {
  return <BaseTextarea className={cn(className)} {...props} />;
}

