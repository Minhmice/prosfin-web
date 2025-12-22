# CRM Module - Hướng dẫn chi tiết

## 📋 Tổng quan

Module CRM (Customer Relationship Management) quản lý toàn bộ quy trình từ Lead đến Client, bao gồm tracking, conversion, và quản lý thông tin khách hàng. Module sử dụng provider pattern với factory để chọn giữa mock (development) và HTTP (production) provider.

## 🎯 Tính năng chính

### 1. Leads Management (`/crm/leads`)

#### 1.1. DataTable với đầy đủ tính năng

**Columns hiển thị (theo `leads-table-columns.tsx`):**
- **Lead** - Tên lead với email và phone (nếu có) hiển thị bên dưới
- **Company** - Tên công ty
- **Source** - Badge với variant theo source:
  - `web` - default variant
  - `referral` - secondary variant
  - `event` - outline variant
  - `other` - outline variant
- **Stage** - Badge với variant theo stage:
  - `new` - default variant
  - `qualified` - secondary variant
  - `proposal` - outline variant
  - `won` - default variant
  - `lost` - destructive variant
- **Score** - Progress bar (0-100) với số điểm hiển thị bên cạnh
- **Owner** - Tên owner hoặc "Unassigned" nếu chưa có
- **Next Action** - Ngày hành động tiếp theo (format: "MMM d, yyyy")
- **Updated** - Ngày cập nhật (format: "MMM d, yyyy")

**Tính năng DataTable:**
- ✅ Sorting: Click header để sort theo bất kỳ column nào (manual sorting)
- ✅ Filtering: Advanced filters qua toolbar (manual filtering)
- ✅ Pagination: Server-side pagination với page size tùy chỉnh (manual pagination)
- ✅ Row selection: Checkbox để chọn nhiều leads
- ✅ Column visibility: Toggle hiển thị/ẩn columns, persist trong localStorage theo pathname
- ✅ URL sync: Tất cả filters/sort/pagination được sync vào URL để share link
- ✅ Highlight row: Support `highlight` query param để highlight row cụ thể

**Implementation:**
- Sử dụng `@tanstack/react-table` với manual pagination/sorting/filtering
- Callbacks: `onPaginationChange`, `onSortingChange`, `onFilterChange`
- Row selection state được quản lý bởi table instance
- Column visibility được lưu trong localStorage với key `table-columns-${pathname}`

#### 1.2. Toolbar Filters (`leads-table-toolbar.tsx`)

**Search:**
- Input field với placeholder "Search leads..."
- Debounced search (300ms) qua `useDebouncedCallback` từ `use-debounce`
- Tìm kiếm theo name, company, email
- Sync vào URL param `q`

**Stage Filter:**
- Select dropdown với options: All Stages, New, Qualified, Proposal, Won, Lost
- Sync vào URL param `stage`
- Active filter chip hiển thị khi có filter

**Source Filter:**
- Select dropdown với options: All Sources, Web, Referral, Event, Other
- Sync vào URL param `source`
- Active filter chip hiển thị khi có filter

**Owner Filter:**
- Sử dụng `OwnerCombobox` component (combobox với search)
- Hiển thị avatar + tên
- Filter "Unassigned" để tìm leads chưa có owner
- Sync vào URL param `owner`

**Score Range:**
- 2 input fields (min và max) với type="number"
- Range: 0-100
- Sync vào URL params `scoreMin` và `scoreMax`
- Active filter chip hiển thị range khi có filter

**Date Range:**
- Popover với Calendar component (mode="range")
- Date picker với 2 months view
- Sync vào URL params `dateFrom` và `dateTo` (ISO date strings)
- Active filter chip hiển thị date range khi có filter

**Active Filter Chips:**
- Hiển thị tất cả filters đang active dưới dạng badges
- Mỗi badge có X button để remove filter riêng lẻ
- Button "Reset" để clear tất cả filters (gọi `resetFilters()`)

**Columns Menu:**
- Sử dụng `ColumnsMenu` component từ `@/components/table/columns-menu`
- Toggle show/hide columns
- Persist trong localStorage

