/**
 * Clients Table Row Actions
 */

import type { Client } from "@/features/crm/types"

export function getClientsRowActions(client: Client) {
  return [
    {
      label: "View",
      action: "view",
      variant: "default" as const,
    },
    {
      label: "Edit",
      action: "edit",
      variant: "default" as const,
    },
    {
      label: "Delete",
      action: "delete",
      variant: "destructive" as const,
    },
  ]
}

