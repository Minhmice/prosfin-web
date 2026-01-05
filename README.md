# ProsFIN Web

Monorepo cho ProsFIN - dịch vụ tư vấn tài chính doanh nghiệp chuẩn Big4. Bao gồm website marketing và admin dashboard, xây dựng bằng Next.js App Router với TypeScript, Tailwind CSS và shadcn/ui.

## 📋 Tổng quan

ProsFIN Web là monorepo chứa 2 ứng dụng chính:

### 1. Marketing Website (`apps/web`)
Website marketing B2B cung cấp thông tin về dịch vụ tư vấn tài chính cho doanh nghiệp:
- Landing page với các section giới thiệu dịch vụ, quy trình, case studies
- Trang dịch vụ chi tiết
- Trang quy trình làm việc
- Trang case studies (câu chuyện khách hàng)
- Trang FAQ
- Trang liên hệ với form
- Flow onboarding cho khách hàng mới

### 2. Admin Dashboard (`apps/admin`) ⭐ Phase 1 Complete
Hệ thống quản trị nội bộ với đầy đủ features:
- **Dashboard** - KPI cards, interactive charts, recent activity, quick actions
- **Leads Management** - DataTable với detail panel, actions, bulk operations
- **Clients Management** - Quản lý clients với related leads tracking
- **Content Management** - Quản lý posts với status workflow
- **DataTable Kit** - Reusable table component với sorting, filtering, pagination, column visibility, row selection, bulk actions

👉 **Xem chi tiết**: [apps/admin/README.md](./apps/admin/README.md)

## 🛠 Tech Stack

### Core Framework
- **Next.js**: 16.0.10 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x

### Styling & UI
- **Tailwind CSS**: v4 (import qua `src/app/globals.css`)
- **shadcn/ui**: UI primitives (Radix UI components)
- **Radix UI**: 
  - Accordion, Dialog, Label, Separator, Slot, Tabs
- **Lucide React**: Icon library
- **Framer Motion**: 12.23.26 - Animation library
- **GSAP**: 3.14.2 - Advanced animations

### Form & Validation
- **React Hook Form**: 7.68.0
- **Zod**: 4.2.0 - Schema validation
- **@hookform/resolvers**: 5.2.2

### Utilities
- **class-variance-authority**: 0.7.1 - Component variants
- **clsx**: 2.1.1 - Conditional className
- **tailwind-merge**: 3.4.0 - Merge Tailwind classes

### Development Tools
- **ESLint**: 9.x với Next.js config
- **TypeScript**: 5.x
- **Babel React Compiler**: 1.0.0
- **@paper-design/shaders-react**: 0.0.68

## 📦 Yêu cầu hệ thống

- **Node.js**: >= 20 (khuyến nghị)
- **npm**: Repo sử dụng `package-lock.json`

## 🚀 Cài đặt & Chạy

### Cài đặt dependencies

```bash
npm install
```

### Chạy development servers

#### Marketing Website
```bash
npm run dev --workspace=apps/web
# Hoặc
cd apps/web && npm run dev
```
Mở trình duyệt tại `http://localhost:3000`

#### Admin Dashboard
```bash
npm run dev --workspace=apps/admin
# Hoặc
cd apps/admin && npm run dev
```
Mở trình duyệt tại `http://localhost:3001`

### Build production

```bash
npm run build
```

### Chạy production server

```bash
npm run start
```

### Lint code

```bash
npm run lint
```

> **Lưu ý**: Hiện tại project không có file `.env*` và không sử dụng `process.env` trong `src/` (trừ `NEXT_PUBLIC_SITE_URL` trong layout).

## 📁 Cấu trúc Monorepo

```
prosfin-web/
├── apps/
│   ├── web/              # Marketing website
│   │   └── src/          # (Xem cấu trúc chi tiết bên dưới)
│   └── admin/            # Admin dashboard ⭐
│       └── src/          # (Xem apps/admin/README.md)
├── packages/             # Shared packages (nếu có)
├── package.json          # Root package.json
└── pnpm-workspace.yaml   # Workspace configuration
```

### Marketing Website Structure

