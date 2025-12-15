"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImagePlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label text to display in the placeholder
   * @default "Image Placeholder"
   */
  label?: string;
  /**
   * Icon/emoji to display (optional)
   * @default "🖼️"
   */
  icon?: string;
  /**
   * Aspect ratio of the placeholder
   * @default "auto"
   */
  aspectRatio?: "auto" | "square" | "video" | "wide" | "portrait" | string;
  /**
   * Size variant for quick presets
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Show border
   * @default true
   */
  showBorder?: boolean;
  /**
   * Show dashed border style (for wireframe)
   * @default true
   */
  dashed?: boolean;
}

/**
 * ImagePlaceholder - Component wireframe placeholder cho ảnh, logo, icons
 * 
 * Sử dụng khi chưa có ảnh thật, giúp visualize layout trong quá trình phát triển.
 * Có thể tùy chỉnh kích thước, aspect ratio, label và icon.
 */
export function ImagePlaceholder({
  label = "Image Placeholder",
  icon = "🖼️",
  aspectRatio = "auto",
  size = "full",
  showBorder = true,
  dashed = true,
  className,
  style,
  ...props
}: ImagePlaceholderProps) {
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  };

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
    full: "w-full h-full",
  };

  const aspectClass =
    typeof aspectRatio === "string" && aspectRatio in aspectRatioClasses
      ? aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses]
      : aspectRatio !== "auto"
        ? `aspect-[${aspectRatio}]`
        : "";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "bg-gradient-to-br from-muted/50 to-muted/30",
        "text-muted-foreground",
        showBorder && "border",
        showBorder && dashed && "border-dashed",
        showBorder && !dashed && "border-solid",
        showBorder && "border-border",
        aspectClass,
        size !== "full" && sizeClasses[size],
        "rounded-md",
        "transition-colors",
        className
      )}
      style={style}
      {...props}
    >
      {icon && (
        <span className="mb-2 text-2xl sm:text-3xl" role="img" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="text-center text-xs font-medium sm:text-sm">
        {label}
      </span>
    </div>
  );
}

/**
 * LogoPlaceholder - Specialized placeholder for logos
 */
export function LogoPlaceholder({
  className,
  ...props
}: Omit<ImagePlaceholderProps, "label" | "icon">) {
  return (
    <ImagePlaceholder
      label="Logo"
      icon="🏢"
      aspectRatio="square"
      size="md"
      className={cn("max-w-32", className)}
      {...props}
    />
  );
}

/**
 * HeroImagePlaceholder - Specialized placeholder for hero images
 */
export function HeroImagePlaceholder({
  className,
  ...props
}: Omit<ImagePlaceholderProps, "label" | "icon" | "aspectRatio">) {
  return (
    <ImagePlaceholder
      label="Hero Image"
      icon="📊"
      aspectRatio="wide"
      size="full"
      className={className}
      {...props}
    />
  );
}

/**
 * AvatarPlaceholder - Specialized placeholder for avatars
 */
export function AvatarPlaceholder({
  className,
  ...props
}: Omit<ImagePlaceholderProps, "label" | "icon" | "aspectRatio" | "size">) {
  return (
    <ImagePlaceholder
      label="Avatar"
      icon="👤"
      aspectRatio="square"
      size="md"
      className={cn("rounded-full", className)}
      {...props}
    />
  );
}

