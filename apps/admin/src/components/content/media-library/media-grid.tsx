"use client";

import * as React from "react";
import { Button, Badge } from "@prosfin/ui";
import { Image as ImageIcon, File, Video } from "lucide-react";
import type { Media } from "@/types/media";

interface MediaGridProps {
  media: Media[];
  selectedIds?: string[];
  onSelect?: (media: Media) => void;
  onMediaClick?: (media: Media) => void;
}

export function MediaGrid({ media, selectedIds = [], onSelect, onMediaClick }: MediaGridProps) {
  const getIcon = (type: Media["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="size-8" />;
      case "video":
        return <Video className="size-8" />;
      default:
        return <File className="size-8" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {media.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`group relative cursor-pointer rounded-lg border-2 transition-all ${
              isSelected ? "border-primary" : "border-border hover:border-primary/50"
            }`}
            onClick={() => onMediaClick?.(item)}
          >
            <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.alt || item.filename}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  {getIcon(item.type)}
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="truncate text-xs font-medium">{item.filename}</p>
              {item.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {onSelect && (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

