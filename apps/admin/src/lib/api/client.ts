/**
 * API Client
 * 
 * Type-safe fetch wrapper with error handling
 * Works with MSW in development, real API in production
 */

export interface ApiResponse<T> {
  data: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  status: number
  data?: unknown
}

export class ApiClientError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "ApiClientError"
    this.status = status
    this.data = data
  }
}

const API_BASE = "/api"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: unknown
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }

    throw new ApiClientError(
      (errorData as any)?.error || response.statusText,
      response.status,
      errorData
    )
  }

  const data = await response.json()
  return data.data ?? data
}

/**
 * API Client class
 */
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(endpoint, this.baseUrl.startsWith("http") ? this.baseUrl : window.location.origin + this.baseUrl)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return handleResponse<T>(response)
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const url = new URL(endpoint, this.baseUrl.startsWith("http") ? this.baseUrl : window.location.origin + this.baseUrl)

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    return handleResponse<T>(response)
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    const url = new URL(endpoint, this.baseUrl.startsWith("http") ? this.baseUrl : window.location.origin + this.baseUrl)

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    return handleResponse<T>(response)
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = new URL(endpoint, this.baseUrl.startsWith("http") ? this.baseUrl : window.location.origin + this.baseUrl)

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return handleResponse<T>(response)
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export convenience functions
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) =>
    apiClient.get<T>(endpoint, params),
  post: <T>(endpoint: string, body?: unknown) => apiClient.post<T>(endpoint, body),
  put: <T>(endpoint: string, body?: unknown) => apiClient.put<T>(endpoint, body),
  delete: <T>(endpoint: string) => apiClient.delete<T>(endpoint),
}

