# Cấu trúc Apps/Web - Tóm tắt File và Liên kết

## 📁 Cấu trúc Tổng quan

`apps/web` là ứng dụng Next.js marketing website cho ProsFIN, sử dụng App Router và TypeScript.

---

## 🔧 Configuration Files

### `package.json`
- **Mô tả**: Quản lý dependencies và scripts cho Next.js app
- **Liên kết**: 
  - Sử dụng Next.js 16, React 19
  - Dependencies: shadcn/ui, Framer Motion, Three.js, React Hook Form
  - Scripts: `dev` (port 3636), `build`, `start`, `lint`

### `next.config.ts`
- **Mô tả**: Cấu hình Next.js (React Compiler, image domains)
- **Liên kết**: 
  - Cho phép images từ Unsplash và Pexels
  - Bật React Compiler

### `tsconfig.json`
- **Mô tả**: TypeScript configuration, extends root tsconfig
- **Liên kết**: 
  - Path alias `@/*` → `./src/*`
  - Next.js plugin integration

### `components.json`
- **Mô tả**: shadcn/ui configuration
- **Liên kết**: 
  - Style: "new-york"
  - CSS: `src/app/globals.css`
  - Aliases cho components, utils, ui, lib, hooks

### `postcss.config.mjs`
- **Mô tả**: PostCSS config cho Tailwind CSS v4
- **Liên kết**: Sử dụng `@tailwindcss/postcss` plugin

### `eslint.config.mjs`
- **Mô tả**: ESLint configuration
- **Liên kết**: Extends Next.js ESLint config

---

## 📂 Source Files (`src/`)

### 🎨 App Router (`src/app/`)

#### Root Layout & Pages

**`layout.tsx`**
- **Mô tả**: Root layout cho toàn bộ app, định nghĩa metadata SEO và fonts
- **Liên kết**: 
  - Wrap children với `MarketingLayout`
  - Fonts: Plus Jakarta Sans, Geist Mono
  - Metadata: OpenGraph, Twitter cards, robots

**`page.tsx`**
- **Mô tả**: Landing page chính, compose các sections từ content adapter
- **Liên kết**: 
  - Sử dụng `getLandingContent()` từ `@/lib/content/landing`
  - Render: Hero, Trust Bar, Solutions, Services Preview, Process Preview, Proof, Content Preview, FAQ, Final CTA

**`not-found.tsx`**
- **Mô tả**: 404 page fallback khi route không tồn tại
- **Liên kết**: 
  - Sử dụng `ProsfinContainer`, `ProsfinPrimaryButton` từ shared components
  - Link về trang chủ

**`globals.css`**
- **Mô tả**: Global styles, Tailwind imports, ProsFIN theme variables
- **Liên kết**: 
  - Theme colors: Primary (Navy), Neutrals (Slate), Brand Accent
  - Dark mode support

**`robots.ts`**
- **Mô tả**: Generate robots.txt cho SEO
- **Liên kết**: 
  - Allow all crawlers
  - Disallow `/api/`, `/onboarding/`
  - Points to sitemap

**`sitemap.ts`**
- **Mô tả**: Generate sitemap.xml với static và dynamic routes
- **Liên kết**: 
  - Sử dụng `getAllServices()`, `getAllPosts()` từ `@/lib/content/services`
  - Includes: static pages, service detail pages, post pages (insights/knowledge/resources)

#### Marketing Routes (`(marketing)/`)

**`about/page.tsx`**
- **Mô tả**: Trang giới thiệu về ProsFIN
- **Liên kết**: 
  - Sử dụng `aboutPageContent`, `aboutSectionContent` từ `@/data/`
  - Sections: Hero, Story Timeline, Principles, Stats, Team, Compliance, CTA

**`contact/page.tsx`**
- **Mô tả**: Trang liên hệ
- **Liên kết**: Sử dụng contact components từ `@/components/landing/contact/`

**`faq/page.tsx`**
- **Mô tả**: Trang FAQ
- **Liên kết**: Sử dụng FAQ components và content từ `@/data/faq-*`

