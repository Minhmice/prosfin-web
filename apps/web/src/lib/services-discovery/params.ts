/**
 * Service Discovery URL Params
 * 
 * Parse and build URL search params for service filtering and wizard state.
 */

/**
 * Service filters from URL search params
 */
export interface ServiceFilters {
  persona?: string;
  outcome?: string;
  stage?: string;
  format?: string;
  q?: string; // Free text search
  rec?: string; // "1" if recommended by wizard
}

/**
 * Wizard answers for scoring
 */
export interface WizardAnswers {
  persona?: string;
  outcome?: string;
  stage?: string;
  format?: string;
}

/**
 * Parse URLSearchParams to ServiceFilters
 * 
 * Supports single-value params only (persona=owner, not persona=owner&persona=cfo)
 */
export function parseSearchParams(searchParams: URLSearchParams): ServiceFilters {
  const filters: ServiceFilters = {};

  const persona = searchParams.get("persona");
  if (persona) filters.persona = persona;

  const outcome = searchParams.get("outcome");
  if (outcome) filters.outcome = outcome;

  const stage = searchParams.get("stage");
  if (stage) filters.stage = stage;

  const format = searchParams.get("format");
  if (format) filters.format = format;

  const q = searchParams.get("q");
  if (q) filters.q = q;

  const rec = searchParams.get("rec");
  if (rec) filters.rec = rec;

  return filters;
}

/**
 * Build URLSearchParams from ServiceFilters
 */
export function buildSearchParams(filters: ServiceFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.persona) {
    params.set("persona", filters.persona);
  }
  if (filters.outcome) {
    params.set("outcome", filters.outcome);
  }
  if (filters.stage) {
    params.set("stage", filters.stage);
  }
  if (filters.format) {
    params.set("format", filters.format);
  }
  if (filters.q) {
    params.set("q", filters.q);
  }
  if (filters.rec) {
    params.set("rec", filters.rec);
  }

  return params;
}

/**
 * Convert WizardAnswers to ServiceFilters
 */
export function wizardAnswersToFilters(answers: WizardAnswers): ServiceFilters {
  const filters: ServiceFilters = {
    rec: "1", // Mark as recommended
  };

  if (answers.persona) filters.persona = answers.persona;
  if (answers.outcome) filters.outcome = answers.outcome;
  if (answers.stage) filters.stage = answers.stage;
  if (answers.format) filters.format = answers.format;

  return filters;
}

