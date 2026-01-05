/**
 * Services Explorer URL Params
 * 
 * Parse and build URL search params for services explorer filtering.
 * Supports multi-value tags and compare array.
 */

/**
 * Explorer filters from URL search params
 */
export interface ExplorerFilters {
  query?: string; // Free text search
  audience?: "owner" | "finance_team" | "hiring"; // Single select
  goal?: "profit" | "cashflow" | "tax" | "risk" | "compliance"; // Single select
  format?: "advisory" | "consulting" | "coaching" | "test" | "audit"; // Single select
  tag?: string[]; // Multi-select tags
  sort?: "recommended" | "latest" | "a-z"; // Sort order
  compare?: string[]; // Service slugs to compare (max 3)
}

/**
 * Parse URLSearchParams to ExplorerFilters
 * 
 * Supports:
 * - Multi-value tags: tag=tag1&tag=tag2 or tag=tag1,tag2
 * - Compare array: compare=slug1,slug2,slug3
 */
export function parseExplorerParams(searchParams: URLSearchParams): ExplorerFilters {
  const filters: ExplorerFilters = {};

  const query = searchParams.get("query");
  if (query) filters.query = query;

  const audience = searchParams.get("audience");
  if (audience && (audience === "owner" || audience === "finance_team" || audience === "hiring")) {
    filters.audience = audience;
  }

  const goal = searchParams.get("goal");
  if (
    goal &&
    (goal === "profit" || goal === "cashflow" || goal === "tax" || goal === "risk" || goal === "compliance")
  ) {
    filters.goal = goal;
  }

  const format = searchParams.get("format");
  if (
    format &&
    (format === "advisory" || format === "consulting" || format === "coaching" || format === "test" || format === "audit")
  ) {
    filters.format = format;
  }

  // Multi-value tags
  const tagParam = searchParams.get("tag");
  if (tagParam) {
    // Support comma-separated or multiple params
    filters.tag = tagParam.includes(",") ? tagParam.split(",") : [tagParam];
  } else {
    // Also check for multiple tag params
    const tagParams = searchParams.getAll("tag");
    if (tagParams.length > 0) {
      filters.tag = tagParams;
    }
  }

  const sort = searchParams.get("sort");
  if (sort && (sort === "recommended" || sort === "latest" || sort === "a-z")) {
    filters.sort = sort;
  }

  // Compare array
  const compareParam = searchParams.get("compare");
  if (compareParam) {
    filters.compare = compareParam.includes(",") ? compareParam.split(",") : [compareParam];
  }

  return filters;
}

/**
 * Build URLSearchParams from ExplorerFilters
 */
export function buildExplorerParams(filters: ExplorerFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("query", filters.query);
  }
  if (filters.audience) {
    params.set("audience", filters.audience);
  }
  if (filters.goal) {
    params.set("goal", filters.goal);
  }
  if (filters.format) {
    params.set("format", filters.format);
  }
  if (filters.tag && filters.tag.length > 0) {
    // Use comma-separated for cleaner URLs
    params.set("tag", filters.tag.join(","));
  }
  if (filters.sort) {
    params.set("sort", filters.sort);
  }
  if (filters.compare && filters.compare.length > 0) {
    params.set("compare", filters.compare.join(","));
  }

  return params;
}

/**
 * Map old discovery params to new explorer params
 * 
 * For backward compatibility during migration
 */
export function mapDiscoveryToExplorer(oldFilters: {
  persona?: string;
  outcome?: string;
  stage?: string;
  format?: string;
  q?: string;
}): ExplorerFilters {
  const filters: ExplorerFilters = {};

  if (oldFilters.q) filters.query = oldFilters.q;

  // Map persona to audience
  if (oldFilters.persona) {
    if (oldFilters.persona === "owner") {
      filters.audience = "owner";
    } else if (oldFilters.persona === "cfo" || oldFilters.persona === "chief-accountant") {
      filters.audience = "finance_team";
    }
  }

  // Map outcome to goal
  if (oldFilters.outcome) {
    const goalMap: Record<string, ExplorerFilters["goal"]> = {
      profit: "profit",
      cashflow: "cashflow",
      tax: "tax",
      risk: "risk",
      compliance: "compliance",
    };
    const mapped = goalMap[oldFilters.outcome];
    if (mapped) filters.goal = mapped;
  }

  // Format stays the same
  if (oldFilters.format) {
    const formatMap: Record<string, ExplorerFilters["format"]> = {
      advisory: "advisory",
      consulting: "consulting",
      coaching: "coaching",
      assessment: "test",
      audit: "audit",
    };
    const mapped = formatMap[oldFilters.format];
    if (mapped) filters.format = mapped;
  }

  return filters;
}

