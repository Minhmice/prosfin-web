"use client";

import * as React from "react";

export type LeadDraft = {
  // Step 1 (mini)
  fullName?: string;
  email?: string;
  phone?: string;
  concern?: string;

  // Step 3 (detail information - profile-only)
  industry?: string;
  companySize?: "1-5" | "6-20" | "21-50" | "51-200" | "200+";
  revenueRange?: "lt-1b" | "1-5b" | "5-20b" | "20-100b" | "gt-100b";
  yearsActive?: "0-1" | "1-3" | "3-7" | "7+";
  goal?: string;
  painPoints?: string;

  updatedAt?: string;
};

const STORAGE_KEY = "prosfin_lead_draft_v1";

function readDraft(): LeadDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadDraft;
  } catch {
    return null;
  }
}

function writeDraft(next: LeadDraft) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearLeadDraft() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useLeadDraft() {
  const [draft, setDraft] = React.useState<LeadDraft | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  const updateDraft = React.useCallback((patch: Partial<LeadDraft>) => {
    setDraft((prev) => {
      const next: LeadDraft = {
        ...(prev ?? {}),
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      try {
        writeDraft(next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { draft, hydrated, updateDraft } as const;
}


