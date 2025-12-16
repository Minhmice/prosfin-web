import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProsfinButton, type ProsfinButtonProps } from "./brand-button";
import { cn } from "@/lib/utils";

export interface ProsfinLinkButtonProps
  extends Omit<ProsfinButtonProps, "brandVariant" | "variant"> {
  /**
   * Optional href for Link
   */
  href?: string;
  /**
   * Children content
   */
  children: React.ReactNode;
  /**
   * Show arrow icon
   * @default true
   */
  showArrow?: boolean;
}

/**
 * ProsfinLinkButton - Link button wrapper
 * 
 * Giống text link, nhưng dùng cấu trúc button (dễ reuse với router).
 * Dùng ở copy kiểu "Tìm hiểu thêm về cách làm việc của ProsFIN →"
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinLinkButton({
  href,
  children,
  showArrow = true,
  className,
  ...props
}: ProsfinLinkButtonProps) {
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="ml-1 h-4 w-4" />}
    </>
  );

  const button = (
    <ProsfinButton
      variant="link"
      className={cn("font-normal", className)}
      {...props}
    >
      {content}
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

