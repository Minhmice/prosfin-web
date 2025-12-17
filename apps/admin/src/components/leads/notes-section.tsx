"use client";

import * as React from "react";
import { format } from "date-fns";
import { Button, Textarea, Badge } from "@prosfin/ui";
import { Pin, PinOff, MessageSquare } from "lucide-react";
import { showToast } from "@/lib/toast";
import type { Lead, TimelineEvent } from "@/types/admin";

interface NotesSectionProps {
  lead: Lead;
  onNoteAdded?: (note: string) => void;
}

const quickTemplates = [
  { label: "Đã liên hệ", text: "Đã liên hệ với khách hàng." },
  { label: "Chờ phản hồi", text: "Đang chờ phản hồi từ khách hàng." },
  { label: "Đặt lịch", text: "Đã đặt lịch hẹn với khách hàng." },
];

export function NotesSection({ lead, onNoteAdded }: NotesSectionProps) {
  const [noteText, setNoteText] = React.useState("");
  const [pinnedNotes, setPinnedNotes] = React.useState<Set<string>>(new Set());

  // Extract notes from timeline
  const noteEvents = React.useMemo(() => {
    return (lead.timeline || []).filter(
      (event) => event.type === "note" || event.type === "note_added"
    );
  }, [lead.timeline]);

  const handleAddNote = () => {
    if (!noteText.trim()) {
      showToast.error("Note cannot be empty");
      return;
    }

    onNoteAdded?.(noteText);
    setNoteText("");
    showToast.success("Note added");
  };

  const handleQuickTemplate = (template: string) => {
    setNoteText(template);
  };

  const togglePin = (eventId: string) => {
    setPinnedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  // Sort notes: pinned first, then by timestamp
  const sortedNotes = React.useMemo(() => {
    return [...noteEvents].sort((a, b) => {
      const aPinned = pinnedNotes.has(a.id);
      const bPinned = pinnedNotes.has(b.id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return (
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
  }, [noteEvents, pinnedNotes]);

  return (
    <div className="space-y-6">
      {/* Add Note */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Add Note</h3>
        <div className="space-y-3">
          <Textarea
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Quick templates:</span>
              {quickTemplates.map((template) => (
                <Button
                  key={template.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickTemplate(template.text)}
                  className="h-7 text-xs"
                >
                  {template.label}
                </Button>
              ))}
            </div>
            <Button onClick={handleAddNote} size="sm">
              Add Note
            </Button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Notes ({noteEvents.length})
        </h3>
        {sortedNotes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="mx-auto size-8 mb-2 opacity-50" />
            <p className="text-sm">No notes yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedNotes.map((event) => {
              const isPinned = pinnedNotes.has(event.id);
              const noteText =
                event.payload?.noteText ||
                event.description ||
                event.title;

              return (
                <div
                  key={event.id}
                  className={`rounded-lg border p-3 ${
                    isPinned ? "bg-muted/50 border-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      {isPinned && (
                        <Badge variant="outline" className="mb-2 text-xs">
                          <Pin className="mr-1 size-3" />
                          Pinned
                        </Badge>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{noteText}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(event.timestamp), "MMM dd, yyyy HH:mm")}
                        </span>
                        {event.actor && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              by {event.actor}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(event.id)}
                      className="h-7 w-7 shrink-0"
                      title={isPinned ? "Unpin note" : "Pin note"}
                    >
                      {isPinned ? (
                        <Pin className="size-4 text-primary" />
                      ) : (
                        <PinOff className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

