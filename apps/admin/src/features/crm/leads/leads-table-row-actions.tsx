/**
 * Leads Table Row Actions
 */

import type { Lead } from "@/features/crm/types"

export function getLeadsRowActions(lead: Lead) {
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
      label: "Convert to Client",
      action: "convert",
      variant: "default" as const,
    },
    {
      label: "Delete",
      action: "delete",
      variant: "destructive" as const,
    },
  ]
}

