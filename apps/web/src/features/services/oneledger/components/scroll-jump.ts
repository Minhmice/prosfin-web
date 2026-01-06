type ScrollHighlightOptions = {
  offset?: number;
  highlight?: boolean;
};

const HIGHLIGHT_CLASS = "ring-2 ring-primary shadow-lg transition";

export function scrollToAnchor(id: string, options?: ScrollHighlightOptions) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  const offset = options?.offset ?? 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });

  if (options?.highlight) {
    highlightElement(target);
  }
}

export function scrollToModuleCard(moduleId: string, options?: ScrollHighlightOptions) {
  if (typeof window === "undefined") return;
  const target = document.querySelector<HTMLElement>(`[data-module-id="${moduleId}"]`);
  if (!target) return;
  const offset = options?.offset ?? 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  if (options?.highlight) {
    highlightElement(target);
  }
}

function highlightElement(el: HTMLElement) {
  const classes = HIGHLIGHT_CLASS.split(" ");
  el.classList.add(...classes);
  window.setTimeout(() => el.classList.remove(...classes), 1200);
}

/**
 * Phase 4: scrollToId function (alias for scrollToAnchor)
 */
export function scrollToId(id: string, opts?: { offset?: number }) {
  scrollToAnchor(id, { offset: opts?.offset, highlight: false });
}

/**
 * Phase 4: highlightId function
 */
export function highlightId(id: string, className = "ring-2 ring-offset-2 ring-primary") {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const classes = className.split(" ");
  el.classList.add(...classes);
  window.setTimeout(() => el.classList.remove(...classes), 1200);
}

