import { http, HttpResponse } from "msw"

// TODO: Import types và store khi ready
// import type { Client, Lead, Post, Schedule, Task } from "@/lib/data/types"
// import { dataStore } from "@/lib/data/store"

const API_BASE = "/api"

/**
 * MSW Request Handlers
 * Mock REST API endpoints for frontend-only development
 */

// Clients handlers
export const clientHandlers = [
  http.get(`${API_BASE}/clients`, async ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "50")
    const search = url.searchParams.get("search") || ""

    // TODO: Implement with data store
    // const clients = dataStore.getClients({ page, limit, search })
    const clients: any[] = []

    return HttpResponse.json({
      data: clients,
      pagination: {
        page,
        limit,
        total: clients.length,
        totalPages: Math.ceil(clients.length / limit),
      },
    })
  }),

  http.get(`${API_BASE}/clients/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store
    // const client = dataStore.getClientById(id as string)
    const client = null

    if (!client) {
      return HttpResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return HttpResponse.json({ data: client })
  }),

  http.post(`${API_BASE}/clients`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    // const client = dataStore.createClient(body)
    const client = { id: Date.now().toString(), ...body }

    return HttpResponse.json({ data: client }, { status: 201 })
  }),

  http.put(`${API_BASE}/clients/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    // const client = dataStore.updateClient(id as string, body)
    const client = { id, ...body }

    return HttpResponse.json({ data: client })
  }),

  http.delete(`${API_BASE}/clients/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store
    // dataStore.deleteClient(id as string)

    return HttpResponse.json({ success: true })
  }),
]

// Leads handlers
export const leadHandlers = [
  http.get(`${API_BASE}/leads`, async ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "50")
    const stage = url.searchParams.get("stage")
    const search = url.searchParams.get("search") || ""

    // TODO: Implement with data store
    const leads: any[] = []

    return HttpResponse.json({
      data: leads,
      pagination: {
        page,
        limit,
        total: leads.length,
        totalPages: Math.ceil(leads.length / limit),
      },
    })
  }),

  http.get(`${API_BASE}/leads/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store
    const lead = null

    if (!lead) {
      return HttpResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    return HttpResponse.json({ data: lead })
  }),

  http.post(`${API_BASE}/leads`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const lead = { id: Date.now().toString(), ...body }

    return HttpResponse.json({ data: lead }, { status: 201 })
  }),

  http.put(`${API_BASE}/leads/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const lead = { id, ...body }

    return HttpResponse.json({ data: lead })
  }),

  http.delete(`${API_BASE}/leads/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store

    return HttpResponse.json({ success: true })
  }),

  http.post(`${API_BASE}/leads/:id/convert`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement convert lead to client
    const client = { id: Date.now().toString(), convertedFromLeadId: id, ...body }

    return HttpResponse.json({ data: client }, { status: 201 })
  }),
]

// Posts handlers
export const postHandlers = [
  http.get(`${API_BASE}/posts`, async ({ request }) => {
    // TODO: Implement with data store
    const posts: any[] = []

    return HttpResponse.json({ data: posts })
  }),

  http.get(`${API_BASE}/posts/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store
    const post = null

    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return HttpResponse.json({ data: post })
  }),

  http.post(`${API_BASE}/posts`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const post = { id: Date.now().toString(), ...body }

    return HttpResponse.json({ data: post }, { status: 201 })
  }),

  http.put(`${API_BASE}/posts/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const post = { id, ...body }

    return HttpResponse.json({ data: post })
  }),

  http.delete(`${API_BASE}/posts/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store

    return HttpResponse.json({ success: true })
  }),
]

// Schedules handlers
export const scheduleHandlers = [
  http.get(`${API_BASE}/schedules`, async ({ request }) => {
    // TODO: Implement with data store
    const schedules: any[] = []

    return HttpResponse.json({ data: schedules })
  }),

  http.post(`${API_BASE}/schedules`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const schedule = { id: Date.now().toString(), ...body }

    return HttpResponse.json({ data: schedule }, { status: 201 })
  }),

  http.put(`${API_BASE}/schedules/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const schedule = { id, ...body }

    return HttpResponse.json({ data: schedule })
  }),

  http.delete(`${API_BASE}/schedules/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store

    return HttpResponse.json({ success: true })
  }),
]

// Tasks handlers
export const taskHandlers = [
  http.get(`${API_BASE}/tasks`, async ({ request }) => {
    // TODO: Implement with data store
    const tasks: any[] = []

    return HttpResponse.json({ data: tasks })
  }),

  http.post(`${API_BASE}/tasks`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const task = { id: Date.now().toString(), ...body }

    return HttpResponse.json({ data: task }, { status: 201 })
  }),

  http.put(`${API_BASE}/tasks/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, unknown>
    // TODO: Implement with data store
    const task = { id, ...body }

    return HttpResponse.json({ data: task })
  }),

  http.delete(`${API_BASE}/tasks/:id`, async ({ params }) => {
    const { id } = params
    // TODO: Implement with data store

    return HttpResponse.json({ success: true })
  }),
]

// Global search handler
export const searchHandler = [
  http.get(`${API_BASE}/search`, async ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get("q") || ""

    // TODO: Implement unified search across entities
    const results: any[] = []

    return HttpResponse.json({ data: results, query: q })
  }),
]

// Export all handlers
export const handlers = [
  ...clientHandlers,
  ...leadHandlers,
  ...postHandlers,
  ...scheduleHandlers,
  ...taskHandlers,
  ...searchHandler,
]

