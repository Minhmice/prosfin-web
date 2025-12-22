# Content Module - Hướng dẫn chi tiết

## 📋 Tổng quan

Module Content quản lý toàn bộ nội dung marketing: Posts, Media Library, Publishing Schedules, và Comments Moderation. Hỗ trợ multi-channel publishing và content workflow đầy đủ.

## 🎯 Tính năng chính

### 1. Posts Management (`/content/posts`)

#### 1.1. Posts List với DataTable

**Columns:**
- **Title** - Tiêu đề post với status icon
- **Status** - Badge hiển thị status:
  - `draft` - Bản nháp
  - `scheduled` - Đã lên lịch
  - `published` - Đã publish
  - `archived` - Đã archive
- **Hero Media** - Icon hoặc thumbnail (nếu có)
- **Comments** - Total count + pending badge (nếu có pending)
- **Category** - Category name
- **Tags** - Tags badges (tối đa 3, +N nếu nhiều hơn)
- **Author** - Avatar + tên
- **Updated** - Ngày cập nhật
- **Scheduled** - Ngày schedule (nếu có)

**Tính năng:**
- ✅ Sorting, Filtering, Pagination
- ✅ Row selection, Column visibility
- ✅ URL sync cho filters
- ✅ Quick actions: Edit, Duplicate, Publish, Schedule, Archive, Delete

#### 1.2. Post Editor (`/content/posts/[id]/edit`)

**Layout: 3-column**

**Left: Editor Content**
- Rich text editor (Lexical/Markdown)
- Live preview
- Formatting toolbar
- Insert media button
- Word count

**Right: Sidebar**
- **Status Card:**
  - Status dropdown (draft/scheduled/published/archived)
  - Publish button
  - Schedule button với date picker

- **Schedule Card:**
  - DateTime picker
  - Timezone selector
  - Channels selector (multi-select)

- **Taxonomy Card:**
  - Category select (combobox)
  - Tags combobox (multi-select với create new)

- **Media Card:**
  - Cover Media picker
  - Hero Media picker
  - Preview thumbnails
  - Attach Media button → mở Media Picker Dialog

**Bottom: Action Bar**
- Save Draft
- Preview
- Publish Now
- Schedule
- Delete

#### 1.3. Post Workflow

**Draft → Scheduled:**
1. Chọn status "scheduled"
2. Chọn date/time
3. Chọn channels
4. Click "Schedule"
5. Post status = "scheduled"
6. Schedule item được tạo trong Schedules

**Scheduled → Published:**
1. Tự động publish khi đến thời gian (cron job)
2. Hoặc manual "Publish Now"
3. Status = "published"
4. PublishedAt timestamp được set

**Published → Archived:**
1. Click "Archive"
2. Status = "archived"
3. Post không còn hiển thị public nhưng vẫn trong admin

#### 1.4. Post Filters

**Toolbar:**
- Search (title, content, slug)
- Status filter
- Author filter
- Category filter
- Tags filter
- Date range (created/updated)
- Channels filter

**Views:**
- All Posts
- Drafts (`/content/posts/drafts`)
- Scheduled (`/content/posts/scheduled`)

### 2. Media Library (`/content/media`)

#### 2.1. Grid View

**Media Cards:**
- Thumbnail (image) hoặc placeholder (file/video)
- Filename + file size
- Type badge (image/video/file)
- Quick actions menu:
  - Preview
  - View Usage
  - Copy URL
  - Rename
  - Delete

**Grid Layout:**
- Responsive: 2 cols (mobile) → 5 cols (desktop)
- Hover effects
- Selection mode (checkbox) khi dùng Media Picker

#### 2.2. List View

**DataTable với columns:**
- **Name** - Filename + thumbnail (nếu image)
- **Type** - Badge (image/video/file)
- **Size** - Formatted size (KB/MB)
- **Created** - Date created
- **Used In** - Số posts đang dùng media này
- **Actions** - Dropdown menu

**Tính năng:**
- Sorting, Filtering, Pagination
- Row selection
- Bulk actions: Delete, Export

#### 2.3. Upload Flow

