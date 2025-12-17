import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./typography";

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
  const asForHeading = ((): "h1" | "h2" | "h3" | "h4" => {
    if (Component === "h1") return "h1";
    if (Component === "h2") return "h2";
    if (Component === "h3") return "h3";
    return "h4";
  })();

  const sizeClasses = {
    sm: "text-xl font-semibold",
    md: "text-2xl font-semibold",
    lg: "text-3xl font-semibold",
    xl: "text-4xl font-extrabold lg:text-5xl",
  };

  return (
    <Heading
      as={asForHeading}
      className={cn(
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Heading>
  );
}

