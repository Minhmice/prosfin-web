/**
 * AppTabs - Wrapper cho shadcn Tabs components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type AppTabsProps = React.ComponentProps<typeof BaseTabs>;
export type AppTabsListProps = React.ComponentProps<typeof BaseTabsList>;
export type AppTabsTriggerProps = React.ComponentProps<typeof BaseTabsTrigger>;
export type AppTabsContentProps = React.ComponentProps<typeof BaseTabsContent>;

export function AppTabs(props: AppTabsProps) {
  return <BaseTabs {...props} />;
}

export function AppTabsList({
  className,
  ...props
}: AppTabsListProps) {
  return <BaseTabsList className={cn(className)} {...props} />;
}

export function AppTabsTrigger({
  className,
  ...props
}: AppTabsTriggerProps) {
  return <BaseTabsTrigger className={cn(className)} {...props} />;
}

export function AppTabsContent({
  className,
  ...props
}: AppTabsContentProps) {
  return <BaseTabsContent className={cn(className)} {...props} />;
}