**Share Link:**
- Sử dụng `ShareLinkButton` component từ `@/features/crm/shared/share-link-button`
- Copy URL hiện tại (bao gồm tất cả filters) vào clipboard
- Toast notification khi copy thành công

#### 1.3. Row Actions (`leads-table-row-actions.tsx`)

**Quick View:**
- Click row hoặc action "View" → mở `LeadQuickViewDialog`
- Hiển thị thông tin đầy đủ của lead
- Actions: Edit, Convert, Delete

**Edit:**
- Mở `LeadSheet` ở mode "edit"
- Form validation với Zod schema (`leadSchema`)
- React Hook Form với `zodResolver`
- Auto-reset form khi lead thay đổi

**Convert to Client:**
- Mở `LeadConvertDialog` để xác nhận
- Sử dụng `useConvertLead` hook
- Tự động tạo Client từ Lead qua `crmProvider.convertLead()`
- Giữ nguyên thông tin (name, email, company, phone, ownerId)
- Lead stage chuyển thành "won" sau khi convert
- Navigate đến Client detail với highlight sau khi convert

**Delete:**
- Confirmation dialog (browser confirm)
- Gọi `crmProvider.deleteLead()`
- Toast notification
- Refresh table sau khi delete

#### 1.4. Bulk Actions (`leads-bulk-actions.tsx`)

**Assign Owner:**
- Chọn nhiều leads → "Assign Owner"
- Mở `BulkAssignOwnerDialog`
- Chọn owner từ danh sách users (mock users hiện tại)
- Bulk update owner cho tất cả selected leads qua `Promise.all()`
- Toast notification: "Assigned owner to N leads"

**Set Stage:**
- Chọn nhiều leads → "Set Stage"
- Mở `BulkSetStageDialog`
- Chọn stage mới
- Bulk update stage (map stage sang status cho API compatibility)
- Toast notification: "Set stage for N leads"

**Export CSV:**
- Export selected leads hoặc tất cả filtered leads
- Sử dụng `exportLeadsToCSV()` từ `export-csv.ts`
- CSV format với headers: Name, Company, Email, Phone, Stage, Source, Score, Owner, Next Action, Created At, Updated At
- Filename: `leads-YYYY-MM-DD.csv` (nếu không chỉ định)
- Escape CSV fields (handle commas, quotes, newlines)
- Download trigger: Create blob URL → trigger download

**Delete:**
- Bulk delete với confirmation
- Xóa tất cả selected leads qua `Promise.all()`
- Toast notification
- Refresh table sau khi delete

#### 1.5. Lead Source Chart (`lead-source-chart-card.tsx`)

**Chart Card:**
- Hiển thị biểu đồ phân bố leads theo source
- Sử dụng `useLeadSourceChart` hook
- Time range selector (7 days, 30 days)
- Data từ `crmProvider.getLeadSourceSeries()`
- Returns `LeadSourceSeries` với points array (date + source counts)

**Data Structure:**
```typescript
interface LeadSourceSeries {
  points: Array<{
    date: string // ISO date string (YYYY-MM-DD)
    [source: string]: number | string // web, referral, event, other, etc.
  }>
}
```

#### 1.6. Empty State (`leads-empty-state.tsx`)

- Hiển thị khi không có leads (và không có filters active)
- Illustration + message
- CTA button "Create Lead" để tạo lead đầu tiên
- Gọi `onNewLead` callback

### 2. Clients Management (`/crm/clients`)

#### 2.1. DataTable (`clients-table-columns.tsx`)

**Columns:**
- **Client** - Avatar với initials + tên và title (nếu có)
- **Company** - Tên công ty
- **Status** - Badge với variant:
  - `active` - default variant
  - `inactive` - secondary variant
  - `archived` - outline variant
- **Owner** - Tên owner hoặc "Unassigned" nếu chưa có
- **Tags** - Tags badges (hiển thị tối đa 2, +N nếu có nhiều hơn)
- **Last Contacted** - Ngày liên hệ cuối (format: "MMM d, yyyy") hoặc "—" nếu chưa có
- **Created** - Ngày tạo (format: "MMM d, yyyy")

**Tính năng tương tự Leads:**
- Sorting, Filtering, Pagination, Row selection, Column visibility, URL sync
- Highlight row support với `highlightedRowId` prop

