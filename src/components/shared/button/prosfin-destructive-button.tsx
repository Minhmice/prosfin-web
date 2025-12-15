import * as React from "react";
import Link from "next/link";
import { ProsfinButton, type ProsfinButtonProps } from "../prosfin-button";
import { cn } from "@/lib/utils";

export interface ProsfinDestructiveButtonProps
  extends Omit<ProsfinButtonProps, "brandVariant" | "variant"> {
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
 * ProsfinDestructiveButton - Destructive button wrapper
 * 
 * Dùng cho các action nguy hiểm như xóa, unsubscribe.
 * Ít dùng trên landing, nhưng cần có trong system.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinDestructiveButton({
  href,
  children,
  className,
  ...props
}: ProsfinDestructiveButtonProps) {
  const button = (
    <ProsfinButton
      variant="destructive"
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