**`process/page.tsx`**
- **Mô tả**: Trang quy trình làm việc
- **Liên kết**: 
  - Components trong `process/components/`: Timeline, Step Details, Personas, Scope Note, Final CTA
  - Content từ `@/data/process-*`

**`case-studies/page.tsx`**
- **Mô tả**: Trang danh sách case studies
- **Liên kết**: Content từ `@/data/case-studies.ts`

**`case-studies/[slug]/page.tsx`**
- **Mô tả**: Trang chi tiết case study
- **Liên kết**: Content từ `@/data/case-detail.ts`

**`services/page.tsx`**
- **Mô tả**: Trang danh sách tất cả dịch vụ
- **Liên kết**: 
  - Sử dụng `getAllServices()`, `getAllPosts()`, `getAllPeople()` từ `@/lib/content/services`
  - Components: `ServiceCard`, `RelatedPosts`, `OurPeople`, `SeeMore`, `ServiceCta`, `ServicesByNeed`

**`services/[slug]/page.tsx`**
- **Mô tả**: Trang chi tiết dịch vụ (dynamic route)
- **Liên kết**: 
  - Sử dụng `getServiceBySlug()` từ `@/lib/content/services`
  - Components trong `services/[slug]/components/`: Hero, Meta, Steps, Problem-Outcome, Deliverables-Exclusions, FAQ, Related Cases, Final CTA
  - `ServiceRenderer` để render sections theo `layoutVariant`

**`services/[slug]/loading.tsx`**
- **Mô tả**: Loading state cho service detail page
- **Liên kết**: Hiển thị khi đang fetch service data

**`services/[slug]/not-found.tsx`**
- **Mô tả**: 404 cho service không tồn tại
- **Liên kết**: Fallback khi `getServiceBySlug()` return undefined

**`services/[slug]/opengraph-image.tsx`**
- **Mô tả**: Generate OpenGraph image cho service
- **Liên kết**: Dynamic OG image cho SEO

**`services/cleardata/page.tsx`**
- **Mô tả**: Landing page đặc biệt cho dịch vụ ClearData
- **Liên kết**: 
  - Components riêng trong `cleardata/components/`: Hero, Solution, Scope, Process, Pricing, Outcomes, Differentiation, Consequences, Commitments, FAQ, Final CTA
  - Form schema và validation

**`services/cleardata/thanks/page.tsx`**
- **Mô tả**: Thank you page sau khi submit ClearData form
- **Liên kết**: Redirect từ `cleardata/page.tsx` sau khi form submit thành công

#### Other Routes

**`contact-lite/page.tsx`**
- **Mô tả**: Trang contact form đơn giản
- **Liên kết**: Sử dụng contact form components

**`onboarding/detail-information/page.tsx`**
- **Mô tả**: Form thu thập thông tin chi tiết khách hàng
- **Liên kết**: 
  - Components: `DetailInformationForm`, `StepIndicator`, `VerifyEmailPanel`
  - Schema validation từ `onboarding/detail-information/schema.ts`

**`onboarding/thanks/page.tsx`**
- **Mô tả**: Thank you page sau onboarding
- **Liên kết**: Redirect từ onboarding flow

**`insights/[slug]/page.tsx`**
- **Mô tả**: Trang chi tiết insight post
- **Liên kết**: 
  - Sử dụng `getAllPosts()` từ `@/lib/content/posts`
  - Render với `PostRenderer` component

**`knowledge/[slug]/page.tsx`**
- **Mô tả**: Trang chi tiết knowledge post
- **Liên kết**: Tương tự `insights/[slug]/page.tsx`

**`resources/[slug]/page.tsx`**
- **Mô tả**: Trang chi tiết resource post
- **Liên kết**: Tương tự `insights/[slug]/page.tsx`

#### API Routes

**`api/draft/route.ts`**
- **Mô tả**: API route để enable Next.js Draft Mode cho preview content
- **Liên kết**: 
  - Phase 2: Mock validation với hardcoded secret
  - Phase 3: Sẽ implement proper auth/token validation
  - Redirect đến post page sau khi enable draft mode

---

### 🧩 Components (`src/components/`)

#### Layout Components

