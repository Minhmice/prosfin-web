/**
 * URL State Utilities
 * 
 * Chuẩn hoá query params cho list pages:
 * - ?q=... - search query
 * - ?status=... - filter by status
 * - ?owner=... - filter by owner
 * - ?page=...&pageSize=... - pagination
 * - ?sort=... - sorting (format: field:asc|desc)
 */

export interface ListPageParams {
  q?: string
  status?: string
  owner?: string
  page?: number
  pageSize?: number
  sort?: string
}

export interface SortConfig {
  field: string
  direction: "asc" | "desc"
}

/**
 * Parse sort string (format: "field:asc" or "field:desc")
 */
export function parseSort(sort?: string): SortConfig | null {
  if (!sort) return null
  
  const [field, direction] = sort.split(":")
  if (!field || !direction) return null
  
  if (direction !== "asc" && direction !== "desc") return null
  
  return { field, direction }
}

/**
 * Serialize sort config to string
 */
export function serializeSort(sort: SortConfig | null): string | undefined {
  if (!sort) return undefined
  return `${sort.field}:${sort.direction}`
}

/**
 * Parse URL search params to ListPageParams
 */
export function parseListParams(searchParams: URLSearchParams): ListPageParams {
  const page = searchParams.get("page")
  const pageSize = searchParams.get("pageSize")
  
  return {
    q: searchParams.get("q") || undefined,
    status: searchParams.get("status") || undefined,
    owner: searchParams.get("owner") || undefined,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    sort: searchParams.get("sort") || undefined,
  }
}

/**
 * Serialize ListPageParams to URL search params
 */
export function serializeListParams(params: ListPageParams): URLSearchParams {
  const searchParams = new URLSearchParams()
  
  if (params.q) searchParams.set("q", params.q)
  if (params.status) searchParams.set("status", params.status)
  if (params.owner) searchParams.set("owner", params.owner)
  if (params.page) searchParams.set("page", params.page.toString())
  if (params.pageSize) searchParams.set("pageSize", params.pageSize.toString())
  if (params.sort) searchParams.set("sort", params.sort)
  
  return searchParams
}

/**
 * Build URL with list params
 */
export function buildListUrl(
  basePath: string,
  params: ListPageParams
): string {
  const searchParams = serializeListParams(params)
  const queryString = searchParams.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}