#### 2.2. Toolbar Filters (`clients-table-toolbar.tsx`)

**Search:**
- Tìm kiếm theo name, company, email
- Debounced search (300ms)

**Status Filter:**
- Select dropdown: All Status, Active, Inactive, Archived
- Sync vào URL param `status`

**Owner Filter:**
- Sử dụng `OwnerCombobox` component
- Filter "Unassigned"
- Sync vào URL param `owner`

**Tags Filter:**
- Sử dụng `TagsMultiSelect` component
- Multi-select tags
- Hiển thị selected tags dưới dạng chips (mỗi tag một chip riêng)
- Sync vào URL param `tags` (array)

**Active Filter Chips + Reset + Share Link:**
- Tương tự Leads

#### 2.3. Client 360 View (`client-sheet.tsx` + `client-360-tabs.tsx`)

**Client Sheet với 3 modes:**
- `create` - Tạo client mới
- `edit` - Chỉnh sửa client
- `view` - Xem chi tiết với Client 360 tabs

**Overview Tab (`client-360-overview.tsx`):**
- Thông tin cơ bản: Name, Company, Email, Phone, Status
- Owner assignment (read-only trong view mode)
- Tags management (read-only trong view mode)
- Last contacted date
- Created/Updated timestamps

**Related Leads Tab (`client-360-leads.tsx`):**
- Danh sách leads liên quan đến client này (filter theo company)
- DataTable mini với columns: Name, Stage, Source, Score
- Link để mở Lead detail
- Data từ `getClient360().relatedLeads`

**Notes Tab (`client-360-notes.tsx`):**
- Danh sách notes về client
- Timeline view (newest first)
- Add new note với textarea
- Edit/Delete note (nếu là author)
- Format: Author name, Date, Content
- Data từ `getClient360().notes`

**Tasks Tab (`client-360-tasks.tsx`):**
- Todo list cho client
- Columns: Title, Status, Due Date, Assigned To
- Actions: Create, Edit, Mark Complete, Delete
- Status: todo, in_progress, completed
- Due date với color coding (overdue = red)
- Data từ `getClient360().tasks`

**Files Tab (`client-360-files.tsx`):**
- File attachments
- Grid view với file info
- Upload new file (chưa implement)
- Download, Preview, Delete
- Metadata: Name, Size, Uploaded by, Date
- Data từ `getClient360().files`

#### 2.4. Row Actions (`clients-table-row-actions.tsx`)

**View:**
- Mở `ClientSheet` ở mode "view"
- Read-only view với tất cả tabs (Client 360)

**Edit:**
- Mở `ClientSheet` ở mode "edit"
- Form validation với `clientSchema`
- Save changes qua `crmProvider.updateClient()`

**Delete:**
- Confirmation dialog (browser confirm)
- Gọi `crmProvider.deleteClient()`
- Toast notification
- Refresh table

#### 2.5. Bulk Actions (`clients-bulk-actions.tsx`)

**Archive:**
- Bulk archive selected clients (chưa implement đầy đủ)
- Chuyển status thành "archived"
- Toast notification

**Export CSV:**
- Export selected hoặc filtered clients
- Sử dụng `exportClientsToCSV()` từ `export-csv.ts`
- CSV format với headers: Name, Company, Title, Email, Phone, Status, Owner, Tags, Last Contacted, Created At, Updated At
- Format: `clients-YYYY-MM-DD.csv`

#### 2.6. Deep Linking & Highlight

**URL Highlight:**
- URL param `?highlight=client-id` để highlight row
- Auto-scroll đến row được highlight (sử dụng `scrollIntoView`)
- Visual highlight (ring border + background color) trong 5 giây
- Tự động remove highlight sau timeout
- Implementation trong `clients/page.tsx`:
  - Read `highlight` từ URL searchParams
  - Check nếu client ID trong current page
  - Set `highlightedClientId` state
  - Scroll to row và auto-remove sau 5s
  - Nếu client không trong current page, search và navigate

**Use Cases:**
- Share link từ Client 360 → Leads list
- Navigate từ conversion dialog → Client list với highlight

### 3. Dashboard Widgets

#### 3.1. CRM Dashboard (`/dashboard/crm`)

