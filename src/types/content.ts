/**
 * Content Types
 * 
 * Centralized type definitions for all content data.
 * Used by content adapter layer and data files.
 */

/**
 * Base content item with common fields
 */
export interface BaseContent {
  id: string;
  slug?: string;
  title: string;
  summary?: string;
  tags?: string[];
  coverImage?: string;
}

/**
 * Service content
 */
export interface Service extends BaseContent {
  shortDescription: string;
  idealClient?: string;
  pillBenefits?: string[];
  ctaLabel?: string;
  ctaType?: "link" | "scroll" | "modal";
  ctaTarget?: string;
}

/**
 * Case study content
 */
export interface CaseStudy extends BaseContent {
  industry: string;
  size: string;
  duration?: string;
  challenges: string[];
  approachSteps: Array<{
    title: string;
    description: string;
  }>;
  results: string[];
  quote?: string;
  learnings?: string[];
}

/**
 * FAQ item
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Process step
 */
export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  deliverables?: string[];
  icon?: string;
}

/**
 * CTA configuration
 */
export interface CtaConfig {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "link" | "scroll" | "modal";
  target?: string;
}

/**
 * Section content
 */
export interface SectionContent {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: CtaConfig;
}

/**
 * Landing content (aggregated)
 */
export interface LandingContent {
  hero: SectionContent & {
    bullets?: string[];
    stats?: Array<{
      value: string;
      label: string;
    }>;
    heroImage?: string;
  };
  trust?: {
    title?: string;
    logos?: Array<{
      name: string;
      logo: string;
      url?: string;
    }>;
  };
  solutions?: SectionContent & {
    items: Array<{
      id: string;
      icon?: string;
      title: string;
      description: string;
      link?: string;
    }>;
  };
  servicesPreview: SectionContent & {
    services: Service[];
  };
  processPreview: SectionContent & {
    steps: ProcessStep[];
  };
  proof?: SectionContent & {
    items: Array<{
      id: string;
      industry: string;
      result: string;
      description: string;
      link?: string;
    }>;
  };
  contentPreview?: SectionContent & {
    items: Array<{
      id: string;
      title: string;
      summary: string;
      category: string;
      link: string;
    }>;
  };
  faq: SectionContent & {
    items: FaqItem[];
  };
  finalCta: SectionContent & {
    formFields?: Array<{
      name: string;
      label: string;
      type: string;
      required?: boolean;
    }>;
  };
}

