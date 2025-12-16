import * as React from "react";
import { cn } from "@/lib/utils";

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div";
  variant?:
    | "body"
    | "muted"
    | "lead"
    | "large"
    | "small"
    | "metric"
    | "stepNumber"
    | "caption"
    | "icon";
};

/**
 * Text primitives theo style shadcn (centralize className, không rải size ở khắp nơi).
 */
export function Text({
  as: Comp = "p",
  variant = "body",
  className,
  ...props
}: TextProps) {
  const variants: Record<NonNullable<TextProps["variant"]>, string> = {
    body: "leading-7 text-foreground",
    muted: "text-sm leading-6 text-muted-foreground",
    lead: "text-lg leading-7 text-muted-foreground",
    large: "text-lg font-semibold leading-7 text-foreground",
    small: "text-sm font-medium leading-none text-foreground",
    metric: "text-2xl font-bold text-primary sm:text-3xl",
    stepNumber: "text-4xl font-bold text-primary/20 sm:text-5xl",
    caption: "text-xs text-muted-foreground sm:text-sm",
    icon: "text-2xl sm:text-3xl",
  };

  return <Comp className={cn(variants[variant], className)} {...props} />;
}

export function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-1.5 py-1 font-mono text-sm font-semibold text-foreground",
        className
      )}
      {...props}
    />
  );
}


