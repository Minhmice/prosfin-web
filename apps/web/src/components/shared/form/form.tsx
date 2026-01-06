/**
 * AppForm - Wrapper cho shadcn Form components
 * 
 * Wrapper này tồn tại để:
 * - Bảo vệ component gốc từ shadcn khỏi chỉnh sửa trực tiếp
 * - Cho phép customize và mở rộng API trong tương lai
 * - Đảm bảo tính nhất quán trong design system
 */

"use client";

import * as React from "react";
import {
  Form as BaseForm,
  FormItem as BaseFormItem,
  FormLabel as BaseFormLabel,
  FormControl as BaseFormControl,
  FormDescription as BaseFormDescription,
  FormMessage as BaseFormMessage,
  FormField as BaseFormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type AppFormProps = React.ComponentProps<typeof BaseForm>;
export type AppFormItemProps = React.ComponentProps<typeof BaseFormItem>;
export type AppFormLabelProps = React.ComponentProps<typeof BaseFormLabel>;
export type AppFormControlProps = React.ComponentProps<typeof BaseFormControl>;
export type AppFormDescriptionProps = React.ComponentProps<typeof BaseFormDescription>;
export type AppFormMessageProps = React.ComponentProps<typeof BaseFormMessage>;
export type AppFormFieldProps = React.ComponentProps<typeof BaseFormField>;

export function AppForm(props: AppFormProps) {
  return <BaseForm {...props} />;
}

export function AppFormItem({
  className,
  ...props
}: AppFormItemProps) {
  return <BaseFormItem className={cn(className)} {...props} />;
}

export function AppFormLabel({
  className,
  ...props
}: AppFormLabelProps) {
  return <BaseFormLabel className={cn(className)} {...props} />;
}

export function AppFormControl(props: AppFormControlProps) {
  return <BaseFormControl {...props} />;
}

export function AppFormDescription({
  className,
  ...props
}: AppFormDescriptionProps) {
  return <BaseFormDescription className={cn(className)} {...props} />;
}

export function AppFormMessage({
  className,
  ...props
}: AppFormMessageProps) {
  return <BaseFormMessage className={cn(className)} {...props} />;
}

export function AppFormField(props: AppFormFieldProps) {
  return <BaseFormField {...props} />;
}

