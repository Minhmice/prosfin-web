import type { Campaign } from "@/types/admin";
import { mockCampaigns } from "@/mocks/campaigns";

/**
 * Data adapter cho Campaigns
 */

let campaignsData: Campaign[] = [...mockCampaigns];

export async function listCampaigns(): Promise<Campaign[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...campaignsData];
}

export async function createCampaign(
  campaign: Omit<Campaign, "id" | "generatedUrl" | "createdAt" | "updatedAt">
): Promise<Campaign> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const url = new URL(campaign.baseUrl);
  url.searchParams.set("utm_source", campaign.utm_source);
  url.searchParams.set("utm_medium", campaign.utm_medium);
  url.searchParams.set("utm_campaign", campaign.utm_campaign);
  if (campaign.utm_content) {
    url.searchParams.set("utm_content", campaign.utm_content);
  }
  if (campaign.utm_term) {
    url.searchParams.set("utm_term", campaign.utm_term);
  }

  const newCampaign: Campaign = {
    ...campaign,
    id: `campaign-${Date.now()}`,
    generatedUrl: url.toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  campaignsData.push(newCampaign);
  return newCampaign;
}

export function generateUTMLink(params: {
  baseUrl: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
}): string {
  const url = new URL(params.baseUrl);
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