**KPI Cards:**
- **Total Leads** - Tổng số leads
- **New Leads (7d)** - Leads mới trong 7 ngày
- **Conversion Rate** - Tỷ lệ chuyển đổi (won/total)
- **Active Clients** - Số clients đang active

**Charts:**
- **Leads by Stage** - Pie chart phân bố theo stage
- **Leads by Source** - Bar chart theo source
- **Conversion Funnel** - Funnel chart từ new → won
- **Leads Trend** - Line chart theo thời gian

**Recent Activity:**
- Timeline các actions gần đây:
  - Lead created
  - Lead converted
  - Client updated
  - Note added
  - Task completed

**Quick Actions:**
- Create Lead
- Create Client
- View All Leads
- View All Clients

## 🔧 Technical Details

### Provider Pattern

**Factory Pattern (`provider.factory.ts`):**
```typescript
export function createCRMProvider(): CRMProvider {
  // Default to mock provider for development to avoid auth issues
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true" || process.env.NODE_ENV === "development") {
    return new MockCRMProvider()
  }
  return new HTTPCRMProvider()
}
```

**Provider Interface (`provider.ts`):**
```typescript
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface CRMProvider {
  // Clients
  listClients(params: ClientFilterInput): Promise<PaginatedResponse<Client>>
  getClient(id: string): Promise<Client>
  createClient(data: CreateClientInput): Promise<Client>
  updateClient(id: string, data: UpdateClientInput): Promise<Client>
  deleteClient(id: string): Promise<void>
  getClient360(clientId: string): Promise<Client360>

  // Leads
  listLeads(params: LeadFilterInput): Promise<PaginatedResponse<Lead>>
  getLead(id: string): Promise<Lead>
  createLead(data: CreateLeadInput): Promise<Lead>
  updateLead(id: string, data: UpdateLeadInput): Promise<Lead>
  deleteLead(id: string): Promise<void>
  convertLead(id: string): Promise<{ client: Client }>
  getLeadSourceSeries(params: { range: "7d" | "30d" }): Promise<LeadSourceSeries>
}
```

**Mock Provider (`provider.mock.ts`):**
- In-memory implementation với deep clone để tránh mutation
- Sử dụng mock data từ `@/data/clients` và `@/data/leads`
- Mock 360 data (notes, tasks, files) được hardcode
- Filtering, sorting, pagination được implement client-side
- Date range filtering support
- Score range filtering support

**HTTP Provider (`provider.http.ts`):**
- HTTP API implementation (production)
- Gọi API endpoints qua fetch
- Error handling và retry logic

### Types & Schemas

**Types (`types.ts`):**
```typescript
export type ClientStatus = "active" | "inactive" | "archived"

export interface Client {
  id: string
  name: string
  company: string
  title?: string
  email: string
  phone?: string
  status: ClientStatus
  ownerId?: string
  ownerName?: string
  tags: string[]
  lastContactedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  id: string
  clientId: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  clientId: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "completed"
  dueDate?: Date
  assignedToId?: string
  assignedToName?: string
  createdAt: Date
  updatedAt: Date
}

export interface File {
  id: string
  clientId: string
  name: string
  url: string
  size: number
  mimeType: string
  uploadedBy: string
  uploadedByName: string
  createdAt: Date
}

export interface Client360 {
  client: Client
  relatedLeads: Lead[]
  notes: Note[]
  tasks: Task[]
  files: File[]
}

export type LeadStage = "new" | "qualified" | "proposal" | "won" | "lost"
export type LeadSource = "web" | "referral" | "event" | "other"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  stage: LeadStage
  source: LeadSource
  score: number
  ownerId?: string
  ownerName?: string
  nextActionAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface LeadSourceSeries {
  points: Array<{
    date: string
    [source: string]: number | string
  }>
}
```

