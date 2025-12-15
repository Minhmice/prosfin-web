"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { ProsfinButton } from "../prosfin-button";
import { cn } from "@/lib/utils";

export interface ScrollTopButtonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Show button when scroll past this threshold (px)
   * @default 400
   */
  threshold?: number;
}

/**
 * ScrollTopButton - Scroll to top button component
 * 
 * Button nhỏ góc dưới phải để scroll về đầu trang.
 * Component riêng cho navigation.
 */
export function ScrollTopButton({
  className,
  threshold = 400,
}: ScrollTopButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-110",
        className
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

