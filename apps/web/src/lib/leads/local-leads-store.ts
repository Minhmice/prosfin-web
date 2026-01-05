/**
 * Local Leads Store
 * 
 * CRUD operations for leads in localStorage.
 * Frontend-only storage for Phase 5.
 */

import type { Lead } from "@/types/leads";

const LEADS_STORAGE_KEY = "prosfin_leads";

/**
 * Get all leads from localStorage
 */
export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(LEADS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse leads from localStorage:", error);
    return [];
  }
}

/**
 * Save lead to localStorage
 */
export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return;

  try {
    const leads = getLeads();
    const updatedLeads = [...leads, lead];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  } catch (error) {
    console.error("Failed to save lead to localStorage:", error);
  }
}

/**
 * Get lead by ID
 */
export function getLeadById(id: string): Lead | undefined {
  const leads = getLeads();
  return leads.find((lead) => lead.id === id);
}

/**
 * Update lead status
 */
export function updateLeadStatus(id: string, status: Lead["status"]): void {
  if (typeof window === "undefined") return;

  try {
    const leads = getLeads();
    const updatedLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, status } : lead
    );
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  } catch (error) {
    console.error("Failed to update lead status:", error);
  }
}

/**
 * Clear all leads (for testing/cleanup)
 */
export function clearLeads(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEADS_STORAGE_KEY);
}

