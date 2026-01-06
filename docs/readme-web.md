# Marketing Website Module - Hướng dẫn chi tiết

## 📋 Tổng quan

Marketing Website là public-facing website B2B giới thiệu dịch vụ tư vấn tài chính của ProsFIN. Được xây dựng với Next.js App Router, TypeScript, và Tailwind CSS, tập trung vào conversion optimization và user experience.

## 🎯 Tính năng chính

### 1. Landing Page (`/`)

#### 1.1. Hero Section

**Layout:**
- Full-width hero với background image/gradient
- Left: Headline + CTA buttons
- Right: Stats overlay hoặc illustration
- Sticky navigation bar

**Components:**
- **Headline**: H1 với value proposition
- **Subheadline**: Supporting text
- **Primary CTA**: "Get Started" button → mở modal form
- **Secondary CTA**: "Learn More" link → scroll to next section
- **Stats Overlay**: 3-4 key metrics (e.g., "500+ Clients", "10+ Years Experience")

**Modal Form:**
- Slide-in từ bên phải
- Form fields:
  - Name (required)
  - Email (required, email validation)
  - Company (optional)
  - Phone (optional)
  - Message (optional, textarea)
- Attribution tracking tự động (UTM params, referrer)
- Submit → redirect đến `/onboarding/detail-information`

#### 1.2. Trust Bar

**Content:**
- Logos của partners/clients
- Credentials/badges (certifications, awards)
- Animated carousel hoặc static grid
- Hover effects với tooltips

#### 1.3. Solutions Section

**Layout:**
- Grid cards (2-3 columns)
- Mỗi card:
  - Icon
  - Title
  - Description
  - "Learn More" link → `/services/[slug]`

**Solutions:**
- Financial Planning
- Tax Services
- Accounting Services
- Investment Advisory
- (Tùy chỉnh theo business)

#### 1.4. Services Preview

**Layout:**
- Horizontal scroll hoặc grid
- Preview 3-4 services
- Mỗi service card:
  - Thumbnail image
  - Title
  - Excerpt
  - "View Service" link

**CTA:**
- "View All Services" button → `/services`

#### 1.5. Process Preview

**Layout:**
- 4-step process với timeline
- Mỗi step:
  - Number badge
  - Title
  - Description
  - Icon/illustration

**CTA:**
- "See Full Process" link → `/process`

#### 1.6. Proof Section

**Content:**
- Case study highlights
- Client testimonials
- Success metrics
- Client logos

**Layout:**
- Carousel hoặc grid
- Mix of case studies và testimonials

**CTA:**
- "View Case Studies" link → `/case-studies`

#### 1.7. Content Preview

**Layout:**
- Blog posts/resources preview
- 3-4 latest posts
- Mỗi post card:
  - Thumbnail
  - Title
  - Excerpt
  - Read time
  - "Read More" link

**CTA:**
- "View All Resources" link → `/resources` (future)

#### 1.8. FAQ Section

**Content:**
- Accordion với 5-10 câu hỏi thường gặp
- Expand/collapse animation
- Search FAQ (optional)

**CTA:**
- "View All FAQs" link → `/faq`

#### 1.9. Final CTA Section

**Layout:**
- Full-width section với background
- Headline + subheadline
- Contact form inline hoặc CTA button
- Trust indicators (privacy, security badges)

**Form:**
- Simplified version của hero form
- Same attribution tracking

### 2. Services Pages

#### 2.1. Services List (`/services`)

**Layout:**
- Grid của service cards
- Mỗi card:
  - Thumbnail
  - Title
  - Excerpt
  - Key features (bullet points)
  - "Learn More" link

**Filters:**
- Category filter (optional)
- Search (optional)

#### 2.2. Service Detail (`/services/[slug]`)

**Layout:**
- Hero với service name
- Overview section
- Features/benefits list
- Process/how it works
- Pricing (nếu có)
- Case studies related
- CTA section
- Related services

**Components:**
- Rich content với markdown/lexical
- Image galleries
- Video embeds
- Downloadable resources

### 3. Process Page (`/process`)

**Layout:**
- Full process breakdown
- 4-6 steps với detailed descriptions
- Timeline visualization
- Icons/illustrations
- CTA sections giữa các steps

**Content:**
- Step-by-step explanation
- Expected timelines
- Deliverables
- Success criteria

### 4. Case Studies (`/case-studies`)

#### 4.1. Case Studies List

**Layout:**
- Grid của case study cards
- Mỗi card:
  - Thumbnail
  - Client name/logo
  - Industry
  - Results/metrics
  - "Read Case Study" link

**Filters:**
- Industry filter
- Service type filter

#### 4.2. Case Study Detail (`/case-studies/[slug]`)

**Layout:**
- Hero với client name
- Challenge section
- Solution section
- Results/metrics
- Testimonial
- Related case studies

