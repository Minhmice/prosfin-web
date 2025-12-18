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
 * Service section types
 */
export type ServiceSectionType =
  | "hero"
  | "highlights"
  | "narrative"
  | "list"
  | "stats"
  | "faq"
  | "steps"
  | "quote"
  | "ctaInline";

/**
 * Service section content
 */
export interface ServiceSection {
  type: ServiceSectionType;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  highlights?: Array<{ label: string; value: string }>;
  steps?: Array<{ title: string; description: string }>;
  stats?: Array<{ value: string; label: string }>;
  quote?: { text: string; author?: string };
  cta?: CtaConfig;
}

/**
 * Service layout variants
 */
export type ServiceLayoutVariant =
  | "advisor"
  | "execution-coaching"
  | "consulting"
  | "mentor"
  | "headhunt"
  | "test"
  | "audit"
  | "seminar"
  | "executive-brief"
  | "journey-roadmap"
  | "toolkit-modules"
  | "transformation-story";

/**
 * Service content
 */
export interface Service extends BaseContent {
  slug: string; // Required for routing
  shortDescription: string;
  excerpt: string; // For card display
  idealClient?: string;
  pillBenefits?: string[];
  ctaLabel?: string;
  ctaType?: "link" | "scroll" | "modal";
  ctaTarget?: string;
  layoutVariant: ServiceLayoutVariant;
  sections: ServiceSection[];
  breadcrumb?: Array<{ label: string; href?: string }>;
  relatedPostIds: string[];
  peopleIds: string[];
  category?: string; // Phân loại dịch vụ (để filter See More)
  bodySections?: ServiceSection[]; // Tách riêng sections cho body (nếu cần)
  relatedPostTags?: string[]; // Tags để filter posts (bổ sung cho relatedPostIds)
  cta?: CtaConfig; // CTA config cho service
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

/**
 * Person (Our People)
 */
export interface Person {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  tooltipBio: string; // Deprecated: dùng bioLong thay thế
  tags: string[];
  bioShort?: string; // Bio ngắn (cho card)
  bioLong?: string; // Bio dài (cho tooltip/hovercard)
  focusAreas?: string[]; // Lĩnh vực chuyên sâu
  bestFor?: string[]; // Phù hợp cho (vd: "SME", "Startup", "M&A")
}

/**
 * Post (Our Thinking)
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  href: string;
  coverImage?: string;
  serviceSlugs?: string[]; // Services liên quan
  readingTime?: number; // Thời gian đọc (phút)
  category?: string; // Category của post
}

