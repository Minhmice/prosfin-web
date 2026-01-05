/**
 * AppDrawer - Wrapper cho Sheet component
 * 
 * Wrapper component để customize Sheet behavior.
 */

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { SheetProps } from "@/components/ui/sheet";

export interface AppDrawerProps extends SheetProps {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

/**
 * AppDrawer - Drawer wrapper component
 * 
 * @example
 * ```tsx
 * <AppDrawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Compare Services"
 *   side="right"
 *   size="lg"
 * >
 *   <div>Content</div>
 * </AppDrawer>
 * ```
 */
export function AppDrawer({
  title,
  description,
  trigger,
  side = "right",
  size = "md",
  children,
  ...props
}: AppDrawerProps) {
  return (
    <Sheet {...props}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={sizeClasses[size]}>
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
}