**`layout/marketing-layout.tsx`**
- **Mô tả**: Layout wrapper cho marketing pages
- **Liên kết**: 
  - Render: `SiteHeader`, main content, `SiteFooter`
  - Providers: `ProsfinToastProvider`, `HeroModalProvider`
  - Utilities: `ScrollTopButton`, `ProsfinCookieBanner`, `MobileStickyCtaBar`

**`layout/container.tsx`**
- **Mô tả**: Container component với max-width và padding
- **Liên kết**: Sử dụng trong các pages và sections

#### Navigation Components

**`navigation/site-header.tsx`**
- **Mô tả**: Header navigation chính
- **Liên kết**: 
  - Sử dụng `SiteLogo`, `SiteNav`, `MobileMenu`
  - Content từ `@/data/navigation-content.ts`

**`navigation/site-logo.tsx`**
- **Mô tả**: Logo component
- **Liên kết**: Link về trang chủ

**`navigation/site-nav.tsx`**
- **Mô tả**: Desktop navigation menu
- **Liên kết**: Sử dụng navigation content

**`navigation/mobile-menu.tsx`**
- **Mô tả**: Mobile navigation menu
- **Liên kết**: Sheet component từ shadcn/ui

**`navigation/mobile-sticky-cta-bar.tsx`**
- **Mô tả**: Sticky CTA bar trên mobile
- **Liên kết**: Trigger hero modal khi click

#### Footer Components

**`footer/site-footer.tsx`**
- **Mô tả**: Footer chính
- **Liên kết**: 
  - Compose: `FooterLinks`, `FooterContact`, `FooterLegal`
  - Content từ data files

**`footer/footer-links.tsx`**
- **Mô tả**: Footer navigation links
- **Liên kết**: Sitemap links

**`footer/footer-contact.tsx`**
- **Mô tả**: Footer contact information
- **Liên kết**: Contact details

**`footer/footer-legal.tsx`**
- **Mô tả**: Footer legal links (Privacy, Terms)
- **Liên kết**: Legal content từ `@/data/legal-content.ts`

#### Landing Page Components (`landing/`)

**`landing/hero/hero-section.tsx`**
- **Mô tả**: Hero section cho landing page
- **Liên kết**: 
  - Compose: `HeroTextBlock`, `HeroVisual`
  - Context: `HeroModalProvider` cho CTA modal
  - Content từ `getLandingContent().hero`

**`landing/hero/hero-text-block.tsx`**
- **Mô tả**: Text content của hero
- **Liên kết**: Title, subtitle, stats, CTA

**`landing/hero/hero-visual.tsx`**
- **Mô tả**: Visual/3D component của hero
- **Liên kết**: Three.js scene với Aurora background

**`landing/hero/hero-modal-context.tsx`**
- **Mô tả**: Context provider cho hero CTA modal
- **Liên kết**: Quản lý state mở/đóng modal

**`landing/trust-bar/trust-bar-section.tsx`**
- **Mô tả**: Trust bar với client logos
- **Liên kết**: Content từ `getLandingContent().trust`

**`landing/solutions/solutions-section.tsx`**
- **Mô tả**: Solutions/problems section
- **Liên kết**: Content từ `getLandingContent().solutions`

**`landing/services-preview/services-preview-section.tsx`**
- **Mô tả**: Services preview section
- **Liên kết**: 
  - Content từ `getLandingContent().servicesPreview`
  - Sử dụng `ServiceCard` component

**`landing/process-preview/process-preview-section.tsx`**
- **Mô tả**: Process preview section
- **Liên kết**: Content từ `getLandingContent().processPreview`

**`landing/proof/proof-section.tsx`**
- **Mô tả**: Proof/case studies section
- **Liên kết**: Content từ `getLandingContent().proof`

**`landing/content-preview/content-preview-section.tsx`**
- **Mô tả**: Content preview section (insights/knowledge)
- **Liên kết**: Content từ `getLandingContent().contentPreview`

**`landing/faq/faq-section.tsx`**
- **Mô tả**: FAQ section
- **Liên kết**: 
  - Content từ `getLandingContent().faq`
  - Sử dụng `FaqList`, `FaqHeader` components

