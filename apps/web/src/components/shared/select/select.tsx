/**
 * AppSelect - Wrapper cho shadcn Select components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Select as BaseSelect,
  SelectGroup as BaseSelectGroup,
  SelectValue as BaseSelectValue,
  SelectTrigger as BaseSelectTrigger,
  SelectContent as BaseSelectContent,
  SelectLabel as BaseSelectLabel,
  SelectItem as BaseSelectItem,
  SelectSeparator as BaseSelectSeparator,
  SelectScrollUpButton as BaseSelectScrollUpButton,
  SelectScrollDownButton as BaseSelectScrollDownButton,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type AppSelectProps = React.ComponentProps<typeof BaseSelect>;
export type AppSelectGroupProps = React.ComponentProps<typeof BaseSelectGroup>;
export type AppSelectValueProps = React.ComponentProps<typeof BaseSelectValue>;
export type AppSelectTriggerProps = React.ComponentProps<typeof BaseSelectTrigger>;
export type AppSelectContentProps = React.ComponentProps<typeof BaseSelectContent>;
export type AppSelectLabelProps = React.ComponentProps<typeof BaseSelectLabel>;
export type AppSelectItemProps = React.ComponentProps<typeof BaseSelectItem>;
export type AppSelectSeparatorProps = React.ComponentProps<typeof BaseSelectSeparator>;
export type AppSelectScrollUpButtonProps = React.ComponentProps<typeof BaseSelectScrollUpButton>;
export type AppSelectScrollDownButtonProps = React.ComponentProps<typeof BaseSelectScrollDownButton>;

export function AppSelect(props: AppSelectProps) {
  return <BaseSelect {...props} />;
}

export function AppSelectGroup(props: AppSelectGroupProps) {
  return <BaseSelectGroup {...props} />;
}

export function AppSelectValue(props: AppSelectValueProps) {
  return <BaseSelectValue {...props} />;
}

export function AppSelectTrigger({
  className,
  ...props
}: AppSelectTriggerProps) {
  return <BaseSelectTrigger className={cn(className)} {...props} />;
}

export function AppSelectContent({
  className,
  ...props
}: AppSelectContentProps) {
  return <BaseSelectContent className={cn(className)} {...props} />;
}

export function AppSelectLabel({
  className,
  ...props
}: AppSelectLabelProps) {
  return <BaseSelectLabel className={cn(className)} {...props} />;
}

export function AppSelectItem({
  className,
  ...props
}: AppSelectItemProps) {
  return <BaseSelectItem className={cn(className)} {...props} />;
}

export function AppSelectSeparator({
  className,
  ...props
}: AppSelectSeparatorProps) {
  return <BaseSelectSeparator className={cn(className)} {...props} />;
}

export function AppSelectScrollUpButton({
  className,
  ...props
}: AppSelectScrollUpButtonProps) {
  return <BaseSelectScrollUpButton className={cn(className)} {...props} />;
}

export function AppSelectScrollDownButton({
  className,
  ...props
}: AppSelectScrollDownButtonProps) {
  return <BaseSelectScrollDownButton className={cn(className)} {...props} />;
}

