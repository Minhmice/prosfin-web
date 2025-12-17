/**
 * Command Palette commands
 * 
 * Defines commands for navigation, entity search, and actions.
 * All search functions use mock data.
 */

import type { Lead, Client, Campaign } from "@/types/admin";
import { listLeads } from "@/lib/data/leads";
import { listClients } from "@/lib/data/clients";
import { listCampaigns } from "@/lib/data/campaigns";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Megaphone,
  FileText,
  Image,
  Settings,
  Plus,
  Download,
} from "lucide-react";
import { navGroups } from "@/lib/navigation";

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: "navigate" | "entities" | "actions";
  keywords?: string[];
}

// Mock search functions
export async function searchLeads(query: string): Promise<Lead[]> {
  const leads = await listLeads();
  const queryLower = query.toLowerCase();
  return leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(queryLower) ||
      lead.email.toLowerCase().includes(queryLower) ||
      lead.phone?.toLowerCase().includes(queryLower) ||
      lead.company?.toLowerCase().includes(queryLower)
  );
}

export async function searchClients(query: string): Promise<Client[]> {
  const clients = await listClients();
  const queryLower = query.toLowerCase();
  return clients.filter(
    (client) =>
      client.companyName.toLowerCase().includes(queryLower) ||
      client.contactName.toLowerCase().includes(queryLower) ||
      client.email.toLowerCase().includes(queryLower)
  );
}

export async function searchCampaigns(query: string): Promise<Campaign[]> {
  const campaigns = await listCampaigns();
  const queryLower = query.toLowerCase();
  return campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(queryLower)
  );
}

// Navigation commands
export function getNavigationCommands(
  router: { push: (href: string) => void }
): CommandItem[] {
  const commands: CommandItem[] = [];
  navGroups.forEach((group) => {
    group.items.forEach((item) => {
      commands.push({
        id: `nav-${item.href}`,
        label: item.title,
        icon: item.icon,
        action: () => router.push(item.href),
        group: "navigate",
        keywords: [item.title.toLowerCase(), item.href],
      });
    });
  });
  return commands;
}

// Action commands
export function getActionCommands(
  router: { push: (href: string) => void }
): CommandItem[] {
  return [
    {
      id: "action-new-post",
      label: "Create New Post",
      icon: Plus,
      action: () => router.push("/content/new"),
      group: "actions",
      keywords: ["post", "content", "create", "new", "write"],
    },
    {
      id: "action-new-campaign",
      label: "Create Campaign Link",
      icon: Megaphone,
      action: () => router.push("/campaigns?action=create"),
      group: "actions",
      keywords: ["campaign", "utm", "link", "create", "new"],
    },
    {
      id: "action-export-leads",
      label: "Export Leads",
      icon: Download,
      action: () => {
        // TODO: Implement export
        console.log("Export leads");
      },
      group: "actions",
      keywords: ["export", "leads", "download", "csv"],
    },
  ];
}

