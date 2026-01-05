# ProsFIN Admin Dashboard

Admin dashboard cho ProsFIN - hệ thống quản lý leads, clients, content và analytics. Xây dựng bằng Next.js App Router với TypeScript, Tailwind CSS, shadcn/ui và TanStack Table.

## 📋 Tổng quan

ProsFIN Admin là hệ thống quản trị nội bộ cung cấp:
- **Dashboard** - Tổng quan KPI, charts, recent activity, quick actions
- **Leads Management** - Quản lý leads với detail panel, actions, bulk operations
- **Clients Management** - Quản lý clients với related leads tracking
- **Content Management** - Quản lý posts với status workflow
- **DataTable Kit** - Reusable table component với đầy đủ features

## 🛠 Tech Stack

### Core Framework
- **Next.js**: 16.0.10 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x

### UI & Styling
- **Tailwind CSS**: v4
- **shadcn/ui**: UI primitives (Radix UI components)
- **Radix UI**: AlertDialog, Avatar, Checkbox, Dialog, DropdownMenu, Select, Sheet, Sidebar, Tabs, Tooltip
- **Tabler Icons**: Icon library
- **Recharts**: 2.15.4 - Chart library với shadcn chart wrapper

### Data & State Management
- **TanStack Table**: 8.21.3 - Powerful table library với sorting, filtering, pagination
- **MSW (Mock Service Worker)**: Mock REST API cho frontend-only development
- **Sonner**: 2.0.7 - Toast notifications
- **React Hook Form**: 7.68.0 - Form handling
- **Zod**: 4.2.1 - Schema validation
- **cmdk**: 1.1.1 - Command palette component

### Utilities
- **class-variance-authority**: 0.7.1 - Component variants
- **clsx**: 2.1.1 - Conditional className
- **tailwind-merge**: 3.4.0 - Merge Tailwind classes

## 📦 Yêu cầu hệ thống

- **Node.js**: >= 20 (khuyến nghị)
- **npm** hoặc **pnpm**

## 🚀 Cài đặt & Chạy

### Cài đặt dependencies

```bash
# Từ root của monorepo
npm install

# Hoặc từ apps/admin
cd apps/admin
npm install
```

### Chạy development server

