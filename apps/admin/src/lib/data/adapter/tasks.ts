import { api } from "@/lib/api/client"

// TODO: Import Task type when available
export interface Task {
  id: string
  // ... fields
}

/**
 * Tasks Data Adapter
 */
export const tasksAdapter = {
  async getAll(): Promise<Task[]> {
    return api.get<Task[]>("/tasks")
  },

  async getById(id: string): Promise<Task> {
    return api.get<Task>(`/tasks/${id}`)
  },

  async create(data: Partial<Task>): Promise<Task> {
    return api.post<Task>("/tasks", data)
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    return api.put<Task>(`/tasks/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/tasks/${id}`)
  },
}

