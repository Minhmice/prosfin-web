export type ServiceSlug = string;

// Phase 3 keys
export type PersonaKey = "owner" | "cfo" | "chief-accountant" | "finance-team";

export type TriggerEventKey =
  | "expansion"
  | "bank_loan"
  | "fundraising"
  | "restructuring"
  | "succession"
  | "mna"
  | "compliance_pressure";

export type RiskKey =
  | "data_integrity"
  | "process_bottlenecks"
  | "control_weakness"
  | "no_management_reporting"
  | "org_dependency"
  | "tech_fragmentation"
  | "high_stakes_event";

export type ModuleTag =
  | "Data"
  | "Process"
  | "Controls"
  | "Reporting"
  | "Org"
  | "Tech"
  | "Transfer";

export type LayoutVariant =
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

export type SectionType =
  | "heroCockpit"
  | "icpGate"
  | "symptomsSticky"
  | "modulesBento"
  | "timeline"
  | "acceptanceTimeline"
  | "deliverablesTabs"
  | "commitments"
  | "engagementRules"
  | "faq"
  | "people"
  | "thinking"
  | "bigCta"
  | "tools"
  | "toolsDrawer";

export type ServiceTagDef = { key: string; label: string };

export type CTAButton = {
  label: string;
  action: "openCtaModal" | "scrollTo" | "openTools";
  targetId?: string;
  source?: string;
};

export interface HeroConfig {
  // Phase 3 shape
  h1?: string;
  subhead: string;
  chips: Array<string | { label: string; key: string }>;
  trustLine?: string;
  proofSlots?: Array<string | { label: string; value: string }>;
  ctas?: CTAButton[];
  // Phase 2 fallback fields
  headline?: string;
  proofSlotsLegacy?: string[];
  ctaLegacy?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export interface ScanQuestion {
  id: string;
  label: string;
  weight?: number;
  riskTags?: string[];
  recommend?: string[];
  // Phase 3 fields
  risks?: RiskKey[];
  boosts?: TriggerEventKey[];
  recommendedModuleIds?: string[];
}

export interface ScanCallouts {
  highScore?: string;
  mnaTrigger?: string;
}

export interface ScanConfig {
  title: string;
  subtitle: string;
  questions: ScanQuestion[];
  riskMap: Record<string, string[]>;
  recommendMap: Record<string, string[]>;
  thresholds: {
    medium: number;
    high: number;
    critical: number;
  };
  callouts?: ScanCallouts;
  // Phase 3 fields
  scoreThresholds?: { low: number; medium: number; high: number; critical: number };
  riskToModules?: Record<RiskKey, string[]>;
  eventToRiskBoosts?: Partial<Record<TriggerEventKey, { addScore: number; addRisks?: RiskKey[] }>>;
}

export type ModuleDetailBlock =
  | { type: "bullets"; title: string; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "preview"; title: string; placeholders: string[] };

export interface ModuleConfig {
  id: string;
  name: string;
  tag: ModuleTag;
  promise: string;
  outcomes: string[];
  deliverables: string[];
  clientInputs: string[];
  detailBlocks?: string[] | ModuleDetailBlock[];
  dependencies?: string[];
  pitfalls?: string[];
}

// Phase 3: ServiceModule alias for backward compatibility
export type ServiceModule = ModuleConfig;

export interface GateConfig {
  id: string;
  title: string;
  inputs: string[];
  actions: string[];
  deliverables: string[];
  successDefinition: string[];
  prosfinActions?: string[];
  relatedModuleIds?: string[];
}

// Phase 3: AcceptanceGate alias for backward compatibility
export type AcceptanceGate = GateConfig;

export interface DeliverablesTab {
  id: string;
  label: string;
  items: string[] | { label: string; note?: string }[];
  whoUsesIt?: PersonaKey[];
  decisionsEnabled?: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PeopleSlot {
  role: string;
  focusTags: string[];
  proof?: string;
}

export interface IcpCard {
  title: string;
  items: string[];
}

export interface SymptomPanel {
  id: string;
  symptom: string;
  impact: string;
  rootCause: string;
  modules: string[];
}

export interface CommitmentCard {
  title: string;
  bullets: string[];
}

export interface EngagementRules {
  fit: string[];
  agenda: string[];
}

export type FormFieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "multiselect"
  | "textarea"
  | "file";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface BigCtaConfig {
  step1Fields: FormField[];
  step2Fields?: FormField[];
  submitCopy: string;
  successMessage: string;
}

// Phase 6: Bundle type for module bundles
export interface Bundle {
  id: string;
  name: string;
  moduleIds: string[];
  bestFor: string[];
  outcomes: string[];
  deliverables: string[];
  timeframe?: string;
}

// Phase 3: ServiceSEO type for SEO metadata
export type ServiceSEO = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
};

export interface SectionConfig {
  id: string;
  type: SectionType;
  title?: string;
  description?: string; // Phase 3
  dataKey?: string; // Legacy field for backward compatibility
}

// Phase 3: SectionDef alias for backward compatibility
export type SectionDef = SectionConfig;

export interface ServicePageConfig {
  slug: ServiceSlug;
  title: string;
  description: string;
  category?: string;
  tags?: string[] | ServiceTagDef[];
  layoutVariant: LayoutVariant;
  // Phase 3: seo field (preferred)
  seo?: ServiceSEO;
  hero: HeroConfig;
  scan: ScanConfig;
  sections: SectionConfig[];
  modules: ModuleConfig[];
  gates: GateConfig[];
  deliverablesTabs: DeliverablesTab[];
  faq: FAQItem[];
  peopleSlots?: PeopleSlot[];
  icp?: { cards: IcpCard[] };
  symptoms?: SymptomPanel[];
  commitments?: CommitmentCard[];
  engagement?: EngagementRules;
  thinkingTags?: string[];
  bigCta?: BigCtaConfig;
  proof?: {
    caseSlots: { title: string; summary: string; metric?: string }[];
    quoteSlots: { quote: string; author: string; role?: string }[];
  };
  explorer?: {
    personas: PersonaKey[];
    outcomes: string[];
    bestFor: string[];
  };
  bundles?: Bundle[]; // Phase 6: Module bundles
  relatedPostTags?: string[];
  // Legacy: meta field (backward compatibility)
  meta?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
  };
}