```bash
# Từ root
npm run dev --workspace=apps/admin

# Hoặc từ apps/admin
cd apps/admin
npm run dev
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

## 📁 Cấu trúc thư mục

```
apps/admin/src/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Route group cho admin pages
│   │   ├── dashboard/           # Dashboard page
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx      # Segment-level loading
│   │   │   └── data.json        # Mock data
│   │   ├── leads/               # Leads management
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx        # Error boundary
│   │   ├── clients/             # Clients management
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   ├── content/             # Content management
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/          # Dynamic route
│   │   │   │   ├── page.tsx
│   │   │   │   └── not-found.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   ├── tables/              # DataTable playground
│   │   │   └── page.tsx
│   │   ├── settings/            # Settings page
│   │   └── layout.tsx           # Admin layout với SidebarProvider
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── loading.tsx              # Root loading
│   ├── error.tsx                # Root error boundary
│   └── not-found.tsx            # Root not-found
│
├── components/
│   ├── table/                   # DataTable Kit (reusable)
│   │   ├── table.tsx            # Main DataTable component
│   │   ├── toolbar.tsx          # Search + filters
│   │   ├── pagination.tsx       # Pagination controls
│   │   ├── columns-menu.tsx     # Column visibility
│   │   ├── bulk-bar.tsx         # Bulk actions bar
│   │   ├── row-actions.tsx      # Row action dropdown
│   │   ├── empty.tsx            # Empty state
│   │   ├── loading.tsx          # Loading skeleton
│   │   ├── types.ts             # TypeScript types
│   │   └── index.ts             # Barrel exports
│   │
│   ├── shell/                   # NEW: App Shell components
│   │   ├── topbar.tsx           # Topbar với breadcrumbs, search, actions
│   │   ├── breadcrumbs.tsx      # Breadcrumb navigation
│   │   ├── global-search.tsx    # Global search / Command Palette
│   │   ├── quick-actions.tsx    # Quick create dropdown
│   │   ├── notifications-button.tsx # Notifications với badge
│   │   └── user-menu.tsx        # User menu (moved from sidebar)
│   │
│   ├── shared/
│   │   ├── skeletons/           # NEW: Skeleton components
│   │   │   ├── table-skeleton.tsx
│   │   │   ├── card-skeleton.tsx
│   │   │   ├── list-skeleton.tsx
│   │   │   ├── detail-panel-skeleton.tsx
│   │   │   └── index.ts
│   │   └── ...                  # Other shared components
│   │
│   ├── providers/
│   │   └── msw-provider.tsx     # NEW: MSW initialization provider
│   │
│   ├── dashboard/               # Dashboard components
│   │   └── sections/
│   │       ├── stats-cards.tsx      # KPI cards
│   │       ├── visitors-chart.tsx   # Chart với time range
│   │       ├── time-range-switch.tsx # Time range selector
│   │       ├── recent-activity.tsx   # Activity feed
│   │       └── quick-actions.tsx      # Quick action buttons
│   │
│   ├── leads/                   # Leads-specific components
│   │   └── lead-detail-panel.tsx   # Detail panel (Sheet/Drawer)
│   │
│   ├── clients/                 # Clients-specific components
│   │   └── client-detail-panel.tsx
│   │
│   ├── app-sidebar.tsx          # Main sidebar
│   ├── nav-main.tsx             # Main navigation
│   ├── nav-secondary.tsx        # Secondary navigation
│   └── ui/                      # shadcn/ui components (KHÔNG SỬA)
│       ├── alert-dialog.tsx
│       ├── sidebar.tsx
│       ├── table.tsx
│       ├── chart.tsx
│       └── ...
│
├── data/                        # Mock data
│   ├── leads.ts                 # 75 mock leads
│   ├── clients.ts               # 50 mock clients
│   ├── posts.ts                 # 40 mock posts
│   └── tags.ts                  # 20 mock tags
│
├── lib/
│   ├── actions/                 # Action contracts
│   │   ├── leads.ts            # Lead actions (markContacted, archive, etc.)
│   │   ├── clients.ts          # Client actions
│   │   └── posts.ts            # Post actions
│   ├── api/                    # NEW: API Client
│   │   └── client.ts           # Type-safe fetch wrapper
│   ├── data/                   # NEW: Data layer
│   │   ├── adapter/            # Data adapters
│   │   │   ├── clients.ts
│   │   │   ├── leads.ts
│   │   │   ├── posts.ts
│   │   │   ├── schedules.ts
│   │   │   ├── tasks.ts
│   │   │   └── index.ts
│   │   ├── store.ts            # In-memory store
│   │   └── seed.ts             # Seed data generator
│   ├── analytics/              # NEW: Telemetry
│   │   ├── adapter.ts          # Analytics adapter interface
│   │   ├── console-adapter.ts  # Console logger
│   │   └── telemetry.ts        # Event tracking
│   ├── msw-init.ts             # NEW: MSW initialization
│   ├── notify.ts               # Sonner notification helpers
│   └── utils.ts                # Utility functions (cn, etc.)
│
├── mocks/                      # NEW: MSW Mock Service Worker
│   ├── handlers.ts             # Request handlers
│   ├── browser.ts              # Browser setup
│   ├── server.ts               # Server setup
│   └── index.ts
│
├── types/
│   └── index.ts                # TypeScript types (Lead, Client, Post, Tag)
│
├── hooks/
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-sidebar-state.ts    # Sidebar state management
│
└── config/
    └── nav.ts                  # Navigation configuration