**`landing/final-cta/final-cta-section.tsx`**
- **Mô tả**: Final CTA section
- **Liên kết**: Content từ `getLandingContent().finalCta`

**`landing/contact/contact-form.tsx`**
- **Mô tả**: Contact form component
- **Liên kết**: 
  - Sử dụng React Hook Form
  - Validation với Zod
  - Submit handler

**`landing/about/team-grid.tsx`**
- **Mô tả**: Team members grid
- **Liên kết**: 
  - Sử dụng `TeamMemberCard`
  - Content từ `@/data/about-content.ts`

#### Service Components (`services/`)

**`services/service-hero.tsx`**
- **Mô tả**: Hero section cho service detail page
- **Liên kết**: Service title, description, CTA

**`services/service-card.tsx`**
- **Mô tả**: Card component để hiển thị service trong grid
- **Liên kết**: 
  - Link đến `/services/[slug]`
  - Hiển thị: title, excerpt, tags, CTA

**`services/service-renderer.tsx`**
- **Mô tả**: Render service sections theo layout variant
- **Liên kết**: 
  - Map `service.sections` đến các layout components trong `services/layouts/`
  - Layout variants: advisor, consulting, executive-brief, framework, journey-roadmap, narrative, split-panel, timeline, toolkit-modules, transformation-story

**`services/service-sections.tsx`**
- **Mô tả**: Wrapper cho service sections
- **Liên kết**: Sử dụng `ServiceRenderer`

**`services/related-posts.tsx`**
- **Mô tả**: Related posts section
- **Liên kết**: 
  - Sử dụng `getPostsByService()` từ `@/lib/content/posts`
  - Hiển thị với `PostCard`

**`services/our-people.tsx`**
- **Mô tả**: Our People section
- **Liên kết**: 
  - Sử dụng `getPeopleByService()` từ `@/lib/content/people`
  - Hiển thị với `PersonDetailDrawer`

**`services/see-more.tsx`**
- **Mô tả**: See more services section
- **Liên kết**: 
  - Sử dụng `getRelatedServices()` từ `@/lib/content/services`
  - Hiển thị related services

**`services/services-by-need.tsx`**
- **Mô tả**: Services grouped by audience/goal/format
- **Liên kết**: 
  - Sử dụng `getServicesGroupedByAudience()`, `getServicesGroupedByGoal()`, `getServicesGroupedByFormat()`
  - Tabs để switch giữa các grouping

**`services/service-cta.tsx`**
- **Mô tả**: CTA section cho service pages
- **Liên kết**: Contact form hoặc link

**`services/layouts/*.tsx`**
- **Mô tả**: Layout components cho các service layout variants
- **Liên kết**: 
  - `executive-brief-layout.tsx`: Executive brief format
  - `framework-layout.tsx`: Framework format
  - `journey-roadmap-layout.tsx`: Journey/roadmap format
  - `narrative-layout.tsx`: Narrative/story format
  - `split-panel-layout.tsx`: Split panel format
  - `timeline-layout.tsx`: Timeline format
  - `toolkit-modules-layout.tsx`: Toolkit/modules format
  - `transformation-story-layout.tsx`: Transformation story format

#### Shared Components (`shared/`)

**`shared/index.ts`**
- **Mô tả**: Central export point cho tất cả shared components
- **Liên kết**: Export tất cả components, wrappers, patterns

**`shared/typography/*.tsx`**
- **Mô tả**: Typography components (H1, H2, H3, H4, Text, Heading, etc.)
- **Liên kết**: Sử dụng trong tất cả pages

**`shared/button/*.tsx`**
- **Mô tả**: Button variants (Primary, Secondary, Ghost, Destructive, Link, Brand)
- **Liên kết**: 
  - Wrap shadcn/ui Button component
  - Sử dụng trong CTAs, forms, navigation

**`shared/card/*.tsx`**
- **Mô tả**: Card components và wrappers
- **Liên kết**: 
  - `brand-card.tsx`: Base card component
  - Wrappers: Problem, Service, Process, Team, Contact, Feature, Scope cards

