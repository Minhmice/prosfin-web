import { api } from "@/lib/api/client"

// TODO: Import Schedule type when available
export interface Schedule {
  id: string
  // ... fields
}

/**
 * Schedules Data Adapter
 */
export const schedulesAdapter = {
  async getAll(): Promise<Schedule[]> {
    return api.get<Schedule[]>("/schedules")
  },

  async getById(id: string): Promise<Schedule> {
    return api.get<Schedule>(`/schedules/${id}`)
  },

  async create(data: Partial<Schedule>): Promise<Schedule> {
    return api.post<Schedule>("/schedules", data)
  },

  async update(id: string, data: Partial<Schedule>): Promise<Schedule> {
    return api.put<Schedule>(`/schedules/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/schedules/${id}`)
  },
}

