import * as React from "react";
import { cn } from "../../utils";
import { Button } from "../ui/button";

export interface AdminErrorStateProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * AdminErrorState - Error state component
 * 
 * @example
 * ```tsx
 * <AdminErrorState 
 *   title="Something went wrong"
 *   description="Failed to load data"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export function AdminErrorState({
  title = "Something went wrong",
  description = "An error occurred while loading this content.",
  onRetry,
  retryLabel = "Try again",
  className,
  ...props
}: AdminErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

