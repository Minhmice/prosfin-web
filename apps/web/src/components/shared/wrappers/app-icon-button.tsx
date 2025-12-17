/**
 * AppIconButton - Icon-only button wrapper
 * 
 * Wrapper này wrap ProsfinButton với icon-only variant.
 * Đảm bảo icon buttons có size và spacing nhất quán.
 */

import * as React from "react";
import { ProsfinButton, type ProsfinButtonProps } from "../button/brand-button";
import { cn } from "@/lib/utils";

export interface AppIconButtonProps
  extends Omit<ProsfinButtonProps, "children"> {
  /**
   * Icon component (from lucide-react)
   */
  icon: React.ReactNode;
  /**
   * Icon size
   * @default "md"
   */
  iconSize?: "sm" | "md" | "lg";
  /**
   * Aria label (required for accessibility)
   */
  "aria-label": string;
}

/**
 * AppIconButton - Icon-only button wrapper component
 * 
 * @example
 * ```tsx
 * <AppIconButton icon={<Menu />} aria-label="Open menu" />
 * ```
 */
export function AppIconButton({
  icon,
  iconSize = "md",
  className,
  size,
  ...props
}: AppIconButtonProps) {
  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  // Map iconSize to button size if not provided
  const buttonSize = size || (iconSize === "sm" ? "icon-sm" : iconSize === "lg" ? "icon-lg" : "icon");

  return (
    <ProsfinButton
      size={buttonSize}
      className={cn("p-0", className)}
      {...props}
    >
      <span className={iconSizeClasses[iconSize]}>{icon}</span>
    </ProsfinButton>
  );
}