```
apps/web/src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group cho marketing pages
│   │   ├── about/                # Trang về ProsFIN
│   │   ├── services/             # Trang dịch vụ
│   │   │   └── [slug]/           # Chi tiết dịch vụ
│   │   ├── case-studies/         # Trang case studies
│   │   │   └── [slug]/           # Chi tiết case study
│   │   ├── process/              # Trang quy trình
│   │   ├── contact/              # Trang liên hệ
│   │   └── faq/                  # Trang FAQ
│   ├── contact-lite/             # Trang liên hệ đơn giản
│   ├── onboarding/               # Flow onboarding
│   │   ├── detail-information/   # Form thông tin chi tiết
│   │   └── thanks/               # Trang cảm ơn
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles + theme
│
├── components/
│   ├── landing/                  # Components cho landing page
│   │   ├── hero/                 # Hero section với modal form
│   │   ├── trust-bar/            # Trust bar (logos)
│   │   ├── solutions/            # Solutions section
│   │   ├── services-preview/     # Services preview
│   │   ├── process-preview/      # Process preview
│   │   ├── proof/                # Proof/case studies preview
│   │   ├── content-preview/      # Content preview
│   │   ├── faq/                  # FAQ section
│   │   └── final-cta/            # Final CTA section
│   │
│   ├── navigation/               # Navigation components
│   │   ├── site-header.tsx       # Main header
│   │   ├── site-nav.tsx          # Navigation menu
│   │   ├── mobile-menu.tsx       # Mobile menu
│   │   └── mobile-sticky-cta-bar.tsx  # Sticky CTA trên mobile
│   │
│   ├── footer/                   # Footer components
│   │   ├── site-footer.tsx
│   │   ├── footer-links.tsx
│   │   ├── footer-contact.tsx
│   │   └── footer-legal.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── marketing-layout.tsx  # Marketing layout wrapper
│   │   └── container.tsx         # Container component
│   │
│   ├── shared/                   # Shared/reusable components
│   │   ├── wrappers/             # Wrapper components (App*)
│   │   │   ├── app-button.tsx
│   │   │   ├── app-card.tsx
│   │   │   ├── app-section.tsx
│   │   │   ├── app-container.tsx
│   │   │   ├── app-badge.tsx
│   │   │   ├── app-link.tsx
│   │   │   └── app-icon-button.tsx
│   │   ├── patterns/             # UI patterns
│   │   │   ├── section-header.tsx
│   │   │   └── cta-row.tsx
│   │   ├── button/               # Button variants
│   │   ├── card/                 # Card variants
│   │   ├── badge/                # Badge components
│   │   ├── animation/            # Animation components
│   │   │   ├── reveal-on-scroll.tsx
│   │   │   ├── animated-counter.tsx
│   │   │   └── ...
│   │   ├── typography/           # Typography components
│   │   └── index.ts              # Barrel export
│   │
│   ├── ui/                       # shadcn/ui components (KHÔNG SỬA)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   └── ...
│   │
│   ├── onboarding/               # Onboarding components
│   │   └── detail-information/   # Detail information form
│   │
│   └── faq/                      # FAQ components
│
├── data/                         # Content data files
│   ├── heroContent.ts
│   ├── services-content.ts
│   ├── services-detail.ts
│   ├── process-content.ts
│   ├── case-studies.ts
│   ├── faq-content.ts
│   ├── contact-content.ts
│   ├── navigation-content.ts
│   └── ...
│
├── lib/
│   ├── content/                  # Content adapter layer
│   │   ├── landing.ts            # getLandingContent()
│   │   └── types.ts               # Content types
│   └── utils.ts                   # Utility functions (cn, etc.)
│
├── hooks/                        # Custom React hooks
│   ├── use-attribution.ts        # Attribution tracking (UTM, referrer)
│   ├── use-in-view-animation.ts  # Scroll animation hook
│   └── use-lead-draft.ts         # Lead draft management
│
└── types/
    └── content.ts                 # Content type definitions
```

## 🎨 Theme & Styling

### Theme Colors
Theme được định nghĩa trong `src/app/globals.css` với CSS variables:

- **Primary (Navy)**: `#172554` (blue-950)
- **Neutrals**: Slate scale
- **Brand Accent**: `#c7a775` (Gold)
- **Background**: `#f8fafc` (slate-50)
- **Foreground**: `#172554` (blue-950)

### Dark Mode
Dark mode đã được cấu hình sẵn với custom variant `dark`.

### Typography
- **Font chính**: Plus Jakarta Sans (variable: `--font-jakarta-sans`)
- **Font mono**: Geist Mono (variable: `--font-geist-mono`)

### Import Alias
- `@/*` → `src/*` (xem `tsconfig.json`)

## 📄 Routes & Pages

### Marketing Pages (Route group `(marketing)`)
- `/` - Landing page
- `/services` - Danh sách dịch vụ
- `/services/[slug]` - Chi tiết dịch vụ
- `/process` - Quy trình làm việc
- `/case-studies` - Danh sách case studies
- `/case-studies/[slug]` - Chi tiết case study
- `/about` - Về ProsFIN
- `/faq` - Câu hỏi thường gặp
- `/contact` - Liên hệ

### Special Pages
- `/contact-lite` - Trang liên hệ đơn giản
- `/onboarding/detail-information` - Form thông tin chi tiết
- `/onboarding/thanks` - Trang cảm ơn sau khi submit

## 🏗 Architecture & Patterns

### Content Adapter Layer
Tất cả content cho landing page được quản lý qua **Content Adapter Layer** trong `src/lib/content/`:

- `getLandingContent()` - Aggregate tất cả content từ data files
- Sẵn sàng để swap sang API/DB trong Phase 3
- Type-safe với TypeScript

### Wrapper Components
**Quy tắc quan trọng**: Không được sửa trực tiếp các file trong `src/components/ui/**` (shadcn/ui).

Thay vào đó, tạo wrapper components trong:
- `src/components/shared/wrappers/` - App* components
- `src/components/shared/patterns/` - UI patterns

