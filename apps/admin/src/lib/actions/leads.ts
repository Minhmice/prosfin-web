import type { Lead, LeadStatus } from "@/types"
import { notifySuccess, notifyError } from "@/lib/notify"

export async function markContacted(leadId: string): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Lead marked as contacted", "The lead status has been updated")
    return { success: true }
  } catch (error) {
    notifyError("Failed to mark lead as contacted", "Please try again")
    return { success: false }
  }
}

export async function setLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Lead status updated", `Status changed to ${status}`)
    return { success: true }
  } catch (error) {
    notifyError("Failed to update lead status", "Please try again")
    return { success: false }
  }
}

export async function convertToClient(leadId: string): Promise<{ success: boolean; clientId?: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const clientId = `client-${Date.now()}`
    notifySuccess("Lead converted to client", "The lead has been successfully converted")
    return { success: true, clientId }
  } catch (error) {
    notifyError("Failed to convert lead", "Please try again")
    return { success: false }
  }
}

export async function archiveLead(leadId: string): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Lead archived", "The lead has been moved to archive")
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive lead", "Please try again")
    return { success: false }
  }
}

export async function bulkArchiveLeads(leadIds: string[]): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    notifySuccess(
      `${leadIds.length} leads archived`,
      "Selected leads have been moved to archive"
    )
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive leads", "Please try again")
    return { success: false }
  }
}
