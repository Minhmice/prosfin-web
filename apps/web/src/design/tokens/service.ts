/**
 * Service Design Tokens
 * 
 * Design tokens cho service UI components.
 * Spacing, typography, bento card, chip, proof slot, CTA button.
 */

/**
 * Spacing tokens
 */
export const serviceSpacing = {
  section: {
    py: "py-16 md:py-24",
    px: "px-4 md:px-6 lg:px-8",
    gap: "gap-8 md:gap-12",
  },
  card: {
    p: "p-6 md:p-8",
    gap: "gap-4",
  },
  grid: {
    gap: "gap-6 md:gap-8",
  },
} as const;

/**
 * Typography tokens
 */
export const serviceTypography = {
  hero: {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    subhead: "text-lg md:text-xl text-muted-foreground mt-4",
  },
  section: {
    title: "text-3xl md:text-4xl font-bold",
    subtitle: "text-lg md:text-xl text-muted-foreground mt-2",
  },
  card: {
    title: "text-xl md:text-2xl font-semibold",
    description: "text-sm md:text-base text-muted-foreground",
  },
} as const;

/**
 * Bento card tokens
 */
export const bentoCardTokens = {
  base: "rounded-lg border bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md",
  variant: {
    default: "border-border",
    highlighted: "border-primary/50 bg-primary/5",
    featured: "border-primary shadow-lg",
  },
} as const;

/**
 * Chip tokens
 */
export const chipTokens = {
  base: "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  variant: {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary text-primary-foreground",
    outline: "border border-border bg-background",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
} as const;

/**
 * Proof slot tokens
 */
export const proofSlotTokens = {
  base: "flex flex-col items-center text-center",
  label: "text-sm font-medium text-muted-foreground",
  value: "text-2xl md:text-3xl font-bold mt-1",
} as const;

/**
 * CTA button tokens
 */
export const ctaButtonTokens = {
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  size: {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-11 px-8 text-lg",
  },
  variant: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-accent",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  },
} as const;

/**
 * Component contracts (TypeScript types)
 */
export interface HeroProps {
  h1: string;
  subhead?: string;
  ctas?: Array<{ label: string; action: string; targetId?: string }>;
  proofSlots?: Array<{ label: string; value: string }>;
}

export interface ModulesProps {
  modules: Array<{
    id: string;
    name: string;
    description: string;
    deliverables?: string[];
  }>;
  onOpenModule?: (moduleId: string) => void;
}

export interface TimelineProps {
  gates: Array<{
    id: string;
    title: string;
    description: string;
    deliverables?: string[];
  }>;
  onJumpToGate?: (gateId: string) => void;
}

export interface CtaProps {
  title?: string;
  description?: string;
  submitCopy: string;
  onSubmit: () => void;
  variant?: "primary" | "secondary" | "outline";
}

