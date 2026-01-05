import { api } from "@/lib/api/client"
import type { Client } from "@/features/crm/types"

export interface GetClientsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  ownerId?: string
}

export interface GetClientsResponse {
  data: Client[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * Clients Data Adapter
 */
export const clientsAdapter = {
  /**
   * Get list of clients
   */
  async getAll(params?: GetClientsParams): Promise<GetClientsResponse> {
    return api.get<GetClientsResponse>("/clients", params as any)
  },

  /**
   * Get client by ID
   */
  async getById(id: string): Promise<Client> {
    return api.get<Client>(`/clients/${id}`)
  },

  /**
   * Create new client
   */
  async create(data: Partial<Client>): Promise<Client> {
    return api.post<Client>("/clients", data)
  },

  /**
   * Update client
   */
  async update(id: string, data: Partial<Client>): Promise<Client> {
    return api.put<Client>(`/clients/${id}`, data)
  },

  /**
   * Delete client
   */
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/clients/${id}`)
  },
}

