import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl";
}

export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  size = "md",
  ...props
}: SectionHeadingProps) {
  const sizeClasses = {
    sm: "text-2xl font-semibold",
    md: "text-3xl font-semibold sm:text-4xl",
    lg: "text-4xl font-semibold sm:text-5xl",
    xl: "text-5xl font-semibold sm:text-6xl",
  };

  return (
    <Component
      className={cn(
        "text-foreground tracking-tight",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

