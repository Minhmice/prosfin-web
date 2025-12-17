"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook để detect khi element vào viewport và trigger animation một lần
 * 
 * @param delay - Delay trước khi trigger animation (ms)
 * @param threshold - Intersection Observer threshold (0-1)
 * @param once - Chỉ trigger một lần (default: true)
 * @returns { ref, isInView } - ref để attach vào element, isInView là state
 * 
 * @example
 * ```tsx
 * const { ref, isInView } = useInViewAnimation({ delay: 200 });
 * 
 * return (
 *   <div ref={ref}>
 *     {isInView && <AnimatedContent />}
 *   </div>
 * );
 * ```
 */
export function useInViewAnimation({
  delay = 0,
  threshold = 0.1,
  once = true,
}: {
  delay?: number;
  threshold?: number;
  once?: boolean;
} = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Nếu đã animate và once = true, không cần observer nữa
    if (hasAnimated && once) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsInView(true);
                if (once) {
                  setHasAnimated(true);
                }
              }, delay);
            } else {
              setIsInView(true);
              if (once) {
                setHasAnimated(true);
              }
            }
          } else if (!once) {
            // Nếu once = false, reset khi ra khỏi viewport
            setIsInView(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, once, hasAnimated]);

  return { ref, isInView };
}

