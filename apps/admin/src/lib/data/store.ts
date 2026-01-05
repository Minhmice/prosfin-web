/**
 * Data Store
 * 
 * In-memory store với persistence (localStorage/IndexedDB)
 * TODO: Implement full store với seed data integration
 */

// TODO: Import types when available
// import type { Client, Lead, Post, Schedule, Task } from "./types"

/**
 * Data Store Interface
 */
export interface DataStore {
  // Clients
  getClients(params?: any): any[]
  getClientById(id: string): any | null
  createClient(data: any): any
  updateClient(id: string, data: any): any
  deleteClient(id: string): void

  // Leads
  getLeads(params?: any): any[]
  getLeadById(id: string): any | null
  createLead(data: any): any
  updateLead(id: string, data: any): any
  deleteLead(id: string): void

  // Posts
  getPosts(params?: any): any[]
  getPostById(id: string): any | null
  createPost(data: any): any
  updatePost(id: string, data: any): any
  deletePost(id: string): void
}

/**
 * In-memory data store
 * TODO: Implement with seed data và relationships
 */
class MemoryDataStore implements DataStore {
  private clients: Map<string, any> = new Map()
  private leads: Map<string, any> = new Map()
  private posts: Map<string, any> = new Map()

  // Clients
  getClients(params?: any): any[] {
    return Array.from(this.clients.values())
  }

  getClientById(id: string): any | null {
    return this.clients.get(id) || null
  }

  createClient(data: any): any {
    const id = data.id || Date.now().toString()
    const client = { ...data, id }
    this.clients.set(id, client)
    return client
  }

  updateClient(id: string, data: any): any {
    const existing = this.clients.get(id)
    if (!existing) throw new Error("Client not found")
    const updated = { ...existing, ...data, id }
    this.clients.set(id, updated)
    return updated
  }

  deleteClient(id: string): void {
    this.clients.delete(id)
  }

  // Leads
  getLeads(params?: any): any[] {
    return Array.from(this.leads.values())
  }

  getLeadById(id: string): any | null {
    return this.leads.get(id) || null
  }

  createLead(data: any): any {
    const id = data.id || Date.now().toString()
    const lead = { ...data, id }
    this.leads.set(id, lead)
    return lead
  }

  updateLead(id: string, data: any): any {
    const existing = this.leads.get(id)
    if (!existing) throw new Error("Lead not found")
    const updated = { ...existing, ...data, id }
    this.leads.set(id, updated)
    return updated
  }

  deleteLead(id: string): void {
    this.leads.delete(id)
  }

  // Posts
  getPosts(params?: any): any[] {
    return Array.from(this.posts.values())
  }

  getPostById(id: string): any | null {
    return this.posts.get(id) || null
  }

  createPost(data: any): any {
    const id = data.id || Date.now().toString()
    const post = { ...data, id }
    this.posts.set(id, post)
    return post
  }

  updatePost(id: string, data: any): any {
    const existing = this.posts.get(id)
    if (!existing) throw new Error("Post not found")
    const updated = { ...existing, ...data, id }
    this.posts.set(id, updated)
    return updated
  }

  deletePost(id: string): void {
    this.posts.delete(id)
  }
}

// Export singleton instance
export const dataStore = new MemoryDataStore()

/**
 * Initialize store with seed data
 * TODO: Load from seed.ts
 */
export function initStore() {
  // TODO: Load seed data and populate store
  // const seedData = generateSeedData()
  // seedData.clients.forEach(client => dataStore.createClient(client))
  // seedData.leads.forEach(lead => dataStore.createLead(lead))
  // seedData.posts.forEach(post => dataStore.createPost(post))
}

