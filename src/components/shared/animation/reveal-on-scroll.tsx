"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { cn } from "@/lib/utils";

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
  /**
   * HTML tag to render
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
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
  as: Component = "div",
}: RevealOnScrollProps) {
  const { ref, isInView } = useInViewAnimation({ delay, threshold: 0.1 });

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

  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;

  return (
    <MotionComponent
      ref={ref as React.Ref<HTMLElement>}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1], // easeInOutCubic
      }}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}