**Upload Dialog:**
1. Drag & drop files hoặc click để chọn
2. Validation:
   - Max size: 10MB
   - Allowed types: images, videos, PDFs
3. Progress indicator cho từng file
4. Sau khi upload xong → mở Metadata Sheet

**Metadata Sheet:**
- **Title** - Media title
- **Alt Text** - Accessibility description
- **Tags** - Tags (add/remove)
- **Source** - Nguồn (e.g., Unsplash, Pexels)
- **License** - License info (e.g., CC BY 4.0)
- Save button

#### 2.4. Media Preview

**Preview Dialog:**
- Image: Full-size image với zoom
- Video: Video player với controls
- PDF/File: Open in new tab link

#### 2.5. Usage Tracking

**Usage Panel:**
- List tất cả posts đang dùng media này
- Columns: Title, Status, Updated
- Click → Navigate đến Post Editor
- "No usage" message nếu chưa dùng

#### 2.6. Media Picker

**Dialog:**
- Grid view với selection mode
- Search/filter
- Select button → return selected MediaAsset
- Dùng trong Post Editor để attach media

#### 2.7. Filters & Search

**Toolbar:**
- Search (name, title, alt text)
- Type filter (image/video/file)
- Used/Unused filter
- Tags filter
- Date range
- Active filter chips + Reset
- Share link copy
- Export CSV

### 3. Schedules (`/content/schedules`)

#### 3.1. Calendar View (Week)

**Week Grid:**
- 7 columns (Monday-Sunday)
- Mỗi day cell:
  - Date number
  - "+" button để tạo schedule mới
  - Schedule pills (tối đa 3 visible, "+N more" nếu nhiều hơn)

**Schedule Pill:**
- Color theo channel (Facebook=blue, TikTok=black, etc.)
- Border color theo status (pending=yellow, done=green, etc.)
- Title preview
- Multi-channel badge (+N nếu nhiều channels)
- Click → mở Schedule detail

**Navigation:**
- Previous/Next week buttons
- "Today" button
- Week range display (e.g., "Jan 15 - Jan 21, 2024")

**Week Header:**
- Week of date
- Channel counts (Facebook: 5, TikTok: 3, etc.)

#### 3.2. Drag & Drop

**Kéo-thả giữa các ngày:**
1. Click và giữ schedule pill
2. Kéo sang day cell khác
3. Drop → Schedule runAt được update
   - Giữ nguyên time (HH:mm)
   - Đổi date theo day cell mới
4. Toast: "Schedule moved" + Undo button
5. Nếu drop vào quá khứ → AlertDialog confirm

**Reorder trong cùng day:**
1. Kéo schedule pill trong cùng day cell
2. Drop vào vị trí mới
3. Order được update (UI-only, optional orderIndex field)

**Accessibility:**
- Keyboard navigation (Arrow keys)
- Screen reader announcements:
  - "Picked up schedule: [title]"
  - "Moving schedule to [date]"
  - "Dropped schedule in [date]"
- Visual feedback:
  - Day cell hover ring khi drag over
  - Placeholder slot trong empty day cells
  - DragOverlay với opacity effect

**Mobile:**
- Long-press (200ms delay) để start drag
- Touch-friendly drag handles

#### 3.3. List View

**DataTable với columns:**
- **Post** - Post title + link
- **Channels** - Channel badges
- **Action** - publish/unpublish/reminder
- **Run At** - Date + time
- **Status** - Badge (pending/running/done/failed/canceled)
- **Created** - Date created
- **Actions** - Dropdown menu

**Tính năng:**
- Sorting, Filtering, Pagination
- Row selection
- Bulk actions: Cancel, Retry, Export

#### 3.4. Schedule Form

**Sheet Form:**
- **Post** - Post combobox (search posts)
- **Channels** - Multi-select (Facebook, TikTok, LinkedIn, Twitter, Instagram)
- **Action** - publish/unpublish/reminder
- **Run At** - DateTime picker với timezone
- **Timezone** - Selector (default: Asia/Bangkok)

**Validation:**
- Post required
- At least 1 channel required
- Run At phải trong tương lai (trừ khi admin override)

#### 3.5. Filters

