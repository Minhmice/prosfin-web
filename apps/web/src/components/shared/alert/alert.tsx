/**
 * AppAlert - Wrapper cho shadcn Alert component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 * 
 * @example
 * ```tsx
 * <AppAlert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AppAlertDescription>Lỗi xảy ra</AppAlertDescription>
 * </AppAlert>
 * ```
 */

"use client";

import * as React from "react";
import {
  Alert as BaseAlert,
  AlertTitle as BaseAlertTitle,
  AlertDescription as BaseAlertDescription,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

/**
 * AppAlert - Wrapper cho Alert component
 */
export function AppAlert({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlert>) {
  return <BaseAlert className={cn(className)} {...props} />;
}

/**
 * AppAlertTitle - Wrapper cho AlertTitle component
 */
export function AppAlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertTitle>) {
  return <BaseAlertTitle className={cn(className)} {...props} />;
}

/**
 * AppAlertDescription - Wrapper cho AlertDescription component
 */
export function AppAlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDescription>) {
  return <BaseAlertDescription className={cn(className)} {...props} />;
}

// Re-export types từ base component
export type AlertProps = React.ComponentProps<typeof BaseAlert>;

