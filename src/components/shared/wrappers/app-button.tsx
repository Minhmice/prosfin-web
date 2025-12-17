/**
 * AppButton - Wrapper cho Button component
 * 
 * Wrapper này wrap ProsfinButton (đã wrap shadcn Button).
 * Đảm bảo không sửa trực tiếp src/components/ui/button.tsx
 */

import * as React from "react";
import Link from "next/link";
import { ProsfinButton, type ProsfinButtonProps } from "../button/brand-button";

export interface AppButtonProps extends ProsfinButtonProps {
  /**
   * Optional href for Link
   */
  href?: string;
}

/**
 * AppButton - Main button wrapper component
 * 
 * @example
 * ```tsx
 * <AppButton variant="primary" size="lg" href="/contact">Click me</AppButton>
 * ```
 */
export function AppButton({ href, ...props }: AppButtonProps) {
  const button = <ProsfinButton {...props} />;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {button}
      </Link>
    );
  }

  return button;
}

