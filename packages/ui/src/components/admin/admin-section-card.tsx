import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../utils";

export interface AdminSectionCardProps
  extends React.ComponentProps<typeof Card> {
  title?: string;
  headerActions?: React.ReactNode;
}

/**
 * AdminSectionCard - Card wrapper cho dashboard sections
 * 
 * @example
 * ```tsx
 * <AdminSectionCard title="KPI Overview" headerActions={<Button>Export</Button>}>
 *   Content here
 * </AdminSectionCard>
 * ```
 */
export function AdminSectionCard({
  title,
  headerActions,
  className,
  children,
  ...props
}: AdminSectionCardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      {(title || headerActions) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            {title && <CardTitle>{title}</CardTitle>}
            {headerActions && <div>{headerActions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

