import * as React from "react";
import { cn } from "../../utils";

export interface AdminEmptyStateProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * AdminEmptyState - Empty state component
 * 
 * @example
 * ```tsx
 * <AdminEmptyState 
 *   title="No leads found"
 *   description="Get started by creating a new lead"
 *   action={<Button>Create Lead</Button>}
 * />
 * ```
 */
export function AdminEmptyState({
  title,
  description,
  action,
  icon,
  className,
  ...props
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

