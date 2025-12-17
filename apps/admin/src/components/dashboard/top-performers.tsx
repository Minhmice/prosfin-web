"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AdminSectionCard } from "@prosfin/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@prosfin/ui";
import { ArrowRight } from "lucide-react";
import type { CampaignPerformance, LandingPathPerformance } from "@/lib/data/dashboard";

interface TopCampaignsProps {
  data: CampaignPerformance[];
  dateRange?: { from: string; to: string };
}

export function TopCampaigns({ data, dateRange }: TopCampaignsProps) {
  const router = useRouter();

  const handleRowClick = (campaign: CampaignPerformance) => {
    const params = new URLSearchParams();
    params.set("utm_campaign", campaign.utm_campaign);
    if (dateRange) {
      params.set("from", dateRange.from);
      params.set("to", dateRange.to);
    }
    router.push(`/leads?${params.toString()}`);
  };

  return (
    <AdminSectionCard title="Top Campaigns">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">Qualified</TableHead>
            <TableHead className="text-right">CVR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground text-sm py-8">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((campaign) => (
              <TableRow
                key={campaign.campaignId}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(campaign)}
              >
                <TableCell className="font-medium">{campaign.campaignName}</TableCell>
                <TableCell>{campaign.channel}</TableCell>
                <TableCell className="text-right">{campaign.leads.toLocaleString()}</TableCell>
                <TableCell className="text-right">{campaign.qualified.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>{campaign.cvr}%</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

interface TopLandingPathsProps {
  data: LandingPathPerformance[];
  dateRange?: { from: string; to: string };
}

export function TopLandingPaths({ data, dateRange }: TopLandingPathsProps) {
  const router = useRouter();

  const handleRowClick = (path: LandingPathPerformance) => {
    const params = new URLSearchParams();
    // Note: In Phase 1, we don't have landing path filter yet, so we'll just show all leads
    // In Phase 3, this would filter by landing path
    if (dateRange) {
      params.set("from", dateRange.from);
      params.set("to", dateRange.to);
    }
    router.push(`/leads?${params.toString()}`);
  };

  return (
    <AdminSectionCard title="Top Landing Paths">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Path</TableHead>
            <TableHead className="text-right">Sessions</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">CVR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground text-sm py-8">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((path, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(path)}
              >
                <TableCell className="font-medium font-mono text-sm">{path.path}</TableCell>
                <TableCell className="text-right">{path.sessions.toLocaleString()}</TableCell>
                <TableCell className="text-right">{path.leads.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>{path.cvr}%</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </AdminSectionCard>
  );
}

interface RecentActivityProps {
  data: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    actor?: string;
  }>;
}

export function RecentActivity({ data }: RecentActivityProps) {
  return (
    <AdminSectionCard title="Recent Activity">
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">No recent activity</p>
        ) : (
          data.slice(0, 10).map((event) => (
            <div key={event.id} className="flex items-start gap-3 text-sm border-b pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {event.actor && `${event.actor} • `}
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminSectionCard>
  );
}

