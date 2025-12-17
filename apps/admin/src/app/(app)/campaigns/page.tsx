"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  AdminPageShell,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@prosfin/ui";
import { AppDataTable } from "@/components/admin/data-table/app-data-table";
import { TableRowActions, type RowAction } from "@/components/admin/data-table/table-row-actions";
import { UTMBuilder } from "@/components/campaigns/utm-builder";
import { CopyFlows } from "@/components/campaigns/copy-flows";
import { InlineStatusEdit } from "@/components/campaigns/inline-status-edit";
import { StatusChangeDialog } from "@/components/campaigns/status-change-dialog";
import { Filter, X } from "lucide-react";
import {
  listCampaigns,
  createCampaign,
  updateCampaignStatus,
  duplicateCampaign,
  type CreateCampaignInput,
} from "@/lib/data/campaigns";
import { useUrlState, useUrlStateArray } from "@/hooks/use-url-state";
import { showToast } from "@/lib/toast";
import type { Campaign, CampaignStatus, ChannelPreset } from "@/types/admin";
import type { DataTableColumn } from "@/components/admin/data-table/types";

const statusColors: Record<CampaignStatus, string> = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800",
};

const channelLabels: Record<ChannelPreset, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  email: "Email",
  other: "Other",
};

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Status change dialog
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const [statusDialogCampaign, setStatusDialogCampaign] = React.useState<Campaign | null>(null);
  const [statusDialogTarget, setStatusDialogTarget] = React.useState<CampaignStatus | null>(null);

  // URL state sync
  const [search, setSearch] = useUrlState<string>("q", "", { debounce: 300, replace: true });
  const [statusFilter, setStatusFilter] = useUrlStateArray("status", []);
  const [channelFilter, setChannelFilter] = useUrlState<string>("channel", "");
  const [pageIndexStr, setPageIndexStr] = useUrlState<string>("page", "0");
  const pageIndex = React.useMemo(() => {
    const parsed = parseInt(pageIndexStr, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [pageIndexStr]);
  const setPageIndex = React.useCallback((index: number) => {
    setPageIndexStr(String(index));
  }, [setPageIndexStr]);

  React.useEffect(() => {
    listCampaigns().then((data) => {
      setCampaigns(data);
      setIsLoading(false);
    });
  }, []);

  // Filter campaigns
  const filteredCampaigns = React.useMemo(() => {
    let filtered = [...campaigns];

    // Exclude archived by default unless explicitly filtered
    if (statusFilter.length === 0) {
      filtered = filtered.filter((c) => c.status !== "archived");
    } else {
      filtered = filtered.filter((c) => statusFilter.includes(c.status));
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.utm_campaign.toLowerCase().includes(searchLower)
      );
    }

    // Channel filter
    if (channelFilter) {
      filtered = filtered.filter((c) => c.channelPreset === channelFilter);
    }

    return filtered;
  }, [campaigns, search, statusFilter, channelFilter]);

  const handleSaveCampaign = async (input: CreateCampaignInput) => {
    try {
      const newCampaign = await createCampaign(input);
      setCampaigns((prev) => [...prev, newCampaign]);
      showToast.success("Campaign saved successfully");
    } catch (error) {
      showToast.error("Failed to save campaign");
    }
  };

  const handleStatusChange = async (campaignId: string, status: CampaignStatus) => {
    try {
      await updateCampaignStatus(campaignId, status);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, status } : c))
      );
      showToast.success(`Campaign ${status}`);
    } catch (error) {
      showToast.error("Failed to update status");
    }
  };

  const handleNeedsNotes = (campaignId: string, status: CampaignStatus) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (campaign) {
      setStatusDialogCampaign(campaign);
      setStatusDialogTarget(status);
      setStatusDialogOpen(true);
    }
  };

  const handleDuplicate = async (campaign: Campaign) => {
    try {
      const newCampaign = await duplicateCampaign(campaign.id);
      setCampaigns((prev) => [...prev, newCampaign]);
      showToast.success("Campaign duplicated");
    } catch (error) {
      showToast.error("Failed to duplicate campaign");
    }
  };

  const rowActions: RowAction<Campaign>[] = [
    { label: "View Details", onClick: (row) => router.push(`/campaigns/${row.id}`) },
    { label: "Duplicate", onClick: (row) => handleDuplicate(row) },
    { label: "Pause", onClick: (row) => handleNeedsNotes(row.id, "paused") },
    { label: "Archive", onClick: (row) => handleNeedsNotes(row.id, "archived"), variant: "destructive" },
  ];

  // Truncate URL for display
  const truncateUrl = (url: string, maxLength = 40) => {
    try {
      const parsed = new URL(url);
      const display = parsed.hostname + parsed.pathname;
      return display.length > maxLength ? display.substring(0, maxLength) + "..." : display;
    } catch {
      return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
    }
  };

  const columns: DataTableColumn<Campaign>[] = [
    { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <InlineStatusEdit
          campaign={row.original}
          onUpdate={handleStatusChange}
          onNeedsNotes={handleNeedsNotes}
        />
      ),
    },
    {
      id: "channel",
      header: "Channel",
      accessorKey: "channelPreset",
      cell: ({ row }) =>
        row.original.channelPreset ? (
          <Badge variant="outline">{channelLabels[row.original.channelPreset]}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      id: "destination",
      header: "Destination",
      accessorKey: "destinationUrl",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{truncateUrl(row.original.destinationUrl)}</span>
      ),
    },
    { id: "utm_campaign", header: "Campaign", accessorKey: "utm_campaign" },
    { id: "utm_source", header: "Source", accessorKey: "utm_source" },
    { id: "utm_medium", header: "Medium", accessorKey: "utm_medium" },
    {
      id: "updatedAt",
      header: "Updated",
      accessorKey: "updatedAt",
      cell: ({ row }) => format(new Date(row.original.updatedAt), "MMM dd, yyyy"),
    },
    {
      id: "copy",
      header: "",
      cell: ({ row }) => <CopyFlows campaign={row.original} variant="icons" />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <TableRowActions row={row.original} actions={rowActions} />,
    },
  ];

  const filters = (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 size-3" />
            Status
            {statusFilter.length > 0 && (
              <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {statusFilter.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {(["active", "paused", "archived"] as CampaignStatus[]).map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                const newFilter = statusFilter.includes(status)
                  ? statusFilter.filter((s) => s !== status)
                  : [...statusFilter, status];
                setStatusFilter(newFilter);
              }}
            >
              <input type="checkbox" checked={statusFilter.includes(status)} onChange={() => {}} className="mr-2" />
              <Badge className={statusColors[status]}>{status}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 size-3" />
            Channel
            {channelFilter && (
              <X className="ml-2 size-3" onClick={(e) => { e.stopPropagation(); setChannelFilter(""); }} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {(Object.keys(channelLabels) as ChannelPreset[]).map((channel) => (
            <DropdownMenuItem key={channel} onClick={() => setChannelFilter(channel)}>
              {channelLabels[channel]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <AdminPageShell title="Campaigns" description="Create and manage UTM campaign links">
      <div className="grid gap-6 lg:grid-cols-2">
        <UTMBuilder onSave={handleSaveCampaign} />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Campaign History</h3>
          <AppDataTable
            columns={columns}
            data={filteredCampaigns}
            isLoading={isLoading}
            searchPlaceholder="Search campaigns..."
            emptyMessage="No campaigns found"
            searchValue={search}
            onSearchChange={setSearch}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            filters={filters}
            onRowClick={(campaign) => router.push(`/campaigns/${campaign.id}`)}
          />
        </div>
      </div>

      <StatusChangeDialog
        campaign={statusDialogCampaign}
        targetStatus={statusDialogTarget}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onStatusChanged={(id, status) => {
          setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
        }}
      />
    </AdminPageShell>
  );
}
