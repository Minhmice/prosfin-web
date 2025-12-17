"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AdminPageShell } from "@prosfin/ui";
import { AppDataTable } from "@/components/admin/data-table/app-data-table";
import { Badge } from "@prosfin/ui";
import { listClients } from "@/lib/data/clients";
import { useUrlState } from "@/hooks/use-url-state";
import type { Client } from "@/types/admin";
import type { DataTableColumn } from "@/components/admin/data-table/types";

const statusColors: Record<Client["status"], string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  onboarding: "bg-yellow-100 text-yellow-800",
};

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // URL state sync
  const [search, setSearch] = useUrlState<string>("q", "", { debounce: 300, replace: true });
  const [pageIndexStr, setPageIndexStr] = useUrlState<string>("page", "0");
  const pageIndex = React.useMemo(() => {
    const parsed = parseInt(pageIndexStr, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [pageIndexStr]);
  const setPageIndex = React.useCallback((index: number) => {
    setPageIndexStr(String(index) as string);
  }, [setPageIndexStr]);

  React.useEffect(() => {
    listClients().then((data) => {
      setClients(data);
      setIsLoading(false);
    });
  }, []);

  // Filter clients based on URL state
  const filteredClients = React.useMemo(() => {
    let filtered = [...clients];

    // Search filter
    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (client) =>
          client.companyName.toLowerCase().includes(searchLower) ||
          client.contactName.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [clients, search]);

  // Get last activity from timeline
  const getLastActivity = (client: Client): string => {
    if (client.timeline && client.timeline.length > 0) {
      const sorted = [...client.timeline].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      return format(new Date(sorted[0].timestamp), "MMM dd, yyyy");
    }
    return format(new Date(client.updatedAt), "MMM dd, yyyy");
  };

  const columns: DataTableColumn<Client>[] = [
    {
      id: "companyName",
      header: "Company",
      accessorKey: "companyName",
      enableSorting: true,
      cell: ({ row }) => (
        <button
          onClick={() => router.push(`/clients/${row.original.id}`)}
          className="font-medium hover:underline text-left"
        >
          {row.original.companyName}
        </button>
      ),
    },
    {
      id: "contactName",
      header: "Contact",
      accessorKey: "contactName",
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
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "owner",
      header: "Owner",
      accessorKey: "owner",
      cell: ({ row }) =>
        row.original.owner ? (
          <span className="text-sm">{row.original.owner}</span>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        ),
    },
    {
      id: "lastActivity",
      header: "Last Activity",
      accessorKey: "updatedAt",
      cell: ({ row }) => (
        <span className="text-sm">{getLastActivity(row.original)}</span>
      ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "MMM dd, yyyy"),
    },
  ];

  return (
    <AdminPageShell
      title="Clients"
      description="Manage your clients"
    >
      <AppDataTable
        columns={columns}
        data={filteredClients}
        isLoading={isLoading}
        searchPlaceholder="Search clients..."
        emptyMessage="No clients found"
        searchValue={search}
        onSearchChange={setSearch}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        onRowClick={(client) => {
          router.push(`/clients/${client.id}`);
        }}
      />
    </AdminPageShell>
  );
}
