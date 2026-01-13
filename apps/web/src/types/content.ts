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
  | "bullet-steps"
  | "quote"
  | "ctaInline"
  | "intro"
  | "problem-solution"
  | "capabilities"
  | "requirements";

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
  // Fields for new section types
  problems?: string[]; // For "problem-solution"
  solutions?: string[]; // For "problem-solution"
  capabilities?: Array<{ title: string; description: string; icon?: string }>; // For "capabilities"
  faqs?: Array<{ question: string; answer: string }>; // For "faq"
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
  | "transformation-story"
  | "narrative"
  | "framework"
  | "split-panel"
  | "timeline"
  | "custom"
  | "ledger-cockpit-layout";

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
  configSlug?: string;
  sections: ServiceSection[];
  breadcrumb?: Array<{ label: string; href?: string }>;
  relatedPostIds: string[]; // Backward compatibility - prefer relatedPostSlugs
  peopleIds: string[]; // Backward compatibility - prefer supportPeopleIds
  category?: string; // Phân loại dịch vụ (để filter See More)
  bodySections?: ServiceSection[]; // Tách riêng sections cho body (nếu cần)
  relatedPostTags?: string[]; // Tags để filter posts (bổ sung cho relatedPostIds)
  relatedServiceSlugs?: string[]; // Explicit cross-service links (ưu tiên hơn category)
  cta?: CtaConfig; // CTA config cho service
  // New fields for Phase 5
  relatedPostSlugs?: string[]; // Post slugs (preferred over relatedPostIds)
  supportPeopleIds?: string[]; // People IDs (preferred over peopleIds, same purpose)
  seeMoreServiceSlugs?: string[]; // Explicit related services for "See More" section
  // Taxonomy fields for Service Discovery (Phase 1)
  personas?: string[]; // ["owner", "cfo", "chief-accountant"]
  outcomes?: string[]; // ["profit", "compliance", "cashflow", "tax", "risk"]
  stages?: string[]; // ["early", "growth", "scale"]
  formats?: string[]; // ["advisory", "consulting", "coaching", "audit", "assessment"]
  timeToValue?: { label: string; minWeeks?: number; maxWeeks?: number };
  priority?: number; // Tie-breaker (0-2)
  isFeatured?: boolean; // Fallback display
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
  serviceSlugs?: string[]; // Services mà person này hỗ trợ (bidirectional link)
  priority?: number; // Priority để sort (số cao hơn = ưu tiên hơn)
}

/**
 * Post (Research Hub - Phase 2)
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string; // Backward compatibility - prefer publishedAt
  tags: string[];
  href: string; // Backward compatibility - will be /research/[slug]
  coverImage?: string; // Backward compatibility - prefer cover.src
  serviceSlugs?: string[]; // Services liên quan
  readingTime?: number | { minutes: number; words?: number }; // Backward compatibility: number, new: object
  category?: string; // Category của post
  // New fields for Phase 2
  type?: "brief" | "playbook" | "tool"; // Research type (replaces insight|knowledge|resource)
  topics?: string[]; // ["cashflow", "tax", "compliance", "risk", "capital"]
  personas?: string[]; // ["owner", "cfo", "chief-accountant"]
  outcomes?: string[]; // ["profit", "cashflow", "compliance", "tax", "risk"]
  publishedAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  cover?: { src: string; alt: string }; // Cover image with alt text
  seo?: { title?: string; description?: string; canonical?: string }; // SEO metadata
  content?: {
    root: {
      children: Array<Record<string, unknown>>;
      direction: "ltr" | "rtl" | null;
      format: string;
      indent: number;
      type: "root";
      version: number;
    };
  }; // Lexical editor state
  keyTakeaways?: string[]; // Key points extracted or manual
}

