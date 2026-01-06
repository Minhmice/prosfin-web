# Information Architecture (IA) Documentation

Tài liệu này mô tả cấu trúc thông tin (IA) và quy tắc routing cho ProsFIN website. Đây là single source of truth cho việc tổ chức nội dung và routing conventions.

## Tổng quan

Website ProsFIN được tổ chức theo **data-driven architecture**, nơi tất cả cấu trúc nội dung được định nghĩa trong các catalog files:

- `src/content/services.catalog.ts` - Services structure
- `src/content/insights.taxonomy.ts` - Insights taxonomy
- `src/content/recruitment.catalog.ts` - Recruitment structure
- `src/content/site.navigation.ts` - Navigation (generated from catalogs)

## Routing Conventions

### Services

```
/services                          # Services hub
/services/{categorySlug}           # Category page (e.g., /services/tu-van-thuc-chien)
/services/{categorySlug}/{serviceSlug}  # Service detail (e.g., /services/tu-van-thuc-chien/co-van-tai-chinh-chien-luoc)
```

**Examples:**
- `/services` - All services overview
- `/services/tu-van-thuc-chien` - Tư vấn thực chiến category
- `/services/tu-van-thuc-chien/co-van-tai-chinh-chien-luoc` - Cố vấn tài chính chiến lược detail

**5 Service Categories:**
1. `tu-van-thuc-chien` - Tư vấn thực chiến
2. `ke-toan-thue` - Kế toán & Thuế
3. `kiem-soat-noi-bo` - Kiểm soát nội bộ
4. `dao-tao-phat-trien` - Đào tạo & Phát triển
5. `danh-gia-kiem-tra` - Đánh giá & Kiểm tra

### Insights (Góc nhìn)

```
/insights                          # Insights hub
/insights/{slug}                   # Insight detail
/insights?topic={topicSlug}        # Filter by topic
/insights?format={formatSlug}      # Filter by format
/insights?topic={topicSlug}&format={formatSlug}  # Combined filters
```

**4 Topics:**
- `tai-chinh` - Tài chính
- `ke-toan` - Kế toán
- `thue` - Thuế
- `kiem-soat-noi-bo` - Kiểm soát nội bộ

**4 Formats:**
- `bai-viet` - Bài viết
- `an-pham` - Ấn phẩm
- `case-study` - Case Study
- `su-kien` - Sự kiện

### Recruitment (Tuyển dụng)

```
/recruitment                       # Recruitment hub
/recruitment/brokerage             # Môi giới tuyển dụng
/recruitment/training              # Đào tạo chuyên môn
/recruitment/talent-pool           # Talent pool (public basic)
```

### About

```
/about                             # About page
/about#team                        # About with anchor (optional)
/about#values                     # About with anchor (optional)
```

### Request Proposal (RFP)

```
/request-proposal                  # RFP form (Phase 6)
/request-proposal?service={serviceSlug}  # Pre-filled with service
```

## Page Templates Spec

### Services Hub Template (`/services`)

**Sections:**
1. Hero section với eyebrow, title, subtitle
2. Category filter/tabs (5 categories)
3. Services grid (grouped by category hoặc flat)
4. Featured services section
5. CTA section

**Data Source:** `servicesCatalog`

### Category Page Template (`/services/{categorySlug}`)

**Sections:**
1. Category hero (category label, description)
2. Services list trong category
3. Related categories
4. CTA section

**Data Source:** `getServicesByCategory(categoryId)`

### Service Detail Template (`/services/{categorySlug}/{serviceSlug}`)

**Required Sections (Section Contract):**
1. **Problem framing** - Vấn đề dịch vụ giải quyết
2. **Who it's for** - Đối tượng phù hợp
3. **Deliverables** - Kết quả đầu ra
4. **Approach / timeline** - Cách làm và thời gian
5. **CTA** - Call to action

**Optional Sections:**
- Related services
- Related insights/posts
- Our people
- Tools/resources
- FAQ

**Data Source:** `getServiceBySlug(serviceSlug)`

### Insights Hub Template (`/insights`)

**Sections:**
1. Hero section
2. Filter bar (topic, format)
3. Insights grid/list
4. Featured insights
5. CTA section

**Data Source:** `insightsTaxonomy` + posts data

### Insight Detail Template (`/insights/{slug}`)

**Sections:**
1. Metadata (topic, format, publishedAt, readingTime)
2. Content (article body)
3. Related services (from `relatedServiceIds`)
4. Related insights
5. CTA section

**Data Source:** Post data conforming to `InsightMetadata` contract

### Recruitment Hub Template (`/recruitment`)

**Sections:**
1. Hero section
2. Two branches: Brokerage và Training
3. Talent pool preview (if enabled)
4. CTA section

**Data Source:** `recruitmentCatalog`

### Talent Pool Template (`/recruitment/talent-pool`)

