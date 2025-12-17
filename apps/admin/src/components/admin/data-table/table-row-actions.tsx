"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@prosfin/ui";

export interface RowAction<T> {
  label: string | ((row: T) => string);
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
}

export interface TableRowActionsProps<T> {
  row: T;
  actions: RowAction<T>[];
}

export function TableRowActions<T>({
  row,
  actions,
}: TableRowActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" suppressHydrationWarning>
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const label = typeof action.label === "function" ? action.label(row) : action.label;
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick(row)}
              className={action.variant === "destructive" ? "text-destructive" : ""}
            >
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

