import { api } from "@/lib/api/client"

// TODO: Import Post type when available
export interface Post {
  id: string
  title: string
  // ... other fields
}

export interface GetPostsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

export interface GetPostsResponse {
  data: Post[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * Posts Data Adapter
 */
export const postsAdapter = {
  /**
   * Get list of posts
   */
  async getAll(params?: GetPostsParams): Promise<GetPostsResponse> {
    return api.get<GetPostsResponse>("/posts", params as any)
  },

  /**
   * Get post by ID
   */
  async getById(id: string): Promise<Post> {
    return api.get<Post>(`/posts/${id}`)
  },

  /**
   * Create new post
   */
  async create(data: Partial<Post>): Promise<Post> {
    return api.post<Post>("/posts", data)
  },

  /**
   * Update post
   */
  async update(id: string, data: Partial<Post>): Promise<Post> {
    return api.put<Post>(`/posts/${id}`, data)
  },

  /**
   * Delete post
   */
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/posts/${id}`)
  },
}