**Sections:**
1. Hero section
2. Filter bar (role, level, location, availability)
3. Candidate cards grid
4. CTA on each card: "Yêu cầu hồ sơ chi tiết"

**Data Source:** `recruitmentCatalog.talentPool.candidates`

**Privacy-by-design:**
- Only non-PII data displayed
- `candidateCode` instead of real name
- CTA leads to request proposal form

## Section Contracts

### Service Detail Section Contract

Mỗi service detail page **phải có** các sections sau:

1. **Problem Framing**
   - Mô tả vấn đề doanh nghiệp đang gặp
   - Pain points cụ thể

2. **Who It's For**
   - Đối tượng phù hợp (personas, company size, stage)
   - Ideal client description

3. **Deliverables**
   - Danh sách kết quả đầu ra
   - What you get

4. **Approach / Timeline**
   - Quy trình làm việc
   - Timeline (weeks/months)
   - Steps hoặc phases

5. **CTA**
   - Primary CTA button
   - Link to request proposal hoặc contact

**Optional sections:**
- Related services
- Related insights
- Our people
- Tools/resources
- FAQ
- Case studies

### Insight Detail Section Contract

Mỗi insight detail page **phải có**:

1. **Metadata**
   - Topic (chủ đề)
   - Format (loại nội dung)
   - Published date
   - Reading time (optional)

2. **Content**
   - Article body
   - Rich text content

3. **Related Services**
   - Links to services (from `relatedServiceIds`)

4. **Related Insights**
   - Links to other insights (same topic/format)

## Slug Rules

### General Rules

1. **Kebab-case**: Tất cả slugs dùng kebab-case (lowercase, hyphen-separated)
2. **ASCII only**: Chuyển tiếng Việt có dấu → không dấu
   - ô/ơ/ư → o/o/u
   - đ → d
3. **No spaces**: Khoảng trắng → hyphen
4. **No special chars**: Loại bỏ ký tự đặc biệt
5. **Unique**: Mỗi slug phải unique trong cùng scope

### Slug Generation

Sử dụng `slugify()` function từ `src/lib/slug.ts`:

```typescript
import { slugify } from "@/lib/slug";

const slug = slugify("Tư vấn tài chính"); // "tu-van-tai-chinh"
```

### Validation

Sử dụng `assertUniqueSlugs()` để validate:

```typescript
import { assertUniqueSlugs } from "@/lib/slug";

assertUniqueSlugs(services, (s) => s.slug);
```

### Examples

| Input | Output |
|-------|--------|
| "Tư vấn tài chính" | `tu-van-tai-chinh` |
| "Kế toán & Thuế" | `ke-toan-thue` |
| "Kiểm soát nội bộ" | `kiem-soat-noi-bo` |
| "Đào tạo & Phát triển" | `dao-tao-phat-trien` |

## Data Flow

```
Catalog Files (src/content/)
    ↓
Navigation Generation (site.navigation.ts)
    ↓
UI Components (Phase 2)
    ↓
Pages (app router)
```

### Catalog → Navigation

`site.navigation.ts` import từ:
- `services.catalog.ts` → Services mega menu
- `insights.taxonomy.ts` → Insights quick links
- `recruitment.catalog.ts` → Recruitment dropdown

**Không hardcode** service lists trong navigation.

### Navigation → UI

Navigation structure được sử dụng bởi:
- Header navigation (desktop mega menu)
- Mobile menu (sheet/accordion)
- Footer navigation

**Phase 2** sẽ implement UI components sử dụng navigation data.

## Next.js App Router Conventions

### Route Groups

Sử dụng route groups `(marketing)` để tổ chức routes mà không ảnh hưởng URL:

```
app/
  (marketing)/
    services/
    insights/
    recruitment/
    about/
```

### Dynamic Segments

Sử dụng dynamic segments `[slug]` cho detail pages:

```
app/
  (marketing)/
    services/
      [slug]/
        page.tsx  # Service detail
    insights/
      [slug]/
        page.tsx  # Insight detail
```

### Static Generation

Sử dụng `generateStaticParams()` để pre-generate pages:

```typescript
export async function generateStaticParams() {
  const services = servicesCatalog.items;
  return services.map((service) => ({
    categorySlug: getCategoryBySlug(service.categoryId).slug,
    serviceSlug: service.slug,
  }));
}
```

## Future Considerations

### Phase 2
- Implement UI components sử dụng navigation data
- Build mega menu với shadcn Navigation Menu
- Mobile menu với Sheet/Accordion

### Phase 3
- Swap catalog files sang API/DB
- Dynamic content loading
- CMS integration

### Phase 4-5
- Service discovery
- Advanced filtering
- Related content recommendations

## Notes

- Tất cả routing conventions phải tuân theo Next.js App Router best practices
- Catalog files là TypeScript, type-safe
- Navigation được generate từ catalog, không hardcode
- Slug rules được enforce qua `slugify()` và `assertUniqueSlugs()`

