/**
 * Content URL State Utilities
 * 
 * Chuẩn hóa query params cho content modules:
 * - q, status, channel, from, to, sort, page, pageSize, view, range
 */

export interface ContentListParams {
  q?: string
  status?: string
  channel?: string[] // multiple channels
  from?: string // ISO date string
  to?: string // ISO date string
  sort?: string
  page?: number
  pageSize?: number
  view?: string // calendar/list/grid
  range?: string // 7d, 30d, 90d, custom
  campaign?: string
  postId?: string
  type?: string // for media
  tags?: string[]
}

/**
 * Parse URL search params to ContentListParams
 */
export function parseContentParams(searchParams: URLSearchParams): ContentListParams {
  const page = searchParams.get("page")
  const pageSize = searchParams.get("pageSize")
  const channels = searchParams.getAll("channel")
  const tags = searchParams.getAll("tags")
  
  return {
    q: searchParams.get("q") || undefined,
    status: searchParams.get("status") || undefined,
    channel: channels.length > 0 ? channels : undefined,
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
    sort: searchParams.get("sort") || undefined,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    view: searchParams.get("view") || undefined,
    range: searchParams.get("range") || undefined,
    campaign: searchParams.get("campaign") || undefined,
    postId: searchParams.get("postId") || undefined,
    type: searchParams.get("type") || undefined,
    tags: tags.length > 0 ? tags : undefined,
  }
}

/**
 * Serialize ContentListParams to URL search params
 */
export function serializeContentParams(params: ContentListParams): URLSearchParams {
  const searchParams = new URLSearchParams()
  
  if (params.q) searchParams.set("q", params.q)
  if (params.status) searchParams.set("status", params.status)
  if (params.channel && params.channel.length > 0) {
    params.channel.forEach((ch) => searchParams.append("channel", ch))
  }
  if (params.from) searchParams.set("from", params.from)
  if (params.to) searchParams.set("to", params.to)
  if (params.sort) searchParams.set("sort", params.sort)
  if (params.page) searchParams.set("page", params.page.toString())
  if (params.pageSize) searchParams.set("pageSize", params.pageSize.toString())
  if (params.view) searchParams.set("view", params.view)
  if (params.range) searchParams.set("range", params.range)
  if (params.campaign) searchParams.set("campaign", params.campaign)
  if (params.postId) searchParams.set("postId", params.postId)
  if (params.type) searchParams.set("type", params.type)
  if (params.tags && params.tags.length > 0) {
    params.tags.forEach((tag) => searchParams.append("tags", tag))
  }
  
  return searchParams
}

/**
 * Build URL with content params
 */
export function buildContentUrl(
  basePath: string,
  params: ContentListParams
): string {
  const searchParams = serializeContentParams(params)
  const queryString = searchParams.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

/**
 * Copy share link to clipboard
 */
export async function copyShareLink(
  path: string,
  params: ContentListParams
): Promise<void> {
  const url = buildContentUrl(path, params)
  const fullUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${url}`
    : url
  
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(fullUrl)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = fullUrl
    textArea.style.position = "fixed"
    textArea.style.opacity = "0"
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
  }
}