**Toolbar:**
- Range selector: Week/Month/Custom
- Date range picker (nếu custom)
- Channel filter
- Status filter
- Share link copy
- Export CSV

**URL Sync:**
- Tất cả filters sync vào URL
- Share link giữ nguyên view/filters

### 4. Comments (`/content/comments`)

#### 4.1. Public Comments Tab

**Moderation Queue (Default):**
- Mặc định filter `status=pending` để xử lý nhanh
- Marketing-first workflow: xử lý pending trước

**Columns:**
- **Author** - Name + source badge (Facebook/TikTok/LinkedIn/Web)
- **Snippet** - Body preview (100 chars)
- **Post** - Post title + status badge + channel badge
- **Status** - Badge (pending/approved/rejected/spam/trash)
- **Created** - Date created

**Status Workflow:**
- `pending` → `approved` / `rejected` / `spam`
- `approved` → `rejected` / `spam`
- `spam` / `trash` → `pending` (restore)

#### 4.2. Internal Comments Tab

**Review Notes:**
- Status: `open` / `resolved`
- Dùng cho team review nội bộ
- Không public-facing

**Columns:**
- Tương tự Public nhưng status khác

#### 4.3. Thread Viewer

**Thread Sheet:**
- **Post Preview Card:**
  - Post title
  - Status badge
  - Channel badge

- **Root Comment:**
  - Author name + source badge
  - Status badge
  - Created date
  - Full body text

- **Replies (1 cấp):**
  - List replies với indent
  - Collapsible nếu dài
  - Author + date + body

- **Reply Composer:**
  - Canned responses dropdown (5-10 templates)
  - "Reply as" toggle: Public / Internal Note
  - Textarea
  - Buttons:
    - "Send Reply"
    - "Approve + Reply" (one-click workflow cho pending comments)

#### 4.4. Moderation Actions

**Row Actions:**
- **View Thread** - Mở thread sheet
- **Approve** - Chuyển status thành approved
- **Reject** - Chuyển status thành rejected
- **Mark as Spam** - Chuyển status thành spam
- **Trash** - Chuyển status thành trash
- **Restore** - Restore từ spam/trash về pending

**Bulk Actions:**
- **Approve Selected** - Bulk approve
- **Mark as Spam** - Bulk spam
- **Trash** - Bulk trash
- **Export CSV** - Export với filters

#### 4.5. Filters

**Toolbar:**
- Search (body, author, post)
- Status filter (pending/approved/rejected/spam/trash cho public; open/resolved cho internal)
- Source filter (Facebook/TikTok/LinkedIn/Web) - chỉ public
- Post combobox (Command component)
- Date range
- Active filter chips + Reset
- Share link copy

#### 4.6. Deep Linking

**Comments → Post:**
- "Open post" action trong row
- Navigate đến `/content/posts?postId=...` hoặc Post Hub

**Post → Comments:**
- Tab "Comments" trong Post Hub
- Filter theo postId
- Nếu URL có `thread=<commentId>`:
  - Auto-open Thread Drawer
  - Highlight comment (scrollIntoView + ring)

**Share Link:**
- Copy URL với tất cả query params (filters + thread)
- Team share link để xử lý cùng comment

### 5. Content Dashboard (`/content`)

#### 5.1. KPI Cards

**Metrics:**
- **Total Posts** - Tổng số posts
- **Published** - Số posts đã publish
- **Drafts** - Số drafts
- **Scheduled** - Số posts đã schedule
- **Pending Comments** - Số comments pending (với link vào queue)

#### 5.2. Publishing Queue

**Widget:**
- List upcoming schedules (next 7 days)
- Columns: Post, Channels, Run At, Status
- Quick actions: View, Edit, Cancel
- "View All" link đến Schedules page

#### 5.3. Drafts Needing Attention

**Widget:**
- List drafts chưa update trong 7+ ngày
- Columns: Title, Last Updated, Author
- Quick actions: Edit, Delete
- "View All Drafts" link

#### 5.4. Recent Activity

**Timeline:**
- Post published
- Post scheduled
- Comment approved
- Media uploaded
- Schedule created/updated
- Format: Icon + Action + Timestamp
- Click → Navigate đến item

