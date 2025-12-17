import * as React from "react";
import { cn } from "../../utils";

export interface AdminSkeletonProps extends React.ComponentProps<"div"> {
  variant?: "text" | "circular" | "rectangular";
  lines?: number;
}

/**
 * AdminSkeleton - Loading skeleton component
 * 
 * @example
 * ```tsx
 * <AdminSkeleton variant="text" lines={3} />
 * <AdminSkeleton variant="circular" className="size-10" />
 * <AdminSkeleton variant="rectangular" className="h-20 w-full" />
 * ```
 */
export function AdminSkeleton({
  variant = "rectangular",
  lines = 1,
  className,
  ...props
}: AdminSkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="bg-muted h-4 w-full animate-pulse rounded"
            style={{
              width: i === lines - 1 ? "75%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-muted animate-pulse rounded",
        variant === "circular" && "rounded-full",
        className
      )}
      {...props}
    />
  );
}

