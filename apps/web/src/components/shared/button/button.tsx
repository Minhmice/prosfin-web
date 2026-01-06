/**
 * AppButton - Wrapper cho shadcn Button component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 * 
 * @example
 * ```tsx
 * <AppButton variant="default" size="sm">
 *   Click me
 * </AppButton>
 * ```
 */

"use client";

import * as React from "react";
import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AppButtonProps = React.ComponentProps<typeof BaseButton>;

/**
 * AppButton - Wrapper cho Button component
 */
export function AppButton({
  className,
  ...props
}: AppButtonProps) {
  return <BaseButton className={cn(className)} {...props} />;
}

