/**
 * HTTP CRM Provider
 * Implementation using fetch API
 */

import type { CRMProvider, PaginatedResponse } from "./provider"
import type { Client, Lead, ClientFilterInput, LeadFilterInput, CreateClientInput, UpdateClientInput, CreateLeadInput, UpdateLeadInput } from "@prosfin/shared"
import type { Client360, LeadSourceSeries } from "../types"

function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)))
      } else {
        searchParams.set(key, String(value))
      }
    }
  }
  return searchParams.toString()
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  const result = await response.json()
  return result.data || result
}

export class HTTPCRMProvider implements CRMProvider {
  private baseUrl = "/api/crm"

  // Clients
  async listClients(params: ClientFilterInput): Promise<PaginatedResponse<Client>> {
    const query = buildQueryString(params)
    const response = await fetch(`${this.baseUrl}/clients?${query}`)
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    const result = await response.json()
    return {
      data: result.data,
      meta: result.meta || {},
    }
  }

  async getClient(id: string): Promise<Client> {
    return fetchAPI<Client>(`${this.baseUrl}/clients/${id}`)
  }

  async createClient(data: CreateClientInput): Promise<Client> {
    return fetchAPI<Client>(`${this.baseUrl}/clients`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateClient(id: string, data: UpdateClientInput): Promise<Client> {
    return fetchAPI<Client>(`${this.baseUrl}/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteClient(id: string): Promise<void> {
    await fetchAPI(`${this.baseUrl}/clients/${id}`, {
      method: "DELETE",
    })
  }

  async getClient360(clientId: string): Promise<Client360> {
    return fetchAPI<Client360>(`${this.baseUrl}/clients/${clientId}/360`)
  }

  // Leads
  async listLeads(params: LeadFilterInput): Promise<PaginatedResponse<Lead>> {
    const query = buildQueryString(params)
    const response = await fetch(`${this.baseUrl}/leads?${query}`)
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    const result = await response.json()
    return {
      data: result.data,
      meta: result.meta || {},
    }
  }

  async getLead(id: string): Promise<Lead> {
    return fetchAPI<Lead>(`${this.baseUrl}/leads/${id}`)
  }

  async createLead(data: CreateLeadInput): Promise<Lead> {
    return fetchAPI<Lead>(`${this.baseUrl}/leads`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateLead(id: string, data: UpdateLeadInput): Promise<Lead> {
    return fetchAPI<Lead>(`${this.baseUrl}/leads/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteLead(id: string): Promise<void> {
    await fetchAPI(`${this.baseUrl}/leads/${id}`, {
      method: "DELETE",
    })
  }

  async convertLead(id: string): Promise<{ client: Client }> {
    const result = await fetchAPI<{ client: Client }>(`${this.baseUrl}/leads/${id}/convert`, {
      method: "POST",
    })
    return result
  }

  async getLeadSourceSeries(params: { range: "7d" | "30d" }): Promise<LeadSourceSeries> {
    const query = buildQueryString(params)
    return fetchAPI<LeadSourceSeries>(`${this.baseUrl}/leads/sources/series?${query}`)
  }
}