```

## 🎨 Architecture & Patterns

### DataTable Kit

**DataTable Kit** là hệ thống table reusable 100% với đầy đủ features:

#### Features
- ✅ **Sorting** - Click header để sort (asc → desc → none)
- ✅ **Filtering** - Global search + column filters
- ✅ **Pagination** - Client mode + Server-ready mode (manualPagination)
- ✅ **Column Visibility** - Toggle columns, persist vào localStorage
- ✅ **Row Selection** - Checkbox selection với bulk actions
- ✅ **Bulk Actions** - Bulk bar với confirm dialog cho destructive actions
- ✅ **Row Actions** - Dropdown menu với confirm dialog
- ✅ **Empty State** - Customizable empty state
- ✅ **Loading State** - Skeleton rows

#### Usage

```tsx
import { DataTable } from "@/components/table"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // ... more columns
]

export default function LeadsPage() {
  const handleRowAction = (action: string, row: Lead) => {
    // Handle view, edit, archive, etc.
  }

  const handleBulkAction = (action: string, rows: Lead[]) => {
    // Handle bulk archive, export, etc.
  }

  return (
    <DataTable
      data={mockLeads}
      columns={columns}
      enableRowSelection
      enableColumnVisibility
      enableSorting
      enableFiltering
      onRowAction={handleRowAction}
      onBulkAction={handleBulkAction}
    />
  )
}
```

#### Server-ready Pagination

```tsx
<DataTable
  data={data}
  columns={columns}
  manualPagination={true}
  pageCount={totalPages}
  rowCount={totalRows}
/>
```

### Shell Architecture

**Shell** bao gồm:
- **Sidebar** - Collapsible sidebar với navigation (shadcn Sidebar component)
- **Topbar** - Enhanced top bar với:
  - Breadcrumbs navigation (dynamic từ pathname)
  - Global search / Command Palette (⌘K)
  - Quick actions dropdown (Create lead/client/post)
  - Notifications button với badge count
  - User menu (Profile, Preferences, Logout)
- **Layout** - Route group `(admin)` với SidebarProvider, Toaster, MSWProvider

### Detail Panels

Detail panels sử dụng **Sheet** (desktop) và **Drawer** (mobile) cho responsive:
- **Lead Detail Panel** - Summary, status timeline, attribution, notes
- **Client Detail Panel** - Summary, related leads, notes

### Action Contracts

Tất cả actions đều:
- Nhận params (id, data...)
- Return Promise với optimistic update
- Gọi `notifySuccess/notifyError` từ `lib/notify.ts` (Sonner)

```tsx
import { archiveLead } from "@/lib/actions/leads"

