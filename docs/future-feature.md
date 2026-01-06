# Future Features & Implementation Checklist

Tài liệu này track các features và tasks cần implement dựa trên catalog status và roadmap.

**Last Updated:** Phase 4 (Insights Hub Implementation)

---

## Services Implementation Status

Dựa trên `services.catalog.ts`, các services được đánh dấu theo status:

### Status Legend
- **existing**: Page đã có, chỉ cần map sang layout mới
- **new**: Chưa có page, cần tạo mới
- **placeholder**: Có skeleton/route nhưng content chưa xong

### Services Checklist

#### Tư vấn thực chiến (`tu-van-thuc-chien`)

- [x] **Cố vấn tài chính chiến lược** (`advisor`)
  - Status: `existing`
  - Route: `/services/tu-van-thuc-chien/co-van-tai-chinh-chien-luoc`
  - Action: Map sang layout mới theo section contract

- [x] **Tư vấn tài chính chuyên sâu** (`consulting`)
  - Status: `existing`
  - Route: `/services/tu-van-thuc-chien/tu-van-tai-chinh-chuyen-sau`
  - Action: Map sang layout mới theo section contract

- [x] **Coaching triển khai tài chính** (`execution-coaching`)
  - Status: `existing`
  - Route: `/services/tu-van-thuc-chien/coaching-trien-khai-tai-chinh`
  - Action: Map sang layout mới theo section contract

#### Kế toán & Thuế (`ke-toan-thue`)

- [x] **ProsFIN ClearData™** (`cleardata`)
  - Status: `existing`
  - Route: `/services/ke-toan-thue/prosfin-cleardata`
  - Action: Map sang layout mới theo section contract
  - Note: Có dedicated page riêng tại `/services/cleardata`, cần migrate sang structure mới

#### Kiểm soát nội bộ (`kiem-soat-noi-bo`)

- [x] **OneLedger™** (`oneledger`)
  - Status: `existing`
  - Route: `/services/kiem-soat-noi-bo/oneledger`
  - Action: Map sang layout mới theo section contract
  - Note: Có configSlug và page riêng, cần migrate

- [x] **Kiểm toán nội bộ** (`audit`)
  - Status: `existing`
  - Route: `/services/kiem-soat-noi-bo/kiem-toan-noi-bo`
  - Action: Map sang layout mới theo section contract

#### Đào tạo & Phát triển (`dao-tao-phat-trien`)

- [x] **Mentoring tài chính** (`mentor`)
  - Status: `existing`
  - Route: `/services/dao-tao-phat-trien/mentoring-tai-chinh`
  - Action: Map sang layout mới theo section contract

- [x] **Hội thảo và đào tạo tài chính** (`seminar`)
  - Status: `existing`
  - Route: `/services/dao-tao-phat-trien/hoi-thao-va-dao-tao-tai-chinh`
  - Action: Map sang layout mới theo section contract

#### Đánh giá & Kiểm tra (`danh-gia-kiem-tra`)

- [x] **Kiểm tra và đánh giá tài chính** (`test`)
  - Status: `existing`
  - Route: `/services/danh-gia-kiem-tra/kiem-tra-va-danh-gia-tai-chinh`
  - Action: Map sang layout mới theo section contract

---

## Category Pages

Category pages cho 5 nhóm services (Phase 3):

- [x] `/services/tu-van-thuc-chien` - Tư vấn thực chiến category page
- [x] `/services/ke-toan-thue` - Kế toán & Thuế category page
- [x] `/services/kiem-soat-noi-bo` - Kiểm soát nội bộ category page
- [x] `/services/dao-tao-phat-trien` - Đào tạo & Phát triển category page
- [x] `/services/danh-gia-kiem-tra` - Đánh giá & Kiểm tra category page

**Status:** ✅ Completed in Phase 3
**Template:** Category page template với service list và status badges

---

## Recruitment Features

### Pages

- [x] `/recruitment` - Recruitment hub page
- [x] `/recruitment/brokerage` - Môi giới tuyển dụng page
- [x] `/recruitment/training` - Đào tạo chuyên môn page
- [x] `/recruitment/talent-pool` - Talent pool public view
- [x] `/recruitment/talent-pool/[candidate]` - Candidate detail page (optional)

### Talent Pool Public Basic

- [x] Talent pool public view với filter system
  - **Schema:** Đã định nghĩa trong `recruitment.catalog.ts` (updated Phase 5)
  - **Features:**
    - Filter bar (role, level, skill tags, industry tags, location, availability)
    - Candidate cards grid (non-PII data only)
    - CTA on each card: "Yêu cầu hồ sơ chi tiết"
    - Privacy-by-design: chỉ hiển thị `candidateCode`, không tên thật
    - Privacy banner trên tất cả talent pool pages
  - **Data:** Mock data trong `talent-pool.mock.ts` (sẽ thay bằng API/CMS sau)

### Training Pipeline

- [x] Training page với mô tả các mảng đào tạo
  - **Status:** Đã có page với placeholder content
  - **Future:** Chi tiết sâu về từng mảng đào tạo (Phase sau)
  - **Future:** Data pipeline "đào tạo → badge → publish" (Phase sau)

