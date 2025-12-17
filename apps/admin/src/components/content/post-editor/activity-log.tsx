"use client";

import * as React from "react";
import { format } from "date-fns";
import type { PostActivityEvent } from "@/types/content";

interface ActivityLogProps {
  events: PostActivityEvent[];
}

export function ActivityLog({ events }: ActivityLogProps) {
  if (events.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-8">
        No activity yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
          <div className="flex-1">
            <p className="font-medium text-sm">{event.title}</p>
            {event.description && (
              <p className="text-muted-foreground text-xs mt-1">{event.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              {event.actor && (
                <span className="text-muted-foreground text-xs">{event.actor}</span>
              )}
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs">
                {format(new Date(event.timestamp), "MMM dd, yyyy HH:mm")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

