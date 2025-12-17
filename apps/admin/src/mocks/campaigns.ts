import type { Campaign } from "@/types/admin";

export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Summer 2024 Campaign",
    baseUrl: "https://prosfin.vn",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "summer-2024",
    utm_content: "ad-1",
    generatedUrl:
      "https://prosfin.vn?utm_source=google&utm_medium=cpc&utm_campaign=summer-2024&utm_content=ad-1",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "campaign-2",
    name: "Facebook Q1 2024",
    baseUrl: "https://prosfin.vn/services",
    utm_source: "facebook",
    utm_medium: "social",
    utm_campaign: "fb-q1-2024",
    generatedUrl:
      "https://prosfin.vn/services?utm_source=facebook&utm_medium=social&utm_campaign=fb-q1-2024",
    status: "active",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "campaign-3",
    name: "LinkedIn B2B",
    baseUrl: "https://prosfin.vn/contact",
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "linkedin-b2b",
    generatedUrl:
      "https://prosfin.vn/contact?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin-b2b",
    status: "paused",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
];

