import * as React from "react";
import { cn } from "../../utils";

export interface AdminToolbarProps extends React.ComponentProps<"div"> {
  search?: React.ReactNode;
  rightActions?: React.ReactNode;
}

/**
 * AdminToolbar - Toolbar với search slot và right actions
 * 
 * @example
 * ```tsx
 * <AdminToolbar 
 *   search={<Input placeholder="Search..." />}
 *   rightActions={<Button>Filter</Button>}
 * />
 * ```
 */
export function AdminToolbar({
  search,
  rightActions,
  className,
  ...props
}: AdminToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-4",
        className
      )}
      {...props}
    >
      {search && <div className="flex-1 max-w-sm">{search}</div>}
      {rightActions && (
        <div className="flex items-center gap-2">{rightActions}</div>
      )}
    </div>
  );
}

