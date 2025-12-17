"use client";

import * as React from "react";
import { NotesSection } from "./notes-section";
import { addLeadNote } from "@/lib/data/leads";
import type { Lead } from "@/types/admin";

interface LeadDetailNotesProps {
  lead: Lead;
}

export function LeadDetailNotes({ lead }: LeadDetailNotesProps) {
  const handleNoteAdded = async (note: string) => {
    try {
      await addLeadNote(lead.id, note);
      // Note: In a real app, we'd refresh the lead data or update state
      // For now, the note will appear after refresh
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return <NotesSection lead={lead} onNoteAdded={handleNoteAdded} />;
}

