"use client";

import * as React from "react";
import { format, isSameDay, parseISO } from "date-fns";
import { Badge } from "@prosfin/ui";
import {
  CheckCircle2,
  MessageSquare,
  User,
  ArrowRight,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import type { TimelineEvent, LeadStatus } from "@/types/admin";

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

const eventIcons: Record<TimelineEvent["type"], React.ComponentType<{ className?: string }>> = {
  submitted: FileText,
  verified: CheckCircle2,
  qualified: CheckCircle2,
  meeting: CheckCircle2,
  converted: CheckCircle2,
  note: MessageSquare,
  contacted: MessageSquare,
  status_changed: ArrowRight,
  note_added: MessageSquare,
  owner_changed: User,
  converted_to_client: ArrowRight,
  campaign_linked: LinkIcon,
};

const eventColors: Record<TimelineEvent["type"], string> = {
  submitted: "text-blue-600",
  verified: "text-green-600",
  qualified: "text-green-600",
  meeting: "text-purple-600",
  converted: "text-gray-600",
  note: "text-gray-600",
  contacted: "text-yellow-600",
  status_changed: "text-blue-600",
  note_added: "text-gray-600",
  owner_changed: "text-orange-600",
  converted_to_client: "text-green-600",
  campaign_linked: "text-blue-600",
};

function formatEventTitle(event: TimelineEvent): string {
  if (event.type === "status_changed" && event.payload) {
    const { oldStatus, newStatus } = event.payload;
    if (oldStatus && newStatus) {
      return `Status changed from ${oldStatus} to ${newStatus}`;
    }
  }
  if (event.type === "owner_changed" && event.payload) {
    const { oldOwner, newOwner } = event.payload;
    if (oldOwner !== undefined || newOwner !== undefined) {
      return `Owner changed${oldOwner ? ` from ${oldOwner}` : ""}${newOwner ? ` to ${newOwner}` : " (unassigned)"}`;
    }
  }
  if (event.type === "converted_to_client" && event.payload?.clientId) {
    return `Converted to client (${event.payload.clientId})`;
  }
  return event.title;
}

function formatEventDescription(event: TimelineEvent): string | null {
  if (event.description) {
    return event.description;
  }
  if (event.type === "note_added" && event.payload?.noteText) {
    return event.payload.noteText;
  }
  return null;
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No activity yet</p>
      </div>
    );
  }

  // Group events by day
  const groupedEvents = React.useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    events.forEach((event) => {
      const date = parseISO(event.timestamp);
      const dayKey = format(date, "yyyy-MM-dd");
      if (!groups[dayKey]) {
        groups[dayKey] = [];
      }
      groups[dayKey].push(event);
    });

    // Sort groups by date (newest first)
    const sortedGroups = Object.entries(groups).sort((a, b) => {
      return b[0].localeCompare(a[0]);
    });

    return sortedGroups.map(([dayKey, dayEvents]) => ({
      day: parseISO(dayKey),
      events: dayEvents.sort((a, b) => {
        return parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime();
      }),
    }));
  }, [events]);

  return (
    <div className="space-y-6">
      {groupedEvents.map(({ day, events: dayEvents }) => (
        <div key={format(day, "yyyy-MM-dd")}>
          <div className="sticky top-0 bg-background z-10 py-2 mb-4">
            <h4 className="text-sm font-semibold text-muted-foreground">
              {format(day, "EEEE, MMMM dd, yyyy")}
            </h4>
          </div>
          <div className="space-y-4">
            {dayEvents.map((event) => {
              const Icon = eventIcons[event.type] || FileText;
              const iconColor = eventColors[event.type] || "text-gray-600";

              return (
                <div key={event.id} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`rounded-full p-2 bg-muted ${iconColor}`}>
                      <Icon className="size-4" />
                    </div>
                    {event !== dayEvents[dayEvents.length - 1] && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{formatEventTitle(event)}</p>
                        {formatEventDescription(event) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatEventDescription(event)}
                          </p>
                        )}
                        {event.payload && (
                          <div className="mt-2 space-y-1">
                            {event.payload.oldStatus && event.payload.newStatus && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.payload.oldStatus}
                                </Badge>
                                <ArrowRight className="size-3 text-muted-foreground" />
                                <Badge variant="outline" className="text-xs">
                                  {event.payload.newStatus}
                                </Badge>
                              </div>
                            )}
                            {event.payload.oldOwner !== undefined &&
                              event.payload.newOwner !== undefined && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{event.payload.oldOwner || "Unassigned"}</span>
                                  <ArrowRight className="size-3" />
                                  <span>{event.payload.newOwner || "Unassigned"}</span>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(event.timestamp), "HH:mm")}
                        </p>
                        {event.actor && (
                          <p className="text-xs text-muted-foreground mt-1">
                            by {event.actor}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