**Schemas (`schemas.ts`):**
```typescript
export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
  tags: z.array(z.string()).default([]),
  lastContactedAt: z.date().optional(),
})

export const clientListQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]).optional(),
  owner: z.string().optional(),
  tags: z.union([
    z.array(z.string()),
    z.string().transform((val) => [val]),
  ]).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(), // format: "-updatedAt" or "name.asc"
})

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  stage: z.enum(["new", "qualified", "proposal", "won", "lost"]),
  source: z.enum(["web", "referral", "event", "other"]),
  score: z.number().min(0).max(100).default(0),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
  nextActionAt: z.date().optional(),
})

export const leadListQuerySchema = z.object({
  q: z.string().optional(),
  stage: z.enum(["new", "qualified", "proposal", "won", "lost"]).optional(),
  source: z.enum(["web", "referral", "event", "other"]).optional(),
  owner: z.string().optional(),
  scoreMin: z.coerce.number().int().min(0).max(100).optional(),
  scoreMax: z.coerce.number().int().min(0).max(100).optional(),
  dateFrom: z.string().optional(), // ISO date string
  dateTo: z.string().optional(), // ISO date string
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(), // format: "-updatedAt" or "name.asc"
})
```

### URL State Management

**Hook: `useLeadListQuery` (`hooks/use-lead-list-query.ts`):**
- Sync tất cả filters/sort/pagination vào URL
- Parse từ URL khi component mount sử dụng `parseQuery()` từ `@/features/crm/shared/query`
- Debounced search updates (300ms) qua `useDebouncedCallback`
- Reset filters function (clear URL params)
- Update query function với comparison để tránh unnecessary updates
- Sử dụng `stringifyQuery()` để convert query object thành URLSearchParams (chỉ include non-default values)

**Hook: `useClientListQuery` (`hooks/use-client-list-query.ts`):**
- Tương tự `useLeadListQuery`
- Support tags array trong query params

**Query Utilities (`shared/query/`):**
- `parse-query.ts`: Parse URLSearchParams vào typed object với Zod schema validation
- `stringify-query.ts`: Convert typed query object thành URLSearchParams (chỉ include non-default values)
- Normalize defaults: page=1, pageSize=20, sort=undefined
- Handle arrays (tags) với multiple params hoặc single param

**Query Params Format:**
- `q` - Search query (string)
- `stage` / `status` - Stage/Status filter (enum)
- `source` - Source filter (enum)
- `owner` - Owner ID (string)
- `scoreMin`, `scoreMax` - Score range (number)
- `dateFrom`, `dateTo` - Date range (ISO date string)
- `tags` - Tags (array, multiple params: `?tags=tag1&tags=tag2`)
- `sort` - Sort field và direction (format: `-updatedAt` cho desc, `name` cho asc)
- `page` - Page number (number, default: 1, không include nếu = 1)
- `pageSize` - Items per page (number, default: 20, không include nếu = 20)
- `highlight` - Row ID to highlight (string)

### DataTable Integration

**Manual Pagination/Sorting/Filtering:**
- DataTable component (`@/components/table/table.tsx`) hỗ trợ server-side operations
- Props: `manualPagination`, `manualSorting`, `manualFiltering`
- Callbacks: `onPaginationChange`, `onSortingChange`, `onFilterChange`
- Provider methods nhận params và return `PaginatedResponse<T>`
- Page count và row count được tính từ server response

**Row Selection:**
- Checkbox column tự động thêm vào khi `enableRowSelection={true}`
- `rowSelection` state được quản lý bởi table instance
- Bulk actions chỉ enable khi có selection
- `getFilteredSelectedRowModel()` để lấy selected rows

**Column Visibility:**
- Dropdown menu trong toolbar qua `ColumnsMenu` component
- Toggle show/hide columns
- Persist trong localStorage với key `table-columns-${pathname}`
- State được sync với table instance

**Highlight Row:**
- Support `highlightedRowId` prop
- Visual highlight: `bg-primary/10 border-primary border-2`
- Auto-scroll và auto-remove highlight

### Forms & Validation

