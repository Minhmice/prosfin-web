"use client";

import * as React from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within TooltipProvider");
  }
  return context;
}

export interface TooltipProviderProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  transition?: Transition;
}

/**
 * TooltipProvider - Provider component for tooltip system
 */
export function TooltipProvider({
  children,
  openDelay = 700,
  closeDelay = 300,
  transition = { type: "spring", stiffness: 300, damping: 35 },
}: TooltipProviderProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleOpen = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [openDelay]);

  const handleClose = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = React.useMemo<TooltipContextValue>(
    () => ({
      open,
      setOpen,
      openDelay,
      closeDelay,
      side: "top",
      sideOffset: 0,
      align: "center",
      alignOffset: 0,
    }),
    [open, openDelay, closeDelay]
  );

  return (
    <TooltipContext.Provider value={value}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className="relative inline-block"
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export interface TooltipProps {
  children: React.ReactNode;
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
}

/**
 * Tooltip - Main tooltip component
 */
export function Tooltip({
  children,
  side = "top",
  sideOffset = 0,
  align = "center",
  alignOffset = 0,
}: TooltipProps) {
  const parentContext = React.useContext(TooltipContext);
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const openDelay = parentContext?.openDelay || 700;
  const closeDelay = parentContext?.closeDelay || 300;

  const handleOpen = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [openDelay]);

  const handleClose = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = React.useMemo<TooltipContextValue>(
    () => ({
      open,
      setOpen,
      openDelay,
      closeDelay,
      side,
      sideOffset,
      align,
      alignOffset,
    }),
    [open, openDelay, closeDelay, side, sideOffset, align, alignOffset]
  );

  return (
    <TooltipContext.Provider value={value}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className="relative inline-block"
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

/**
 * TooltipTrigger - Trigger element for tooltip
 */
export function TooltipTrigger({
  asChild = false,
  children,
  className,
  ...props
}: TooltipTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props as any);
  }

  return (
    <div className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  );
}

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const getSideClasses = (side: Side, sideOffset: number): string => {
  const baseClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return baseClasses[side];
};

/**
 * TooltipContent - Content of the tooltip
 */
export function TooltipContent({
  asChild = false,
  children,
  className,
  ...props
}: TooltipContentProps) {
  const { open, side, sideOffset } = useTooltipContext();

  const getInitialY = () => {
    if (side === "top") return 5;
    if (side === "bottom") return -5;
    return 0;
  };

  // Filter out props that conflict with framer-motion
  // Only keep safe props like id, data-*, aria-*, style, etc.
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    ...motionProps
  } = props;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: getInitialY() }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: getInitialY() }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 35,
          }}
          className={cn(
            "absolute z-50 rounded-md bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg",
            "max-w-xs w-max",
            getSideClasses(side, sideOffset || 2),
            className
          )}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface TooltipArrowProps extends React.SVGProps<SVGSVGElement> {
  withTransition?: boolean;
}

/**
 * TooltipArrow - Arrow indicator for tooltip
 */
export function TooltipArrow({
  withTransition = true,
  className,
  ...props
}: TooltipArrowProps) {
  const { side } = useTooltipContext();

  const arrowClasses: Record<Side, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-popover",
    left: "left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-popover",
    right: "right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover",
  };

  return (
    <div
      className={cn(
        "absolute",
        arrowClasses[side],
        withTransition && "transition-all",
        className
      )}
      {...(props as any)}
    />
  );
}