#### 5.5. Quick Actions

**Buttons:**
- Create Post
- Upload Media
- Schedule Post
- View Comments Queue

## 🔧 Technical Details

### Provider Pattern

**Content Provider:**
```typescript
interface ContentProvider {
  // Posts
  listPosts(params: ListPostsParams): Promise<ListResult<Post>>
  getPost(id: string): Promise<Post | null>
  createPost(data: CreatePostInput): Promise<Post>
  updatePost(id: string, data: UpdatePostInput): Promise<Post>
  deletePost(id: string): Promise<void>
  publishPost(id: string): Promise<Post>
  schedulePost(id: string, datetime: Date): Promise<Post>
  
  // Media
  listMedia(params: ListMediaParams): Promise<ListResult<MediaAsset>>
  uploadMedia(files: File[]): Promise<MediaAsset[]>
  updateMedia(id: string, data: UpdateMediaInput): Promise<MediaAsset>
  deleteMedia(id: string): Promise<void>
  
  // Schedules
  listSchedules(params: ListSchedulesParams): Promise<ListResult<ScheduleItem>>
  createSchedule(data: CreateScheduleInput): Promise<ScheduleItem>
  updateSchedule(id: string, data: UpdateScheduleInput): Promise<ScheduleItem>
  cancelSchedule(id: string): Promise<void>
  
  // Comments
  listComments(params: ListCommentsParams): Promise<ListResult<Comment>>
  getThread(commentId: string): Promise<{ root: Comment; replies: Comment[] }>
  updateStatus(ids: string[], status: CommentStatus, reason?: string): Promise<void>
  reply(commentId: string, body: string, channel: CommentChannel): Promise<Comment>
  exportComments(params: ListCommentsParams, selection?: string[]): Promise<string>
}
```

### Drag & Drop Implementation

**@dnd-kit:**
- `DndContext` - Main context wrapper
- `useDroppable` - Day cells làm drop zones
- `useSortable` - Schedule pills làm draggable items
- `SortableContext` - Wrap pills trong day cell để reorder
- `DragOverlay` - Render pill clone khi drag

**Sensors:**
- `PointerSensor` - Mouse/touch với activation constraint (200ms delay cho mobile)
- `KeyboardSensor` - Keyboard navigation với arrow keys

**Collision Detection:**
- `closestCenter` - Tìm day cell gần nhất

**Accessibility:**
- Screen reader announcements qua live region
- Keyboard navigation support
- Focus management

### URL State Management

**Hooks:**
- `useScheduleListQuery` - Schedules filters/sort/pagination
- `useMediaListQuery` - Media filters/sort/pagination
- `useCommentListQuery` - Comments filters/sort/pagination

**Query Params:**
- `view` - calendar/list (schedules), grid/list (media)
- `range` - week/month/custom (schedules)
- `channel` - Filter theo channel
- `status` - Filter theo status
- `q` - Search query
- `from`, `to` - Date range
- `sort` - Sort field và direction
- `page`, `pageSize` - Pagination
- `thread` - Comment ID để highlight (comments)

### Media Upload Flow

**Local Filesystem (MVP):**
1. User drag/drop files
2. Validation (size, mime type)
3. POST `/api/content/media/upload`
4. Save to `public/uploads/media/[timestamp]-[filename]`
5. Create MediaAsset record trong DB
6. Return MediaAsset
7. Open Metadata Sheet

**Future (S3/R2):**
- Presign URL flow
- Direct upload to S3
- CDN serving

### Schedule Update Flow

**Drag & Drop:**
1. User drags schedule pill
2. Drop vào day cell
3. Extract current time (HH:mm)
4. Combine với new date
5. PATCH `/api/content/schedules/[id]` với new runAt
6. Optimistic update
7. Toast + Undo button
8. Rollback nếu API fail

**Reorder:**
- UI-only update (orderIndex)
- Không call API (optional feature)

### Comment Moderation Flow

**Approve:**
1. Click "Approve" action
2. PATCH `/api/admin/comments/status` với status="approved"
3. Update local state
4. Toast notification

