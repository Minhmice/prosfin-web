# Components Documentation

Tài liệu này liệt kê tất cả các components trong project `apps/web`, trừ các file `page.tsx`.

## Mục lục

- [Content Components](#content-components)
- [FAQ Components](#faq-components)
- [Footer Components](#footer-components)
- [Landing Page Components](#landing-page-components)
- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Onboarding Components](#onboarding-components)
- [Research Components](#research-components)
- [SEO Components](#seo-components)
- [Services Components](#services-components)
- [Services Explorer Components](#services-explorer-components)
- [Shared Components](#shared-components)
- [Site Components](#site-components)
- [Tools Components](#tools-components)
- [UI Components (shadcn base)](#ui-components-shadcn-base)
- [App Route Components](#app-route-components)

---

## Content Components

### `post-renderer.tsx`
- **File**: `components/content/post-renderer.tsx`
- **Chức năng**: Render nội dung bài viết từ markdown/content với các markers đặc biệt
- **Props**: Content data với markers

---

## FAQ Components

### `faq-category-accordion.tsx`
- **File**: `components/faq/faq-category-accordion.tsx`
- **Chức năng**: Hiển thị FAQ theo categories với accordion UI
- **Props**: FAQ categories và items

---

## Footer Components

### `site-footer.tsx`
- **File**: `components/footer/site-footer.tsx`
- **Chức năng**: Footer chính của marketing site, gồm brand, links, contact và legal
- **Props**: Optional className

### `footer-contact.tsx`
- **File**: `components/footer/footer-contact.tsx`
- **Chức năng**: Phần contact information trong footer

### `footer-legal.tsx`
- **File**: `components/footer/footer-legal.tsx`
- **Chức năng**: Phần legal links (Privacy, Terms, etc.) trong footer

### `footer-links.tsx`
- **File**: `components/footer/footer-links.tsx`
- **Chức năng**: Phần quick links navigation trong footer

---

## Landing Page Components

### Hero Section

#### `hero-section.tsx`
- **File**: `components/landing/hero/hero-section.tsx`
- **Chức năng**: Hero section chính của trang chủ với layout 2 cột (text + visual)
- **Props**: Hero content data

#### `hero-text-block.tsx`
- **File**: `components/landing/hero/hero-text-block.tsx`
- **Chức năng**: Text block bên trái của hero với headline, CTA buttons

#### `hero-visual.tsx`
- **File**: `components/landing/hero/hero-visual.tsx`
- **Chức năng**: Visual block bên phải của hero với image/stats

#### `hero-modal-context.tsx`
- **File**: `components/landing/hero/hero-modal-context.tsx`
- **Chức năng**: Context provider cho hero modal state

#### `mini-lead-form/`
- **Files**: 
  - `mini-lead-form.tsx` - Mini lead form modal (Step 1 onboarding)
  - `mini-lead-form-modal.tsx` - Modal wrapper cho mini form
- **Chức năng**: Form đơn giản để collect email/phone ban đầu

#### `lead-form-modal/`
- **Files**:
  - `lead-form-modal.tsx` - Lead form modal component
  - `schema.ts` - Zod schema cho form validation
- **Chức năng**: Full lead form modal với validation

### About Section

#### `about-section.tsx`
- **File**: `components/landing/about/about-section.tsx`
- **Chức năng**: Section giới thiệu về ProsFIN

#### `about-header.tsx`
- **File**: `components/landing/about/about-header.tsx`
- **Chức năng**: Header của about section

#### `about-highlights-row.tsx`
- **File**: `components/landing/about/about-highlights-row.tsx`
- **Chức năng**: Row hiển thị highlights/features

#### `about-values-row.tsx`
- **File**: `components/landing/about/about-values-row.tsx`
- **Chức năng**: Row hiển thị values/core principles

#### `team-grid.tsx`
- **File**: `components/landing/about/team-grid.tsx`
- **Chức năng**: Grid hiển thị team members

#### `team-member-card.tsx`
- **File**: `components/landing/about/team-member-card.tsx`
- **Chức năng**: Card component cho từng team member

### Aurora Section

#### `aurora-section.tsx`
- **File**: `components/landing/aurora-section/aurora-section.tsx`
- **Chức năng**: Section với aurora background effect

### Contact Section

#### `contact-form.tsx`
- **File**: `components/landing/contact/contact-form.tsx`
- **Chức năng**: Form component cho Contact Section với validation và Turnstile
- **Props**: onSubmit handler, submitLabel, className

#### `contact-form/`
- **Files**:
  - `schema.ts` - Zod schema cho contact form
  - `fields-basic.tsx` - Basic form fields (name, email, phone)
  - `fields-extra.tsx` - Extra form fields (company, concern)

#### `contact-panel.tsx`
- **File**: `components/landing/contact/contact-panel.tsx`
- **Chức năng**: Panel hiển thị contact information

#### `contact-info-block.tsx`
- **File**: `components/landing/contact/contact-info-block.tsx`
- **Chức năng**: Block hiển thị contact details

#### `final-cta-section.tsx`
- **File**: `components/landing/contact/final-cta-section.tsx`
- **Chức năng**: Final CTA section với form và info

#### `final-cta-header.tsx`
- **File**: `components/landing/contact/final-cta-header.tsx`
- **Chức năng**: Header cho final CTA section

#### `final-cta-bullets.tsx`
- **File**: `components/landing/contact/final-cta-bullets.tsx`
- **Chức năng**: Bullet points cho final CTA

### Content Preview Section

#### `content-preview-section.tsx`
- **File**: `components/landing/content-preview/content-preview-section.tsx`
- **Chức năng**: Section preview các bài viết/content

### FAQ Section

#### `faq-section.tsx`
- **File**: `components/landing/faq/faq-section.tsx`
- **Chức năng**: FAQ section với accordion

#### `faq-accordion.tsx`
- **File**: `components/landing/faq/faq-accordion.tsx`
- **Chức năng**: Accordion component cho FAQ items

#### `faq-category-tabs.tsx`
- **File**: `components/landing/faq/faq-category-tabs.tsx`
- **Chức năng**: Tabs để filter FAQ theo categories

### Final CTA Section

#### `final-cta-section.tsx`
- **File**: `components/landing/final-cta/final-cta-section.tsx`
- **Chức năng**: Final CTA section ở cuối landing page

### People Preview Section

#### `people-preview-section.tsx`
- **File**: `components/landing/people-preview/people-preview-section.tsx`
- **Chức năng**: Section preview team members/people

### Problems Section

#### `problems-section.tsx`
- **File**: `components/landing/problems/problems-section.tsx`
- **Chức năng**: Section hiển thị các vấn đề/problems mà ProsFIN giải quyết

#### `problem-card.tsx`
- **File**: `components/landing/problems/problem-card.tsx`
- **Chức năng**: Card component cho từng problem

#### `problems-grid.tsx`
- **File**: `components/landing/problems/problems-grid.tsx`
- **Chức năng**: Grid layout cho problems

#### `problems-header.tsx`
- **File**: `components/landing/problems/problems-header.tsx`
- **Chức năng**: Header cho problems section

### Process Section

#### `process-section.tsx`
- **File**: `components/landing/process/process-section.tsx`
- **Chức năng**: Section hiển thị quy trình làm việc

#### `process-timeline.tsx`
- **File**: `components/landing/process/process-timeline.tsx`
- **Chức năng**: Timeline component cho process steps

#### `process-step-card.tsx`
- **File**: `components/landing/process/process-step-card.tsx`
- **Chức năng**: Card cho từng process step

#### `process-header.tsx`
- **File**: `components/landing/process/process-header.tsx`
- **Chức năng**: Header cho process section

### Process Preview Section

#### `process-preview-section.tsx`
- **File**: `components/landing/process-preview/process-preview-section.tsx`
- **Chức năng**: Preview section cho process

### Proof Section

#### `proof-section.tsx`
- **File**: `components/landing/proof/proof-section.tsx`
- **Chức năng**: Section hiển thị proof/social proof (testimonials, stats, etc.)

### Services Section

#### `services-section.tsx`
- **File**: `components/landing/services/services-section.tsx`
- **Chức năng**: Section hiển thị services overview

#### `services-grid.tsx`
- **File**: `components/landing/services/services-grid.tsx`
- **Chức năng**: Grid layout cho services

#### `services-header.tsx`
- **File**: `components/landing/services/services-header.tsx`
- **Chức năng**: Header cho services section

#### `services-card.tsx`
- **File**: `components/landing/services/services-card.tsx`
- **Chức năng**: Card component cho service

### Services Preview Section

#### `services-preview-section.tsx`
- **File**: `components/landing/services-preview/services-preview-section.tsx`
- **Chức năng**: Preview section cho services

### Solutions Section

#### `solutions-section.tsx`
- **File**: `components/landing/solutions/solutions-section.tsx`
- **Chức năng**: Section hiển thị solutions/giải pháp

### Trust Bar Section

#### `trust-bar-section.tsx`
- **File**: `components/landing/trust-bar/trust-bar-section.tsx`
- **Chức năng**: Trust bar với logos, awards, hoặc stats

---

## Layout Components

### `marketing-layout.tsx`
- **File**: `components/layout/marketing-layout.tsx`
- **Chức năng**: Layout wrapper cho marketing pages với header và footer

### `container.tsx`
- **File**: `components/layout/container.tsx`
- **Chức năng**: Container component với max-width và responsive padding

---

## Navigation Components

### `site-header.tsx`
- **File**: `components/navigation/site-header.tsx`
- **Chức năng**: Header component cho marketing site với logo, nav links, và CTA button
- **Props**: Optional className

### `site-nav.tsx`
- **File**: `components/navigation/site-nav.tsx`
- **Chức năng**: Navigation links component

### `site-logo.tsx`
- **File**: `components/navigation/site-logo.tsx`
- **Chức năng**: Logo component với variants (header, footer)

### `mobile-menu.tsx`
- **File**: `components/navigation/mobile-menu.tsx`
- **Chức năng**: Mobile menu drawer/sheet

### `mobile-sticky-cta-bar.tsx`
- **File**: `components/navigation/mobile-sticky-cta-bar.tsx`
- **Chức năng**: Sticky CTA bar cho mobile

---

## Onboarding Components

### `detail-information-form.tsx`
- **File**: `components/onboarding/detail-information-form.tsx`
- **Chức năng**: Form để collect thông tin chi tiết (Step 2 onboarding)

### `detail-information/`
- **Files**:
  - `schema.ts` - Zod schema cho detail form
  - `company-info-section.tsx` - Section cho company information
  - `goals-section.tsx` - Section cho goals/pain points

### `step-indicator.tsx`
- **File**: `components/onboarding/step-indicator.tsx`
- **Chức năng**: Indicator hiển thị onboarding steps progress

### `verify-email-panel.tsx`
- **File**: `components/onboarding/verify-email-panel.tsx`
- **Chức năng**: Panel để verify email

---

## Research Components

### `research-hero.tsx`
- **File**: `components/research/research-hero.tsx`
- **Chức năng**: Hero section cho research page

### `research-card.tsx`
- **File**: `components/research/research-card.tsx`
- **Chức năng**: Card component cho research post với type badge, topics, personas
- **Props**: Post data

### `research-results.tsx`
- **File**: `components/research/research-results.tsx`
- **Chức năng**: Results grid cho research posts

### `research-filter-bar.tsx`
- **File**: `components/research/research-filter-bar.tsx`
- **Chức năng**: Filter bar với facets (type, topic, persona, stage)

### `research-toc.tsx`
- **File**: `components/research/research-toc.tsx`
- **Chức năng**: Table of contents cho research post detail

### `post-detail.tsx`
- **File**: `components/research/post-detail.tsx`
- **Chức năng**: Detail view cho research post

### `post-detail-wrapper.tsx`
- **File**: `components/research/post-detail-wrapper.tsx`
- **Chức năng**: Wrapper cho post detail với layout

### `post-header.tsx`
- **File**: `components/research/post-header.tsx`
- **Chức năng**: Header cho post detail với metadata

### `related-posts.tsx`
- **File**: `components/research/related-posts.tsx`
- **Chức năng**: Related posts section

### `related-services.tsx`
- **File**: `components/research/related-services.tsx`
- **Chức năng**: Related services section

### `collections-section.tsx`
- **File**: `components/research/collections-section.tsx`
- **Chức năng**: Collections/reading lists section

### `reading-list-button.tsx`
- **File**: `components/research/reading-list-button.tsx`
- **Chức năng**: Button để add/remove từ reading list

### `reading-progress.tsx`
- **File**: `components/research/reading-progress.tsx`
- **Chức năng**: Reading progress indicator

---

## SEO Components

### `jsonld.tsx`
- **File**: `components/seo/jsonld.tsx`
- **Chức năng**: Helper functions để generate JSON-LD structured data

### `global-jsonld.tsx`
- **File**: `components/seo/global-jsonld.tsx`
- **Chức năng**: Global JSON-LD schema cho site

---

## Services Components

### Core Service Components

#### `service-renderer.tsx`
- **File**: `components/services/service-renderer.tsx`
- **Chức năng**: Main renderer cho service detail page, render theo layoutVariant
- **Props**: Service data, breadcrumbItems

#### `service-hero.tsx`
- **File**: `components/services/service-hero.tsx`
- **Chức năng**: Hero section cho service detail với title, subtitle, tags, CTA
- **Props**: Service, layoutVariant, breadcrumbItems

#### `service-sections.tsx`
- **File**: `components/services/service-sections.tsx`
- **Chức năng**: Render các sections của service (highlights, list, steps, narrative, etc.)

#### `service-card.tsx`
- **File**: `components/services/service-card.tsx`
- **Chức năng**: Card component cho service trong grid
- **Props**: Service data

#### `service-cta.tsx`
- **File**: `components/services/service-cta.tsx`
- **Chức năng**: CTA component cho service

#### `big-lead-cta.tsx`
- **File**: `components/services/big-lead-cta.tsx`
- **Chức năng**: Big CTA section ở cuối service page

### Service Layout Variants

#### `layouts/advisor-layout.tsx` (default)
- **File**: `components/services/layouts/` (generic layout)
- **Chức năng**: Default layout với hero và sections dọc

#### `layouts/executive-brief-layout.tsx`
- **File**: `components/services/layouts/executive-brief-layout.tsx`
- **Chức năng**: Layout với hero + outcomes cards + content sections

#### `layouts/journey-roadmap-layout.tsx`
- **File**: `components/services/layouts/journey-roadmap-layout.tsx`
- **Chức năng**: Layout với journey/roadmap visualization

#### `layouts/toolkit-modules-layout.tsx`
- **File**: `components/services/layouts/toolkit-modules-layout.tsx`
- **Chức năng**: Layout với toolkit/modules grid

#### `layouts/transformation-story-layout.tsx`
- **File**: `components/services/layouts/transformation-story-layout.tsx`
- **Chức năng**: Layout với transformation story flow

#### `layouts/narrative-layout.tsx`
- **File**: `components/services/layouts/narrative-layout.tsx`
- **Chức năng**: Story/longform layout với narrative flow, quotes, stats

#### `layouts/framework-layout.tsx`
- **File**: `components/services/layouts/framework-layout.tsx`
- **Chức năng**: Framework + steps layout với framework overview và visual indicators

#### `layouts/split-panel-layout.tsx`
- **File**: `components/services/layouts/split-panel-layout.tsx`
- **Chức năng**: Problems vs Solutions split view (2 cột)

#### `layouts/timeline-layout.tsx`
- **File**: `components/services/layouts/timeline-layout.tsx`
- **Chức năng**: Timeline-based layout

### Service Discovery

#### `discovery/service-finder-dialog.tsx`
- **File**: `components/services/discovery/service-finder-dialog.tsx`
- **Chức năng**: Dialog với multi-step service finder

#### `discovery/service-finder-steps/`
- **Files**:
  - `step-persona.tsx` - Step 1: Chọn persona
  - `step-stage.tsx` - Step 2: Chọn stage
  - `step-format.tsx` - Step 3: Chọn format
  - `step-outcome.tsx` - Step 4: Chọn outcome
- **Chức năng**: Các steps của service finder

#### `discovery/service-card-v2.tsx`
- **File**: `components/services/discovery/service-card-v2.tsx`
- **Chức năng**: Card component v2 cho discovery

#### `discovery/services-results.tsx`
- **File**: `components/services/discovery/services-results.tsx`
- **Chức năng**: Results grid cho discovery

#### `discovery/services-filter-bar.tsx`
- **File**: `components/services/discovery/services-filter-bar.tsx`
- **Chức năng**: Filter bar cho discovery

#### `discovery/services-empty-state.tsx`
- **File**: `components/services/discovery/services-empty-state.tsx`
- **Chức năng**: Empty state khi không có results

### Service Related Components

#### `related-posts.tsx`
- **File**: `components/services/related-posts.tsx`
- **Chức năng**: Related posts section cho service

#### `our-people.tsx`
- **File**: `components/services/our-people.tsx`
- **Chức năng**: Our people section cho service

#### `post-card.tsx`
- **File**: `components/services/post-card.tsx`
- **Chức năng**: Card component cho post

#### `person-detail-drawer.tsx`
- **File**: `components/services/person-detail-drawer.tsx`
- **Chức năng**: Drawer hiển thị person detail

#### `service-tools.tsx`
- **File**: `components/services/service-tools.tsx`
- **Chức năng**: Tools section cho service

#### `see-more.tsx`
- **File**: `components/services/see-more.tsx`
- **Chức năng**: See more services section

#### `featured-card.tsx`
- **File**: `components/services/featured-card.tsx`
- **Chức năng**: Featured service card

#### `services-by-need.tsx`
- **File**: `components/services/services-by-need.tsx`
- **Chức năng**: Services grouped by need/preset

#### `services-hero.tsx`
- **File**: `components/services/services-hero.tsx`
- **Chức năng**: Hero section cho services page

#### `services-page-client.tsx`
- **File**: `components/services/services-page-client.tsx`
- **Chức năng**: Client component cho services page

#### `services-results-wrapper.tsx`
- **File**: `components/services/services-results-wrapper.tsx`
- **Chức năng**: Wrapper cho services results

---

## Services Explorer Components

### `services-explorer.tsx`
- **File**: `components/services-explorer/services-explorer.tsx`
- **Chức năng**: Main controller component quản lý filter state, URL sync, và render tất cả explorer sub-components
- **Props**: initialServices, initialFilters

### `services-filter-panel.tsx`
- **File**: `components/services-explorer/services-filter-panel.tsx`
- **Chức năng**: Filter panel với facets (persona, stage, format, outcome)

### `services-results-grid.tsx`
- **File**: `components/services-explorer/services-results-grid.tsx`
- **Chức năng**: Grid hiển thị filtered services

### `services-results-header.tsx`
- **File**: `components/services-explorer/services-results-header.tsx`
- **Chức năng**: Header với search, sort, active filters, compare button

### `services-active-filters.tsx`
- **File**: `components/services-explorer/services-active-filters.tsx`
- **Chức năng**: Active filters chips với remove buttons

### `services-presets.tsx`
- **File**: `components/services-explorer/services-presets.tsx`
- **Chức năng**: Presets section (Chủ DN, CFO, etc.)

### `services-recommended.tsx`
- **File**: `components/services-explorer/services-recommended.tsx`
- **Chức năng**: Recommended services section

### `services-compare-tray.tsx`
- **File**: `components/services-explorer/services-compare-tray.tsx`
- **Chức năng**: Sticky tray hiển thị selected services để compare

### `services-compare-drawer.tsx`
- **File**: `components/services-explorer/services-compare-drawer.tsx`
- **Chức năng**: Drawer với comparison table

### `service-card-explorer.tsx`
- **File**: `components/services-explorer/service-card-explorer.tsx`
- **Chức năng**: Card component cho explorer với compare checkbox

---

## Shared Components

### Wrappers

#### `wrappers/app-button.tsx`
- **File**: `components/shared/wrappers/app-button.tsx`
- **Chức năng**: Wrapper cho Button với href support

#### `wrappers/app-card.tsx`
- **File**: `components/shared/wrappers/app-card.tsx`
- **Chức năng**: Wrapper cho Card component

#### `wrappers/app-section.tsx`
- **File**: `components/shared/wrappers/app-section.tsx`
- **Chức năng**: Wrapper cho Section component

#### `wrappers/app-container.tsx`
- **File**: `components/shared/wrappers/app-container.tsx`
- **Chức năng**: Wrapper cho Container component

#### `wrappers/app-badge.tsx`
- **File**: `components/shared/wrappers/app-badge.tsx`
- **Chức năng**: Wrapper cho Badge component

#### `wrappers/app-link.tsx`
- **File**: `components/shared/wrappers/app-link.tsx`
- **Chức năng**: Wrapper cho Link component

#### `wrappers/app-icon-button.tsx`
- **File**: `components/shared/wrappers/app-icon-button.tsx`
- **Chức năng**: Wrapper cho IconButton component

### Buttons

#### `button/brand-button.tsx`
- **File**: `components/shared/button/brand-button.tsx`
- **Chức năng**: Base branded button với variants

#### `button/primary-button.tsx`
- **File**: `components/shared/button/primary-button.tsx`
- **Chức năng**: Primary button wrapper cho CTA chính, hỗ trợ loading và icon

#### `button/secondary-button.tsx`
- **File**: `components/shared/button/secondary-button.tsx`
- **Chức năng**: Secondary button wrapper

#### `button/ghost-button.tsx`
- **File**: `components/shared/button/ghost-button.tsx`
- **Chức năng**: Ghost button wrapper

#### `button/destructive-button.tsx`
- **File**: `components/shared/button/destructive-button.tsx`
- **Chức năng**: Destructive button wrapper

#### `button/link-button.tsx`
- **File**: `components/shared/button/link-button.tsx`
- **Chức năng**: Link-styled button wrapper

### Cards

#### `card/brand-card.tsx`
- **File**: `components/shared/card/brand-card.tsx`
- **Chức năng**: Base branded card component

#### `card/service-card-wrapper.tsx`
- **File**: `components/shared/card/service-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Service Cards với title, description, benefits, CTA

#### `card/problem-card-wrapper.tsx`
- **File**: `components/shared/card/problem-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Problem Cards

#### `card/process-card-wrapper.tsx`
- **File**: `components/shared/card/process-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Process Cards

#### `card/team-card-wrapper.tsx`
- **File**: `components/shared/card/team-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Team Cards

#### `card/contact-card-wrapper.tsx`
- **File**: `components/shared/card/contact-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Contact Cards

#### `card/feature-card-wrapper.tsx`
- **File**: `components/shared/card/feature-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Feature Cards

#### `card/scope-card-wrapper.tsx`
- **File**: `components/shared/card/scope-card-wrapper.tsx`
- **Chức năng**: Wrapper cho Scope Cards

### Section Components

#### `section/section.tsx`
- **File**: `components/shared/section/section.tsx`
- **Chức năng**: Base Section component

#### `section/section-wrapper.tsx`
- **File**: `components/shared/section/section-wrapper.tsx`
- **Chức năng**: Wrapper component cho tất cả sections với padding và background variants

#### `section/section-heading-block.tsx`
- **File**: `components/shared/section/section-heading-block.tsx`
- **Chức năng**: Heading block với title, subtitle, alignment options

#### `section-heading.tsx`
- **File**: `components/shared/section-heading.tsx`
- **Chức năng**: Simple section heading component

### Typography

#### `typography/text.tsx`
- **File**: `components/shared/typography/text.tsx`
- **Chức năng**: Text component với variants

#### `typography/headings.tsx`
- **File**: `components/shared/typography/headings.tsx`
- **Chức năng**: Heading components (H1, H2, H3, H4, PageTitle, FormTitle)

#### `typography/rich-text.tsx`
- **File**: `components/shared/typography/rich-text.tsx`
- **Chức năng**: Rich text renderer

### Layout Primitives

#### `page-container.tsx`
- **File**: `components/shared/page-container.tsx`
- **Chức năng**: Page container với max-width và responsive padding

### Image Placeholders

#### `image-placeholder.tsx`
- **File**: `components/shared/image-placeholder.tsx`
- **Chức năng**: Image placeholder components (LogoPlaceholder, HeroImagePlaceholder, AvatarPlaceholder)

### Badges

#### `badge/badge.tsx`
- **File**: `components/shared/badge/badge.tsx`
- **Chức năng**: Badge component wrapper

#### `badge/awards-row.tsx`
- **File**: `components/shared/badge/awards-row.tsx`
- **Chức năng**: Awards row component

### Accordion

#### `accordion/accordion.tsx`
- **File**: `components/shared/accordion/accordion.tsx`
- **Chức năng**: Accordion component wrapper

### Tooltip

#### `tooltip/tooltip.tsx`
- **File**: `components/shared/tooltip/tooltip.tsx`
- **Chức năng**: Tooltip component wrapper

#### `tooltip/animated-tooltip.tsx`
- **File**: `components/shared/tooltip/animated-tooltip.tsx`
- **Chức năng**: Animated tooltip component

### Toast

#### `toast/toast-provider.tsx`
- **File**: `components/shared/toast/toast-provider.tsx`
- **Chức năng**: Toast provider và hook

#### `toast/use-prosfin-toast.ts`
- **File**: `components/shared/toast/use-prosfin-toast.ts`
- **Chức năng**: Hook để sử dụng toast

### Banner

#### `banner/top-banner.tsx`
- **File**: `components/shared/banner/top-banner.tsx`
- **Chức năng**: Top banner component

#### `banner/cookie-banner.tsx`
- **File**: `components/shared/banner/cookie-banner.tsx`
- **Chức năng**: Cookie consent banner

### Scroll

#### `scroll/scroll-top-button.tsx`
- **File**: `components/shared/scroll/scroll-top-button.tsx`
- **Chức năng**: Scroll to top button

### Animation

#### `animation/reveal-on-scroll.tsx`
- **File**: `components/shared/animation/reveal-on-scroll.tsx`
- **Chức năng**: Reveal animation on scroll component

### Forms

#### `forms/form-submit-status.tsx`
- **File**: `components/shared/forms/form-submit-status.tsx`
- **Chức năng**: Form submit status indicator với error handling

#### `forms/turnstile-field.tsx`
- **File**: `components/shared/forms/turnstile-field.tsx`
- **Chức năng**: Cloudflare Turnstile field component

### Inputs

#### `inputs/money-input.tsx`
- **File**: `components/shared/inputs/money-input.tsx`
- **Chức năng**: Money input component với formatting

#### `inputs/search-input.tsx`
- **File**: `components/shared/inputs/search-input.tsx`
- **Chức năng**: Search input component

### Chips

#### `chips/filter-chip.tsx`
- **File**: `components/shared/chips/filter-chip.tsx`
- **Chức năng**: Filter chip component

#### `chips/chips-row.tsx`
- **File**: `components/shared/chips/chips-row.tsx`
- **Chức năng**: Chips row component

### Export

#### `export/export-menu.tsx`
- **File**: `components/shared/export/export-menu.tsx`
- **Chức năng**: Export menu component

### Scheduling

#### `scheduling/calendly-embed.tsx`
- **File**: `components/shared/scheduling/calendly-embed.tsx`
- **Chức năng**: Calendly embed component

### Trust

#### `trust/engagement-expectations.tsx`
- **File**: `components/shared/trust/engagement-expectations.tsx`
- **Chức năng**: Engagement expectations component

#### `trust/professional-standards.tsx`
- **File**: `components/shared/trust/professional-standards.tsx`
- **Chức năng**: Professional standards component

#### `trust/privacy-panel.tsx`
- **File**: `components/shared/trust/privacy-panel.tsx`
- **Chức năng**: Privacy panel component

### CTA

#### `cta/cta-controller.tsx`
- **File**: `components/shared/cta/cta-controller.tsx`
- **Chức năng**: CTA controller component

### Drawers

#### `drawers/app-drawer.tsx`
- **File**: `components/shared/drawers/app-drawer.tsx`
- **Chức năng**: Drawer component wrapper

### Focus

#### `focus/focus-ring.tsx`
- **File**: `components/shared/focus/focus-ring.tsx`
- **Chức năng**: Focus ring component

### A11y

#### `a11y/skip-link.tsx`
- **File**: `components/shared/a11y/skip-link.tsx`
- **Chức năng**: Skip to main content link

### Stat

#### `stat/metric-pill.tsx`
- **File**: `components/shared/stat/metric-pill.tsx`
- **Chức năng**: Metric pill component

### Patterns

#### `patterns/section-header.tsx`
- **File**: `components/shared/patterns/section-header.tsx`
- **Chức năng**: Reusable section header pattern

#### `patterns/cta-row.tsx`
- **File**: `components/shared/patterns/cta-row.tsx`
- **Chức năng**: CTA row pattern component

### Shadcn Wrappers

Các components trong `components/shared/` wrap shadcn/ui primitives:
- `button/button.tsx` - Wrapper cho shadcn Button
- `card/card.tsx` - Wrapper cho shadcn Card
- `dialog/dialog.tsx` - Wrapper cho shadcn Dialog
- `form/form.tsx` - Wrapper cho shadcn Form
- `input/input.tsx` - Wrapper cho shadcn Input
- `select/select.tsx` - Wrapper cho shadcn Select
- `textarea/textarea.tsx` - Wrapper cho shadcn Textarea
- `checkbox/checkbox.tsx` - Wrapper cho shadcn Checkbox
- `label/label.tsx` - Wrapper cho shadcn Label
- `separator/separator.tsx` - Wrapper cho shadcn Separator
- `sheet/sheet.tsx` - Wrapper cho shadcn Sheet
- `skeleton/skeleton.tsx` - Wrapper cho shadcn Skeleton
- `table/table.tsx` - Wrapper cho shadcn Table
- `tabs/tabs.tsx` - Wrapper cho shadcn Tabs
- `dropdown-menu/dropdown-menu.tsx` - Wrapper cho shadcn DropdownMenu
- `breadcrumb/breadcrumb.tsx` - Wrapper cho shadcn Breadcrumb
- `hover-card/hover-card.tsx` - Wrapper cho shadcn HoverCard
- `alert/alert.tsx` - Wrapper cho shadcn Alert

---

## Site Components

### `breadcrumbs.tsx`
- **File**: `components/site/breadcrumbs.tsx`
- **Chức năng**: Breadcrumb component với SiteBreadcrumbs

---

## Tools Components

### `tools-hub-hero.tsx`
- **File**: `components/tools/tools-hub-hero.tsx`
- **Chức năng**: Hero section cho tools hub page

### `tools-hub-search.tsx`
- **File**: `components/tools/tools-hub-search.tsx`
- **Chức năng**: Search component cho tools hub

### `tool-card.tsx`
- **File**: `components/tools/tool-card.tsx`
- **Chức năng**: Card component cho tool trong hub
- **Props**: Tool definition

### `tool-detail-shell.tsx`
- **File**: `components/tools/tool-detail-shell.tsx`
- **Chức năng**: Shell/layout cho tool detail page

### `tool-input-panel.tsx`
- **File**: `components/tools/tool-input-panel.tsx`
- **Chức năng**: Input panel cho tool với form fields

### `tool-results-panel.tsx`
- **File**: `components/tools/tool-results-panel.tsx`
- **Chức năng**: Results panel hiển thị kết quả tính toán

### `tool-scenarios.tsx`
- **File**: `components/tools/tool-scenarios.tsx`
- **Chức năng**: Scenarios/examples section cho tool

### `tool-export-actions.tsx`
- **File**: `components/tools/tool-export-actions.tsx`
- **Chức năng**: Export actions (PDF, CSV, etc.)

### `tool-lead-magnet-cta.tsx`
- **File**: `components/tools/tool-lead-magnet-cta.tsx`
- **Chức năng**: Lead magnet CTA trong tool

### `tool-recommended-research.tsx`
- **File**: `components/tools/tool-recommended-research.tsx`
- **Chức năng**: Recommended research section

### `tool-recommended-services.tsx`
- **File**: `components/tools/tool-recommended-services.tsx`
- **Chức năng**: Recommended services section

---

## UI Components (shadcn base)

Các components trong `components/ui/` là shadcn/ui base components, không được chỉnh sửa trực tiếp:

- `alert.tsx` - Alert component
- `aurora-background.tsx` - Aurora background effect
- `badge.tsx` - Badge component
- `breadcrumb.tsx` - Breadcrumb component
- `button.tsx` - Button component
- `card.tsx` - Card component
- `checkbox.tsx` - Checkbox component
- `dialog.tsx` - Dialog component
- `dropdown-menu.tsx` - Dropdown menu component
- `form.tsx` - Form component
- `input.tsx` - Input component
- `label.tsx` - Label component
- `select.tsx` - Select component
- `separator.tsx` - Separator component
- `sheet.tsx` - Sheet component
- `skeleton.tsx` - Skeleton component
- `table.tsx` - Table component
- `tabs.tsx` - Tabs component
- `textarea.tsx` - Textarea component

---

## App Route Components

Các components trong `app/(marketing)/**/components/` là page-specific components:

### Services - ClearData

#### `app/(marketing)/services/cleardata/components/`
- `hero.tsx` - Hero section cho ClearData service
- `solution.tsx` - Solution section
- `process.tsx` - Process section
- `scope.tsx` - Scope section
- `outcomes.tsx` - Outcomes section
- `pricing.tsx` - Pricing section
- `commitments.tsx` - Commitments section
- `consequences.tsx` - Consequences section
- `differentiation.tsx` - Differentiation section
- `faq.tsx` - FAQ section
- `final-cta.tsx` - Final CTA section
- `cleardata-page-content.tsx` - Page content wrapper
- `cleardata-form.tsx` - ClearData form component
- `cleardata-form-schema.ts` - Form schema
- `stock-images.ts` - Stock images constants

### Services - Detail

#### `app/(marketing)/services/[slug]/components/`
- `service-hero.tsx` - Hero section cho service detail
- `service-meta.tsx` - Service metadata component
- `steps-section.tsx` - Steps section
- `problem-outcome.tsx` - Problem/outcome section
- `deliverables-exclusions.tsx` - Deliverables và exclusions
- `service-faq.tsx` - Service FAQ section
- `related-cases.tsx` - Related case studies
- `final-cta.tsx` - Final CTA section

### How We Work

#### `app/(marketing)/how-we-work/components/`
- `personas-section.tsx` - Personas section với journey examples
- `timeline-section.tsx` - Timeline section
- `step-details-section.tsx` - Step details section
- `scope-note.tsx` - Scope note component
- `what-you-need-section.tsx` - What you need section
- `governance-section.tsx` - Governance section
- `final-cta.tsx` - Final CTA section

### Process

#### `app/(marketing)/process/components/`
- `personas-section.tsx` - Personas section
- `timeline-section.tsx` - Timeline section
- `step-details-section.tsx` - Step details section
- `scope-note.tsx` - Scope note component
- `final-cta.tsx` - Final CTA section

---

## Notes

- Tất cả components trong `components/ui/` là shadcn/ui base components, không được chỉnh sửa trực tiếp
- Components trong `components/shared/` là wrappers và patterns, wrap shadcn components
- Components trong `components/services/layouts/` là layout variants cho service pages
- Page-specific components trong `app/**/components/` chỉ dùng cho page đó
- Tất cả components đều follow rule: không edit shadcn components trực tiếp, chỉ wrap/compose

