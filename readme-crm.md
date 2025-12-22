# CRM Module - Hướng dẫn chi tiết

## 📋 Tổng quan

Module CRM (Customer Relationship Management) quản lý toàn bộ quy trình từ Lead đến Client, bao gồm tracking, conversion, và quản lý thông tin khách hàng.

## 🎯 Tính năng chính

### 1. Leads Management (`/crm/leads`)

#### 1.1. DataTable với đầy đủ tính năng

**Columns hiển thị:**
- **Name** - Tên lead với avatar
- **Company** - Tên công ty
- **Email** - Email liên hệ
- **Phone** - Số điện thoại (nếu có)
- **Stage** - Giai đoạn trong sales funnel:
  - `new` - Lead mới
  - `qualified` - Đã qualify
  - `proposal` - Đã gửi proposal
  - `won` - Đã chuyển thành client
  - `lost` - Đã mất
- **Source** - Nguồn lead:
  - `web` - Từ website
  - `referral` - Giới thiệu
  - `event` - Từ sự kiện
  - `other` - Khác
- **Score** - Lead score (0-100)
- **Owner** - Người phụ trách
- **Next Action** - Ngày hành động tiếp theo
- **Created** - Ngày tạo

**Tính năng DataTable:**
- ✅ Sorting: Click header để sort theo bất kỳ column nào
- ✅ Filtering: Advanced filters qua toolbar
- ✅ Pagination: Server-side pagination với page size tùy chỉnh
- ✅ Row selection: Checkbox để chọn nhiều leads
- ✅ Column visibility: Toggle hiển thị/ẩn columns
- ✅ URL sync: Tất cả filters/sort/pagination được sync vào URL để share link

#### 1.2. Toolbar Filters

**Search:**
- Tìm kiếm theo tên, company, email
- Debounced search (300ms) để tối ưu performance

**Stage Filter:**
- Dropdown chọn stage: All, New, Qualified, Proposal, Won, Lost
- Quick filter buttons cho các stage phổ biến

**Source Filter:**
- Dropdown chọn source: All, Web, Referral, Event, Other
- Hiển thị badge với màu sắc phân biệt

**Owner Filter:**
- Combobox tìm kiếm owner
- Hiển thị avatar + tên
- Filter "Unassigned" để tìm leads chưa có owner

**Score Range:**
- Slider hoặc input min/max để filter theo lead score
- Range: 0-100

**Date Range:**
- Date picker để filter theo ngày tạo
- From/To date selection

**Active Filter Chips:**
- Hiển thị tất cả filters đang active dưới dạng badges
- Click X trên badge để remove filter
- Button "Reset" để clear tất cả filters

**Share Link:**
- Button "Share Link" copy URL hiện tại (bao gồm tất cả filters)
- Team có thể share link để mở đúng view/filters

#### 1.3. Row Actions

**Quick View:**
- Click row hoặc action "View" → mở Quick View Dialog
- Hiển thị thông tin đầy đủ của lead
- Actions: Edit, Convert, Delete

**Edit:**
- Mở Sheet form để edit lead
- Validation với Zod schema
- Auto-save draft (localStorage)

**Convert to Client:**
- Dialog xác nhận conversion
- Tự động tạo Client từ Lead
- Giữ nguyên thông tin (name, email, company, etc.)
- Lead stage chuyển thành "won"
- Navigate đến Client detail sau khi convert

**Delete:**
- Confirmation dialog
- Soft delete hoặc hard delete (tùy config)

#### 1.4. Bulk Actions

**Assign Owner:**
- Chọn nhiều leads → "Assign Owner"
- Dialog chọn owner từ danh sách users
- Bulk update owner cho tất cả selected leads

**Set Stage:**
- Chọn nhiều leads → "Set Stage"
- Dialog chọn stage mới
- Bulk update stage

**Export CSV:**
- Export selected leads hoặc tất cả filtered leads
- CSV format với đầy đủ columns
- Filename: `leads-YYYY-MM-DD.csv`

**Delete:**
- Bulk delete với confirmation
- Xóa tất cả selected leads

#### 1.5. Lead Source Chart

**Chart Card:**
- Hiển thị biểu đồ phân bố leads theo source
- Line chart hoặc bar chart
- Time range selector (7 days, 30 days, 90 days, All)
- Interactive: hover để xem chi tiết