**React Hook Form + Zod:**
- Schema validation trong `schemas.ts`
- Form components với shadcn/ui primitives (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`)
- Error messages tự động từ Zod schema
- `zodResolver` để integrate Zod với React Hook Form

**Lead Form Fields (`lead-form-fields.tsx`):**
- Name (required, text input)
- Company (required, text input)
- Email (required, email input với email validation)
- Phone (optional, text input)
- Stage (required, select với enum options)
- Source (required, select với enum options)
- Score (0-100, optional, number input với min/max)
- Owner (optional, OwnerCombobox)
- Next Action Date (optional, date picker)

**Client Form Fields (`client-form-fields.tsx`):**
- Name (required)
- Company (required)
- Title (optional)
- Email (required, email format)
- Phone (optional)
- Status (required, enum)
- Owner (optional, OwnerCombobox)
- Tags (multi-select, TagsMultiSelect component)

**Form Submission:**
- `onSubmit` handler validate form và call provider method
- Toast notification cho success/error
- Call `onSuccess` callback để refresh table
- Auto-reset form khi mode/client thay đổi

### Export Functionality

**CSV Export (`export-csv.ts`):**
- Export selected rows hoặc filtered results
- Format: Standard CSV với headers
- Encoding: UTF-8 (không có BOM trong implementation hiện tại)
- Download trigger: Create blob URL → trigger download → cleanup

**Export Functions:**
- `leadsToCSV(leads: Lead[]): string` - Convert leads array thành CSV string
- `clientsToCSV(clients: Client[]): string` - Convert clients array thành CSV string
- `downloadCSV(csvContent: string, filename: string): void` - Download CSV file
- `exportLeadsToCSV(leads: Lead[], filename?: string): void` - Export và download leads
- `exportClientsToCSV(clients: Client[], filename?: string): void` - Export và download clients

**CSV Formatting:**
- Escape CSV fields: handle commas, quotes, newlines
- Wrap fields containing special chars in quotes
- Escape quotes bằng double quotes (`""`)
- Format dates: ISO string (YYYY-MM-DD)
- Format arrays: semicolon-separated cho tags

**Export Columns:**
- Leads: Name, Company, Email, Phone, Stage, Source, Score, Owner, Next Action, Created At, Updated At
- Clients: Name, Company, Title, Email, Phone, Status, Owner, Tags, Last Contacted, Created At, Updated At

## 📁 File Structure

```
apps/admin/src/features/crm/
├── clients/
│   ├── client-360-files.tsx          # Files tab component
│   ├── client-360-leads.tsx          # Related leads tab component
│   ├── client-360-notes.tsx          # Notes tab component
│   ├── client-360-overview.tsx       # Overview tab component
│   ├── client-360-tabs.tsx           # Client 360 tabs wrapper
│   ├── client-360-tasks.tsx          # Tasks tab component
│   ├── client-form-fields.tsx        # Form fields component
│   ├── client-form-sheet.tsx         # (Not used, merged into client-sheet.tsx)
│   ├── client-sheet.tsx              # Main Client Sheet (create/edit/view)
│   ├── clients-bulk-actions.tsx      # Bulk actions definition
│   ├── clients-empty-state.tsx      # Empty state component
│   ├── clients-table-columns.tsx    # DataTable columns definition
│   ├── clients-table-row-actions.tsx # Row actions definition
│   ├── clients-table-toolbar.tsx    # Filter toolbar component
│   ├── export-csv.ts                 # CSV export utility
│   ├── owner-combobox.tsx            # Owner selector combobox
│   └── tags-multi-select.tsx         # Tags multi-select component
├── leads/
│   ├── bulk-assign-owner-dialog.tsx  # Bulk assign owner dialog
│   ├── bulk-set-stage-dialog.tsx     # Bulk set stage dialog
│   ├── export-csv.ts                 # CSV export utility
│   ├── lead-convert-dialog.tsx       # Convert to client dialog
│   ├── lead-form-fields.tsx          # Form fields component
│   ├── lead-form-sheet.tsx           # (Not used, merged into lead-sheet.tsx)
│   ├── lead-quick-view-dialog.tsx    # Quick view dialog
│   ├── lead-sheet.tsx                # Main Lead Sheet (create/edit)
│   ├── lead-source-chart-card.tsx    # Chart card wrapper
│   ├── lead-source-chart.tsx         # Chart component
│   ├── leads-bulk-actions.tsx        # Bulk actions definition
│   ├── leads-empty-state.tsx         # Empty state component
│   ├── leads-table-columns.tsx      # DataTable columns definition
│   ├── leads-table-row-actions.tsx   # Row actions definition
│   ├── leads-table-toolbar.tsx       # Filter toolbar component
│   ├── use-convert-lead.ts           # Convert lead hook
│   └── use-lead-source-chart.ts      # Chart data hook
├── data/
│   ├── provider.ts                    # Main provider interface và singleton export
│   ├── provider.factory.ts            # Factory pattern để chọn provider
│   ├── provider.mock.ts               # Mock implementation (development)
│   └── provider.http.ts               # HTTP implementation (production)
├── shared/
│   ├── query/                         # URL query utilities
│   │   ├── index.ts                  # Exports
│   │   ├── parse-query.ts            # Parse URLSearchParams với Zod
│   │   └── stringify-query.ts        # Convert query object thành URLSearchParams
│   └── share-link-button.tsx         # Share link component
├── schemas.ts                         # Zod schemas cho validation
└── types.ts                           # TypeScript types

apps/admin/src/hooks/
├── use-lead-list-query.ts            # Lead list query hook (URL state sync)
└── use-client-list-query.ts          # Client list query hook (URL state sync)

apps/admin/src/app/(admin)/crm/
├── leads/
│   └── page.tsx                      # Leads page component
└── clients/
│   └── page.tsx                      # Clients page component
```

## 🚀 Usage Examples

### Tạo Lead mới

1. Click "New Lead" button trong PageHeader
2. `LeadSheet` mở ở mode "create"
3. Điền form:
   - Name: "Nguyễn Văn A"
   - Company: "Công ty ABC"
   - Email: "nguyenvana@example.com"
   - Stage: "new"
   - Source: "web"
4. Click "Create" button
5. Form validation (Zod schema)
6. Gọi `crmProvider.createLead()`
7. Toast notification: "Lead created"
8. Close sheet và refresh table
9. Lead được tạo và hiển thị trong table

### Convert Lead thành Client

1. Tìm lead trong table
2. Click row action "Convert"
3. `LeadConvertDialog` mở với confirmation message
4. Click "Convert" trong dialog
5. Gọi `useConvertLead` hook → `crmProvider.convertLead()`
6. Lead stage chuyển thành "won"
7. Client mới được tạo từ lead data
8. Navigate đến `/crm/clients?highlight={clientId}`
9. Client list mở với client được highlight

### Filter Leads theo Source

1. Trong Leads page, chọn "Source" filter trong toolbar
2. Chọn "web" từ dropdown
3. `updateQuery({ source: "web", page: 1 })` được gọi
4. URL update: `?source=web`
5. `fetchLeads()` được gọi với new query
6. Table chỉ hiển thị leads từ web
7. Active filter chip hiển thị "Source: web"
8. Share link này để team xem cùng view

### Bulk Assign Owner

1. Chọn nhiều leads (checkbox)
2. Bulk bar hiển thị với actions
3. Click bulk action "Assign Owner"
4. `BulkAssignOwnerDialog` mở
5. Chọn owner từ combobox
6. Click "Assign"
7. `Promise.all()` update owner cho tất cả selected leads
8. Toast notification: "Assigned owner to N leads"
9. Refresh table

### Export CSV

1. Apply filters (optional)
2. Chọn leads cần export (optional, nếu không chọn sẽ export tất cả filtered)
3. Click bulk action "Export CSV"
4. `exportLeadsToCSV()` được gọi với leads array
5. Convert leads thành CSV string
6. Create blob và download link
7. Trigger download: `leads-2024-01-15.csv`
8. Cleanup blob URL

### Xem Client 360

1. Click row action "View" trên client
2. `ClientSheet` mở ở mode "view"
3. `Client360Tabs` component render với tabs:
   - Overview (default)
   - Related Leads
   - Notes
   - Tasks
   - Files
4. Switch tabs để xem:
   - Related Leads: Filter leads theo company
   - Notes: Timeline view, add/edit/delete notes
   - Tasks: Todo list, create/complete tasks
   - Files: File attachments (upload/download)

## 🔗 Integration Points

### Với Content Module

- **Lead Source Tracking**: Leads từ web form có source="web"
- **Attribution**: UTM params từ marketing website được lưu vào lead metadata (future)

### Với Dashboard

- **KPI Cards**: Hiển thị số liệu từ CRM provider
- **Charts**: Data aggregation từ leads/clients
- **Recent Activity**: Events từ CRM actions (via `activity-events.ts`)

## 📊 Data Flow

```
User Action (filter/search/sort/pagination)
  ↓
Component (LeadsPage/ClientsPage)
  ↓
Hook (useLeadListQuery/useClientListQuery)
  ↓
updateQuery() → stringifyQuery()
  ↓
URL State Update (router.replace)
  ↓
useEffect detect queryString change
  ↓
fetchLeads() / fetchClients()
  ↓
Provider (crmProvider.listLeads/listClients)
  ↓
API Call (Mock/HTTP)
  ↓
PaginatedResponse<Lead/Client>
  ↓
State Update (setLeads/setClients)
  ↓
DataTable Re-render với new data
```

**Convert Lead Flow:**
```
User clicks "Convert"
  ↓
LeadConvertDialog opens
  ↓
User confirms
  ↓
useConvertLead hook
  ↓
crmProvider.convertLead(leadId)
  ↓
Create Client from Lead data
  ↓
Update Lead stage to "won"
  ↓
Navigate to /crm/clients?highlight={clientId}
  ↓
Client list loads với highlight
```

## 🎨 UI/UX Patterns

### Loading States

- Skeleton loaders cho table rows (TableLoading component)
- Spinner cho buttons khi đang process (`isSubmitting` state)
- Progress bar cho bulk operations (future)

### Error Handling

- Toast notifications cho errors (sonner)
- Inline validation errors trong forms (FormMessage)
- Retry buttons cho failed operations (future)

### Empty States

- Illustration + message
- CTA buttons để tạo item đầu tiên
- Helpful hints

### Responsive Design

- Mobile: Stack layout, simplified toolbar
- Tablet: 2-column layout
- Desktop: Full table với tất cả columns

## 🔐 Security & Permissions

**Role-based Actions:**
- Admin: Full access (create/edit/delete)
- Sales: Can create/edit leads, view clients
- Viewer: Read-only access

**Data Isolation:**
- Owner filter: Users chỉ thấy leads/clients của mình (trừ admin)
- Team view: Có thể xem tất cả (nếu có permission)

## 📈 Performance Optimizations

**Debounced Search:**
- 300ms delay để tránh quá nhiều API calls
- Sử dụng `useDebouncedCallback` từ `use-debounce`

**Pagination:**
- Server-side pagination (chỉ load current page)
- Page size options: 10, 20, 50, 100 (default: 20)

**Memoization:**
- `useMemo` cho columns definition
- `useCallback` cho event handlers
- `React.memo` cho expensive components (future)

**Lazy Loading:**
- Client 360 tabs load data on-demand (via `getClient360()`)
- Charts data chỉ load khi component mount

**URL State Optimization:**
- Chỉ update URL khi query thực sự thay đổi (comparison)
- Chỉ include non-default values trong URL (page=1, pageSize=20 không include)
- Stable query string comparison để tránh unnecessary re-renders

## 🐛 Known Issues & Limitations

1. **Mock Provider**: Hiện tại dùng mock data, chưa kết nối real API (HTTP provider chưa implement đầy đủ)
2. **Bulk Operations**: Một số bulk actions chưa có progress indicator
3. **Export**: CSV export chưa handle special characters tốt (chỉ escape quotes, commas, newlines)
4. **Search**: Full-text search chưa support (chỉ search trong visible fields: name, company, email)
5. **Client 360**: Notes, Tasks, Files tabs chưa có full CRUD operations (chỉ mock data)
6. **Owner Combobox**: Mock users list, chưa integrate với real user API
7. **Tags**: Tags chưa có management UI (chỉ multi-select từ existing tags)
8. **Date Range**: Date picker chỉ support single range, chưa có quick filters (Today, This Week, etc.)

## 🗺 Roadmap

### Phase 2
- Real-time updates (WebSocket)
- Advanced search (full-text)
- Custom fields cho leads/clients
- Email integration
- Calendar integration
- Full CRUD cho Notes, Tasks, Files trong Client 360

### Phase 3
- AI lead scoring
- Predictive analytics
- Automated workflows
- Email templates
- Document generation
- Advanced reporting và analytics
