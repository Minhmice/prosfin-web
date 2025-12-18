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
- **Sonner**: 2.0.7 - Toast notifications
- **React Hook Form**: 7.68.0 - Form handling
- **Zod**: 4.2.1 - Schema validation

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
│   ├── site-header.tsx          # Top header với breadcrumb
│   ├── nav-main.tsx             # Main navigation
│   ├── nav-secondary.tsx        # Secondary navigation
│   ├── nav-user.tsx             # User menu
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
│   ├── notify.ts               # Sonner notification helpers
│   └── utils.ts                # Utility functions (cn, etc.)
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
- **Header** - Top bar với breadcrumb dynamic, sidebar trigger
- **Layout** - Route group `(admin)` với SidebarProvider và Toaster

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

### Current State (Phase 1)
- **Mock Data** - Data từ `data/*.ts` files
- **Mock Actions** - Actions trong `lib/actions/*.ts` với setTimeout simulation
- **Local State** - React state cho UI interactions

### Future State (Phase 3)
- **API Integration** - Connect actions to backend API
- **Server Components** - Fetch data từ server
- **Real-time Updates** - WebSocket hoặc polling cho live data

## 🗺 Roadmap

### Phase 1 ✅ (Hoàn thành)
- [x] Shell ổn định (sidebar/topbar/breadcrumb/user menu/mobile offcanvas)
- [x] DataTable kit reusable 100%
- [x] Leads/Clients/Content pages với detail panels
- [x] Dashboard production-grade
- [x] Hardening (loading/error/not-found)

### Phase 2 (Planned)
- [ ] Authentication & Authorization
- [ ] User management
- [ ] Settings page implementation
- [ ] Advanced filters & search
- [ ] Export functionality
- [ ] Audit logs

### Phase 3 (Planned)
- [ ] API integration
- [ ] Real-time updates
- [ ] Advanced analytics
- [ ] Custom dashboards
- [ ] Workflow automation

## 📚 Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [Sonner (Toast)](https://sonner.emilkowal.ski)
- [Recharts](https://recharts.org)
- [Radix UI](https://www.radix-ui.com)

## 📝 Notes

- **Mock Data**: Hiện tại sử dụng mock data, sẵn sàng cho API integration
- **Actions**: Tất cả actions đều mock với setTimeout, sẽ thay bằng API calls trong Phase 3
- **Detail Panels**: Notes trong detail panels là mock state, chưa persist
- **Column Visibility**: Persist vào localStorage theo pathname
- **Server-ready**: DataTable kit đã support manualPagination cho server-side data

---

**Version**: 1.0.0 (Phase 1 Complete)
**Last Updated**: 2024
