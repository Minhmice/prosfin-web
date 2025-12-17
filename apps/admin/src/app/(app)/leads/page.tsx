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

  // URL state sync
  const [search, setSearch] = useUrlState<string>("q", "", { debounce: 300, replace: true });
  const [statusFilter, setStatusFilter] = useUrlStateArray("status", []);
  const [sourceFilter, setSourceFilter] = useUrlState<string>("source", "");
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

    return filtered;
  }, [leads, search, statusFilter, sourceFilter]);

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

  const rowActions: RowAction<Lead>[] = [
    {
      label: "Mark as Contacted",
      onClick: (row) => handleStatusChange(row.id, "contacted"),
    },
    {
      label: "Change Status",
      onClick: (row) => {
        // TODO: Open status change dialog
        console.log("Change status for", row.id);
      },
    },
    {
      label: "Convert to Client",
      onClick: (row) => {
        // TODO: Open convert dialog
        console.log("Convert", row.id);
      },
    },
    {
      label: "Export",
      onClick: (row) => {
        // TODO: Export row
        console.log("Export", row.id);
      },
    },
  ];

  const urgencyColors: Record<"low" | "medium" | "high", string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

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
          toolbarRightActions={<SavedViews />}
          onRowClick={(lead) => {
            router.push(`/leads/${lead.id}`);
          }}
          // Keyboard navigation: Enter to open detail
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const selectedRow = filteredLeads[pageIndex * 10];
              if (selectedRow) {
                router.push(`/leads/${selectedRow.id}`);
              }
            }
          }}
        />
      </div>
    </AdminPageShell>
  );
}