### Future Enhancements

- [ ] Privacy/Terms links (pending legal pages)
- [ ] Candidate apply form (PII) — future
- [ ] Employer request form riêng — future
- [ ] Gating/auth (nếu cần sau)
- [ ] Data pipeline "đào tạo → badge → publish" — future
- [ ] Talent pool pagination/infinite scroll — future
- [ ] Candidate detail page enhancement — future

---

## Insights Features

### Hub & Filtering

- [x] `/insights` - Insights hub với filter bar
  - Filter by topic (4 topics)
  - Filter by format (4 formats)
  - Combined filters
  - Sort (newest/oldest)
  - Shareable filter links với query params

### Taxonomy Integration

- [x] Map existing posts trong `posts.ts` sang `InsightMetadata` contract
- [x] Ensure posts có `topic` và `format` theo taxonomy
- [x] Tạo `insights.posts.ts` registry

### Content Migration

- [x] Insights Hub page với hero, filter bar, results grid
- [x] Insights detail page template (header, TL;DR, body, related, CTA)
- [x] Related insights section (same topic)
- [x] Related services section (topic → service mapping)
- [ ] Content body migration (hiện tại placeholder, cần populate markdown/content blocks)
- [ ] TL;DR và Action Items (cần populate cho từng post)

### Legacy Routes (Phase 7 - Redirect)

Các routes cũ cần redirect sang `/insights` hub:

- `/research` → `/insights`
- `/knowledge` → `/insights`
- `/resources` → `/insights?format=an-pham`
- `/case-studies` → `/insights?format=case-study`
- `/insights/research` → `/insights`
- `/insights/case-studies` → `/insights?format=case-study`

**Action:** Add redirects trong `next.config.js` ở Phase 7
**Documentation:** Xem `docs/redirect-map.md` cho chi tiết

---

## Navigation Implementation

### Phase 2 Tasks

- [ ] Implement mega menu cho Services (desktop)
  - Sử dụng shadcn Navigation Menu
  - Data từ `site.navigation.ts`
  - 5 categories với services trong mỗi category

- [ ] Implement mobile menu
  - Sheet/Accordion component
  - Data từ `site.navigation.ts`

- [ ] Implement footer navigation
  - Data từ `site.navigation.footerNav`

---

## Request Proposal (RFP) Form

- [ ] `/request-proposal` - RFP form page (Phase 6)
  - Pre-fill với service nếu có query param `?service={serviceSlug}`
  - Integration với lead management system

---

## Section Contracts Implementation

### Service Detail Pages

Tất cả service detail pages phải có các sections sau (xem `docs/IA.md`):

- [ ] Problem framing section
- [ ] Who it's for section
- [ ] Deliverables section
- [ ] Approach / timeline section
- [ ] CTA section

**Optional sections:**
- [ ] Related services
- [ ] Related insights
- [ ] Our people
- [ ] Tools/resources
- [ ] FAQ
- [ ] Case studies

### Insight Detail Pages

- [ ] Metadata display (topic, format, publishedAt, readingTime)
- [ ] Content body
- [ ] Related services (from `relatedServiceIds`)
- [ ] Related insights

---

## Data Migration & Integration

### Phase 3 Tasks

- [ ] Swap catalog files sang API/DB
  - `services.catalog.ts` → API endpoint
  - `insights.taxonomy.ts` → API endpoint
  - `recruitment.catalog.ts` → API endpoint

- [ ] CMS integration
  - Content management cho services
  - Content management cho insights
  - Talent pool candidate management

---

## Testing & Validation

- [ ] Validate slug uniqueness cho tất cả catalog items
- [ ] Test navigation generation từ catalog
- [ ] Test routing với Next.js App Router
- [ ] Validate section contracts cho service pages
- [ ] Test talent pool privacy (không lộ PII)

---

## Notes

- Tất cả services hiện tại đều có status `existing`, nghĩa là pages đã tồn tại
- Cần migrate existing pages sang structure mới theo catalog
- Talent pool candidates sẽ được populate sau (Phase 2+ hoặc CMS)
- Training pipeline chi tiết sẽ làm ở Phase sau

---

## Phase 1 Completion Checklist

- [x] Tạo `slug.ts` helper
- [x] Tạo `services.catalog.ts` với 5 categories
- [x] Tạo `insights.taxonomy.ts` với 4 topics và 4 formats
- [x] Tạo `recruitment.catalog.ts` với 2 pages và talent pool schema
- [x] Tạo `site.navigation.ts` import từ catalog (không hardcode)
- [x] Tạo `docs/IA.md` với routing conventions và template specs
- [x] Tạo `future-feature.md` với checklist dựa trên catalog status

**Phase 1 Status:** ✅ Complete

---

## Phase 2 Completion Checklist

- [x] Install shadcn navigation-menu component
- [x] Tạo `desktop-nav.tsx` với mega menu và dropdowns
- [x] Refactor `mobile-menu.tsx` với Accordion
- [x] Update `site-header.tsx` để dùng DesktopNav
- [x] Active state với usePathname()
- [x] Accessibility và keyboard navigation

