/**
 * AppSkeleton - Wrapper cho shadcn Skeleton component
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import { Skeleton as BaseSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type AppSkeletonProps = React.ComponentProps<typeof BaseSkeleton>;

/**
 * AppSkeleton - Wrapper cho Skeleton component
 */
export function AppSkeleton({
  className,
  ...props
}: AppSkeletonProps) {
  return <BaseSkeleton className={cn(className)} {...props} />;
}

