import * as React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
  /**
   * Bật divider dưới H2 (giống demo shadcn Typography), mặc định tắt để hợp UI marketing.
   */
  withDivider?: boolean;
};

/**
 * Heading primitives theo style shadcn (centralize className).
 */
export function Heading({
  as: Comp = "h2",
  withDivider = false,
  className,
  ...props
}: HeadingProps) {
  const base = "scroll-m-20 tracking-tight text-foreground";
  const byLevel: Record<NonNullable<HeadingProps["as"]>, string> = {
    h1: "text-4xl font-extrabold lg:text-5xl",
    h2: cn("text-3xl font-semibold", withDivider && "border-b pb-2"),
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
  };

  return <Comp className={cn(base, byLevel[Comp], className)} {...props} />;
}

export const H1 = (props: Omit<HeadingProps, "as">) => <Heading as="h1" {...props} />;
export const H2 = (props: Omit<HeadingProps, "as">) => <Heading as="h2" {...props} />;
export const H3 = (props: Omit<HeadingProps, "as">) => <Heading as="h3" {...props} />;
export const H4 = (props: Omit<HeadingProps, "as">) => <Heading as="h4" {...props} />;

/**
 * PageTitle: h1 cho các page detail (dịch vụ, case study...), dùng size nhất quán thay vì set tay.
 */
export function PageTitle({ className, ...props }: Omit<HeadingProps, "as">) {
  return <Heading as="h1" className={cn("text-3xl font-bold sm:text-4xl lg:text-5xl", className)} {...props} />;
}

/**
 * FormTitle: tiêu đề cho các form/page ngắn (nhỏ hơn PageTitle).
 */
export function FormTitle({ className, ...props }: Omit<HeadingProps, "as">) {
  return <Heading as="h1" className={cn("text-2xl font-bold sm:text-3xl lg:text-4xl", className)} {...props} />;
}


