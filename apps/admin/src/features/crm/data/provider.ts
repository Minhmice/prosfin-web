/**
 * CRM Provider Interface
 */

import type { Client, Lead, ClientFilterInput, LeadFilterInput, CreateClientInput, UpdateClientInput, CreateLeadInput, UpdateLeadInput } from "@prosfin/shared"
import { createCRMProvider } from "./provider.factory"

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

import type { Client360 } from "../types"

export interface CRMProvider {
  // Clients
  listClients(params: ClientFilterInput): Promise<PaginatedResponse<Client>>
  getClient(id: string): Promise<Client>
  createClient(data: CreateClientInput): Promise<Client>
  updateClient(id: string, data: UpdateClientInput): Promise<Client>
  deleteClient(id: string): Promise<void>
  getClient360(clientId: string): Promise<Client360>

  // Leads
  listLeads(params: LeadFilterInput): Promise<PaginatedResponse<Lead>>
  getLead(id: string): Promise<Lead>
  createLead(data: CreateLeadInput): Promise<Lead>
  updateLead(id: string, data: UpdateLeadInput): Promise<Lead>
  deleteLead(id: string): Promise<void>
  convertLead(id: string): Promise<{ client: Client }>
}

// Export singleton instance
export const crmProvider = createCRMProvider()
