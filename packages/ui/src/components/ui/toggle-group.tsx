"use client";

import * as React from "react";
import { cn } from "../../utils";
import { Button } from "./button";

export interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function ToggleGroup({
  type = "single",
  value,
  onValueChange,
  className,
  children,
}: ToggleGroupProps) {
  const handleItemClick = (itemValue: string) => {
    if (type === "single") {
      onValueChange?.(itemValue === value ? "" : itemValue);
    }
  };

  return (
    <div
      role="group"
      className={cn("flex items-center gap-0 rounded-md border", className)}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === ToggleGroupItem) {
          const itemProps = child.props as ToggleGroupItemProps;
          const isSelected = itemProps.value === value;
          return React.cloneElement(child, {
            ...itemProps,
            selected: isSelected,
            onSelect: () => handleItemClick(itemProps.value),
            isFirst: index === 0,
            isLast: index === React.Children.count(children) - 1,
          } as any);
        }
        return child;
      })}
    </div>
  );
}

export interface ToggleGroupItemProps {
  value: string;
  selected?: boolean;
  onSelect?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ToggleGroupItem({
  value,
  selected,
  onSelect,
  isFirst,
  isLast,
  className,
  children,
}: ToggleGroupItemProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onSelect}
      className={cn(
        "rounded-none border-l-0 shadow-none",
        isFirst && "rounded-l-md border-l",
        isLast && "rounded-r-md",
        selected && "bg-accent text-accent-foreground",
        className
      )}
    >
      {children}
    </Button>
  );
}