await archiveLead(leadId) // Tự động show Sonner notification
```

### Hardening (Next.js Conventions)

- ✅ **Segment-level `loading.tsx`** - Loading UI cho từng route
- ✅ **Segment-level `error.tsx`** - Error boundary isolation
- ✅ **`not-found.tsx`** - Not found cho dynamic routes
- ✅ **Accessibility** - ARIA labels, keyboard navigation

## 📄 Routes & Pages

### Admin Routes (Route group `(admin)`)
- `/dashboard` - Dashboard với KPI cards, charts, activity
- `/leads` - Leads management với DataTable + detail panel
- `/clients` - Clients management với DataTable + detail panel
- `/content` - Content management với DataTable
- `/content/[slug]` - Content detail (placeholder)
- `/tables` - DataTable playground (demo tất cả features)
- `/settings` - Settings page (placeholder)

## 🎯 Features

### Dashboard
- **Stats Cards** - 4 KPI cards với trend indicators
- **Visitors Chart** - Interactive area chart với time range switch (7d/30d/90d)
- **Recent Activity** - Activity feed với timestamps
- **Quick Actions** - Shortcuts cho common tasks

### Leads Management
- **List View** - DataTable với columns: name, company, email, phone, interest, status, source, utmCampaign, createdAt
- **Detail Panel** - Sheet/Drawer với:
  - Summary (contact info)
  - Status timeline
  - Attribution (UTM, referrer, landing path)
  - Notes (textarea với mock state)
- **Actions**:
  - View details (mở panel)
  - Edit (placeholder)
  - Archive (với confirm dialog)
  - Bulk archive

### Clients Management
- **List View** - DataTable với columns: name, company, email, status, owner, createdAt
- **Detail Panel** - Tương tự Leads nhưng có related leads section
- **Actions**: View, Edit, Archive, Bulk archive

### Content Management
- **List View** - DataTable với columns: title, slug, status, updatedAt, publishedAt
- **Actions**: View, Edit, Archive/Unarchive, Bulk archive

## 🔧 Development Guidelines

### Component Size Limit
**Quy tắc bắt buộc**: Mỗi file `.tsx` **KHÔNG được vượt quá 200 lines**

Nếu vượt quá:
- Tách thành các component nhỏ hơn
- Extract logic vào custom hooks
- Tạo shared components cho patterns lặp lại

### shadcn Guard
**Quy tắc bắt buộc**: Không được sửa trực tiếp các file trong `components/ui/**`

Thay vào đó:
- Dùng wrapper components nếu cần customization
- Import và compose từ shadcn primitives
- Giữ nguyên shadcn components để dễ update

### File Organization
- **Components**: Mỗi feature có folder riêng (`leads/`, `clients/`, `dashboard/sections/`)
- **Data**: Mock data trong `data/` với types từ `types/`
- **Actions**: Action contracts trong `lib/actions/` với Sonner notify
- **Types**: Centralized types trong `types/index.ts`

### TypeScript
- Strict mode enabled
- Tất cả components có proper types
- Types exported từ `types/index.ts`

### Notifications
- Sử dụng **Sonner** (`lib/notify.ts`) cho tất cả notifications
- Không dùng toast deprecated
- Pattern: `notifySuccess()`, `notifyError()`, `notifyInfo()`, `notifyWarning()`

## 🧪 Testing & Quality

### Linting
```bash
npm run lint
```

### Build Check
```bash
npm run build
```

### Manual Testing Checklist
- [ ] Dashboard charts render correctly
- [ ] DataTable sorting/filtering/pagination works
- [ ] Detail panels open/close correctly (desktop + mobile)
- [ ] Actions show Sonner notifications
- [ ] Bulk actions có confirm dialog
- [ ] Column visibility persists trong localStorage
- [ ] Loading states hiển thị đúng
- [ ] Error boundaries catch errors
- [ ] Not-found pages render correctly

## 🚢 Deployment

### Environment Variables
Hiện tại không cần environment variables (mock data mode)

### Build Configuration
- React Compiler enabled
- TypeScript strict mode
- ESLint với Next.js config

### Production Build
```bash
npm run build
npm run start
```

## 📊 Data Flow

### Current State (Phase A)
- **MSW (Mock Service Worker)** - Mock REST API với handlers structure
- **API Client** - Type-safe fetch wrapper sẵn sàng cho real API
- **Data Adapter Layer** - Abstract layer cho entities (clients, leads, posts, schedules, tasks)
- **In-memory Store** - Store structure với seed data generator (TODO: implement seed data)
- **Mock Data** - Data từ `data/*.ts` files (sẵn sàng migrate sang store)
- **Mock Actions** - Actions trong `lib/actions/*.ts` với setTimeout simulation
- **Local State** - React state cho UI interactions
- **Telemetry** - Event tracking với console adapter (dev mode)

### Next Steps (Phase B+)
- **Store Integration** - Connect MSW handlers với dataStore
- **Seed Data** - Generate realistic data với relationships
- **Persistence** - localStorage/IndexedDB persistence
- **Real API Integration** - Swap MSW handlers với real API calls
- **Server Components** - Fetch data từ server
- **Real-time Updates** - WebSocket hoặc polling cho live data

## 🗺 Roadmap

### Phase 1 ✅ (Hoàn thành)
- [x] Shell ổn định (sidebar/topbar/breadcrumb/user menu/mobile offcanvas)
- [x] DataTable kit reusable 100%
- [x] Leads/Clients/Content pages với detail panels
- [x] Dashboard production-grade
- [x] Hardening (loading/error/not-found)

### Phase A ✅ (Vừa hoàn thành - App Shell & UX Foundation)
- [x] **Topbar Enhancement** - Breadcrumbs navigation, global search, quick actions, user menu, notifications
- [x] **Command Palette** - ⌘K keyboard shortcut với search pages, create actions, jump to entity
- [x] **Notifications Center** - Notifications drawer với badge count, mark as read
- [x] **Skeleton Components** - Table, card, list, detail panel skeletons
- [x] **MSW Setup** - Mock Service Worker với handlers structure cho REST API
- [x] **API Client** - Type-safe fetch wrapper với error handling
- [x] **Data Adapter Layer** - Abstract layer cho clients/leads/posts/schedules/tasks
- [x] **Store & Seed Structure** - In-memory store với seed data structure
- [x] **App Telemetry** - Analytics adapter với console logger, event tracking

### Phase B (Next - Core CRM)
- [ ] Leads Pipeline (Kanban + Table + Bulk actions + Lead detail drawer + Smart filters)
- [ ] Clients 360 (Client list + Client detail page + Financial snapshot + Relationship tracking + Activity timeline + Health Score)
- [ ] Notes, Tasks, Reminders (Markdown-lite editor, Task views, Reminders widget)

### Phase C (Content Ops)
- [ ] Posts CMS-lite (List, Editor với content blocks, Publishing workflow, SEO checklist)
- [ ] Scheduling Center (Calendar, Timeline, Queue views, Linking schedules)
- [ ] Media Library (Upload, Local preview, Tags, Folders, Usage panel, Basic transforms)

### Phase D (Collaboration Layer)
- [ ] Threaded Comments (under posts/schedules, Mentions, Reactions, Resolve/unresolve)
- [ ] Activity timeline auto-logging
- [ ] Notifications center integration

### Phase E (Insights & Reports)
- [ ] Dashboard 2.0 (Widgets với drag & drop, Persist per user, Widget settings)
- [ ] Reports MVP (Leads, Clients, Content reports, Export CSV/PDF, Saved views)

### Phase F (Admin Settings & Security)
- [ ] Settings Center (Profile, Preferences, Team directory, Roles & permissions mock RBAC)
- [ ] Audit Log (Central log page)

### Phase G (Quality & Polishing)
- [ ] A11y + UX polish
- [ ] Performance (Virtualized table, Lazy load, Image optimization)
- [ ] Testing (Unit tests, E2E smoke với Playwright)

## 📚 Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [Sonner (Toast)](https://sonner.emilkowal.ski)
- [Recharts](https://recharts.org)
- [Radix UI](https://www.radix-ui.com)

## 📝 Notes

### Phase A Completion Notes
- **MSW Setup**: MSW handlers structure đã sẵn sàng, cần install MSW package và generate service worker
- **API Client**: Type-safe fetch wrapper hoàn chỉnh, sẵn sàng integrate với real API
- **Data Adapters**: Tất cả adapters đã được tạo (clients, leads, posts, schedules, tasks), cần connect với store
- **Store & Seed**: Store structure đã có, cần implement seed data generation và persistence
- **Telemetry**: Event tracking sẵn sàng, có thể swap adapter cho production (Google Analytics, Mixpanel, etc.)

### General Notes
- **Mock Data**: Hiện tại sử dụng mock data từ `data/*.ts`, sẵn sàng migrate sang store/seed
- **Actions**: Tất cả actions đều mock với setTimeout, sẽ thay bằng API calls qua adapters
- **Detail Panels**: Notes trong detail panels là mock state, chưa persist
- **Column Visibility**: Persist vào localStorage theo pathname
- **Server-ready**: DataTable kit đã support manualPagination cho server-side data
- **Component Size**: Tất cả components tuân thủ limit 200 lines
- **shadcn Guard**: Không sửa trực tiếp `components/ui/**`, dùng wrapper pattern

---

**Version**: 1.1.0 (Phase A Complete)
**Last Updated**: January 2025
