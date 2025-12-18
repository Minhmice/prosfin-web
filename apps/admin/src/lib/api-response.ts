/**
 * API Response Helpers
 * Standardized response format
 */

export interface ApiResponse<T> {
  data: T
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    totalPages?: number
  }
  error?: string
}

export function successResponse<T>(
  data: T,
  meta?: ApiResponse<T>["meta"]
): Response {
  return Response.json({ data, meta } as ApiResponse<T>, { status: 200 })
}

export function errorResponse(
  message: string,
  status: number = 400
): Response {
  return Response.json({ error: message }, { status })
}

export function unauthorizedResponse(): Response {
  return errorResponse("Unauthorized", 401)
}

export function forbiddenResponse(): Response {
  return errorResponse("Forbidden", 403)
}

export function notFoundResponse(message: string = "Not found"): Response {
  return errorResponse(message, 404)
}

export function conflictResponse(message: string = "Conflict"): Response {
  return errorResponse(message, 409)
}

export function serverErrorResponse(message: string = "Internal server error"): Response {
  return errorResponse(message, 500)
}