**Data:**
- Aggregated data từ API
- Real-time updates khi filters thay đổi

#### 1.6. Empty State

- Hiển thị khi không có leads (và không có filters active)
- Illustration + message
- CTA button "Create Lead" để tạo lead đầu tiên

### 2. Clients Management (`/crm/clients`)

#### 2.1. DataTable

**Columns:**
- **Name** - Tên client với avatar
- **Company** - Tên công ty
- **Email** - Email liên hệ
- **Phone** - Số điện thoại
- **Status** - Trạng thái:
  - `active` - Đang active
  - `inactive` - Không active
  - `archived` - Đã archive
- **Owner** - Người phụ trách
- **Tags** - Tags (hiển thị tối đa 3, +N nếu có nhiều hơn)
- **Last Contacted** - Ngày liên hệ cuối
- **Created** - Ngày tạo

**Tính năng tương tự Leads:**
- Sorting, Filtering, Pagination, Row selection, Column visibility, URL sync

#### 2.2. Toolbar Filters

**Search:**
- Tìm kiếm theo name, company, email

**Status Filter:**
- Dropdown: All, Active, Inactive, Archived

**Owner Filter:**
- Combobox chọn owner
- Filter "Unassigned"

**Tags Filter:**
- Multi-select tags
- Hiển thị selected tags dưới dạng chips
- Search tags trong combobox

**Active Filter Chips + Reset + Share Link:**
- Tương tự Leads

#### 2.3. Client 360 View

**Client Sheet với tabs:**

**Overview Tab:**
- Thông tin cơ bản: Name, Company, Email, Phone, Status
- Owner assignment
- Tags management (add/remove tags)
- Last contacted date
- Created/Updated timestamps

**Related Leads Tab:**
- Danh sách leads liên quan đến client này
- DataTable mini với columns: Name, Stage, Source, Score
- Link để mở Lead detail
- Filter leads theo stage

**Notes Tab:**
- Danh sách notes về client
- Timeline view (newest first)
- Add new note với rich text editor
- Edit/Delete note (nếu là author)
- Format: Author name, Date, Content

**Tasks Tab:**
- Todo list cho client
- Columns: Title, Status, Due Date, Assigned To
- Actions: Create, Edit, Mark Complete, Delete
- Status: todo, in_progress, completed
- Due date với color coding (overdue = red)

**Files Tab:**
- File attachments
- Grid view với thumbnails (nếu là image)
- Upload new file
- Download, Preview, Delete
- Metadata: Name, Size, Uploaded by, Date

#### 2.4. Row Actions

**View:**
- Mở Client Sheet ở mode "view"
- Read-only view với tất cả tabs

**Edit:**
- Mở Client Sheet ở mode "edit"
- Form validation
- Save changes

**Delete:**
- Confirmation dialog
- Soft delete (chuyển status thành "archived") hoặc hard delete

#### 2.5. Bulk Actions

**Archive:**
- Bulk archive selected clients
- Chuyển status thành "archived"

**Export CSV:**
- Export selected hoặc filtered clients
- Format: `clients-YYYY-MM-DD.csv`

#### 2.6. Deep Linking & Highlight

**URL Highlight:**
- URL param `?highlight=client-id` để highlight row
- Auto-scroll đến row được highlight
- Visual highlight (ring border) trong 5 giây
- Tự động remove highlight sau timeout

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

**Factory Pattern:**
- `provider.factory.ts` - Factory để chọn provider (mock/http)
- `provider.mock.ts` - Mock data provider (development)
- `provider.http.ts` - HTTP API provider (production)
- `provider.ts` - Main export

**Provider Interface:**
```typescript
interface CRMProvider {
  // Leads
  listLeads(params: ListLeadsParams): Promise<ListResult<Lead>>
  getLead(id: string): Promise<Lead | null>
  createLead(data: CreateLeadInput): Promise<Lead>
  updateLead(id: string, data: UpdateLeadInput): Promise<Lead>
  deleteLead(id: string): Promise<void>
  convertLead(leadId: string): Promise<Client>
  
  // Clients
  listClients(params: ListClientsParams): Promise<ListResult<Client>>
  getClient(id: string): Promise<Client | null>
  getClient360(id: string): Promise<Client360>
  createClient(data: CreateClientInput): Promise<Client>
  updateClient(id: string, data: UpdateClientInput): Promise<Client>
  deleteClient(id: string): Promise<void>
  
  // Notes, Tasks, Files
  listNotes(clientId: string): Promise<Note[]>
  createNote(clientId: string, content: string): Promise<Note>
  // ... tương tự cho Tasks và Files
}
```