**Approve + Reply:**
1. Click "Approve + Reply" trong Thread Sheet
2. Approve comment
3. Send reply
4. One-click workflow

**Bulk Actions:**
1. Select multiple comments
2. Choose bulk action
3. PATCH với array of IDs
4. Batch update

## 📁 File Structure

```
apps/admin/src/features/content/
├── comments/
│   ├── comment-actions.tsx         # Row actions
│   ├── comment-columns.tsx        # DataTable columns
│   └── comments-table-page.tsx     # Main page
├── data/
│   └── provider.ts                 # Content provider
├── posts/
│   ├── post-actions.tsx
│   ├── post-columns.tsx
│   ├── post-editor.tsx            # Main editor
│   ├── post-editor-content.tsx    # Editor content area
│   ├── post-editor-form.tsx       # Form wrapper
│   ├── post-editor-sidebar.tsx    # Sidebar với status/media/taxonomy
│   └── posts-table-page.tsx
├── schedules/
│   ├── schedule-actions.tsx
│   ├── schedule-columns.tsx
│   ├── schedule-filters.tsx
│   ├── schedule-form-sheet.tsx
│   ├── schedules-export.tsx
│   ├── schedules-table-page.tsx
│   └── post-combobox.tsx          # Post selector
├── schemas.ts                      # Zod schemas
└── types.ts                        # TypeScript types

apps/admin/src/components/content/
├── comments/
│   ├── comment-filters.tsx        # Filter toolbar
│   └── comment-thread-sheet.tsx    # Thread viewer
├── dashboard/
│   ├── content-dashboard.tsx       # Main dashboard
│   ├── kpi-cards.tsx
│   ├── publishing-queue.tsx
│   ├── drafts-needing-attention.tsx
│   ├── recent-activity.tsx
│   └── quick-actions.tsx
├── media/
│   ├── media-library.tsx          # Main page
│   ├── media-grid.tsx             # Grid view
│   ├── media-list-view.tsx        # List view (DataTable)
│   ├── media-toolbar.tsx          # Filter toolbar
│   ├── media-upload-dialog.tsx    # Upload dialog
│   ├── media-metadata-sheet.tsx   # Metadata form
│   ├── media-preview-dialog.tsx   # Preview dialog
│   ├── media-usage-panel.tsx      # Usage tracking
│   ├── media-picker-dialog.tsx    # Media picker
│   └── upload-zone.tsx            # Drag & drop zone
└── schedules/
    ├── schedules-calendar.tsx     # Calendar wrapper
    ├── schedules-calendar-week.tsx # Week view với DnD
    ├── schedules-view.tsx         # View switcher
    ├── calendar-day-cell.tsx      # Day cell với droppable
    ├── calendar-event-pill.tsx    # Schedule pill với sortable
    ├── calendar-week-header.tsx   # Week header
    ├── range-selector.tsx         # Range picker
    └── share-link-button.tsx      # Share link
```

## 🚀 Usage Examples

### Tạo Post mới

1. Navigate đến `/content/posts/new`
2. Điền title, content trong editor
3. Chọn category và tags trong sidebar
4. Attach cover media (Media Picker)
5. Click "Save Draft"
6. Post được tạo với status="draft"

### Schedule Post

1. Trong Post Editor, chọn status "scheduled"
2. Chọn date/time trong Schedule card
3. Chọn channels (Facebook, TikTok, etc.)
4. Click "Schedule"
5. Post status = "scheduled"
6. Schedule item xuất hiện trong Calendar view

### Drag Schedule sang ngày khác

1. Trong Calendar view, click và giữ schedule pill
2. Kéo sang day cell khác
3. Drop
4. Schedule runAt được update (giữ time, đổi date)
5. Toast: "Schedule moved" + Undo button
6. Nếu drop vào quá khứ → AlertDialog confirm

### Upload Media

1. Click "Upload Media" trong Media Library
2. Drag & drop files hoặc click để chọn
3. Validation: max 10MB, allowed types
4. Progress indicator
5. Sau upload → Metadata Sheet mở
6. Điền title, alt text, tags, source, license
7. Click "Save"
8. Media xuất hiện trong library

