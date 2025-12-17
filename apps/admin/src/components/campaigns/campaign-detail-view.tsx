"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import {
  AdminSectionCard,
  Badge,
  Button,
  Textarea,
} from "@prosfin/ui";
import { ArrowRight, Copy, Edit, ExternalLink, Users } from "lucide-react";
import { CopyFlows } from "./copy-flows";
import { StatusChangeDialog } from "./status-change-dialog";
import { duplicateCampaign, updateCampaignStatus } from "@/lib/data/campaigns";
import { showToast } from "@/lib/toast";
import type { Campaign, CampaignStatus, CampaignTimelineEvent } from "@/types/admin";

interface CampaignDetailViewProps {
  campaign: Campaign;
  onCampaignUpdated?: (campaign: Campaign) => void;
}

const statusColors: Record<CampaignStatus, string> = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800",
};

const eventIcons: Record<CampaignTimelineEvent["type"], string> = {
  created: "🆕",
  edited: "✏️",
  status_changed: "🔄",
  copied: "📋",
  duplicated: "📑",
};

export function CampaignDetailView({ campaign, onCampaignUpdated }: CampaignDetailViewProps) {
  const router = useRouter();
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const [statusDialogTarget, setStatusDialogTarget] = React.useState<CampaignStatus | null>(null);

  const handleDuplicate = async () => {
    try {
      const newCampaign = await duplicateCampaign(campaign.id);
      showToast.success("Campaign duplicated");
      router.push(`/campaigns/${newCampaign.id}`);
    } catch (error) {
      showToast.error("Failed to duplicate campaign");
    }
  };

  const handleStatusChange = (status: CampaignStatus) => {
    if (status === "paused" || status === "archived") {
      setStatusDialogTarget(status);
      setStatusDialogOpen(true);
    } else {
      updateCampaignStatus(campaign.id, status).then(() => {
        showToast.success(`Campaign ${status}`);
        onCampaignUpdated?.({ ...campaign, status });
      });
    }
  };

  const utmParams = [
    { label: "Source", value: campaign.utm_source, key: "utm_source" },
    { label: "Medium", value: campaign.utm_medium, key: "utm_medium" },
    { label: "Campaign", value: campaign.utm_campaign, key: "utm_campaign" },
    { label: "Content", value: campaign.utm_content, key: "utm_content" },
    { label: "Term", value: campaign.utm_term, key: "utm_term" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
            {campaign.channelPreset && (
              <Badge variant="outline">{campaign.channelPreset}</Badge>
            )}
            {campaign.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyFlows campaign={campaign} variant="icons" />
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="mr-2 size-4" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push(`/campaigns`)}>
            <Edit className="mr-2 size-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Status Actions */}
      {campaign.status !== "archived" && (
        <div className="flex items-center gap-2">
          {campaign.status === "active" && (
            <Button variant="outline" size="sm" onClick={() => handleStatusChange("paused")}>
              Pause Campaign
            </Button>
          )}
          {campaign.status === "paused" && (
            <Button variant="outline" size="sm" onClick={() => handleStatusChange("active")}>
              Resume Campaign
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => handleStatusChange("archived")}>
            Archive
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* UTM Summary */}
        <AdminSectionCard title="UTM Parameters">
          <div className="space-y-3">
            {utmParams.map((param) => (
              <div key={param.key} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{param.label}</span>
                <span className="text-sm font-medium font-mono">
                  {param.value || <span className="text-muted-foreground">—</span>}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <span className="text-sm text-muted-foreground">Destination URL</span>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={campaign.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {campaign.destinationUrl}
                </a>
                <ExternalLink className="size-3 text-muted-foreground" />
              </div>
            </div>
            <div className="border-t pt-3 mt-3">
              <span className="text-sm text-muted-foreground">Generated URL</span>
              <div className="mt-1 p-2 bg-muted rounded-md">
                <p className="text-xs font-mono break-all">{campaign.generatedUrl}</p>
              </div>
            </div>
          </div>
        </AdminSectionCard>

        {/* Notes & Meta */}
        <AdminSectionCard title="Notes & Info">
          <div className="space-y-4">
            {campaign.notes ? (
              <div>
                <span className="text-sm text-muted-foreground">Notes</span>
                <p className="text-sm mt-1">{campaign.notes}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No notes added.</p>
            )}
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created by</span>
                  <p className="font-medium">{campaign.createdBy || "Unknown"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created at</span>
                  <p className="font-medium">{format(parseISO(campaign.createdAt), "MMM dd, yyyy HH:mm")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last updated</span>
                  <p className="font-medium">{format(parseISO(campaign.updatedAt), "MMM dd, yyyy HH:mm")}</p>
                </div>
              </div>
            </div>
          </div>
        </AdminSectionCard>

        {/* Activity Log */}
        <AdminSectionCard title="Activity Log">
          {campaign.timeline && campaign.timeline.length > 0 ? (
            <div className="space-y-3">
              {campaign.timeline
                .sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime())
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-sm">
                    <span>{eventIcons[event.type]}</span>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      {event.payload?.notes && (
                        <p className="text-muted-foreground text-xs mt-1">"{event.payload.notes}"</p>
                      )}
                      <p className="text-muted-foreground text-xs">
                        {event.actor && `by ${event.actor} • `}
                        {format(parseISO(event.timestamp), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No activity recorded.</p>
          )}
        </AdminSectionCard>

        {/* Used In (Deep-link to Leads) */}
        <AdminSectionCard title="Used In">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              View leads that came from this campaign.
            </p>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push(`/leads?utm_campaign=${campaign.utm_campaign}`)}
            >
              <Users className="mr-2 size-4" />
              View Leads with utm_campaign={campaign.utm_campaign}
              <ArrowRight className="ml-auto size-4" />
            </Button>
          </div>
        </AdminSectionCard>
      </div>

      <StatusChangeDialog
        campaign={campaign}
        targetStatus={statusDialogTarget}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onStatusChanged={(id, status) => {
          onCampaignUpdated?.({ ...campaign, status });
        }}
      />
    </div>
  );
}

