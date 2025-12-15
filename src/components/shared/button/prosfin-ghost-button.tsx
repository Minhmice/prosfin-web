import * as React from "react";
import Link from "next/link";
import { ProsfinButton, type ProsfinButtonProps } from "../prosfin-button";
import { cn } from "@/lib/utils";

export interface ProsfinGhostButtonProps
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
 * ProsfinGhostButton - Ghost button wrapper cho link nhẹ, icon button
 * 
 * Dùng cho link nhẹ, icon button, navigation items.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinGhostButton({
  href,
  children,
  className,
  ...props
}: ProsfinGhostButtonProps) {
  const button = (
    <ProsfinButton
      brandVariant="ghost"
      className={cn("font-normal", className)}
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

