/**
 * AppSheet - Wrapper cho shadcn Sheet components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Sheet as BaseSheet,
  SheetTrigger as BaseSheetTrigger,
  SheetContent as BaseSheetContent,
  SheetHeader as BaseSheetHeader,
  SheetFooter as BaseSheetFooter,
  SheetTitle as BaseSheetTitle,
  SheetDescription as BaseSheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type AppSheetProps = React.ComponentProps<typeof BaseSheet>;
export type AppSheetTriggerProps = React.ComponentProps<typeof BaseSheetTrigger>;
export type AppSheetContentProps = React.ComponentProps<typeof BaseSheetContent>;
export type AppSheetHeaderProps = React.ComponentProps<typeof BaseSheetHeader>;
export type AppSheetFooterProps = React.ComponentProps<typeof BaseSheetFooter>;
export type AppSheetTitleProps = React.ComponentProps<typeof BaseSheetTitle>;
export type AppSheetDescriptionProps = React.ComponentProps<typeof BaseSheetDescription>;

export function AppSheet(props: AppSheetProps) {
  return <BaseSheet {...props} />;
}

export function AppSheetTrigger(props: AppSheetTriggerProps) {
  return <BaseSheetTrigger {...props} />;
}

export function AppSheetContent({
  className,
  ...props
}: AppSheetContentProps) {
  return <BaseSheetContent className={cn(className)} {...props} />;
}

export function AppSheetHeader({
  className,
  ...props
}: AppSheetHeaderProps) {
  return <BaseSheetHeader className={cn(className)} {...props} />;
}

export function AppSheetFooter({
  className,
  ...props
}: AppSheetFooterProps) {
  return <BaseSheetFooter className={cn(className)} {...props} />;
}

export function AppSheetTitle({
  className,
  ...props
}: AppSheetTitleProps) {
  return <BaseSheetTitle className={cn(className)} {...props} />;
}

export function AppSheetDescription({
  className,
  ...props
}: AppSheetDescriptionProps) {
  return <BaseSheetDescription className={cn(className)} {...props} />;
}

