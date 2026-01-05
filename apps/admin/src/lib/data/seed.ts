/**
 * Seed Data Generator
 * 
 * Generate realistic seed data với relationships
 * TODO: Implement seed data generation với:
 * - 50 clients với relationships (linked leads, posts, schedules)
 * - 120 leads với stages, sources, UTM params
 * - 30 posts với status, categories, tags
 * - 40 schedules với channels, status, linked posts
 * - 80 tasks với priorities, due dates, linked entities
 * - Activity timeline events cho mỗi entity
 */

export interface SeedData {
  clients: any[]
  leads: any[]
  posts: any[]
  schedules: any[]
  tasks: any[]
}

/**
 * Generate seed data
 * TODO: Implement với realistic data và relationships
 */
export function generateSeedData(): SeedData {
  // TODO: Implement seed data generation
  // Use existing mock data generators from apps/admin/src/data/
  // Import và adapt mockLeads, mockClients, mockPosts, etc.
  
  return {
    clients: [],
    leads: [],
    posts: [],
    schedules: [],
    tasks: [],
  }
}

/**
 * Seed store với generated data
 */
export function seedStore() {
  const seedData = generateSeedData()
  // TODO: Populate store with seed data
  return seedData
}