### Attach Media to Post

1. Trong Post Editor, click "Attach Media" trong Media card
2. Media Picker Dialog mở
3. Search/filter media
4. Select media
5. Click "Select"
6. Media được attach (heroMediaId hoặc coverMediaId được set)

### Moderate Comment

1. Trong Comments page, Public tab mặc định filter pending
2. Click row để xem comment
3. Thread Sheet mở với root comment
4. Click "Approve + Reply"
5. Chọn canned response hoặc viết custom reply
6. Click "Approve + Reply"
7. Comment được approve và reply được gửi

### Export Schedules

1. Apply filters (range, channel, status)
2. Click "Export CSV" trong toolbar
3. File download: `schedules-2024-01-15.csv`
4. Bao gồm tất cả filtered schedules

## 🔗 Integration Points

### Posts ↔ Schedules

- Schedule Post → Tạo ScheduleItem
- Unschedule → Xóa ScheduleItem
- Update Schedule → Update Post scheduledAt

### Posts ↔ Media

- Attach Media → Set heroMediaId/coverMediaId
- Media Usage Panel → List posts using media
- Deep link: Media → Post Editor

### Posts ↔ Comments

- Comments count trong Post columns
- Pending badge nếu có pending comments
- Post Hub tab "Comments" → Filter theo postId

### Schedules ↔ Comments

- Schedule published → Post published
- Post published → Comments có thể được approve

## 📊 Data Flow

### Schedule Drag & Drop

```
User drags pill
  ↓
onDragStart → setActiveSchedule
  ↓
User drops on day cell
  ↓
onDragEnd → parse drop target (day:YYYY-MM-DD)
  ↓
Extract current time (HH:mm)
  ↓
Combine new date + old time
  ↓
Check if past date → AlertDialog
  ↓
Optimistic update (local state)
  ↓
PATCH /api/content/schedules/[id]
  ↓
Success → Toast + Undo button
  ↓
Fail → Rollback local state
```

### Comment Moderation

```
User clicks Approve
  ↓
PATCH /api/admin/comments/status
  ↓
Update status to "approved"
  ↓
Update local state
  ↓
Toast notification
  ↓
Reload comments list
```

## 🎨 UI/UX Patterns

### Calendar View

- Week grid với 7 day cells
- Schedule pills với color coding
- Hover effects
- Drag & drop visual feedback
- Responsive: Stack layout trên mobile

### Thread Viewer

- Sheet từ bên phải
- Tabs cho Post/Replies
- Reply composer với canned responses
- One-click workflows (Approve + Reply)

### Media Library

- Grid/List view toggle
- Thumbnail previews
- Quick actions menu
- Selection mode cho picker

## 🔐 Security & Permissions

**Role-based Actions:**
- Admin: Full access
- Content Editor: Can create/edit posts, moderate comments
- Author: Can create/edit own posts only
- Viewer: Read-only

**Comment Moderation:**
- Chỉ admin/content_editor có thể approve/reject
- Public comments mặc định status="pending" (pre-approval)

## 📈 Performance Optimizations

**Calendar View:**
- Chỉ load schedules trong current week range
- Virtual scrolling nếu có nhiều schedules (future)

**Media Library:**
- Lazy load thumbnails
- Pagination để tránh load quá nhiều items

**Comments:**
- Server-side pagination
- Debounced search

## 🐛 Known Issues & Limitations

1. **Media Upload**: Hiện tại dùng local filesystem, chưa có S3 integration
2. **Image Processing**: Chưa có resize/thumbnail generation
3. **Video Preview**: Chưa có video player, chỉ open in new tab
4. **Comment Threading**: Chỉ support 1 level replies (không nested vô hạn)
5. **Schedule Reorder**: OrderIndex chưa persist (UI-only)

## 🗺 Roadmap

### Phase 4 (Future)
- S3/R2 integration cho media
- Image processing (resize, thumbnails)
- Video transcoding
- Advanced editor (Lexical với plugins)
- Content templates
- A/B testing

### Phase 5 (Future)
- Multi-language support
- Content versioning
- Approval workflow
- Content analytics
- SEO optimization tools

