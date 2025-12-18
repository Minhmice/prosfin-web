"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { mockLeads } from "@/data/leads"
import type { Lead } from "@/types"
import { LeadDetailPanel } from "@/components/leads/lead-detail-panel"
import { LeadFormSheet } from "@/features/crm/leads/lead-form-sheet"
import {
  archiveLead,
  bulkArchiveLeads,
} from "@/lib/actions/leads"
import { crmProvider } from "@/features/crm/data/provider"

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string
      return (
        <Badge variant="outline">
          {stage}
        </Badge>
      )
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.getValue("source") as string
      return (
        <Badge variant="secondary">
          {source}
        </Badge>
      )
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return date.toLocaleDateString()
    },
  },
]

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingLead, setEditingLead] = React.useState<Lead | null>(null)
  const [leads, setLeads] = React.useState<Lead[]>(mockLeads as Lead[])

  const refreshLeads = React.useCallback(async () => {
    const result = await crmProvider.listLeads({ page: 1, pageSize: 100 })
    setLeads(result.data)
  }, [])

  React.useEffect(() => {
    refreshLeads()
  }, [refreshLeads])

  const handleRowAction = async (action: string, row: Lead) => {
    switch (action) {
      case "view":
        setSelectedLead(row)
        setIsDetailOpen(true)
        break
      case "edit":
        setEditingLead(row)
        setIsFormOpen(true)
        break
      case "archive":
        await archiveLead(row.id)
        await refreshLeads()
        break
      default:
        break
    }
  }

  const handleBulkAction = async (action: string, rows: Lead[]) => {
    switch (action) {
      case "archive":
        await bulkArchiveLeads(rows.map((r) => r.id))
        await refreshLeads()
        break
      default:
        break
    }
  }

  const handleNewLead = () => {
    setEditingLead(null)
    setIsFormOpen(true)
  }

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Manage your leads"
        actions={
          <Button onClick={handleNewLead}>
            <Plus className="mr-2 size-4" />
            New Lead
          </Button>
        }
      />
      <PageBody>
        <DataTable
          data={leads}
          columns={columns}
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
        />
      </PageBody>
      <LeadDetailPanel
        lead={selectedLead}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
      <LeadFormSheet
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingLead(null)
        }}
        lead={editingLead}
        onSuccess={refreshLeads}
      />
    </>
  )
}
