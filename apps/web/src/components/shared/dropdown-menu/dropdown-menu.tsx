/**
 * AppDropdownMenu - Wrapper cho shadcn DropdownMenu components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuTrigger as BaseDropdownMenuTrigger,
  DropdownMenuContent as BaseDropdownMenuContent,
  DropdownMenuItem as BaseDropdownMenuItem,
  DropdownMenuCheckboxItem as BaseDropdownMenuCheckboxItem,
  DropdownMenuRadioItem as BaseDropdownMenuRadioItem,
  DropdownMenuLabel as BaseDropdownMenuLabel,
  DropdownMenuSeparator as BaseDropdownMenuSeparator,
  DropdownMenuShortcut as BaseDropdownMenuShortcut,
  DropdownMenuGroup as BaseDropdownMenuGroup,
  DropdownMenuPortal as BaseDropdownMenuPortal,
  DropdownMenuSub as BaseDropdownMenuSub,
  DropdownMenuSubContent as BaseDropdownMenuSubContent,
  DropdownMenuSubTrigger as BaseDropdownMenuSubTrigger,
  DropdownMenuRadioGroup as BaseDropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type AppDropdownMenuProps = React.ComponentProps<typeof BaseDropdownMenu>;
export type AppDropdownMenuTriggerProps = React.ComponentProps<typeof BaseDropdownMenuTrigger>;
export type AppDropdownMenuContentProps = React.ComponentProps<typeof BaseDropdownMenuContent>;
export type AppDropdownMenuItemProps = React.ComponentProps<typeof BaseDropdownMenuItem>;
export type AppDropdownMenuCheckboxItemProps = React.ComponentProps<typeof BaseDropdownMenuCheckboxItem>;
export type AppDropdownMenuRadioItemProps = React.ComponentProps<typeof BaseDropdownMenuRadioItem>;
export type AppDropdownMenuLabelProps = React.ComponentProps<typeof BaseDropdownMenuLabel>;
export type AppDropdownMenuSeparatorProps = React.ComponentProps<typeof BaseDropdownMenuSeparator>;
export type AppDropdownMenuShortcutProps = React.ComponentProps<typeof BaseDropdownMenuShortcut>;
export type AppDropdownMenuGroupProps = React.ComponentProps<typeof BaseDropdownMenuGroup>;
export type AppDropdownMenuPortalProps = React.ComponentProps<typeof BaseDropdownMenuPortal>;
export type AppDropdownMenuSubProps = React.ComponentProps<typeof BaseDropdownMenuSub>;
export type AppDropdownMenuSubContentProps = React.ComponentProps<typeof BaseDropdownMenuSubContent>;
export type AppDropdownMenuSubTriggerProps = React.ComponentProps<typeof BaseDropdownMenuSubTrigger>;
export type AppDropdownMenuRadioGroupProps = React.ComponentProps<typeof BaseDropdownMenuRadioGroup>;

export function AppDropdownMenu(props: AppDropdownMenuProps) {
  return <BaseDropdownMenu {...props} />;
}

export function AppDropdownMenuTrigger(props: AppDropdownMenuTriggerProps) {
  return <BaseDropdownMenuTrigger {...props} />;
}

export function AppDropdownMenuContent({
  className,
  ...props
}: AppDropdownMenuContentProps) {
  return <BaseDropdownMenuContent className={cn(className)} {...props} />;
}

export function AppDropdownMenuItem({
  className,
  ...props
}: AppDropdownMenuItemProps) {
  return <BaseDropdownMenuItem className={cn(className)} {...props} />;
}

export function AppDropdownMenuCheckboxItem({
  className,
  ...props
}: AppDropdownMenuCheckboxItemProps) {
  return <BaseDropdownMenuCheckboxItem className={cn(className)} {...props} />;
}

export function AppDropdownMenuRadioItem({
  className,
  ...props
}: AppDropdownMenuRadioItemProps) {
  return <BaseDropdownMenuRadioItem className={cn(className)} {...props} />;
}

export function AppDropdownMenuLabel({
  className,
  ...props
}: AppDropdownMenuLabelProps) {
  return <BaseDropdownMenuLabel className={cn(className)} {...props} />;
}

export function AppDropdownMenuSeparator({
  className,
  ...props
}: AppDropdownMenuSeparatorProps) {
  return <BaseDropdownMenuSeparator className={cn(className)} {...props} />;
}

export function AppDropdownMenuShortcut({
  className,
  ...props
}: AppDropdownMenuShortcutProps) {
  return <BaseDropdownMenuShortcut className={cn(className)} {...props} />;
}

export function AppDropdownMenuGroup(props: AppDropdownMenuGroupProps) {
  return <BaseDropdownMenuGroup {...props} />;
}

export function AppDropdownMenuPortal(props: AppDropdownMenuPortalProps) {
  return <BaseDropdownMenuPortal {...props} />;
}

export function AppDropdownMenuSub(props: AppDropdownMenuSubProps) {
  return <BaseDropdownMenuSub {...props} />;
}

export function AppDropdownMenuSubContent({
  className,
  ...props
}: AppDropdownMenuSubContentProps) {
  return <BaseDropdownMenuSubContent className={cn(className)} {...props} />;
}

export function AppDropdownMenuSubTrigger({
  className,
  ...props
}: AppDropdownMenuSubTriggerProps) {
  return <BaseDropdownMenuSubTrigger className={cn(className)} {...props} />;
}

export function AppDropdownMenuRadioGroup(props: AppDropdownMenuRadioGroupProps) {
  return <BaseDropdownMenuRadioGroup {...props} />;
}

