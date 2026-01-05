import { api } from "@/lib/api/client"
import type { Lead } from "@prosfin/shared"

export interface GetLeadsParams {
  page?: number
  limit?: number
  search?: string
  stage?: string
  source?: string
  ownerId?: string
}

export interface GetLeadsResponse {
  data: Lead[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ConvertLeadToClientParams {
  leadId: string
  clientData?: Partial<any>
}

/**
 * Leads Data Adapter
 */
export const leadsAdapter = {
  /**
   * Get list of leads
   */
  async getAll(params?: GetLeadsParams): Promise<GetLeadsResponse> {
    return api.get<GetLeadsResponse>("/leads", params as any)
  },

  /**
   * Get lead by ID
   */
  async getById(id: string): Promise<Lead> {
    return api.get<Lead>(`/leads/${id}`)
  },

  /**
   * Create new lead
   */
  async create(data: Partial<Lead>): Promise<Lead> {
    return api.post<Lead>("/leads", data)
  },

  /**
   * Update lead
   */
  async update(id: string, data: Partial<Lead>): Promise<Lead> {
    return api.put<Lead>(`/leads/${id}`, data)
  },

  /**
   * Delete lead
   */
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/leads/${id}`)
  },

  /**
   * Convert lead to client
   */
  async convertToClient(params: ConvertLeadToClientParams): Promise<any> {
    return api.post<any>(`/leads/${params.leadId}/convert`, params.clientData)
  },
}

