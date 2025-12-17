import type { Campaign, CampaignStatus, ChannelPreset, CampaignTimelineEvent } from "@/types/admin";
import { mockCampaigns } from "@/mocks/campaigns";

/**
 * Data adapter cho Campaigns
 */

let campaignsData: Campaign[] = [...mockCampaigns];

export async function listCampaigns(): Promise<Campaign[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...campaignsData];
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return campaignsData.find((c) => c.id === id) || null;
}

export interface CreateCampaignInput {
  name: string;
  destinationUrl: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
  channelPreset?: ChannelPreset;
  notes?: string;
  tags?: string[];
  keepExistingParams?: boolean;
}

export async function createCampaign(input: CreateCampaignInput): Promise<Campaign> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const generatedUrl = generateUTMLink({
    destinationUrl: input.destinationUrl,
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    utm_term: input.utm_term,
    keepExistingParams: input.keepExistingParams,
  });

  const shortLabel = generateShortLabel({
    channelPreset: input.channelPreset,
    utm_campaign: input.utm_campaign,
    destinationUrl: input.destinationUrl,
  });

  const newCampaign: Campaign = {
    id: `campaign-${Date.now()}`,
    name: input.name,
    destinationUrl: input.destinationUrl,
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    utm_term: input.utm_term,
    channelPreset: input.channelPreset,
    generatedUrl,
    shortLabel,
    status: "active",
    notes: input.notes,
    tags: input.tags,
    createdBy: "You",
    timeline: [
      {
        id: `event-${Date.now()}`,
        type: "created",
        title: "Campaign created",
        timestamp: new Date().toISOString(),
        actor: "You",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  campaignsData.push(newCampaign);
  return newCampaign;
}

export async function updateCampaignStatus(
  id: string,
  status: CampaignStatus,
  notes?: string
): Promise<Campaign> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const campaign = campaignsData.find((c) => c.id === id);
  if (!campaign) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  const oldStatus = campaign.status;
  const event: CampaignTimelineEvent = {
    id: `event-${Date.now()}`,
    type: "status_changed",
    title: `Status changed to ${status}`,
    timestamp: new Date().toISOString(),
    actor: "You",
    payload: { oldStatus, newStatus: status, notes },
  };

  const updated: Campaign = {
    ...campaign,
    status,
    notes: notes || campaign.notes,
    timeline: [...(campaign.timeline || []), event],
    updatedAt: new Date().toISOString(),
  };

  campaignsData = campaignsData.map((c) => (c.id === id ? updated : c));
  return updated;
}

export async function duplicateCampaign(id: string): Promise<Campaign> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const original = campaignsData.find((c) => c.id === id);
  if (!original) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  const newCampaign: Campaign = {
    ...original,
    id: `campaign-${Date.now()}`,
    name: `${original.name} (Copy)`,
    status: "active",
    timeline: [
      {
        id: `event-${Date.now()}`,
        type: "duplicated",
        title: `Duplicated from ${original.name}`,
        timestamp: new Date().toISOString(),
        actor: "You",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  campaignsData.push(newCampaign);
  return newCampaign;
}

// Normalize UTM parameter value (lowercase, no spaces, use _ or -)
export function normalizeUTMValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
}

// Validate URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Generate UTM link with proper encoding
export function generateUTMLink(params: {
  destinationUrl: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
  keepExistingParams?: boolean;
}): string {
  const url = new URL(params.destinationUrl);
  
  // Clear UTM params if not keeping existing
  if (!params.keepExistingParams) {
    url.searchParams.delete("utm_source");
    url.searchParams.delete("utm_medium");
    url.searchParams.delete("utm_campaign");
    url.searchParams.delete("utm_content");
    url.searchParams.delete("utm_term");
  }

  // Set UTM params (URLSearchParams handles encoding properly)
  url.searchParams.set("utm_source", params.utm_source);
  url.searchParams.set("utm_medium", params.utm_medium);
  url.searchParams.set("utm_campaign", params.utm_campaign);
  
  if (params.utm_content) {
    url.searchParams.set("utm_content", params.utm_content);
  }
  if (params.utm_term) {
    url.searchParams.set("utm_term", params.utm_term);
  }
  
  return url.toString();
}

// Generate short label for quick copy
export function generateShortLabel(params: {
  channelPreset?: ChannelPreset;
  utm_campaign: string;
  destinationUrl: string;
}): string {
  const channelMap: Record<ChannelPreset, string> = {
    facebook: "FB",
    youtube: "YT",
    tiktok: "TT",
    linkedin: "LI",
    email: "Email",
    other: "Other",
  };
  
  const channel = params.channelPreset ? channelMap[params.channelPreset] : "Other";
  
  // Extract domain + path (truncated)
  try {
    const url = new URL(params.destinationUrl);
    const path = url.pathname.length > 20 
      ? url.pathname.substring(0, 20) + "..."
      : url.pathname;
    return `[${channel}] ${params.utm_campaign} | ${url.hostname}${path}`;
  } catch {
    return `[${channel}] ${params.utm_campaign}`;
  }
}

// Extract UTM-only query string
export function extractUTMParams(generatedUrl: string): string {
  try {
    const url = new URL(generatedUrl);
    const utmParams = new URLSearchParams();
    
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = url.searchParams.get(key);
      if (value) {
        utmParams.set(key, value);
      }
    });
    
    return utmParams.toString();
  } catch {
    return "";
  }
}

