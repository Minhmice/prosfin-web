"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { cn } from "@/lib/utils";

/**
 * Check if user prefers reduced motion
 */
function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export interface RevealOnScrollProps {
  /**
   * Children to animate
   */
  children: React.ReactNode;
  /**
   * Animation direction
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right" | "fade";
  /**
   * Delay before animation starts (ms)
   * @default 0
   */
  delay?: number;
  /**
   * Distance to slide (px)
   * @default 30
   */
  distance?: number;
  /**
   * Duration of animation (s)
   * @default 0.6
   */
  duration?: number;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * RevealOnScroll - Component wrapper để animate khi scroll vào viewport
 * 
 * Sử dụng Framer Motion để tạo fade + slide animation khi element vào viewport.
 * Chỉ animate một lần (không lặp lại) để tránh chóng mặt.
 * 
 * @example
 * ```tsx
 * <RevealOnScroll direction="up" delay={100}>
 *   <YourContent />
 * </RevealOnScroll>
 * ```
 */
export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  distance = 30,
  duration = 0.6,
  className,
}: RevealOnScrollProps) {
  const { ref, isInView } = useInViewAnimation({ delay, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is preferred, skip animations
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      case "fade":
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "fade":
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1], // easeInOutCubic
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

