/**
 * HTTP CRM Provider
 * Implementation using fetch API
 */

import type { CRMProvider, PaginatedResponse } from "./provider"
import type { Client, Lead, ClientFilterInput, LeadFilterInput, CreateClientInput, UpdateClientInput, CreateLeadInput, UpdateLeadInput } from "@prosfin/shared"
import type { Client360 } from "../types"

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
    const url = `${this.baseUrl}/clients?${query}`
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'provider.http.ts:47',message:'HTTP fetch start',data:{url,params},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{})
    // #endregion
    const response = await fetch(url)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'provider.http.ts:50',message:'HTTP response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,url:response.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{})
    // #endregion
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'provider.http.ts:53',message:'HTTP error',data:{status:response.status,error},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{})
      // #endregion
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    const result = await response.json()
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'provider.http.ts:58',message:'HTTP success',data:{dataCount:result.data?.length,total:result.meta?.total},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{})
    // #endregion
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
}