### 5. About Page (`/about`)

**Content:**
- Company story
- Team members
- Values/mission
- Certifications/awards
- Office locations

### 6. FAQ Page (`/faq`)

**Layout:**
- Full FAQ list với accordion
- Categories (optional)
- Search functionality
- "Still have questions?" CTA → contact form

### 7. Contact Page (`/contact`)

**Layout:**
- Contact form (full version)
- Office information
- Map (optional)
- Social links
- Business hours

**Form Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Phone (optional)
- Subject (required, dropdown)
- Message (required, textarea)
- Consent checkbox (GDPR)

### 8. Onboarding Flow

#### 8.1. Detail Information (`/onboarding/detail-information`)

**Form:**
- Extended information collection
- Fields:
  - Company size
  - Industry
  - Current challenges
  - Budget range
  - Timeline
  - Additional requirements
- Progress indicator
- Auto-save draft (localStorage)
- Submit → `/onboarding/thanks`

#### 8.2. Thanks Page (`/onboarding/thanks`)

**Content:**
- Thank you message
- Next steps information
- Contact information
- Resources/links
- Social sharing (optional)

### 9. Contact Lite (`/contact-lite`)

**Simplified Contact:**
- Minimal form (name, email, message)
- Quick CTA
- No navigation (standalone page)
- Dùng cho landing pages external hoặc ads

## 🔧 Technical Details

### Content Adapter Layer

**Architecture:**
- Tất cả content được quản lý qua Content Adapter Layer
- Location: `src/lib/content/`
- Functions:
  - `getLandingContent()` - Aggregate tất cả landing page content
  - `getServiceContent(slug)` - Get service detail
  - `getCaseStudyContent(slug)` - Get case study detail

**Data Files:**
- `src/data/heroContent.ts`
- `src/data/services-content.ts`
- `src/data/services-detail.ts`
- `src/data/process-content.ts`
- `src/data/case-studies.ts`
- `src/data/faq-content.ts`
- `src/data/contact-content.ts`
- Và nhiều file khác...

**Type Safety:**
- Tất cả content types trong `src/types/content.ts`
- TypeScript ensures type safety
- Sẵn sàng swap sang API/DB trong Phase 3

### Attribution Tracking

**Hook: `useAttribution`**

**Tự động capture:**
- UTM parameters (utm_source, utm_medium, utm_campaign, utm_content)
- Referrer URL
- Landing path
- Timestamp

**Storage:**
- LocalStorage (draft)
- Submit form → gửi kèm attribution data
- Phase 3: Lưu vào Leads DB

**Use Cases:**
- Track conversion sources
- Marketing campaign effectiveness
- ROI analysis

### Form Handling

**React Hook Form + Zod:**
- Schema validation
- Error messages tự động
- Auto-save draft (localStorage)
- Submission handling

**Form Components:**
- Wrapper components trong `src/components/shared/`
- Không edit shadcn/ui components trực tiếp
- Custom styling qua wrapper

### Animation

**Framer Motion:**
- Section reveal on scroll
- Card animations
- Modal transitions
- Page transitions

**GSAP:**
- Advanced scroll animations
- Parallax effects
- Timeline animations

**Custom Hooks:**
- `useInViewAnimation` - Scroll-triggered animations
- Intersection Observer based

### Navigation

**Site Header:**
- Logo
- Main navigation menu
- CTA button
- Mobile menu toggle

**Mobile Menu:**
- Sheet/drawer từ bên trái
- Full navigation
- CTA button
- Close button

**Sticky CTA Bar (Mobile):**
- Fixed bottom bar trên mobile
- "Get Started" button
- Always visible khi scroll

**Smooth Scroll:**
- Anchor links với smooth scroll behavior
- Cross-page anchor handling

### SEO

**Metadata:**
- Dynamic metadata trong `layout.tsx`
- Per-page metadata override
- OpenGraph tags
- Twitter cards
- Robots meta

**Structured Data:**
- JSON-LD cho organization
- Schema.org markup (future)

## 📁 File Structure