### URL State Management

**Hook: `useLeadListQuery` / `useClientListQuery`**
- Sync tất cả filters/sort/pagination vào URL
- Parse từ URL khi component mount
- Debounced search updates
- Reset filters function

**Query Params:**
- `q` - Search query
- `stage` / `status` - Stage/Status filter
- `source` - Source filter
- `owner` - Owner ID
- `scoreMin`, `scoreMax` - Score range
- `dateFrom`, `dateTo` - Date range
- `tags` - Tags (array)
- `sort` - Sort field và direction (format: `field:asc` hoặc `-field:desc`)
- `page` - Page number
- `pageSize` - Items per page
- `highlight` - Row ID to highlight

### DataTable Integration

**Manual Pagination/Sorting/Filtering:**
- DataTable component hỗ trợ server-side operations
- Callbacks: `onPaginationChange`, `onSortingChange`, `onFilterChange`
- Provider methods nhận params và return paginated results

**Row Selection:**
- Checkbox column
- `selectedRows` state
- Bulk actions chỉ enable khi có selection

**Column Visibility:**
- Dropdown menu trong toolbar
- Toggle show/hide columns
- Persist trong localStorage (optional)

### Forms & Validation

**React Hook Form + Zod:**
- Schema validation trong `schemas.ts`
- Form components với shadcn/ui primitives
- Error messages tự động
- Auto-save draft (localStorage)

**Lead Form Fields:**
- Name (required)
- Company (required)
- Email (required, email format)
- Phone (optional)
- Stage (required, enum)
- Source (required, enum)
- Score (0-100, optional)
- Owner (optional, user select)
- Next Action Date (optional, date picker)

**Client Form Fields:**
- Name (required)
- Company (required)
- Email (required, email format)
- Phone (optional)
- Title (optional)
- Status (required, enum)
- Owner (optional)
- Tags (multi-select)

### Export Functionality

**CSV Export:**
- Export selected rows hoặc filtered results
- Format: Standard CSV với headers
- Encoding: UTF-8 với BOM (để Excel hiển thị đúng tiếng Việt)
- Download trigger: Create blob URL → trigger download

**Export Columns:**
- Tất cả visible columns
- Format dates: ISO string
- Format arrays: comma-separated

## 📁 File Structure

```
apps/admin/src/features/crm/
├── clients/
│   ├── client-360-*.tsx          # Client 360 view tabs
│   ├── client-form-fields.tsx     # Form fields component
│   ├── client-form-sheet.tsx      # Form sheet wrapper
│   ├── client-sheet.tsx           # Main Client 360 sheet
│   ├── clients-table-columns.tsx  # DataTable columns
│   ├── clients-table-row-actions.tsx
│   ├── clients-table-toolbar.tsx
│   ├── clients-bulk-actions.tsx
│   ├── clients-empty-state.tsx
│   ├── export-csv.ts              # CSV export utility
│   ├── owner-combobox.tsx         # Owner selector
│   └── tags-multi-select.tsx      # Tags selector
├── leads/
│   ├── lead-form-fields.tsx
│   ├── lead-form-sheet.tsx
│   ├── lead-sheet.tsx
│   ├── lead-quick-view-dialog.tsx # Quick view dialog
│   ├── lead-convert-dialog.tsx    # Convert to client dialog
│   ├── leads-table-columns.tsx
│   ├── leads-table-row-actions.tsx
│   ├── leads-table-toolbar.tsx
│   ├── leads-bulk-actions.tsx
│   ├── leads-empty-state.tsx
│   ├── bulk-assign-owner-dialog.tsx
│   ├── bulk-set-stage-dialog.tsx
│   ├── lead-source-chart-card.tsx # Chart widget
│   ├── lead-source-chart.tsx      # Chart component
│   ├── use-convert-lead.ts        # Convert hook
│   ├── use-lead-source-chart.ts   # Chart data hook
│   └── export-csv.ts
├── data/
│   ├── provider.ts                # Main provider interface
│   ├── provider.factory.ts        # Factory pattern
│   ├── provider.mock.ts           # Mock implementation
│   └── provider.http.ts           # HTTP implementation
├── shared/
│   ├── query/                     # URL query utilities
│   │   ├── index.ts
│   │   ├── parse-query.ts
│   │   └── stringify-query.ts
│   └── share-link-button.tsx      # Share link component
├── schemas.ts                     # Zod schemas
└── types.ts                       # TypeScript types
```

