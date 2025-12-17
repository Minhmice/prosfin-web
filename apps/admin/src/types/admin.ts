/**
 * Admin Types
 * 
 * Type definitions cho admin app data models
 */

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "meeting_scheduled"
  | "converted"
  | "lost";

export type ClientStatus = "active" | "inactive" | "onboarding";

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface AttributionData {
  landingPath: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  type: "submitted" | "verified" | "qualified" | "meeting" | "converted" | "note" | "contacted" | "status_changed" | "note_added" | "owner_changed" | "converted_to_client" | "campaign_linked";
  title: string;
  description?: string;
  timestamp: string;
  actor?: string; // userId or "system"
  userId?: string; // Deprecated, use actor instead
  payload?: {
    oldStatus?: LeadStatus;
    newStatus?: LeadStatus;
    oldOwner?: string;
    newOwner?: string;
    noteText?: string;
    clientId?: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  interest?: string;
  status: LeadStatus;
  source: string;
  utm_campaign?: string;
  owner?: string; // "You", "Admin", "Editor A"
  urgency?: "low" | "medium" | "high"; // Mock urgency level
  linkedClientId?: string; // Client ID if converted
  attribution?: AttributionData;
  timeline?: TimelineEvent[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  status: ClientStatus;
  owner?: string; // "You", "Admin", "Editor A"
  linkedLeads?: string[]; // Lead IDs
  timeline?: TimelineEvent[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  baseUrl: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
  generatedUrl: string;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
}

