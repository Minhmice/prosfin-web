/**
 * CRM Mock Provider
 * Server-ready interface for Phase 3 backend integration
 */

import type { Client, Lead } from "../types"
import { mockClients as baseClients } from "@/data/clients"
import { mockLeads as baseLeads } from "@/data/leads"
import { parseSort, type SortConfig } from "@/lib/url-state"

// Convert existing mock data to new format
const clients: Client[] = baseClients.map((c) => ({
  ...c,
  phone: undefined,
  ownerId: c.owner ? `owner-${c.owner.toLowerCase().replace(/\s+/g, "-")}` : undefined,
  ownerName: c.owner,
  tags: [],
  lastContactedAt: undefined,
}))

const leads: Lead[] = baseLeads.map((l) => ({
  id: l.id,
  name: l.name,
  company: l.company,
  email: l.email,
  phone: l.phone,
  stage: l.status === "new" ? "new" : l.status === "qualified" ? "qualified" : "new",
  source: l.source === "website" ? "web" : l.source === "referral" ? "referral" : "other",
  score: Math.floor(Math.random() * 100),
  ownerId: undefined,
  ownerName: undefined,
  nextActionAt: undefined,
  createdAt: l.createdAt,
  updatedAt: l.updatedAt,
}))

interface ListClientsParams {
  q?: string
  status?: string
  owner?: string
  page?: number
  pageSize?: number
  sort?: string
}

interface ListLeadsParams {
  q?: string
  stage?: string
  source?: string
  owner?: string
  page?: number
  pageSize?: number
  sort?: string
}

export interface ListResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

function filterAndSort<T>(
  items: T[],
  filterFn: (item: T) => boolean,
  sortConfig: SortConfig | null
): T[] {
  let result = items.filter(filterFn)

  if (sortConfig) {
    result = [...result].sort((a, b) => {
      const aVal = (a as any)[sortConfig.field]
      const bVal = (b as any)[sortConfig.field]
      if (aVal === bVal) return 0
      const comparison = aVal < bVal ? -1 : 1
      return sortConfig.direction === "asc" ? comparison : -comparison
    })
  }

  return result
}

export const crmProvider = {
  // Clients
  async listClients(params: ListClientsParams): Promise<ListResult<Client>> {
    const {
      q,
      status,
      owner,
      page = 1,
      pageSize = 10,
      sort,
    } = params

    const sortConfig = parseSort(sort)

    let filtered = filterAndSort(
      clients,
      (client) => {
        if (q && !client.name.toLowerCase().includes(q.toLowerCase()) &&
            !client.email.toLowerCase().includes(q.toLowerCase()) &&
            !client.company.toLowerCase().includes(q.toLowerCase())) {
          return false
        }
        if (status && client.status !== status) return false
        if (owner && client.ownerName !== owner) return false
        return true
      },
      sortConfig
    )

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return { data, total, page, pageSize }
  },

  async createClient(data: Omit<Client, "id" | "createdAt">): Promise<Client> {
    const newClient: Client = {
      ...data,
      id: `client-${clients.length + 1}`,
      createdAt: new Date(),
    }
    clients.push(newClient)
    return newClient
  },

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    const index = clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")
    clients[index] = { ...clients[index], ...data }
    return clients[index]
  },

  async deleteClient(id: string): Promise<void> {
    const index = clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")
    clients.splice(index, 1)
  },

  // Leads
  async listLeads(params: ListLeadsParams): Promise<ListResult<Lead>> {
    const {
      q,
      stage,
      source,
      owner,
      page = 1,
      pageSize = 10,
      sort,
    } = params

    const sortConfig = parseSort(sort)

    let filtered = filterAndSort(
      leads,
      (lead) => {
        if (q && !lead.name.toLowerCase().includes(q.toLowerCase()) &&
            !lead.email.toLowerCase().includes(q.toLowerCase()) &&
            !lead.company.toLowerCase().includes(q.toLowerCase())) {
          return false
        }
        if (stage && lead.stage !== stage) return false
        if (source && lead.source !== source) return false
        if (owner && lead.ownerName !== owner) return false
        return true
      },
      sortConfig
    )

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return { data, total, page, pageSize }
  },

  async createLead(data: Omit<Lead, "id" | "createdAt" | "updatedAt">): Promise<Lead> {
    const newLead: Lead = {
      ...data,
      id: `lead-${leads.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    leads.push(newLead)
    return newLead
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    const index = leads.findIndex((l) => l.id === id)
    if (index === -1) throw new Error("Lead not found")
    leads[index] = { ...leads[index], ...data, updatedAt: new Date() }
    return leads[index]
  },

  async deleteLead(id: string): Promise<void> {
    const index = leads.findIndex((l) => l.id === id)
    if (index === -1) throw new Error("Lead not found")
    leads.splice(index, 1)
  },

  async convertLeadToClient(leadId: string, overrides?: Partial<Client>): Promise<Client> {
    const lead = leads.find((l) => l.id === leadId)
    if (!lead) throw new Error("Lead not found")

    const newClient: Client = {
      id: `client-${clients.length + 1}`,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: "active",
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      tags: [],
      createdAt: new Date(),
      ...overrides,
    }

    clients.push(newClient)
    
    // Update lead stage to "won" or remove it
    const leadIndex = leads.findIndex((l) => l.id === leadId)
    if (leadIndex !== -1) {
      leads[leadIndex].stage = "won"
    }

    return newClient
  },
}
