/**
 * AppBreadcrumb - Wrapper cho shadcn Breadcrumb components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbList as BaseBreadcrumbList,
  BreadcrumbItem as BaseBreadcrumbItem,
  BreadcrumbLink as BaseBreadcrumbLink,
  BreadcrumbPage as BaseBreadcrumbPage,
  BreadcrumbSeparator as BaseBreadcrumbSeparator,
  BreadcrumbEllipsis as BaseBreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type AppBreadcrumbProps = React.ComponentProps<typeof BaseBreadcrumb>;
export type AppBreadcrumbListProps = React.ComponentProps<typeof BaseBreadcrumbList>;
export type AppBreadcrumbItemProps = React.ComponentProps<typeof BaseBreadcrumbItem>;
export type AppBreadcrumbLinkProps = React.ComponentProps<typeof BaseBreadcrumbLink>;
export type AppBreadcrumbPageProps = React.ComponentProps<typeof BaseBreadcrumbPage>;
export type AppBreadcrumbSeparatorProps = React.ComponentProps<typeof BaseBreadcrumbSeparator>;
export type AppBreadcrumbEllipsisProps = React.ComponentProps<typeof BaseBreadcrumbEllipsis>;

export function AppBreadcrumb({
  ...props
}: AppBreadcrumbProps) {
  return <BaseBreadcrumb {...props} />;
}

export function AppBreadcrumbList({
  className,
  ...props
}: AppBreadcrumbListProps) {
  return <BaseBreadcrumbList className={cn(className)} {...props} />;
}

export function AppBreadcrumbItem({
  className,
  ...props
}: AppBreadcrumbItemProps) {
  return <BaseBreadcrumbItem className={cn(className)} {...props} />;
}

export function AppBreadcrumbLink({
  className,
  ...props
}: AppBreadcrumbLinkProps) {
  return <BaseBreadcrumbLink className={cn(className)} {...props} />;
}

export function AppBreadcrumbPage({
  className,
  ...props
}: AppBreadcrumbPageProps) {
  return <BaseBreadcrumbPage className={cn(className)} {...props} />;
}

export function AppBreadcrumbSeparator({
  className,
  ...props
}: AppBreadcrumbSeparatorProps) {
  return <BaseBreadcrumbSeparator className={cn(className)} {...props} />;
}

export function AppBreadcrumbEllipsis({
  className,
  ...props
}: AppBreadcrumbEllipsisProps) {
  return <BaseBreadcrumbEllipsis className={cn(className)} {...props} />;
}

