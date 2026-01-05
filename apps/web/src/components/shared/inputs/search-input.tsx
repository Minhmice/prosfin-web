/**
 * SearchInput - Wrapper cho Input với search icon và debounce
 * 
 * Wrapper component với debounce logic để tránh spam navigation.
 */

"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  onSearchChange?: (value: string) => void;
  debounceMs?: number;
  showIcon?: boolean;
}

/**
 * useDebounce - Hook để debounce value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * SearchInput - Search input với debounce
 * 
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Tìm kiếm dịch vụ..."
 *   onSearchChange={(value) => setQuery(value)}
 *   debounceMs={300}
 * />
 * ```
 */
export function SearchInput({
  onSearchChange,
  debounceMs = 300,
  showIcon = true,
  className,
  ...props
}: SearchInputProps) {
  const [localValue, setLocalValue] = React.useState(
    (props.value as string) || props.defaultValue || ""
  );
  const debouncedValue = useDebounce(localValue, debounceMs);

  React.useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedValue);
    }
  }, [debouncedValue, onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative">
      {showIcon && (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        {...props}
        value={localValue}
        onChange={handleChange}
        className={cn(showIcon && "pl-9", className)}
      />
    </div>
  );
}

