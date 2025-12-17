"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'brand-button.tsx:7',message:'Component loaded on server',data:{hasUseClient:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion

export interface ProsfinButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "asChild"> {
  /**
   * Brand variant for Prosfin buttons
   * @default "primary"
   */
  brandVariant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * The scale of the button on hover.
   * @default 1.05
   */
  hoverScale?: number;
  /**
   * The scale of the button on tap.
   * @default 0.95
   */
  tapScale?: number;
}

/**
 * ProsfinButton - Branded button component wrapping shadcn Button
 * 
 * This component ensures consistent brand styling across the application.
 * Do not modify components/ui/button.tsx directly - use this wrapper instead.
 * Uses framer-motion for smooth hover and tap animations.
 */
export function ProsfinButton({
  className,
  brandVariant = "primary",
  variant,
  hoverScale = 1.05,
  tapScale = 0.95,
  children,
  ...props
}: ProsfinButtonProps) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'brand-button.tsx:33',message:'ProsfinButton called',data:{isServer:typeof window==='undefined',brandVariant},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // Map brand variants to shadcn variants
  const variantMap: Record<string, VariantProps<typeof buttonVariants>["variant"]> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
  };

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'brand-button.tsx:50',message:'About to render motion.div',data:{isServer:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className="inline-block"
    >
      <Button
        variant={variant || variantMap[brandVariant]}
        className={cn(
          // Brand-specific enhancements
          "font-medium tracking-normal rounded-full",
          // Ensure consistent focus states
          "focus-visible:ring-2 focus-visible:ring-primary/20",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

