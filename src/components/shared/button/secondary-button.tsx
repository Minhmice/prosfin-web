import * as React from "react";
import Link from "next/link";
import { ProsfinButton, type ProsfinButtonProps } from "./brand-button";
import { cn } from "@/lib/utils";

export interface ProsfinSecondaryButtonProps
  extends Omit<ProsfinButtonProps, "brandVariant"> {
  /**
   * Optional href for Link
   */
  href?: string;
  /**
   * Children content
   */
  children: React.ReactNode;
}

/**
 * ProsfinSecondaryButton - Secondary button wrapper cho CTA phụ
 * 
 * Dùng cho các CTA phụ như "Xem dịch vụ", "Tìm hiểu thêm".
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinSecondaryButton({
  href,
  children,
  className,
  ...props
}: ProsfinSecondaryButtonProps) {
  const button = (
    <ProsfinButton
      brandVariant="outline"
      className={cn("font-medium", className)}
      {...props}
    >
      {children}
    </ProsfinButton>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {button}
      </Link>
    );
  }

  return button;
}

