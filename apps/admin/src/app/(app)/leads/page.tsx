"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AdminPageShell } from "@prosfin/ui";
import { AppDataTable } from "@/components/admin/data-table/app-data-table";
import { TableRowActions, type RowAction } from "@/components/admin/data-table/table-row-actions";
import { Badge } from "@prosfin/ui";
import { listLeads, updateLeadStatus, updateLeadOwner } from "@/lib/data/leads";
import { useUrlState, useUrlStateArray } from "@/hooks/use-url-state";
import { showToast } from "@/lib/toast";
import { InlineStatusEdit } from "@/components/leads/inline-status-edit";
import { InlineOwnerEdit } from "@/components/leads/inline-owner-edit";
import { BulkActionsBar } from "@/components/leads/bulk-actions-bar";
import { SavedViews } from "@/components/leads/saved-views";
import { ConvertLeadDialog } from "@/components/leads/convert-lead-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@prosfin/ui";
import { Filter, X } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/admin";
import type { DataTableColumn } from "@/components/admin/data-table/types";

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  meeting_scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-gray-100 text-gray-800",
  lost: "bg-red-100 text-red-800",
};

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedLeads, setSelectedLeads] = React.useState<Lead[]>([]);
  const [convertDialogOpen, setConvertDialogOpen] = React.useState(false);
  const [selectedLeadForConvert, setSelectedLeadForConvert] = React.useState<Lead | null>(null);

  // URL state sync
  const [search, setSearch] = useUrlState<string>("q", "", { debounce: 300, replace: true });
  const [statusFilter, setStatusFilter] = useUrlStateArray("status", []);
  const [sourceFilter, setSourceFilter] = useUrlState<string>("source", "");
  const [ownerFilter, setOwnerFilter] = useUrlState<string>("owner", "");
  const [interestFilter, setInterestFilter] = useUrlState<string>("interest", "");
  const [utmCampaignFilter, setUtmCampaignFilter] = useUrlState<string>("utm_campaign", "");
  const [pageIndexStr, setPageIndexStr] = useUrlState<string>("page", "0");
  const pageIndex = React.useMemo(() => {
    const parsed = parseInt(pageIndexStr, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [pageIndexStr]);
  const setPageIndex = React.useCallback((index: number) => {
    setPageIndexStr(String(index) as string);
  }, [setPageIndexStr]);

  React.useEffect(() => {
    listLeads().then((data) => {
      setLeads(data);
      setIsLoading(false);
    });
  }, []);

  // Filter leads based on URL state
  const filteredLeads = React.useMemo(() => {
    let filtered = [...leads];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.phone?.toLowerCase().includes(searchLower) ||
          lead.company?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((lead) => statusFilter.includes(lead.status));
    }

    // Source filter
    if (sourceFilter) {
      filtered = filtered.filter((lead) => lead.source === sourceFilter);
    }

    // Owner filter
    if (ownerFilter) {
      if (ownerFilter === "unassigned") {
        filtered = filtered.filter((lead) => !lead.owner);
      } else {
        filtered = filtered.filter((lead) => lead.owner === ownerFilter);
      }
    }

    // Service interest filter
    if (interestFilter) {
      filtered = filtered.filter((lead) => lead.interest === interestFilter);
    }

    // UTM Campaign filter (deep-link from campaigns)
    if (utmCampaignFilter) {
      filtered = filtered.filter((lead) => lead.utm_campaign === utmCampaignFilter);
    }

    return filtered;
  }, [leads, search, statusFilter, sourceFilter, ownerFilter, interestFilter, utmCampaignFilter]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, status);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
      );
      showToast.success(`Lead status updated to ${status}`);
    } catch (error) {
      showToast.error("Failed to update lead status");
    }
  };

  const handleOwnerChange = async (leadId: string, owner: string | undefined) => {
    try {
      await updateLeadOwner(leadId, owner);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, owner } : lead))
      );
      showToast.success(owner ? `Assigned to ${owner}` : "Unassigned");
    } catch (error) {
      showToast.error("Failed to update owner");
    }
  };

  const handleBulkStatusUpdate = async (leadIds: string[], status: LeadStatus) => {
    try {
      await Promise.all(leadIds.map((id) => updateLeadStatus(id, status)));
      setLeads((prev) =>
        prev.map((lead) =>
          leadIds.includes(lead.id) ? { ...lead, status } : lead
        )
      );
      setSelectedLeads([]);
      showToast.success(`Updated ${leadIds.length} lead(s) to ${status}`);
    } catch (error) {
      showToast.error("Failed to update leads");
    }
  };

  const handleBulkOwnerAssign = async (leadIds: string[], owner: string | undefined) => {
    try {
      await Promise.all(leadIds.map((id) => updateLeadOwner(id, owner)));
      setLeads((prev) =>
        prev.map((lead) =>
          leadIds.includes(lead.id) ? { ...lead, owner } : lead
        )
      );
      setSelectedLeads([]);
      showToast.success(
        owner
          ? `Assigned ${leadIds.length} lead(s) to ${owner}`
          : `Unassigned ${leadIds.length} lead(s)`
      );
    } catch (error) {
      showToast.error("Failed to update leads");
    }
  };

  const handleExportRow = (lead: Lead) => {
    const csv = [
      ["Name", "Company", "Email", "Phone", "Status", "Owner", "Source"].join(","),
      [
        lead.name,
        lead.company || "",
        lead.email,
        lead.phone || "",
        lead.status,
        lead.owner || "",
        lead.source,
      ].join(","),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lead-${lead.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast.success("Lead exported");
  };

  const rowActions: RowAction<Lead>[] = [
    {
      label: "Mark as Contacted",
      onClick: (row) => handleStatusChange(row.id, "contacted"),
    },
    {
      label: "Change Status",
      onClick: (row) => {
        router.push(`/leads/${row.id}`);
      },
    },
    {
      label: "Convert to Client",
      onClick: (row) => {
        setSelectedLeadForConvert(row);
        setConvertDialogOpen(true);
      },
    },
    {
      label: "Export",
      onClick: (row) => handleExportRow(row),
    },
  ];

  const urgencyColors: Record<"low" | "medium" | "high", string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  // Extract unique values for filters
  const ownerOptions = React.useMemo(() => {
    const owners = new Set<string>();
    leads.forEach((lead) => {
      if (lead.owner) owners.add(lead.owner);
    });
    return Array.from(owners).sort();
  }, [leads]);

  const interestOptions = React.useMemo(() => {
    const interests = new Set<string>();
    leads.forEach((lead) => {
      if (lead.interest) interests.add(lead.interest);
    });
    return Array.from(interests).sort();
  }, [leads]);

  const sourceOptions = React.useMemo(() => {
    const sources = new Set<string>();
    leads.forEach((lead) => {
      if (lead.source) sources.add(lead.source);
    });
    return Array.from(sources).sort();
  }, [leads]);

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
          {Object.entries(statusColors).map(([status, _]) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                const newFilter = statusFilter.includes(status)
                  ? statusFilter.filter((s) => s !== status)
                  : [...statusFilter, status];
                setStatusFilter(newFilter);
              }}
            >
              <input
                type="checkbox"
                checked={statusFilter.includes(status)}
                onChange={() => {}}
                className="mr-2"
              />
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 size-3" />
            Owner
            {ownerFilter && (
              <X
                className="ml-2 size-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setOwnerFilter("");
                }}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => setOwnerFilter("unassigned")}>
            Unassigned
          </DropdownMenuItem>
          {ownerOptions.map((owner) => (
            <DropdownMenuItem
              key={owner}
              onClick={() => setOwnerFilter(owner)}
            >
              {owner}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 size-3" />
            Interest
            {interestFilter && (
              <X
                className="ml-2 size-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setInterestFilter("");
                }}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {interestOptions.map((interest) => (
            <DropdownMenuItem
              key={interest}
              onClick={() => setInterestFilter(interest)}
            >
              {interest}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 size-3" />
            Source
            {sourceFilter && (
              <X
                className="ml-2 size-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setSourceFilter("");
                }}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {sourceOptions.map((source) => (
            <DropdownMenuItem
              key={source}
              onClick={() => setSourceFilter(source)}
            >
              {source}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns: DataTableColumn<Lead>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "company",
      header: "Company",
      accessorKey: "company",
      enableSorting: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
    },
    {
      id: "interest",
      header: "Service Interest",
      accessorKey: "interest",
      cell: ({ row }) =>
        row.original.interest ? (
          <Badge variant="outline">{row.original.interest}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      id: "urgency",
      header: "Urgency",
      accessorKey: "urgency",
      cell: ({ row }) =>
        row.original.urgency ? (
          <Badge className={urgencyColors[row.original.urgency]}>
            {row.original.urgency}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <InlineStatusEdit
          lead={row.original}
          onUpdate={handleStatusChange}
        />
      ),
    },
    {
      id: "owner",
      header: "Owner",
      accessorKey: "owner",
      cell: ({ row }) => (
        <InlineOwnerEdit
          lead={row.original}
          onUpdate={handleOwnerChange}
        />
      ),
    },
    {
      id: "source",
      header: "Source",
      accessorKey: "source",
    },
    {
      id: "utm_campaign",
      header: "UTM Campaign",
      accessorKey: "utm_campaign",
      cell: ({ row }) =>
        row.original.utm_campaign ? (
          <span className="text-sm">{row.original.utm_campaign}</span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "MMM dd, yyyy"),
    },
    {
      id: "updatedAt",
      header: "Updated",
      accessorKey: "updatedAt",
      cell: ({ row }) =>
        format(new Date(row.original.updatedAt), "MMM dd, yyyy"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <TableRowActions row={row.original} actions={rowActions} />
      ),
    },
  ];

  return (
    <AdminPageShell
      title="Leads"
      description="Manage and track your leads"
    >
      <div className="space-y-4">
        {selectedLeads.length > 0 && (
          <BulkActionsBar
            selectedLeads={selectedLeads}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkOwnerAssign={handleBulkOwnerAssign}
            onClearSelection={() => setSelectedLeads([])}
          />
        )}
        <AppDataTable
          columns={columns}
          data={filteredLeads}
          isLoading={isLoading}
          searchPlaceholder="Search leads..."
          emptyMessage="No leads found"
          searchValue={search}
          onSearchChange={setSearch}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
          enableRowSelection={true}
          onSelectionChange={setSelectedLeads}
          filters={filters}
          toolbarRightActions={<SavedViews />}
          onRowClick={(lead) => {
            router.push(`/leads/${lead.id}`);
          }}
        />
      </div>

      {selectedLeadForConvert && (
        <ConvertLeadDialog
          lead={selectedLeadForConvert}
          open={convertDialogOpen}
          onOpenChange={(open) => {
            setConvertDialogOpen(open);
            if (!open) {
              setSelectedLeadForConvert(null);
            }
          }}
          onConverted={(clientId) => {
            showToast.success("Lead converted successfully");
            setConvertDialogOpen(false);
            setSelectedLeadForConvert(null);
          }}
        />
      )}
    </AdminPageShell>
  );
}
