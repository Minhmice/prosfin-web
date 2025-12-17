import type { Lead, LeadStatus, TimelineEvent } from "@/types/admin";
import { mockLeads } from "@/mocks/leads";

/**
 * Data adapter cho Leads
 * 
 * UI components chỉ import từ đây, không import mocks trực tiếp.
 * Có thể swap sang API calls trong Phase 3.
 */

let leadsData: Lead[] = [...mockLeads];

export async function listLeads(): Promise<Lead[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...leadsData];
}

export async function getLead(id: string): Promise<Lead | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return leadsData.find((lead) => lead.id === id) || null;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lead = leadsData.find((l) => l.id === id);
  if (!lead) {
    throw new Error(`Lead with id ${id} not found`);
  }
  const updated = {
    ...lead,
    status,
    updatedAt: new Date().toISOString(),
  };
  leadsData = leadsData.map((l) => (l.id === id ? updated : l));
  return updated;
}

export async function updateLeadOwner(
  id: string,
  owner: string | undefined
): Promise<Lead> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lead = leadsData.find((l) => l.id === id);
  if (!lead) {
    throw new Error(`Lead with id ${id} not found`);
  }
  const updated = {
    ...lead,
    owner,
    updatedAt: new Date().toISOString(),
  };
  leadsData = leadsData.map((l) => (l.id === id ? updated : l));
  return updated;
}

export async function addLeadNote(id: string, noteText: string): Promise<Lead> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lead = leadsData.find((l) => l.id === id);
  if (!lead) {
    throw new Error(`Lead with id ${id} not found`);
  }

  const newEvent: TimelineEvent = {
    id: `note-${Date.now()}`,
    type: "note_added",
    title: "Note added",
    timestamp: new Date().toISOString(),
    actor: "You",
    payload: {
      noteText,
    },
  };

  const updated = {
    ...lead,
    timeline: [...(lead.timeline || []), newEvent],
    updatedAt: new Date().toISOString(),
  };
  leadsData = leadsData.map((l) => (l.id === id ? updated : l));
  return updated;
}

export async function convertLeadToClient(leadId: string, clientId: string): Promise<Lead> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lead = leadsData.find((l) => l.id === leadId);
  if (!lead) {
    throw new Error(`Lead with id ${leadId} not found`);
  }

  // Create conversion event
  const conversionEvent: TimelineEvent = {
    id: `convert-${Date.now()}`,
    type: "converted_to_client",
    title: "Converted to client",
    timestamp: new Date().toISOString(),
    actor: "You",
    payload: {
      clientId,
    },
  };

  // Update lead status to converted
  const statusEvent: TimelineEvent = {
    id: `status-${Date.now()}`,
    type: "status_changed",
    title: "Status changed",
    timestamp: new Date().toISOString(),
    actor: "You",
    payload: {
      oldStatus: lead.status,
      newStatus: "converted",
    },
  };

  const updated = {
    ...lead,
    status: "converted" as LeadStatus,
    linkedClientId: clientId,
    timeline: [...(lead.timeline || []), conversionEvent, statusEvent],
    updatedAt: new Date().toISOString(),
  };
  leadsData = leadsData.map((l) => (l.id === leadId ? updated : l));
  return updated;
}

