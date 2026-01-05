/**
 * MoneyInput - Money input with formatting
 * 
 * Wrapper for Input component with money formatting and masking.
 */

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends React.ComponentProps<typeof Input> {
  value?: number | string;
  onValueChange?: (value: number) => void;
  showCurrency?: boolean;
  currency?: string;
}

/**
 * Format number as VND currency
 */
function formatVND(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

/**
 * Parse formatted string to number
 */
function parseValue(value: string): number {
  return Number(value.replace(/[^\d]/g, ""));
}

/**
 * MoneyInput - Money input with VND formatting
 */
export function MoneyInput({
  value,
  onValueChange,
  showCurrency = true,
  currency = "VND",
  className,
  onChange,
  ...props
}: MoneyInputProps) {
  const [displayValue, setDisplayValue] = React.useState<string>("");

  React.useEffect(() => {
    if (value !== undefined) {
      const numValue = typeof value === "string" ? parseValue(value) : value;
      setDisplayValue(numValue > 0 ? formatVND(numValue) : "");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = parseValue(inputValue);

    setDisplayValue(inputValue);

    if (onValueChange) {
      onValueChange(numValue);
    }

    if (onChange) {
      // Create synthetic event with numeric value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: String(numValue),
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="relative">
      <Input
        {...props}
        value={displayValue}
        onChange={handleChange}
        className={cn(showCurrency && "pr-12", className)}
        placeholder={props.placeholder || "0"}
      />
      {showCurrency && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {currency}
        </span>
      )}
    </div>
  );
}

