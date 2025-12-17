"use client";

import * as React from "react";
import { Input, cn } from "@prosfin/ui";
import { Search } from "lucide-react";
import type { TableToolbarProps } from "./types";

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  rightActions,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2">
        {filters && <div className="flex items-center gap-2">{filters}</div>}
        {rightActions && (
          <div className="flex items-center gap-2">{rightActions}</div>
        )}
      </div>
    </div>
  );
}