Ví dụ:
```tsx
// ✅ Đúng: Tạo wrapper
import { Button as BaseButton } from "@/components/ui/button";

export function AppButton({ ...props }) {
  return <BaseButton {...props} />;
}

// ❌ Sai: Sửa trực tiếp src/components/ui/button.tsx
```

### Component Size Limit
Mỗi component `.tsx` file **KHÔNG được vượt quá 200 lines**:
- Tách thành các component nhỏ hơn
- Extract logic vào custom hooks
- Tạo shared components cho patterns lặp lại

### Form Handling
- Sử dụng React Hook Form + Zod validation
- Form components đã được standardize
- Attribution tracking tự động (UTM params, referrer) qua `useAttribution` hook

### Animation
- **Framer Motion**: Section reveal, card animations
- **GSAP**: Advanced scroll animations
- Custom hooks: `useInViewAnimation` cho scroll-triggered animations

## 📊 Content Management

### Data Files
Tất cả content được lưu trong `src/data/`:
- `heroContent.ts` - Hero section content
- `services-content.ts` - Services data
- `process-content.ts` - Process steps
- `faq-content.ts` - FAQ items
- `contact-content.ts` - Contact section content
- Và nhiều file khác...

### Type Safety
Tất cả content types được định nghĩa trong:
- `src/types/content.ts` - Base content types
- `src/lib/content/types.ts` - Re-exports

## 🔍 Features

### Landing Page Sections
1. **Hero Section** - Hero với CTA và stats overlay
2. **Trust Bar** - Trust logos/credentials
3. **Solutions Section** - Grid solutions cards
4. **Services Preview** - Preview 3-4 services
5. **Process Preview** - Preview 4 process steps
6. **Proof Section** - Case study highlights
7. **Content Preview** - Content/resources preview
8. **FAQ Section** - FAQ accordion
9. **Final CTA** - Final CTA với contact form

### Navigation
- Smooth scroll cho anchor links
- Mobile menu với Sheet (drawer)
- Sticky mobile CTA bar
- Cross-page anchor link handling

### Attribution Tracking
- Tự động capture UTM params
- Lưu referrer information
- Lưu landing path
- Sẵn sàng cho Phase 3 API integration

### SEO
- Metadata configuration trong `layout.tsx`
- OpenGraph tags
- Twitter cards
- Robots meta
- Title template

## 🚢 Deployment

### Vercel (Khuyến nghị)
Deploy như một Next.js app tiêu chuẩn:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Hiện tại chỉ cần:
- `NEXT_PUBLIC_SITE_URL` (optional, default: `https://prosfin.vn`)

### Build Configuration
- React Compiler enabled trong `next.config.ts`
- TypeScript strict mode
- ESLint với Next.js config

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint rules từ Next.js config
- Component files < 200 lines
- Wrapper pattern cho UI customization

### Git Workflow
- Feature branches
- Commit messages rõ ràng
- Code review trước khi merge

### Testing
- Manual testing trên dev server
- Build check: `npm run build`
- Lint check: `npm run lint`

## 🗺 Roadmap

### Marketing Website

#### Phase 1 & 2 ✅ (Hoàn thành)
- Foundation & Design System
- Landing v2 với Content Adapter Layer
- Wrapper components system
- Attribution tracking
- SEO baseline

#### Phase 3 (Planned)
- Connect content adapter to API/DB
- Connect lead forms to API endpoint
- Store attribution in Leads DB
- Analytics tracking
- A/B testing infrastructure

#### Future Features (Xem `later_feature.md`)
- Financial Health Self-Check tool
- Interactive Dashboard Preview
- Resources/Insights Hub
- Who-We-Help segmentation page
- Enhanced animations & scrollytelling

### Admin Dashboard

#### Phase 1 ✅ (Hoàn thành)
- Shell ổn định (sidebar/topbar/breadcrumb/user menu/mobile offcanvas)
- DataTable kit reusable 100% với đầy đủ features
- Leads/Clients/Content pages với detail panels
- Dashboard production-grade với charts
- Hardening (loading/error/not-found theo Next.js conventions)

#### Phase 2 (Planned)
- Authentication & Authorization
- User management
- Settings page implementation
- Advanced filters & search
- Export functionality
- Audit logs

#### Phase 3 (Planned)
- API integration
- Real-time updates
- Advanced analytics
- Custom dashboards
- Workflow automation

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TanStack Table](https://tanstack.com/table) (Admin)
- [Sonner (Toast)](https://sonner.emilkowal.ski) (Admin)
- [Recharts](https://recharts.org) (Admin)

### Libraries
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com)
- [Radix UI](https://www.radix-ui.com)

## 📄 License

Private project - ProsFIN

---

## 📝 Notes

### Marketing Website
- Các form hiện đang ở mode demo (log/alert) và chưa nối backend/API
- Sẽ được implement trong Phase 3

### Admin Dashboard
- Hiện tại sử dụng mock data từ `apps/admin/src/data/*.ts`
- Actions đều mock với setTimeout simulation
- Sẵn sàng cho API integration trong Phase 3
- DataTable kit đã support server-ready pagination

---

**Version**: 2.0.0
**Last Updated**: 06/01/2026
