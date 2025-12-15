"use client";

import * as React from "react";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  /**
   * Target value to count to
   */
  value: number;
  /**
   * Duration of animation (ms)
   * @default 2000
   */
  duration?: number;
  /**
   * Prefix text (e.g., "+", "$")
   */
  prefix?: string;
  /**
   * Suffix text (e.g., "+", "%", " năm")
   */
  suffix?: string;
  /**
   * Decimal places
   * @default 0
   */
  decimals?: number;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Easing function
   * @default "easeOutCubic"
   */
  easing?: (t: number) => number;
}

/**
 * AnimatedCounter - Component để animate số từ 0 đến target value
 * 
 * Sử dụng requestAnimationFrame để tạo smooth count-up animation.
 * Chỉ animate khi element vào viewport (một lần).
 * 
 * @example
 * ```tsx
 * <AnimatedCounter value={120} suffix="+ DN" />
 * ```
 */
export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  easing = (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const { ref, isInView } = useInViewAnimation({ delay: 100, threshold: 0.3 });
  const animationFrameRef = React.useRef<number>();
  const startTimeRef = React.useRef<number>();

  React.useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    const startAnimation = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentValue = value * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(startAnimation);
      } else {
        setDisplayValue(value);
      }
    };

    startTimeRef.current = undefined;
    animationFrameRef.current = requestAnimationFrame(startAnimation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, value, duration, easing]);

  const formatValue = (val: number) => {
    return val.toFixed(decimals);
  };

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={cn(className)}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}

