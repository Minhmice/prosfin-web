/**
 * Research Discovery URL Params
 * 
 * Parse and build URL search params for research filtering and search.
 */

/**
 * Research filters from URL search params
 */
export interface ResearchFilters {
  q?: string; // Free text search
  type?: string; // "brief" | "playbook" | "tool"
  topic?: string; // Single topic value
  persona?: string; // Single persona value
  outcome?: string; // Single outcome value
  sort?: "latest" | "updated" | "popular"; // Sort order
}

/**
 * Parse URLSearchParams to ResearchFilters
 */
export function parseSearchParams(searchParams: URLSearchParams): ResearchFilters {
  const filters: ResearchFilters = {};

  const q = searchParams.get("q");
  if (q) filters.q = q;

  const type = searchParams.get("type");
  if (type) filters.type = type;

  const topic = searchParams.get("topic");
  if (topic) filters.topic = topic;

  const persona = searchParams.get("persona");
  if (persona) filters.persona = persona;

  const outcome = searchParams.get("outcome");
  if (outcome) filters.outcome = outcome;

  const sort = searchParams.get("sort");
  if (sort && (sort === "latest" || sort === "updated" || sort === "popular")) {
    filters.sort = sort;
  }

  return filters;
}

/**
 * Build URLSearchParams from ResearchFilters
 */
export function buildSearchParams(filters: ResearchFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", filters.q);
  }
  if (filters.type) {
    params.set("type", filters.type);
  }
  if (filters.topic) {
    params.set("topic", filters.topic);
  }
  if (filters.persona) {
    params.set("persona", filters.persona);
  }
  if (filters.outcome) {
    params.set("outcome", filters.outcome);
  }
  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  return params;
}

