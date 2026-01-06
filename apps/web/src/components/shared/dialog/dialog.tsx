/**
 * AppDialog - Wrapper cho shadcn Dialog components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Dialog as BaseDialog,
  DialogTrigger as BaseDialogTrigger,
  DialogContent as BaseDialogContent,
  DialogHeader as BaseDialogHeader,
  DialogFooter as BaseDialogFooter,
  DialogTitle as BaseDialogTitle,
  DialogDescription as BaseDialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type AppDialogProps = React.ComponentProps<typeof BaseDialog>;
export type AppDialogTriggerProps = React.ComponentProps<typeof BaseDialogTrigger>;
export type AppDialogContentProps = React.ComponentProps<typeof BaseDialogContent>;
export type AppDialogHeaderProps = React.ComponentProps<typeof BaseDialogHeader>;
export type AppDialogFooterProps = React.ComponentProps<typeof BaseDialogFooter>;
export type AppDialogTitleProps = React.ComponentProps<typeof BaseDialogTitle>;
export type AppDialogDescriptionProps = React.ComponentProps<typeof BaseDialogDescription>;

export function AppDialog(props: AppDialogProps) {
  return <BaseDialog {...props} />;
}

export function AppDialogTrigger(props: AppDialogTriggerProps) {
  return <BaseDialogTrigger {...props} />;
}

export function AppDialogContent({
  className,
  ...props
}: AppDialogContentProps) {
  return <BaseDialogContent className={cn(className)} {...props} />;
}

export function AppDialogHeader({
  className,
  ...props
}: AppDialogHeaderProps) {
  return <BaseDialogHeader className={cn(className)} {...props} />;
}

export function AppDialogFooter({
  className,
  ...props
}: AppDialogFooterProps) {
  return <BaseDialogFooter className={cn(className)} {...props} />;
}

export function AppDialogTitle({
  className,
  ...props
}: AppDialogTitleProps) {
  return <BaseDialogTitle className={cn(className)} {...props} />;
}

export function AppDialogDescription({
  className,
  ...props
}: AppDialogDescriptionProps) {
  return <BaseDialogDescription className={cn(className)} {...props} />;
}

