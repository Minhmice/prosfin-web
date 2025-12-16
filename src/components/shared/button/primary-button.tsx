import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ProsfinButton, type ProsfinButtonProps } from "./brand-button";
import { cn } from "@/lib/utils";

export interface ProsfinPrimaryButtonProps
  extends Omit<ProsfinButtonProps, "brandVariant"> {
  /**
   * Optional href for Link
   */
  href?: string;
  /**
   * Children content
   */
  children: React.ReactNode;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Icon to display (left or right)
   */
  icon?: React.ReactNode;
  /**
   * Icon position
   * @default "right"
   */
  iconPosition?: "left" | "right";
}

/**
 * ProsfinPrimaryButton - Primary button wrapper cho CTA chính
 * 
 * Dùng cho các CTA chính như "Đặt lịch tư vấn".
 * Hỗ trợ loading state và icon.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinPrimaryButton({
  href,
  children,
  loading = false,
  icon,
  iconPosition = "right",
  className,
  disabled,
  ...props
}: ProsfinPrimaryButtonProps) {
  const content = (
    <>
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Đang gửi...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </>
  );

  const button = (
    <ProsfinButton
      brandVariant="primary"
      className={cn("font-semibold", className)}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </ProsfinButton>
  );

  if (href && !loading) {
    return (
      <Link href={href} className="inline-block">
        {button}
      </Link>
    );
  }

  return button;
}