```
apps/web/src/
├── app/
│   ├── (marketing)/              # Route group
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/
│   │   ├── case-studies/
│   │   │   └── [slug]/
│   │   ├── process/
│   │   ├── contact/
│   │   └── faq/
│   ├── contact-lite/
│   ├── onboarding/
│   │   ├── detail-information/
│   │   └── thanks/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css               # Global styles + theme
├── components/
│   ├── landing/                  # Landing page sections
│   │   ├── hero/
│   │   ├── trust-bar/
│   │   ├── solutions/
│   │   ├── services-preview/
│   │   ├── process-preview/
│   │   ├── proof/
│   │   ├── content-preview/
│   │   ├── faq/
│   │   └── final-cta/
│   ├── navigation/
│   │   ├── site-header.tsx
│   │   ├── site-nav.tsx
│   │   ├── mobile-menu.tsx
│   │   └── mobile-sticky-cta-bar.tsx
│   ├── footer/
│   │   ├── site-footer.tsx
│   │   ├── footer-links.tsx
│   │   ├── footer-contact.tsx
│   │   └── footer-legal.tsx
│   ├── layout/
│   │   ├── marketing-layout.tsx
│   │   └── container.tsx
│   ├── shared/                   # Shared components
│   │   ├── wrappers/            # App* wrapper components
│   │   ├── patterns/             # UI patterns
│   │   ├── button/               # Button variants
│   │   ├── card/                 # Card variants
│   │   ├── badge/                # Badge components
│   │   ├── animation/            # Animation components
│   │   ├── typography/           # Typography components
│   │   └── index.ts
│   ├── ui/                       # shadcn/ui (KHÔNG SỬA)
│   └── onboarding/
│       └── detail-information/   # Onboarding form
├── data/                         # Content data files
│   ├── heroContent.ts
│   ├── services-content.ts
│   ├── services-detail.ts
│   ├── process-content.ts
│   ├── case-studies.ts
│   ├── faq-content.ts
│   ├── contact-content.ts
│   └── ...
├── lib/
│   ├── content/                  # Content adapter layer
│   │   ├── landing.ts
│   │   └── types.ts
│   └── utils.ts
├── hooks/
│   ├── use-attribution.ts        # Attribution tracking
│   ├── use-in-view-animation.ts  # Scroll animation
│   └── use-lead-draft.ts         # Draft management
└── types/
    └── content.ts                # Content types
```

## 🚀 Usage Examples

### Tạo Landing Page mới

1. Update content trong `src/data/heroContent.ts`
2. Modify sections trong `src/app/page.tsx`
3. Customize components trong `src/components/landing/`
4. Content tự động được aggregate qua `getLandingContent()`

### Thêm Service mới

1. Thêm service data vào `src/data/services-content.ts`
2. Tạo detail content trong `src/data/services-detail.ts`
3. Service tự động xuất hiện trong:
   - Services Preview section (landing)
   - Services List page
   - Service Detail page (`/services/[slug]`)

### Customize Hero Form

1. Edit form trong `src/components/landing/hero/hero-form.tsx`
2. Add/remove fields
3. Update Zod schema trong component
4. Attribution tracking tự động (không cần config)

### Thêm Animation

1. Import `useInViewAnimation` hook
2. Wrap component:
```tsx
const ref = useInViewAnimation({
  animation: "fadeInUp",
  delay: 0.2
})
```
3. Apply ref to element

## 🎨 Theme & Styling

### Colors

**Primary (Navy):**
- `--color-primary: #172554` (blue-950)
- Dùng cho headings, CTAs, links

**Brand Accent (Gold):**
- `--color-accent: #c7a775`
- Dùng cho highlights, badges

**Neutrals:**
- Slate scale cho text và backgrounds
- `--color-background: #f8fafc` (slate-50)

### Typography

**Font chính:**
- Plus Jakarta Sans (variable font)
- CSS variable: `--font-jakarta-sans`

**Font mono:**
- Geist Mono
- CSS variable: `--font-geist-mono`

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Dark Mode

- Đã cấu hình sẵn với custom variant `dark`
- Toggle qua theme provider (nếu implement)

## 📊 Conversion Optimization

### CTA Placement

- Hero section: Primary CTA
- Mỗi section: Secondary CTAs
- Sticky CTA bar (mobile)
- Final CTA section

### Form Optimization

- Progressive disclosure (hero form → detail form)
- Auto-save draft
- Clear value proposition
- Trust indicators

### Attribution Tracking

- Tự động capture UTM params
- Track conversion sources
- Marketing ROI analysis

## 🔗 Integration Points

### Với Admin Dashboard

- **Lead Forms**: Submit → tạo Lead trong CRM
- **Attribution Data**: UTM params → Lead metadata
- **Content Sync**: Content từ Admin → Website (Phase 3)

### Với Analytics

- Google Analytics (future)
- Conversion tracking
- Event tracking

## 🐛 Known Issues & Limitations

1. **Forms**: Hiện tại ở mode demo (log/alert), chưa nối backend
2. **Content**: Dùng static data files, chưa kết nối API
3. **Media**: Images đang dùng placeholder, chưa có CDN
4. **Search**: Chưa có site search functionality

## 🗺 Roadmap

### Phase 3 (Planned)
- Connect forms to API endpoints
- Store leads in database
- Connect content adapter to API/DB
- Analytics integration
- A/B testing infrastructure

### Future Features
- Interactive Dashboard Preview
- Resources/Insights Hub
- Who-We-Help segmentation page
- Enhanced animations & scrollytelling
- Multi-language support