**Phase 2 Status:** ✅ Complete

---

## Phase 3 Completion Checklist

- [x] Tạo data access layer (`getServiceCatalog.ts`, `serviceMeta.ts`)
- [x] Tạo `/services` hub page với 5 pillars grid
- [x] Tạo `/services/[category]` category pages
- [x] Tạo `/services/[category]/[service]` service detail pages
- [x] Tạo breadcrumb helpers (`servicesBreadcrumb.ts`)
- [x] Implement placeholder logic cho non-existing services
- [x] generateStaticParams cho category và service pages
- [x] Update future-feature.md

**Phase 3 Status:** ✅ Complete

---

## Phase 4 Completion Checklist

- [x] Tạo `insights.posts.ts` registry (map từ `posts.ts`)
- [x] Tạo data access layer (`getInsightsIndex`, `getInsightsBySlug`, `getInsightsFilters`, `getInsightsStaticParams`)
- [x] Tạo insights components (filter-bar, card, grid, related, cta)
- [x] Update `/insights` hub page với filter system
- [x] Update `/insights/[slug]` detail page với template chuẩn
- [x] Topic → Service mapping helper
- [x] Redirect mapping document (`docs/redirect-map.md`)

**Phase 4 Status:** ✅ Complete

---

## Phase 5 Completion Checklist

- [x] Update `recruitment.catalog.ts` schema (TalentPoolCandidate interface + CTA defaults)
- [x] Tạo mock talent pool data (`talent-pool.mock.ts`)
- [x] Tạo data access layer (`getRecruitmentRoutes.ts`, `getTalentPool.ts`)
- [x] Tạo recruitment pages (hub, brokerage, training, talent-pool, candidate detail)
- [x] Tạo talent pool components (filter-bar, candidate-card, grid, privacy-banner)
- [x] Privacy-first implementation (không PII trên public pages)
- [x] CTA wiring đúng với query params

**Phase 5 Status:** ✅ Complete

---

## Phase 6 Completion Checklist

- [x] Tạo RFP config & schema (`rfp.options.ts`, `rfp.schema.ts`, `rfp.utils.ts`)
- [x] Tạo RFP form components (form, fields, upload, terms)
- [x] Tạo API route handler `/api/rfp` với multipart support
- [x] Tạo `/request-proposal` page với form và sidebar
- [x] Tạo `/request-proposal/thanks` thank-you page
- [x] Implement validation (RHF + Zod) client & server-side
- [x] Implement file upload với size/type validation
- [x] Implement metadata tracking (source/utm/referrer)
- [x] Implement lead routing theo service

**Phase 6 Status:** ✅ Complete

### RFP Future Enhancements

- [ ] Email/CRM integration (send notifications + confirmation emails)
- [ ] File storage integration (S3/R2/Supabase Storage)
- [ ] Courses form (dedicated form cho training courses)
- [ ] Recruitment dedicated request form (separate from main RFP)
- [ ] Candidate apply form (PII) — future
- [ ] Captcha/Turnstile integration (currently using honeypot)
- [ ] Multi-attachment support (currently single file)
- [ ] Save draft functionality (localStorage)
- [ ] Rate limiting (IP-based)
- [ ] Database storage (Postgres) + workflow triggers

---

## Phase 7 Completion Checklist

- [x] Tạo redirects registry (`redirects.ts`) - Single source of truth
- [x] Update `next.config.ts` với redirects function
- [x] Tạo `robots.ts` (dynamic robots.txt)
- [x] Tạo `sitemap.ts` (dynamic sitemap.xml)
- [x] Add noindex cho `/request-proposal/thanks`
- [x] Verify metadata trên tất cả pages
- [x] Create QA checklist document (`docs/qa-checklist.md`)

**Phase 7 Status:** ✅ Complete

### Legacy Routes (Completed)

Các routes cũ đã được redirect sang canonical routes:

- ✅ `/services/cleardata` → `/services/ke-toan-thue/prosfin-cleardata`
- ✅ `/services/oneledger` → `/services/kiem-soat-noi-bo/oneledger`
- ✅ `/research` → `/insights`
- ✅ `/knowledge` → `/insights`
- ✅ `/resources` → `/insights?format=an-pham`
- ✅ `/case-studies` → `/insights?format=case-study`

**Implementation:** Redirects trong `next.config.js` từ `redirects.ts` registry

### SEO Enhancements (Future)

- [ ] Structured data (JSON-LD) cho services, insights
- [ ] Enhanced OpenGraph images per page
- [ ] Breadcrumb structured data
- [ ] FAQ structured data (if applicable)

### Service Detail Content Status

Các service detail pages hiện tại:

- **existing**: Có nội dung đầy đủ (cần map từ old pages)
- **new/placeholder**: Chỉ có placeholder content, cần bổ sung:
  - Vấn đề thường gặp (3-6 bullets)
  - Phạm vi & Đầu ra (deliverables list)
  - Cách ProsFIN triển khai (4 bước)
  - Thời gian & cách làm việc (timeline ranges)
  - FAQ per-service

