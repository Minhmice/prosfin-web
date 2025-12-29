"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]
            [--aurora-light:repeating-linear-gradient(100deg,var(--chart-1)_10%,var(--chart-2)_15%,var(--chart-3)_20%,var(--chart-4)_25%,var(--primary)_30%)]
            [--aurora-dark:repeating-linear-gradient(100deg,var(--primary)_10%,var(--chart-2)_15%,var(--chart-3)_20%,var(--chart-4)_25%,var(--primary)_30%)]
            [background-image:var(--white-gradient),var(--aurora-light)]
            dark:[background-image:var(--dark-gradient),var(--aurora-dark)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            animate-aurora
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora-light)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora-dark)]
            after:[background-size:200%,_100%] 
            after:animate-aurora-reverse after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

