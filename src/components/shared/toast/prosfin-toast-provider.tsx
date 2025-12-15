"use client";

import * as React from "react";

export interface ToastOptions {
  title?: string;
  description: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

/**
 * useProsfinToast - Hook để sử dụng toast
 * 
 * Hook để hiển thị toast notifications.
 * Hiện tại dùng console.log và alert, có thể nâng cấp với Radix UI Toast sau.
 */
export function useProsfinToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    // Fallback: dùng console và alert
    return {
      toast: (options: ToastOptions) => {
        console.log("Toast:", options);
        if (options.variant === "error") {
          alert(`Lỗi: ${options.description}`);
        } else {
          alert(options.description);
        }
      },
    };
  }
  return context;
}

/**
 * ProsfinToastProvider - Toast provider component
 * 
 * Provider cho toast system.
 * Hiện tại chỉ là wrapper, có thể nâng cấp với Radix UI Toast sau.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = React.useCallback((options: ToastOptions) => {
    // TODO: Implement với Radix UI Toast khi có dependency
    console.log("Toast:", options);
    if (options.variant === "error") {
      alert(`Lỗi: ${options.description}`);
    } else {
      alert(options.description);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
}