**`shared/section/*.tsx`**
- **Mô tả**: Section wrapper components
- **Liên kết**: 
  - `Section`: Base section component
  - `SectionWrapper`: Wrapper với background, padding options
  - `SectionHeading`: Heading block với eyebrow, title, subtitle

**`shared/accordion/accordion.tsx`**
- **Mô tả**: Accordion component (wrap shadcn/ui)
- **Liên kết**: Sử dụng trong FAQ sections

**`shared/badge/*.tsx`**
- **Mô tả**: Badge và Awards row components
- **Liên kết**: Hiển thị tags, awards, certifications

**`shared/banner/*.tsx`**
- **Mô tả**: Top banner và Cookie banner
- **Liên kết**: 
  - `TopBanner`: Announcement banner
  - `CookieBanner`: Cookie consent

**`shared/toast/toast-provider.tsx`**
- **Mô tả**: Toast notification provider
- **Liên kết**: Sử dụng trong `MarketingLayout`

**`shared/tooltip/*.tsx`**
- **Mô tả**: Tooltip components
- **Liên kết**: Hover tooltips cho people cards, etc.

**`shared/animation/*.tsx`**
- **Mô tả**: Animation components
- **Liên kết**: 
  - `RevealOnScroll`: Scroll animations
  - `AnimatedCounter`: Counter animations
  - `CardHoverWrapper`: Hover effects
  - `ProcessTimelineScroll`: Timeline scroll animations
  - `CaseStudyScrollStory`: Case study scroll story

**`shared/scroll/scroll-top-button.tsx`**
- **Mô tả**: Scroll to top button
- **Liên kết**: Sử dụng trong `MarketingLayout`

**`shared/wrappers/*.tsx`**
- **Mô tả**: Wrapper components cho patterns
- **Liên kết**: Reusable wrapper patterns

**`shared/patterns/*.tsx`**
- **Mô tả**: Pattern components (CTA Row, Section Header)
- **Liên kết**: Reusable UI patterns

#### UI Components (`ui/`)

**`ui/*.tsx`**
- **Mô tả**: shadcn/ui base components (Button, Card, Dialog, Form, Input, Label, Separator, Sheet, Table, Tabs, Textarea, Badge, Breadcrumb)
- **Liên kết**: 
  - **KHÔNG ĐƯỢC EDIT TRỰC TIẾP** (theo workspace rules)
  - Được wrap bởi components trong `shared/` hoặc `components/app/`

**`ui/aurora-background.tsx`**
- **Mô tả**: Aurora background effect (Three.js)
- **Liên kết**: Sử dụng trong hero section

#### Content Components

**`content/post-renderer.tsx`**
- **Mô tả**: Render markdown/content cho posts
- **Liên kết**: Sử dụng trong `insights/[slug]`, `knowledge/[slug]`, `resources/[slug]`

#### FAQ Components

**`faq/faq-category-accordion.tsx`**
- **Mô tả**: FAQ accordion grouped by category
- **Liên kết**: Sử dụng trong FAQ page

#### Site Components

**`site/breadcrumbs.tsx`**
- **Mô tả**: Breadcrumb navigation
- **Liên kết**: Sử dụng trong service detail pages

---

### 📚 Content & Data (`src/content/`, `src/data/`)

#### Content Files (`content/`)

**`content/services.ts`**
- **Mô tả**: Single source of truth cho tất cả service content
- **Liên kết**: 
  - Import bởi `@/lib/content/services.ts`
  - Type: `Service[]` từ `@/types/content`

**`content/posts.ts`**
- **Mô tả**: Posts content (insights, knowledge, resources)
- **Liên kết**: 
  - Import bởi `@/lib/content/posts.ts`
  - Type: `Post[]` từ `@/types/content`

**`content/people.ts`**
- **Mô tả**: People/team members content
- **Liên kết**: 
  - Import bởi `@/lib/content/people.ts`
  - Type: `Person[]` từ `@/types/content`

#### Data Files (`data/`)

