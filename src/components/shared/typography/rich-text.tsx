import * as React from "react";
import { cn } from "@/lib/utils";

type RichTextProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * RichText: wrapper cho nội dung text phức tạp (h2/h3/p/ul/blockquote/code...)
 * theo style shadcn Typography, để không phải set class size thủ công từng chỗ.
 */
export function RichText({ className, ...props }: RichTextProps) {
  return (
    <div
      className={cn(
        "text-foreground",
        // headings
        "[&_h1]:scroll-m-20 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight lg:[&_h1]:text-5xl",
        "[&_h2]:scroll-m-20 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:scroll-m-20 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight",
        "[&_h4]:scroll-m-20 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:tracking-tight",
        // spacing
        "[&_p]:leading-7 [&_p]:text-foreground [&_p:not(:first-child)]:mt-4",
        "[&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul>li]:mt-2",
        "[&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol>li]:mt-2",
        "[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-1 [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold",
        className
      )}
      {...props}
    />
  );
}


