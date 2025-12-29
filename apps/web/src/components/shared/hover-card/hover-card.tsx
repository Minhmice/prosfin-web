"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCardContext() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within HoverCardProvider");
  }
  return context;
}

export interface HoverCardProviderProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

/**
 * HoverCardProvider - Provider component for hover card system
 * Similar to TooltipProvider but for more detailed content
 */
export function HoverCardProvider({
  children,
  openDelay = 300,
  closeDelay = 200,
}: HoverCardProviderProps) {
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

  const value = React.useMemo<HoverCardContextValue>(
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
    <HoverCardContext.Provider value={value}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        className="relative inline-block"
      >
        {children}
      </div>
    </HoverCardContext.Provider>
  );
}

export interface HoverCardProps {
  children: React.ReactNode;
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
}

/**
 * HoverCard - Main hover card component
 */
export function HoverCard({
  children,
  side = "top",
  sideOffset = 0,
  align = "center",
  alignOffset = 0,
}: HoverCardProps) {
  const parentContext = React.useContext(HoverCardContext);
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const openDelay = parentContext?.openDelay || 300;
  const closeDelay = parentContext?.closeDelay || 200;

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

  const value = React.useMemo<HoverCardContextValue>(
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
    <HoverCardContext.Provider value={value}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        className="relative inline-block"
      >
        {children}
      </div>
    </HoverCardContext.Provider>
  );
}

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

/**
 * HoverCardTrigger - Trigger element for hover card
 * Supports keyboard navigation (Tab + Enter/Space)
 */
export function HoverCardTrigger({
  asChild = false,
  children,
  className,
  ...props
}: HoverCardTriggerProps) {
  const { open, setOpen } = useHoverCardContext();

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [open, setOpen]
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      tabIndex: 0,
      role: "button",
      "aria-expanded": open,
      onKeyDown: handleKeyDown,
    } as any);
  }

  return (
    <div
      className={cn("inline-block", className)}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export interface HoverCardContentProps
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
 * HoverCardContent - Content of the hover card
 */
export function HoverCardContent({
  asChild = false,
  children,
  className,
  ...props
}: HoverCardContentProps) {
  const { open, side, sideOffset } = useHoverCardContext();

  const getInitialY = () => {
    if (side === "top") return 5;
    if (side === "bottom") return -5;
    return 0;
  };

  // Filter out props that conflict with framer-motion
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
            "absolute z-50 rounded-lg border bg-popover p-4 text-sm text-popover-foreground shadow-lg",
            "max-w-sm w-max",
            getSideClasses(side, sideOffset || 8),
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