**`data/heroContent.ts`**
- **Mô tả**: Hero section content cho landing page
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/problem-content.ts`**
- **Mô tả**: Problems/solutions section content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/services-content.ts`**
- **Mô tả**: Services preview section content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/process-content.ts`**
- **Mô tả**: Process preview section content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/faq-content.ts`**
- **Mô tả**: FAQ section content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/contact-content.ts`**
- **Mô tả**: Contact section content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/trust-bar-content.ts`**
- **Mô tả**: Trust bar logos content
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/about-content.ts`**
- **Mô tả**: About section content (team)
- **Liên kết**: Sử dụng bởi `about/page.tsx`

**`data/about-page.ts`**
- **Mô tả**: About page content (hero, story, principles, stats)
- **Liên kết**: Sử dụng bởi `about/page.tsx`

**`data/navigation-content.ts`**
- **Mô tả**: Navigation menu content
- **Liên kết**: Sử dụng bởi `navigation/site-nav.tsx`

**`data/legal-content.ts`**
- **Mô tả**: Legal pages content (Privacy, Terms)
- **Liên kết**: Sử dụng bởi footer legal links

**`data/case-studies.ts`**
- **Mô tả**: Case studies list content
- **Liên kết**: Sử dụng bởi `case-studies/page.tsx`

**`data/case-detail.ts`**
- **Mô tả**: Case study detail content
- **Liên kết**: Sử dụng bởi `case-studies/[slug]/page.tsx`

**`data/services-page.ts`**
- **Mô tả**: Services page content
- **Liên kết**: Sử dụng bởi `services/page.tsx`

**`data/services-content.ts`**
- **Mô tả**: Services section content (cho landing page)
- **Liên kết**: Sử dụng bởi `@/lib/content/landing.ts`

**`data/services-detail.ts`**
- **Mô tả**: Service detail page content (nếu cần override)
- **Liên kết**: Sử dụng bởi `services/[slug]/page.tsx`

**`data/services/cleardata.ts`**
- **Mô tả**: ClearData service specific content
- **Liên kết**: Sử dụng bởi `services/cleardata/page.tsx`

**`data/form-content.ts`**
- **Mô tả**: Form content/validation messages
- **Liên kết**: Sử dụng bởi form components

---

### 🛠️ Libraries (`src/lib/`)

**`lib/utils.ts`**
- **Mô tả**: Utility functions (cn helper cho className merging)
- **Liên kết**: Sử dụng trong tất cả components

**`lib/analytics.ts`**
- **Mô tả**: Analytics event dispatcher
- **Liên kết**: 
  - Push events vào `window.dataLayer` (Google Tag Manager)
  - Console.log trong development
  - TODO: Integrate với GA4, Mixpanel

#### Content Helpers (`lib/content/`)

**`lib/content/index.ts`**
- **Mô tả**: Central export point cho content helpers
- **Liên kết**: Export từ `services.ts`, `posts.ts`, `people.ts`

**`lib/content/services.ts`**
- **Mô tả**: Service content helper functions
- **Liên kết**: 
  - `getServiceBySlug()`: Get service by slug
  - `getRelatedServices()`: Get related services (priority: explicit slugs > category > tags > fallback)
  - `getServicesByCategory()`: Filter by category
  - `getAllServices()`: Get all services
  - `getServicesGroupedByAudience()`: Group by audience (Chủ DN, Nhân sự TCKT, DN cần tuyển)
  - `getServicesGroupedByGoal()`: Group by goal (Tối ưu lợi nhuận, Quản trị vốn, Thuế, Rủi ro, Chuẩn hóa)
  - `getServicesGroupedByFormat()`: Group by format (Cố vấn dài hạn, Tư vấn sự vụ, Huấn luyện, Kiểm tra, Kiểm toán)
  - Re-export từ `posts.ts`, `people.ts`

**`lib/content/posts.ts`**
- **Mô tả**: Post content helper functions
- **Liên kết**: 
  - `getAllPosts()`: Get all posts
  - `getPostsByService()`: Get posts related to service (priority: explicit slugs > serviceSlugs > tags > IDs)
  - `getPostsByTags()`: Filter by tags
  - `getPostsByIds()`: Filter by IDs

**`lib/content/people.ts`**
- **Mô tả**: People content helper functions
- **Liên kết**: 
  - `getAllPeople()`: Get all people
  - `getPeopleByService()`: Get people related to service
  - `getPeopleByIds()`: Filter by IDs

**`lib/content/landing.ts`**
- **Mô tả**: Landing page content adapter
- **Liên kết**: 
  - `getLandingContent()`: Aggregate content từ data files
  - Phase 3: Có thể swap sang DB/API
  - Map data files → `LandingContent` type

**`lib/content/metadata.ts`**
- **Mô tả**: Metadata helpers cho SEO
- **Liên kết**: Generate metadata cho pages

**`lib/content/parse-markers.tsx`**
- **Mô tả**: Parse content markers (nếu có)
- **Liên kết**: Content parsing utilities

**`lib/content/types.ts`**
- **Mô tả**: Content type definitions
- **Liên kết**: Re-export từ `@/types/content`

**`lib/data/posts.ts`**
- **Mô tả**: Post data helpers (nếu cần)
- **Liên kết**: Additional post data utilities

---

### 🎣 Hooks (`src/hooks/`)

**`hooks/use-mobile.ts`**
- **Mô tả**: Hook để detect mobile device
- **Liên kết**: Sử dụng trong responsive components

**`hooks/use-attribution.ts`**
- **Mô tả**: Hook để track attribution (UTM params, etc.)
- **Liên kết**: Analytics tracking

**`hooks/use-in-view-animation.ts`**
- **Mô tả**: Hook để trigger animations khi element vào viewport
- **Liên kết**: Sử dụng với `RevealOnScroll` component

**`hooks/use-lead-draft.ts`**
- **Mô tả**: Hook để manage lead draft state (localStorage)
- **Liên kết**: Sử dụng trong forms để save draft

---

### 📝 Types (`src/types/`)

**`types/content.ts`**
- **Mô tả**: TypeScript type definitions cho content
- **Liên kết**: 
  - `Service`, `Post`, `Person`, `CaseStudy`, `FaqItem`, `ProcessStep`, `CtaConfig`, `SectionContent`, `LandingContent`
  - Sử dụng trong content files, helpers, components

---

## 🔗 Mối Liên Kết Chính

### Data Flow

```
Content Files (content/*.ts)
    ↓
Content Helpers (lib/content/*.ts)
    ↓
Pages (app/**/page.tsx)
    ↓
