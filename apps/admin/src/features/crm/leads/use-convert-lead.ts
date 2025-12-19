/**
 * Convert Lead Hook
 * Utility hook for converting lead to client
 */

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { crmProvider } from "../data/provider"

export function useConvertLead() {
  const router = useRouter()

  const convertLead = async (leadId: string) => {
    try {
      const result = await crmProvider.convertLead(leadId)
      const clientId = result.client.id
      const clientName = result.client.name
      
      // Toast with action button to open client
      toast.success(`Lead converted to client "${clientName}"`, {
        action: {
          label: "Open Client",
          onClick: () => {
            router.push(`/crm/clients?highlight=${clientId}`)
          },
        },
      })
      
      // Navigate to clients page with highlight
      router.push(`/crm/clients?highlight=${clientId}`)
      return result
    } catch (error: any) {
      toast.error(error.message || "Failed to convert lead")
      throw error
    }
  }

  return { convertLead }
}