## 🚀 Usage Examples

### Tạo Lead mới

1. Click "New Lead" button
2. Điền form:
   - Name: "Nguyễn Văn A"
   - Company: "Công ty ABC"
   - Email: "nguyenvana@example.com"
   - Stage: "new"
   - Source: "web"
3. Click "Save"
4. Lead được tạo và hiển thị trong table

### Convert Lead thành Client

1. Tìm lead trong table
2. Click row action "Convert"
3. Xác nhận trong dialog
4. Lead stage chuyển thành "won"
5. Client mới được tạo
6. Navigate đến Client detail với highlight

### Filter Leads theo Source

1. Trong Leads page, chọn "Source" filter
2. Chọn "web"
3. Table chỉ hiển thị leads từ web
4. URL update: `?source=web`
5. Share link này để team xem cùng view

### Bulk Assign Owner

1. Chọn nhiều leads (checkbox)
2. Click bulk action "Assign Owner"
3. Chọn owner từ dialog
4. Tất cả selected leads được assign owner
5. Toast notification: "Assigned owner to N leads"

### Export CSV

1. Apply filters (optional)
2. Chọn leads cần export (optional, nếu không chọn sẽ export tất cả filtered)
3. Click bulk action "Export CSV"
4. File download tự động: `leads-2024-01-15.csv`

### Xem Client 360

1. Click row action "View" trên client
2. Client Sheet mở với Overview tab
3. Switch tabs để xem:
   - Related Leads
   - Notes (add/edit/delete)
   - Tasks (create/complete)
   - Files (upload/download)

## 🔗 Integration Points

### Với Content Module

- **Lead Source Tracking**: Leads từ web form có source="web"
- **Attribution**: UTM params từ marketing website được lưu vào lead metadata

### Với Dashboard

- **KPI Cards**: Hiển thị số liệu từ CRM provider
- **Charts**: Data aggregation từ leads/clients
- **Recent Activity**: Events từ CRM actions

## 📊 Data Flow

```
User Action
  ↓
Component (LeadsPage/ClientsPage)
  ↓
Hook (useLeadListQuery/useClientListQuery)
  ↓
URL State Update
  ↓
Provider (crmProvider.listLeads/listClients)
  ↓
API Call (Mock/HTTP)
  ↓
State Update (setLeads/setClients)
  ↓
DataTable Re-render
```

## 🎨 UI/UX Patterns

### Loading States

- Skeleton loaders cho table rows
- Spinner cho buttons khi đang process
- Progress bar cho bulk operations

### Error Handling

- Toast notifications cho errors
- Inline validation errors trong forms
- Retry buttons cho failed operations

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

**Pagination:**
- Server-side pagination (chỉ load current page)
- Page size options: 10, 20, 50, 100

**Memoization:**
- useMemo cho columns definition
- useCallback cho event handlers
- React.memo cho expensive components

**Lazy Loading:**
- Client 360 tabs load data on-demand
- Charts data chỉ load khi tab visible

## 🐛 Known Issues & Limitations

1. **Mock Provider**: Hiện tại dùng mock data, chưa kết nối real API
2. **Bulk Operations**: Một số bulk actions chưa có progress indicator
3. **Export**: CSV export chưa handle special characters tốt
4. **Search**: Full-text search chưa support (chỉ search trong visible fields)

## 🗺 Roadmap

### Phase 2
- Real-time updates (WebSocket)
- Advanced search (full-text)
- Custom fields cho leads/clients
- Email integration
- Calendar integration

### Phase 3
- AI lead scoring
- Predictive analytics
- Automated workflows
- Email templates
- Document generation