Components (components/**/*.tsx)
    ↓
UI Components (components/ui/*.tsx) [shadcn/ui - không edit]
```

### Routing Flow

```
app/layout.tsx (Root Layout)
    ↓
MarketingLayout (components/layout/marketing-layout.tsx)
    ↓
app/page.tsx (Landing Page)
    ↓
Landing Sections (components/landing/**)
    ↓
Content Adapter (lib/content/landing.ts)
    ↓
Data Files (data/**)
```

### Service Detail Flow

```
app/services/[slug]/page.tsx
    ↓
getServiceBySlug() (lib/content/services.ts)
    ↓
ServiceRenderer (components/services/service-renderer.tsx)
    ↓
Layout Components (components/services/layouts/*.tsx)
    ↓
Service Sections (service.sections)
```

### Content Management

- **Phase 2**: Content trong `content/*.ts` và `data/*.ts` files
- **Phase 3**: Có thể swap sang CMS/API bằng cách thay đổi content helpers trong `lib/content/`

---

## 📋 Tóm Tắt

### Tổng số file chính:
- **Configuration**: 6 files
- **App Routes**: ~48 files
- **Components**: ~150+ files
- **Content/Data**: ~20 files
- **Libraries**: ~10 files
- **Hooks**: 4 files
- **Types**: 1 file

### Kiến trúc:
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Library**: shadcn/ui (wrapped trong shared components)
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion, GSAP, Three.js
- **Content**: File-based (Phase 2) → CMS/API (Phase 3)

### Patterns:
- **Wrapper Pattern**: Wrap shadcn/ui components trong `shared/` hoặc `components/app/`
- **Content Adapter**: Layer giữa data files và components
- **Layout Variants**: Service pages sử dụng layout variants để render sections khác nhau
- **Priority System**: Related content sử dụng priority system (explicit > category > tags > fallback)

