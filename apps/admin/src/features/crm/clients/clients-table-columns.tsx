/**
 * Clients Table Columns
 */

import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Client } from "@/features/crm/types"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const clientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => {
      const client = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{client.name}</span>
            {client.title && (
              <span className="text-muted-foreground text-xs">{client.title}</span>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant =
        status === "active" ? "default" : status === "inactive" ? "secondary" : "outline"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.getValue("ownerName") as string | undefined
      return owner || <span className="text-muted-foreground">Unassigned</span>
    },
  },
  {
    id: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags
      if (!tags || tags.length === 0) {
        return <span className="text-muted-foreground">—</span>
      }
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "lastContactedAt",
    header: "Last Contacted",
    cell: ({ row }) => {
      const date = row.getValue("lastContactedAt") as Date | undefined
      return date ? format(date, "MMM d, yyyy") : <span className="text-muted-foreground">—</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return format(date, "MMM d, yyyy")
    },
  },
]

