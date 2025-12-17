/**
 * URL State Management Hook
 * 
 * Syncs component state with URL searchParams for deep-linkable state.
 * Supports debounce for search inputs and replace vs push for history.
 */

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface UseUrlStateOptions {
  replace?: boolean; // Use router.replace vs router.push
  debounce?: number; // Debounce delay in ms (for search inputs)
}

/**
 * Hook to sync state with URL searchParams
 * 
 * @param key - URL search param key
 * @param defaultValue - Default value if not in URL
 * @param options - Configuration options
 * @returns [value, setValue] tuple
 */
export function useUrlState<T extends string | number | boolean>(
  key: string,
  defaultValue: T,
  options?: UseUrlStateOptions
): [T, (value: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse value from URL
  const urlValue = searchParams.get(key);
  const value: T = urlValue
    ? (parseValue(urlValue, defaultValue) as T)
    : defaultValue;

  // Update URL with new value
  const setValue = useCallback(
    (newValue: T) => {
      // Don't update if value hasn't changed
      const currentValue = urlValue ? (parseValue(urlValue, defaultValue) as T) : defaultValue;
      if (currentValue === newValue) {
        return;
      }

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const updateUrl = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        // Remove param if value equals default
        if (newValue === defaultValue) {
          params.delete(key);
        } else {
          params.set(key, String(newValue));
        }

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        const method = options?.replace ? router.replace : router.push;
        method(url);
      };

      // Apply debounce if specified
      if (options?.debounce && options.debounce > 0) {
        debounceTimerRef.current = setTimeout(updateUrl, options.debounce);
      } else {
        updateUrl();
      }
    },
    [key, defaultValue, urlValue, searchParams, pathname, router, options]
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return [value, setValue];
}

/**
 * Parse string value to appropriate type based on default value
 */
function parseValue(value: string, defaultValue: string | number | boolean): string | number | boolean {
  if (typeof defaultValue === "number") {
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  if (typeof defaultValue === "boolean") {
    return value === "true";
  }
  return value;
}

/**
 * Hook for array values (e.g., multiple filters)
 */
export function useUrlStateArray(
  key: string,
  defaultValue: string[] = [],
  options?: UseUrlStateOptions
): [string[], (value: string[]) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse array from URL (comma-separated)
  const urlValue = searchParams.get(key);
  const value: string[] = urlValue
    ? urlValue.split(",").filter(Boolean)
    : defaultValue;

  const setValue = useCallback(
    (newValue: string[]) => {
      // Don't update if value hasn't changed
      const currentValue = urlValue ? urlValue.split(",").filter(Boolean) : defaultValue;
      if (JSON.stringify(currentValue) === JSON.stringify(newValue)) {
        return;
      }

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const updateUrl = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (newValue.length === 0 || JSON.stringify(newValue) === JSON.stringify(defaultValue)) {
          params.delete(key);
        } else {
          params.set(key, newValue.join(","));
        }

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        const method = options?.replace ? router.replace : router.push;
        method(url);
      };

      if (options?.debounce && options.debounce > 0) {
        debounceTimerRef.current = setTimeout(updateUrl, options.debounce);
      } else {
        updateUrl();
      }
    },
    [key, defaultValue, urlValue, searchParams, pathname, router, options]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return [value, setValue];
}

