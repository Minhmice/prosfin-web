/**
 * AppTable - Wrapper cho shadcn Table components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Table as BaseTable,
  TableHeader as BaseTableHeader,
  TableBody as BaseTableBody,
  TableFooter as BaseTableFooter,
  TableHead as BaseTableHead,
  TableRow as BaseTableRow,
  TableCell as BaseTableCell,
  TableCaption as BaseTableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type AppTableProps = React.ComponentProps<typeof BaseTable>;
export type AppTableHeaderProps = React.ComponentProps<typeof BaseTableHeader>;
export type AppTableBodyProps = React.ComponentProps<typeof BaseTableBody>;
export type AppTableFooterProps = React.ComponentProps<typeof BaseTableFooter>;
export type AppTableHeadProps = React.ComponentProps<typeof BaseTableHead>;
export type AppTableRowProps = React.ComponentProps<typeof BaseTableRow>;
export type AppTableCellProps = React.ComponentProps<typeof BaseTableCell>;
export type AppTableCaptionProps = React.ComponentProps<typeof BaseTableCaption>;

export function AppTable({
  className,
  ...props
}: AppTableProps) {
  return <BaseTable className={cn(className)} {...props} />;
}

export function AppTableHeader({
  className,
  ...props
}: AppTableHeaderProps) {
  return <BaseTableHeader className={cn(className)} {...props} />;
}

export function AppTableBody({
  className,
  ...props
}: AppTableBodyProps) {
  return <BaseTableBody className={cn(className)} {...props} />;
}

export function AppTableFooter({
  className,
  ...props
}: AppTableFooterProps) {
  return <BaseTableFooter className={cn(className)} {...props} />;
}

export function AppTableHead({
  className,
  ...props
}: AppTableHeadProps) {
  return <BaseTableHead className={cn(className)} {...props} />;
}

export function AppTableRow({
  className,
  ...props
}: AppTableRowProps) {
  return <BaseTableRow className={cn(className)} {...props} />;
}

export function AppTableCell({
  className,
  ...props
}: AppTableCellProps) {
  return <BaseTableCell className={cn(className)} {...props} />;
}

export function AppTableCaption({
  className,
  ...props
}: AppTableCaptionProps) {
  return <BaseTableCaption className={cn(className)} {...props} />;
}

