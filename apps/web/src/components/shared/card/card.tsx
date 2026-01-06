/**
 * AppCard - Wrapper cho shadcn Card components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Card as BaseCard,
  CardHeader as BaseCardHeader,
  CardTitle as BaseCardTitle,
  CardDescription as BaseCardDescription,
  CardContent as BaseCardContent,
  CardFooter as BaseCardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type AppCardProps = React.ComponentProps<typeof BaseCard>;
export type AppCardHeaderProps = React.ComponentProps<typeof BaseCardHeader>;
export type AppCardTitleProps = React.ComponentProps<typeof BaseCardTitle>;
export type AppCardDescriptionProps = React.ComponentProps<typeof BaseCardDescription>;
export type AppCardContentProps = React.ComponentProps<typeof BaseCardContent>;
export type AppCardFooterProps = React.ComponentProps<typeof BaseCardFooter>;

export function AppCard({
  className,
  ...props
}: AppCardProps) {
  return <BaseCard className={cn(className)} {...props} />;
}

export function AppCardHeader({
  className,
  ...props
}: AppCardHeaderProps) {
  return <BaseCardHeader className={cn(className)} {...props} />;
}

export function AppCardTitle({
  className,
  ...props
}: AppCardTitleProps) {
  return <BaseCardTitle className={cn(className)} {...props} />;
}

export function AppCardDescription({
  className,
  ...props
}: AppCardDescriptionProps) {
  return <BaseCardDescription className={cn(className)} {...props} />;
}

export function AppCardContent({
  className,
  ...props
}: AppCardContentProps) {
  return <BaseCardContent className={cn(className)} {...props} />;
}

export function AppCardFooter({
  className,
  ...props
}: AppCardFooterProps) {
  return <BaseCardFooter className={cn(className)} {...props} />;
}

