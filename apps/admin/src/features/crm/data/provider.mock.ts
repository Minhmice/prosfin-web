/**
 * Mock CRM Provider
 * In-memory implementation for development
 */

import type { CRMProvider, PaginatedResponse } from "./provider"
import type { Client, Lead, ClientFilterInput, LeadFilterInput, CreateClientInput, UpdateClientInput, CreateLeadInput, UpdateLeadInput } from "@prosfin/shared"
import type { Client360, Note, Task, File, LeadSourceSeries } from "../types"
import { mockClients } from "@/data/clients"
import { mockLeads } from "@/data/leads"

// Base date for consistent mock data
const baseDate = new Date("2024-12-01T00:00:00Z")

// Mock stores - deep clone để tránh mutation
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

let clientsStore: Client[] = deepClone(mockClients)
let leadsStore: Lead[] = deepClone(mockLeads)

// Mock 360 data
const mockNotes: Note[] = [
  {
    id: "note-1",
    clientId: "client-1",
    content: "Initial consultation completed. Client interested in tax planning services.",
    authorId: "user-1",
    authorName: "John Manager",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "note-2",
    clientId: "client-1",
    content: "Follow-up call scheduled for next week.",
    authorId: "user-1",
    authorName: "John Manager",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
]

const mockTasks: Task[] = [
  {
    id: "task-1",
    clientId: "client-1",
    title: "Prepare tax planning proposal",
    description: "Create comprehensive tax planning proposal for Q1",
    status: "in_progress",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    assignedToId: "user-1",
    assignedToName: "John Manager",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task-2",
    clientId: "client-1",
    title: "Review financial statements",
    status: "todo",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
]

const mockFiles: File[] = [
  {
    id: "file-1",
    clientId: "client-1",
    name: "Financial_Statement_2024.pdf",
    url: "/files/financial-statement-2024.pdf",
    size: 1024 * 1024 * 2, // 2MB
    mimeType: "application/pdf",
    uploadedBy: "user-1",
    uploadedByName: "John Manager",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "file-2",
    clientId: "client-1",
    name: "Tax_Documents.zip",
    url: "/files/tax-documents.zip",
    size: 1024 * 1024 * 5, // 5MB
    mimeType: "application/zip",
    uploadedBy: "user-1",
    uploadedByName: "John Manager",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
]

export class MockCRMProvider implements CRMProvider {
  // Clients
  async listClients(params: ClientFilterInput): Promise<PaginatedResponse<Client>> {
    let filtered = [...clientsStore]

    // Search filter
    if (params.q) {
      const q = params.q.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (params.status) {
      filtered = filtered.filter((c) => c.status === params.status)
    }

    // Owner filter
    if (params.ownerId) {
      filtered = filtered.filter((c) => c.ownerId === params.ownerId)
    }

    // Sort
    if (params.sort) {
      const [field, direction] = params.sort.startsWith("-")
        ? [params.sort.slice(1), "desc"]
        : [params.sort, "asc"]
      filtered.sort((a, b) => {
        const aVal = (a as any)[field]
        const bVal = (b as any)[field]
        if (direction === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        }
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
      })
    }

    // Pagination
    const page = params.page || 1
    const pageSize = params.pageSize || 20
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginated = filtered.slice(start, end)

    return {
      data: paginated,
      meta: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    }
  }

  async getClient(id: string): Promise<Client> {
    const client = clientsStore.find((c) => c.id === id)
    if (!client) throw new Error("Client not found")
    return client
  }

  async createClient(data: CreateClientInput): Promise<Client> {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      status: data.status || "active",
      ownerId: data.ownerId,
      ownerName: data.ownerId ? "Owner Name" : undefined,
      tags: data.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    clientsStore.push(newClient)
    return newClient
  }

  async updateClient(id: string, data: UpdateClientInput): Promise<Client> {
    const index = clientsStore.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")
    clientsStore[index] = {
      ...clientsStore[index],
      ...data,
      updatedAt: new Date(),
    }
    return clientsStore[index]
  }

  async deleteClient(id: string): Promise<void> {
    const index = clientsStore.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")
    clientsStore.splice(index, 1)
  }

  async getClient360(clientId: string): Promise<Client360> {
    const client = await this.getClient(clientId)
    const relatedLeads = leadsStore.filter((l) => l.company === client.company).slice(0, 5)
    const notes = mockNotes.filter((n) => n.clientId === clientId)
    const tasks = mockTasks.filter((t) => t.clientId === clientId)
    const files = mockFiles.filter((f) => f.clientId === clientId)

    return {
      client,
      relatedLeads,
      notes,
      tasks,
      files,
    }
  }

  // Leads
  async listLeads(params: LeadFilterInput): Promise<PaginatedResponse<Lead>> {
    let filtered = [...leadsStore]

    // Search filter
    if (params.q) {
      const q = params.q.toLowerCase()
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      )
    }

    // Stage filter - use stage field directly
    // Note: LeadFilterInput might have 'status' field for backward compatibility
    const status = params.status
    if (status) {
      filtered = filtered.filter((l) => l.status === status)
    }

    // Source filter
    if (params.source) {
      filtered = filtered.filter((l) => l.source === params.source)
    }

    // Owner filter
    if (params.ownerId) {
      filtered = filtered.filter((l) => l.ownerId === params.ownerId)
    }

    // Score range filter
    // Score filter - removed as Lead from shared doesn't have score field

    // Date range filter (createdAt or updatedAt)
    const dateFrom = (params as any).dateFrom
    const dateTo = (params as any).dateTo
    if (dateFrom || dateTo) {
      filtered = filtered.filter((l) => {
        // Filter by createdAt (can be changed to updatedAt if needed)
        const leadDate = new Date(l.createdAt).getTime()
        if (dateFrom) {
          const from = new Date(dateFrom).setHours(0, 0, 0, 0)
          if (leadDate < from) return false
        }
        if (dateTo) {
          const to = new Date(dateTo).setHours(23, 59, 59, 999)
          if (leadDate > to) return false
        }
        return true
      })
    }

    // Sort
    if (params.sort) {
      const [field, direction] = params.sort.startsWith("-")
        ? [params.sort.slice(1), "desc"]
        : [params.sort, "asc"]
      filtered.sort((a, b) => {
        const aVal = (a as any)[field]
        const bVal = (b as any)[field]
        if (direction === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        }
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
      })
    }

    // Pagination
    const page = params.page || 1
    const pageSize = params.pageSize || 20
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginated = filtered.slice(start, end)

    return {
      data: paginated,
      meta: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    }
  }

  async getLead(id: string): Promise<Lead> {
    const lead = leadsStore.find((l) => l.id === id)
    if (!lead) throw new Error("Lead not found")
    return lead
  }

  async createLead(data: CreateLeadInput): Promise<Lead> {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      status: data.status || "new",
      source: data.source || "website",
      ownerId: data.ownerId,
      ownerName: data.ownerId ? "Owner Name" : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    leadsStore.push(newLead)
    return newLead
  }

  async updateLead(id: string, data: UpdateLeadInput): Promise<Lead> {
    const index = leadsStore.findIndex((l) => l.id === id)
    if (index === -1) throw new Error("Lead not found")
    leadsStore[index] = {
      ...leadsStore[index],
      ...data,
      updatedAt: new Date(),
    }
    return leadsStore[index]
  }

  async deleteLead(id: string): Promise<void> {
    const index = leadsStore.findIndex((l) => l.id === id)
    if (index === -1) throw new Error("Lead not found")
    leadsStore.splice(index, 1)
  }

  async convertLead(id: string): Promise<{ client: Client }> {
    const lead = await this.getLead(id)
    const client = await this.createClient({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: "active",
      ownerId: lead.ownerId,
      tags: [],
    })
    // Update lead stage to "won" after conversion
    await this.updateLead(id, { stage: "won" } as any)
    return { client }
  }

  async getLeadSourceSeries(params: { range: "7d" | "30d" }): Promise<LeadSourceSeries> {
    const days = params.range === "7d" ? 7 : 30
    const points: LeadSourceSeries["points"] = []
    // Extended sources list (more than 4 to test "Other" grouping)
    const allSources = ["web", "referral", "event", "facebook", "tiktok", "linkedin", "twitter", "other"]
    
    // Generate mock data for last N days
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split("T")[0]
      
      const point: any = { date: dateStr }
      allSources.forEach((source) => {
        // Generate consistent mock counts based on date and source
        const seed = dateStr.charCodeAt(0) + source.charCodeAt(0)
        point[source] = (seed % 20) + (i % 5)
      })
      points.push(point)
    }
    
    return { points }
  }
}

