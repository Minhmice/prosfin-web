import * as React from "react";
import { cn } from "../../utils";

export interface AdminPageShellProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * AdminPageShell - Page container với title, description, và actions slot
 * 
 * @example
 * ```tsx
 * <AdminPageShell 
 *   title="Leads" 
 *   description="Manage your leads"
 *   actions={<Button>New Lead</Button>}
 * >
 *   Content here
 * </AdminPageShell>
 * ```
 */
export function AdminPageShell({
  title,
  description,
  actions,
  className,
  children,
  ...props
}: AdminPageShellProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

