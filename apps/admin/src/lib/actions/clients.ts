import type { ClientStatus } from "@/types"
import { notifySuccess, notifyError } from "@/lib/notify"

export async function setClientStatus(
  clientId: string,
  status: ClientStatus
): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Client status updated", `Status changed to ${status}`)
    return { success: true }
  } catch (error) {
    notifyError("Failed to update client status", "Please try again")
    return { success: false }
  }
}

export async function archiveClient(clientId: string): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Client archived", "The client has been moved to archive")
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive client", "Please try again")
    return { success: false }
  }
}

export async function bulkArchiveClients(clientIds: string[]): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    notifySuccess(
      `${clientIds.length} clients archived`,
      "Selected clients have been moved to archive"
    )
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive clients", "Please try again")
    return { success: false }
  }
}
