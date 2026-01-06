"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface RfpTermsProps {
  className?: string;
}

/**
 * RfpTerms - Terms and privacy checkbox component
 */
export function RfpTerms({ className }: RfpTermsProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
          <FormField
            control={control}
            name="acceptTerms"
            render={({ field: checkboxField }) => (
              <Checkbox
                checked={checkboxField.value}
                onCheckedChange={checkboxField.onChange}
                className="mt-1"
              />
            )}
          />
          <div className="space-y-1 leading-none">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Tôi đã đọc và đồng ý{" "}
              <Link
                href="/terms"
                className="text-primary underline hover:no-underline"
                target="_blank"
              >
                Điều khoản sử dụng
              </Link>
              . Vui lòng đọc{" "}
              <Link
                href="/privacy"
                className="text-primary underline hover:no-underline"
                target="_blank"
              >
                Chính sách quyền riêng tư
              </Link>{" "}
              để hiểu cách chúng tôi sử dụng dữ liệu cá nhân của bạn.
            </label>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

