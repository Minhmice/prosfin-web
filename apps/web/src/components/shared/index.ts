// Shared layout components
export { Section } from "./section";
export { PageContainer } from "./page-container";
export { SectionHeading } from "./section-heading";

// Typography primitives (shadcn-like)
export { Text, InlineCode, Heading, H1, H2, H3, H4, PageTitle, FormTitle, RichText } from "./typography";

// Branded wrapper components
export { ProsfinButton, type ProsfinButtonProps } from "./button/brand-button";
export {
  ProsfinPrimaryButton,
  type ProsfinPrimaryButtonProps,
} from "./button/primary-button";
export {
  ProsfinSecondaryButton,
  type ProsfinSecondaryButtonProps,
} from "./button/secondary-button";
export {
  ProsfinGhostButton,
  type ProsfinGhostButtonProps,
} from "./button/ghost-button";
export {
  ProsfinDestructiveButton,
  type ProsfinDestructiveButtonProps,
} from "./button/destructive-button";
export {
  ProsfinLinkButton,
  type ProsfinLinkButtonProps,
} from "./button/link-button";
export {
  ProsfinCard,
  ProsfinCardHeader,
  ProsfinCardFooter,
  ProsfinCardTitle,
  ProsfinCardAction,
  ProsfinCardDescription,
  ProsfinCardContent,
  type ProsfinCardProps,
} from "./card/brand-card";

// Image placeholder components
export {
  ImagePlaceholder,
  LogoPlaceholder,
  HeroImagePlaceholder,
  AvatarPlaceholder,
  type ImagePlaceholderProps,
} from "./image-placeholder";

// Section wrappers
export {
  ProsfinSectionWrapper,
  type ProsfinSectionWrapperProps,
} from "./section/section-wrapper";
export {
  ProsfinSectionHeading,
  type ProsfinSectionHeadingProps,
} from "./section/section-heading-block";

// Card wrappers
export {
  ProsfinProblemCardWrapper,
  type ProsfinProblemCardWrapperProps,
} from "./card/problem-card-wrapper";
export {
  ProsfinServiceCardWrapper,
  type ProsfinServiceCardWrapperProps,
} from "./card/service-card-wrapper";
export {
  ProsfinProcessCardWrapper,
  type ProsfinProcessCardWrapperProps,
} from "./card/process-card-wrapper";
export {
  ProsfinTeamCardWrapper,
  type ProsfinTeamCardWrapperProps,
} from "./card/team-card-wrapper";
export {
  ProsfinContactCardWrapper,
  type ProsfinContactCardWrapperProps,
} from "./card/contact-card-wrapper";
export {
  ProsfinFeatureCardWrapper,
  type ProsfinFeatureCardWrapperProps,
} from "./card/feature-card-wrapper";
export {
  ProsfinScopeCardWrapper,
  type ProsfinScopeCardWrapperProps,
} from "./card/scope-card-wrapper";

// Stat/Metric components
export {
  ProsfinMetricPill,
  type ProsfinMetricPillProps,
} from "./stat/metric-pill";

// Accordion components
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion/accordion";

// Badge components
export {
  ProsfinBadge,
  type ProsfinBadgeProps,
} from "./badge/badge";
export {
  ProsfinAwardsRow,
  type ProsfinAwardsRowProps,
  type AwardItem,
} from "./badge/awards-row";

// Tooltip components
export {
  ProsfinTooltip,
  type ProsfinTooltipProps,
} from "./tooltip/tooltip";

// Toast components
export {
  ProsfinToastProvider,
  useProsfinToast,
  type ToastOptions,
} from "./toast/toast-provider";

// Banner components
export {
  ProsfinTopBanner,
  type ProsfinTopBannerProps,
} from "./banner/top-banner";
export {
  ProsfinCookieBanner,
  type ProsfinCookieBannerProps,
} from "./banner/cookie-banner";

// Scroll components
export {
  ScrollTopButton,
  type ScrollTopButtonProps,
} from "./scroll/scroll-top-button";

// Wrapper components (Phase 1)
export * from "./wrappers";

// Pattern components (Phase 1)
export * from "./patterns";

