# Content Module - Hướng dẫn chi tiết

## 📋 Tổng quan

Module Content quản lý toàn bộ nội dung marketing: Posts, Media Library, Publishing Schedules, và Comments Moderation. Hỗ trợ multi-channel publishing và content workflow đầy đủ. Module sử dụng mock provider hiện tại với interface sẵn sàng cho Phase 3 backend integration.

## 🎯 Tính năng chính

### 1. Posts Management (`/content/posts`)

#### 1.1. Posts List với DataTable (`posts-table-page.tsx`)

**Columns (theo `post-columns.tsx`):**
- **Title** - Tiêu đề post với status icon:
  - `draft` - FileText icon (muted)
  - `scheduled` - Calendar icon (blue)
  - `published` - FileText icon (green)
  - `archived` - FileText icon (muted)
  - Link đến `/content/posts/${post.id}/edit`
- **Status** - Badge với variant:
  - `draft` - outline variant
  - `scheduled` - secondary variant
  - `published` - default variant
  - `archived` - outline variant
- **Hero Media** - Icon hoặc "Attach" button nếu chưa có
- **Channels** - Channel badges (tối đa 2, +N nếu nhiều hơn)
- **Comments** - Total count + pending badge (nếu có pending)
- **Campaign** - Campaign badge (nếu có)
- **Category** - Category name hoặc "-"
- **Tags** - Tags badges (tối đa 3, +N nếu nhiều hơn)
- **Author** - Avatar với initials + tên
- **Updated** - Ngày cập nhật (format: "MMM d, yyyy")
- **Scheduled At** - Ngày schedule với time (nếu có)

**Tính năng:**
- ✅ Sorting: Manual sorting với callback `onSortingChange`
- ✅ Filtering: Manual filtering (filters qua URL params)
- ✅ Pagination: Server-side pagination với `pageCount` và `rowCount`
- ✅ Row selection: Checkbox để chọn nhiều posts
- ✅ Column visibility: Toggle show/hide columns
- ✅ URL sync: Tất cả filters/sort/pagination sync vào URL qua `parseContentParams` và `buildContentUrl`
- ✅ Highlight row: Support `postId` query param để highlight row

**Implementation:**
- Sử dụng `PostsTablePage` component với props: `defaultStatus`, `title`, `subtitle`
- Data loading qua `contentProvider.listPosts()` với params từ URL
- Row actions và bulk actions được define trong `post-actions.tsx`

#### 1.2. Post Editor (`/content/posts/[id]/edit`)

**Layout: 2-column (flex layout)**

**Left: Editor Content (`post-editor-form.tsx`):**
- Title input
- Slug input (auto-generate từ title)
- Excerpt textarea
- Content textarea (Markdown string, chưa có rich text editor)
- Word count (future)

**Right: Sidebar (`post-editor-sidebar.tsx`):**
- **Status Card:**
  - Status select (draft/scheduled/published/archived)
  - Publish button (dropdown menu)
  - Schedule button với date picker

- **Schedule Card:**
  - DateTime picker
  - Timezone selector (default: Asia/Bangkok)
  - Channels selector (multi-select)

- **Taxonomy Card:**
  - Category select (combobox)
  - Tags combobox (multi-select với create new)

- **Media Card:**
  - Cover Media picker
  - Hero Media picker
  - Preview thumbnails
  - Attach Media button → mở Media Picker Dialog

**Top: Action Bar (`post-editor.tsx`):**
- "Save Draft" button
- Dropdown menu với options:
  - "Publish Now"
  - "Schedule..."
  - "Save as Draft"
- Last saved timestamp hiển thị

**Auto-save:**
- Watch form changes với `form.watch()`
- Auto-save sau 2 giây (timeout)
- Silent fail cho autosave errors
- Update `lastSaved` timestamp

#### 1.3. Post Workflow

**Draft → Scheduled:**
1. Chọn `scheduledAt` date trong form
2. Click "Schedule..." trong dropdown
3. `handleSchedule()` được gọi
4. `contentProvider.schedulePost()` tạo/update schedule item
5. Post status = "scheduled"
6. Schedule item được tạo trong Schedules với channels

**Scheduled → Published:**
1. Tự động publish khi đến thời gian (cron job `/api/cron/schedule-tick`)
2. Hoặc manual "Publish Now"
3. `contentProvider.publishPost()` được gọi
4. Status = "published"
5. `publishedAt` timestamp được set
6. Schedule item được remove nếu có

**Published → Archived:**
1. Click "Archive" action
2. `contentProvider.updatePost()` với status="archived"
3. Post không còn hiển thị public nhưng vẫn trong admin

**Draft → Published:**
1. Click "Publish Now"
2. `handlePublish()` được gọi
3. Create/update post với status="published"
4. `contentProvider.publishPost()` được gọi
5. Emit activity event

#### 1.4. Post Filters

**URL Params (via `parseContentParams`):**
- `q` - Search query (title, slug)
- `status` - Status filter
- `channel` - Channel filter (array, multiple params)
- `campaign` - Campaign filter
- `author` - Author filter
- `tag` - Tag filter
- `category` - Category filter
- `from`, `to` - Date range (ISO date strings)
- `sort` - Sort field và direction (format: `field:direction`)
- `page`, `pageSize` - Pagination
- `postId` - Highlight row

**Views:**
- All Posts (`/content/posts`)
- Drafts (`/content/posts/drafts`) - với `defaultStatus="draft"`
- Scheduled (`/content/posts/scheduled`) - với `defaultStatus="scheduled"`

### 2. Media Library (`/content/media`)

#### 2.1. Grid View (`media-grid.tsx`)

**Media Cards:**
- Thumbnail (image) hoặc placeholder icon (file/video)
- Filename + file size
- Type badge (image/video/file)
- Quick actions menu:
  - Preview
  - View Usage
  - Copy URL
  - Rename (chưa implement)
  - Delete

**Grid Layout:**
- Responsive: 2 cols (mobile) → 5 cols (desktop)
- Hover effects
- Selection mode (checkbox) khi dùng Media Picker

#### 2.2. List View (`media-list-view.tsx`)

**DataTable với columns:**
- **Name** - Filename + thumbnail (nếu image)
- **Type** - Badge (image/video/file)
- **Size** - Formatted size (KB/MB)
- **Created** - Date created
- **Used In** - Số posts đang dùng media này (từ `usedInPosts` array)
- **Actions** - Dropdown menu

**Tính năng:**
- Sorting, Filtering, Pagination (manual)
- Row selection
- Bulk actions: Delete, Export (chưa implement)

#### 2.3. Upload Flow (`media-upload-dialog.tsx`)

**Upload Dialog:**
1. Drag & drop files hoặc click để chọn
2. Validation:
   - Max size: 10MB (chưa enforce trong code)
   - Allowed types: images, videos, PDFs (chưa validate trong code)
3. Progress indicator cho từng file (chưa implement)
4. Sau khi upload xong → `contentProvider.uploadMedia()` được gọi
5. Return MediaAsset array
6. Open Metadata Sheet (chưa tự động mở)

**Metadata Sheet (`media-metadata-sheet.tsx`):**
- **Title** - Media title
- **Alt Text** - Accessibility description
- **Tags** - Tags (add/remove)
- **Source** - Nguồn (e.g., Unsplash, Pexels)
- **License** - License info (e.g., CC BY 4.0)
- Save button → `contentProvider.updateMedia()`

#### 2.4. Media Preview (`media-preview-dialog.tsx`)

**Preview Dialog:**
- Image: Full-size image với zoom (chưa implement zoom)
- Video: Video player với controls (chưa implement player)
- PDF/File: Open in new tab link

#### 2.5. Usage Tracking (`media-usage-panel.tsx`)

**Usage Panel:**
- List tất cả posts đang dùng media này (từ `usedInPosts` array)
- Columns: Title, Status, Updated
- Click → Navigate đến Post Editor
- "No usage" message nếu `usedInPosts.length === 0`

#### 2.6. Media Picker (`media-picker-dialog.tsx`)

**Dialog:**
- Grid view với selection mode
- Search/filter (chưa implement filter trong picker)
- Select button → return selected MediaAsset
- Dùng trong Post Editor để attach media
- Support single selection hoặc multi-selection

#### 2.7. Filters & Search (`media-library.tsx`)

**Toolbar:**
- Search (name, title, alt text) - sync vào URL param `q`
- Type filter (image/video/file) - sync vào URL param `type`
- Tags filter - sync vào URL param `tags` (array)
- View toggle (grid/list) - sync vào URL param `view`
- Share link copy
- Export CSV (chưa implement)

**URL Params:**
- `view` - grid/list
- `q` - Search query
- `type` - image/video/file
- `tag` - Tag filter
- `used` - true/false (chưa implement)
- `from`, `to` - Date range
- `sort` - Sort field và direction
- `page`, `pageSize` - Pagination

### 3. Schedules (`/content/schedules`)

#### 3.1. Calendar View (`schedules-calendar.tsx`)

**Week Grid (`schedules-calendar-week.tsx`):**
- 7 columns (Monday-Sunday)
- Mỗi day cell (`calendar-day-cell.tsx`):
  - Date number
  - "+" button để tạo schedule mới (chưa implement)
  - Schedule pills (tối đa 3 visible, "+N more" nếu nhiều hơn)

**Schedule Pill (`calendar-event-pill.tsx`):**
- Color theo channel (Facebook=blue, TikTok=black, etc.)
- Border color theo status (pending=yellow, done=green, etc.)
- Title preview (từ `payloadSnapshot.title`)
- Multi-channel badge (+N nếu nhiều channels)
- Click → mở Schedule detail (chưa implement)

**Navigation:**
- Previous/Next week buttons (chưa implement)
- "Today" button (chưa implement)
- Week range display (e.g., "Jan 15 - Jan 21, 2024")

**Week Header (`calendar-week-header.tsx`):**
- Week of date
- Channel counts (Facebook: 5, TikTok: 3, etc.)

#### 3.2. Drag & Drop

**Kéo-thả giữa các ngày:**
- Chưa implement drag & drop trong code hiện tại
- Plan: Sử dụng `@dnd-kit` library
- Drop → Schedule `runAt` được update
- Giữ nguyên time (HH:mm), đổi date theo day cell mới
- Toast: "Schedule moved" + Undo button
- Nếu drop vào quá khứ → AlertDialog confirm

**Reorder trong cùng day:**
- Chưa implement
- UI-only update (orderIndex)
- Không call API (optional feature)

#### 3.3. List View (`schedules-queue.tsx`)

**DataTable với columns (theo `schedule-columns.tsx`):**
- **Scheduled At** - Date + time với Calendar icon
- **Channel** - Channel badge (single channel, chưa support multi-channel display)
- **Post** - Post title + link đến `/content/posts/${postId}/edit`
- **Status** - Badge (pending/running/done/failed/canceled)

**Tính năng:**
- Sorting, Filtering, Pagination (manual)
- Row selection
- Bulk actions: Cancel, Retry, Export (chưa implement)

#### 3.4. Schedule Form (`schedule-form-sheet.tsx`)

**Sheet Form:**
- **Post** - Post combobox (`post-combobox.tsx`) với search
- **Channels** - Multi-select (Facebook, TikTok, LinkedIn, Twitter, Instagram)
- **Action** - publish/unpublish/reminder (select)
- **Run At** - DateTime picker với timezone
- **Timezone** - Selector (default: Asia/Bangkok)

**Validation:**
- Post required
- At least 1 channel required
- Run At phải trong tương lai (Zod schema validation)
- Timezone default: "Asia/Bangkok"

**Prefill Support:**
- `prefillPostId` - Pre-select post từ URL param
- `prefillDate` - Pre-select date từ URL param

#### 3.5. Filters (`schedules-view.tsx`)

**Toolbar:**
- View toggle (calendar/list) - sync vào URL param `view`
- Range selector: Week/Month/Custom (chưa implement)
- Date range picker (nếu custom)
- Channel filter - sync vào URL param `channel`
- Status filter - sync vào URL param `status`
- Share link copy
- Export CSV (chưa implement)

**URL Sync:**
- Tất cả filters sync vào URL qua `parseContentParams` và `buildContentUrl`
- Share link giữ nguyên view/filters

**Cadence Guardrails (`cadence-guardrails.tsx`):**
- Hiển thị warnings về posting frequency
- Chưa implement logic

### 4. Comments (`/content/comments`)

#### 4.1. Public Comments Tab (`comments-table-page.tsx`)

**Moderation Queue:**
- Mặc định filter `status=pending` để xử lý nhanh (chưa auto-filter trong code)
- Marketing-first workflow: xử lý pending trước

**Columns (theo `comment-columns.tsx`):**
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

#### 4.3. Thread Viewer (`comment-thread-sheet.tsx`)

**Thread Sheet:**
- **Post Preview Card:**
  - Post ID
  - Channel badge

- **Root Comment:**
  - Author name + source badge
  - Status badge
  - Created date (format: "MMM d, yyyy 'at' h:mm a")
  - Full body text

- **Replies (1 cấp):**
  - List replies với indent (border-left)
  - Author + date + body
  - Status badge

- **Reply Composer:**
  - Canned responses dropdown (5 templates hardcoded)
  - "Reply as" toggle: Public / Internal Note
  - Textarea
  - Buttons:
    - "Send Reply"
    - "Approve + Reply" (one-click workflow cho pending comments)

**Implementation:**
- Load thread qua `contentProvider.getThread(commentId)`
- Returns `{ root: Comment; replies: Comment[] }`
- Reply qua `contentProvider.reply(commentId, body, channel)`
- Approve + Reply: Gọi `updateStatus()` và `reply()` cùng lúc

#### 4.4. Moderation Actions (`comment-actions.tsx`)

**Row Actions:**
- **View Thread** - Mở thread sheet
- **Approve** - `contentProvider.moderateComment(id, "approve")`
- **Reject** - `contentProvider.moderateComment(id, "reject")`
- **Mark as Spam** - `contentProvider.moderateComment(id, "spam")`
- **Trash** - `contentProvider.moderateComment(id, "hide")`
- **Restore** - `contentProvider.moderateComment(id, "restore")`

**Bulk Actions:**
- **Approve Selected** - Bulk approve qua `contentProvider.bulkModerate(ids, "approve")`
- **Mark as Spam** - Bulk spam
- **Trash** - Bulk trash
- **Export CSV** - Export với filters (chưa implement)

#### 4.5. Filters

**URL Params:**
- `channel` - public/internal (default: public)
- `q` - Search query (body, author)
- `postId` - Filter theo post
- `status` - Filter theo status
- `source` - Filter theo source (Facebook/TikTok/LinkedIn/Web)
- `from`, `to` - Date range
- `sort` - Sort field và direction
- `page`, `pageSize` - Pagination
- `thread` - Comment ID để highlight

**Toolbar:**
- Search (body, author)
- Status filter
- Source filter (chỉ public)
- Post combobox
- Date range
- Active filter chips + Reset (chưa implement)
- Share link copy

#### 4.6. Deep Linking

**Comments → Post:**
- "Open post" action trong row
- Navigate đến `/content/posts/${postId}/edit`

**Post → Comments:**
- Navigate đến `/content/comments?postId=${postId}`
- Filter theo postId

**Thread Highlight:**
- URL param `thread=${commentId}`
- Auto-open Thread Sheet (chưa implement auto-open)
- Highlight comment (chưa implement highlight)

**Share Link:**
- Copy URL với tất cả query params (filters + thread)
- Team share link để xử lý cùng comment

### 5. Content Dashboard (`/content`)

#### 5.1. KPI Cards (`kpi-cards.tsx`)

**Metrics:**
- **Total Posts (30d)** - Posts created trong last 30 days
- **Published Rate** - Published vs total posts (percentage)
- **Scheduled Upcoming (7d)** - Scheduled trong next 7 days
- **Comments Pending** - Comments với status="pending"

**Implementation:**
- Load data qua `contentProvider.listPosts()` và `contentProvider.listComments()`
- Calculate metrics từ data
- Display với trend indicators (chưa implement real trends)
- Loading state với Skeleton

#### 5.2. Publishing Queue (`upcoming-schedules-table.tsx`)

**Widget:**
- List upcoming schedules (next 7 days)
- Columns: Post, Channels, Run At, Status
- Quick actions: View, Edit, Cancel (chưa implement)
- "View All" link đến Schedules page

#### 5.3. Drafts Needing Attention (`drafts-needing-attention.tsx`)

**Widget:**
- List drafts chưa update trong 7+ ngày
- Columns: Title, Last Updated, Author
- Quick actions: Edit, Delete (chưa implement)
- "View All Drafts" link

#### 5.4. Recent Activity (`recent-activity.tsx`)

**Timeline:**
- Post published
- Post scheduled
- Comment approved
- Media uploaded
- Schedule created/updated
- Format: Icon + Action + Timestamp
- Click → Navigate đến item (chưa implement)

#### 5.5. Quick Actions (`quick-actions.tsx`)

**Buttons:**
- Create Post → Navigate đến `/content/posts/new`
- Upload Media → Open media upload dialog (chưa implement)
- Schedule Post → Navigate đến `/content/schedules?action=create`
- View Comments Queue → Navigate đến `/content/comments?status=pending`

#### 5.6. Charts Section (`charts-section.tsx`)

**Charts:**
- Posts by Status (pie chart)
- Posts by Channel (bar chart)
- Publishing Timeline (line chart)
- Chưa implement charts trong code hiện tại

#### 5.7. Top Posts Table (`top-posts-table.tsx`)

**Widget:**
- List top posts (by views/engagement)
- Columns: Title, Views, Engagement
- Click → Navigate đến Post Editor
- Chưa implement trong code hiện tại

## 🔧 Technical Details

### Provider Pattern

**Content Provider (`data/provider.ts`):**
- Mock provider với full implementation
- In-memory stores cho posts, media, schedules, comments
- Filtering, sorting, pagination được implement client-side
- Support legacy fields cho backward compatibility

**Provider Interface:**
```typescript
export interface ListResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export const contentProvider = {
  // Posts
  async listPosts(params: ListPostsParams): Promise<ListResult<Post>>
  async getPost(id: string): Promise<Post | null>
  async createPost(data: CreatePostInput): Promise<Post>
  async updatePost(id: string, data: UpdatePostInput): Promise<Post>
  async deletePost(id: string): Promise<void>
  async publishPost(id: string): Promise<Post>
  async schedulePost(id: string, datetime: Date): Promise<Post>
  async unschedulePost(id: string): Promise<Post>
  async unpublishPost(id: string): Promise<Post>
  async duplicatePost(id: string): Promise<Post>
  async publishNow(postId: string): Promise<Post>
  
  // Media
  async listMedia(params: ListMediaParams): Promise<ListResult<MediaAsset>>
  async uploadMedia(files: File[]): Promise<MediaAsset[]>
  async updateMedia(id: string, patch: Partial<MediaAsset>): Promise<MediaAsset>
  async deleteMedia(id: string): Promise<void>
  
  // Schedules
  async listSchedules(params: ListSchedulesParams): Promise<ListResult<ScheduleItem>>
  async createSchedule(input: CreateScheduleInput): Promise<ScheduleItem>
  async updateSchedule(id: string, patch: Partial<ScheduleItem>): Promise<ScheduleItem>
  async reschedule(postId: string, newDatetime: Date): Promise<ScheduleItem>
  async cancelSchedule(id: string): Promise<void>
  async exportSchedules(params: ListSchedulesParams, selection?: string[]): Promise<string>
  async getScheduleCounts(params?: { from?: Date; to?: Date; channel?: string }): Promise<ScheduleCounts>
  async findDueSchedules(now: Date): Promise<ScheduleItem[]>
  
  // Comments
  async listComments(params: ListCommentsParams): Promise<ListResult<Comment>>
  async getThread(commentId: string): Promise<{ root: Comment; replies: Comment[] } | null>
  async updateStatus(ids: string[], status: CommentStatus, reason?: string): Promise<void>
  async reply(commentId: string, body: string, channel: CommentChannel): Promise<Comment>
  async exportComments(params: ListCommentsParams, selection?: string[]): Promise<string>
  async moderateComment(id: string, action: "approve" | "hide" | "spam" | "restore" | "reject"): Promise<Comment>
  async bulkModerate(ids: string[], action: "approve" | "reject" | "spam" | "restore"): Promise<void>
  
  // Taxonomy
  async listCategories(): Promise<Category[]>
  async createCategory(data: CreateCategoryInput): Promise<Category>
  async listTags(params?: { q?: string }): Promise<Tag[]>
  async createTag(data: CreateTagInput): Promise<Tag>
}
```

### Types & Schemas

**Types (`types.ts`):**
```typescript
export type PostStatus = "draft" | "scheduled" | "published" | "archived"

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: PostStatus
  content: string // Markdown string
  coverMediaId?: string
  heroMediaId?: string
  category?: string
  tags: string[]
  channels: string[] // facebook, tiktok, linkedin, etc.
  campaign?: string
  utmPreset?: UTMPreset
  metrics?: PostMetrics
  authorId: string
  authorName: string
  scheduledAt?: Date
  publishedAt?: Date
  updatedAt: Date
  createdAt: Date
}

export type MediaType = "image" | "video" | "file"

export interface MediaAsset {
  id: string
  type: MediaType
  name: string
  size: number
  mime: string
  url: string
  width?: number
  height?: number
  altText?: string
  title?: string
  tags: string[]
  license?: string
  source?: string
  usedInPosts: string[] // postIds
  storage?: {
    kind: "local" | "s3"
    path: string
  }
  createdAt: Date
  createdBy: string
}

export type ScheduleStatus = "pending" | "running" | "done" | "failed" | "canceled"
export type ScheduleAction = "publish" | "unpublish" | "reminder"

export interface ScheduleItem {
  id: string
  postId: string
  channels: string[] // Multi-channel support
  action: ScheduleAction
  runAt: Date // UTC
  timezone: string // Default "Asia/Bangkok"
  status: ScheduleStatus
  attempts: number
  lastError?: string
  createdAt: Date
  updatedAt: Date
  createdBy?: string
  payloadSnapshot?: { // For quick display
    title: string
    slug: string
  }
  // Legacy fields for backward compatibility
  scheduledAt?: Date
  channel?: string
}

export type CommentChannel = "public" | "internal"
export type PublicCommentStatus = "pending" | "approved" | "rejected" | "spam" | "trash"
export type InternalCommentStatus = "open" | "resolved"
export type CommentStatus = PublicCommentStatus | InternalCommentStatus

export interface Comment {
  id: string
  postId: string
  channel: CommentChannel
  parentId?: string // Only 1 level: parentId always points to root comment
  status: CommentStatus
  author: CommentAuthor
  body: string
  createdAt: Date
  updatedAt: Date
  moderation?: CommentModeration
  metadata?: CommentMetadata
  // Legacy fields for backward compatibility
  authorName?: string
  authorEmail?: string
  content?: string
  replies?: Comment[] // thread support (1 level only)
}
```

**Schemas (`schemas.ts`):**
```typescript
export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  coverMediaId: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  scheduledAt: z.date().optional(),
})

export const scheduleSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  channels: z.array(z.string()).min(1, "At least one channel is required"),
  action: z.enum(["publish", "unpublish", "reminder"]),
  runAt: z.date().refine((date) => date > new Date(), {
    message: "Run date must be in the future",
  }),
  timezone: z.string().default("Asia/Bangkok"),
  notes: z.string().optional(),
})
```

### URL State Management

**Hooks:**
- `useCommentListQuery` (`hooks/use-comment-list-query.ts`) - Comments filters/sort/pagination
- `useScheduleListQuery` (`hooks/use-schedule-list-query.ts`) - Schedules filters/sort/pagination
- `useMediaListQuery` (`hooks/use-media-list-query.ts`) - Media filters/sort/pagination

**Content URL Utilities (`lib/url-state-content.ts`):**
- `parseContentParams(searchParams: URLSearchParams): ContentListParams` - Parse URL search params
- `serializeContentParams(params: ContentListParams): URLSearchParams` - Serialize params to URL
- `buildContentUrl(basePath: string, params: ContentListParams): string` - Build URL with params
- `copyShareLink(path: string, params: ContentListParams): Promise<void>` - Copy share link to clipboard

**ContentListParams Interface:**
```typescript
export interface ContentListParams {
  q?: string
  status?: string
  channel?: string[] // multiple channels
  from?: string // ISO date string
  to?: string // ISO date string
  sort?: string
  page?: number
  pageSize?: number
  view?: string // calendar/list/grid
  range?: string // 7d, 30d, 90d, custom
  campaign?: string
  postId?: string
  type?: string // for media
  tags?: string[]
}
```

**Query Params Format:**
- `view` - calendar/list (schedules), grid/list (media)
- `range` - week/month/custom (schedules)
- `channel` - Filter theo channel (array, multiple params: `?channel=facebook&channel=tiktok`)
- `status` - Filter theo status
- `q` - Search query
- `from`, `to` - Date range (ISO date strings)
- `sort` - Sort field và direction (format: `field:direction`)
- `page`, `pageSize` - Pagination
- `thread` - Comment ID để highlight (comments)
- `postId` - Post ID để highlight/filter

### Media Upload Flow

**Local Filesystem (MVP):**
1. User drag/drop files hoặc click để chọn
2. Validation (size, mime type) - chưa enforce trong code
3. `contentProvider.uploadMedia(files)` được gọi
4. Create MediaAsset records với mock data
5. Return MediaAsset array
6. Open Metadata Sheet (chưa tự động mở)

**Future (S3/R2):**
- Presign URL flow
- Direct upload to S3
- CDN serving

### Schedule Update Flow

**Create Schedule:**
1. User fills form trong `ScheduleFormSheet`
2. Validation (Zod schema)
3. `contentProvider.createSchedule()` được gọi
4. Create ScheduleItem với channels array
5. Update Post `scheduledAt` và status
6. Toast notification

**Update Schedule:**
1. User edits schedule
2. `contentProvider.updateSchedule()` được gọi
3. Update ScheduleItem
4. Update Post nếu cần

**Cancel Schedule:**
1. User clicks "Cancel" action
2. `contentProvider.cancelSchedule()` được gọi
3. Update ScheduleItem status to "canceled"
4. Update Post status to "draft" và clear `scheduledAt`

**Drag & Drop (Future):**
1. User drags schedule pill
2. Drop vào day cell
3. Extract current time (HH:mm)
4. Combine với new date
5. `contentProvider.updateSchedule()` với new runAt
6. Optimistic update
7. Toast + Undo button
8. Rollback nếu API fail

### Comment Moderation Flow

**Approve:**
1. Click "Approve" action
2. `contentProvider.moderateComment(id, "approve")` được gọi
3. Update status to "approved"
4. Update local state
5. Toast notification

**Approve + Reply:**
1. Click "Approve + Reply" trong Thread Sheet
2. `contentProvider.updateStatus([commentId], "approved")` được gọi
3. `contentProvider.reply(commentId, body, channel)` được gọi
4. One-click workflow
5. Toast notification
6. Reload thread

**Bulk Actions:**
1. Select multiple comments
2. Choose bulk action
3. `contentProvider.bulkModerate(ids, action)` được gọi
4. Batch update
5. Toast notification
6. Update local state

## 📁 File Structure

```
apps/admin/src/features/content/
├── comments/
│   ├── comment-actions.tsx         # Row actions và bulk actions
│   ├── comment-columns.tsx         # DataTable columns definition
│   └── comments-table-page.tsx     # Main comments page component
├── data/
│   └── provider.ts                 # Content provider (mock implementation)
├── posts/
│   ├── post-actions.tsx            # Row actions và bulk actions
│   ├── post-columns.tsx            # DataTable columns definition
│   ├── post-editor.tsx             # Main editor component
│   ├── post-editor-content.tsx    # Editor content area (form fields)
│   ├── post-editor-form.tsx        # Form wrapper
│   ├── post-editor-sidebar.tsx     # Sidebar với status/media/taxonomy
│   └── posts-table-page.tsx        # Posts table page component
├── schedules/
│   ├── schedule-actions.tsx        # Row actions
│   ├── schedule-columns.tsx        # DataTable columns definition
│   ├── schedule-filters.tsx        # Filter toolbar (chưa dùng)
│   ├── schedule-form-sheet.tsx     # Schedule form sheet
│   ├── schedules-export.tsx        # CSV export utility
│   ├── schedules-table-page.tsx    # Schedules table page (chưa dùng)
│   └── post-combobox.tsx           # Post selector combobox
├── schemas.ts                      # Zod schemas
└── types.ts                        # TypeScript types

apps/admin/src/components/content/
├── comments/
│   ├── automation-rules-builder.tsx # Automation rules (chưa implement)
│   ├── canned-responses.tsx         # Canned responses (chưa dùng)
│   ├── comment-filters.tsx          # Filter toolbar (chưa dùng)
│   ├── comment-reply-box.tsx        # Reply box component (chưa dùng)
│   ├── comment-thread-drawer.tsx    # Thread drawer (chưa dùng)
│   ├── comment-thread-sheet.tsx     # Thread viewer sheet
│   ├── moderation-best-practices.tsx # Best practices (chưa implement)
│   └── post-preview-card.tsx        # Post preview trong thread
├── dashboard/
│   ├── charts-section.tsx           # Charts widget (chưa implement)
│   ├── comments-needing-attention.tsx # Comments widget
│   ├── content-dashboard.tsx        # Main dashboard component
│   ├── drafts-needing-attention.tsx # Drafts widget
│   ├── kpi-cards.tsx                # KPI cards component
│   ├── publishing-queue.tsx         # Publishing queue widget
│   ├── quick-actions.tsx            # Quick actions buttons
│   ├── recent-activity.tsx          # Recent activity timeline
│   ├── top-posts-table.tsx          # Top posts table (chưa implement)
│   └── upcoming-schedules-table.tsx # Upcoming schedules widget
├── media/
│   ├── media-grid.tsx               # Grid view component
│   ├── media-library.tsx            # Main media library component
│   ├── media-list-view.tsx          # List view (DataTable)
│   ├── media-metadata-sheet.tsx     # Metadata form sheet
│   ├── media-picker-dialog.tsx      # Media picker dialog
│   ├── media-preview-dialog.tsx     # Preview dialog
│   ├── media-toolbar.tsx            # Filter toolbar (chưa dùng)
│   ├── media-upload-dialog.tsx      # Upload dialog
│   ├── media-usage-panel.tsx       # Usage tracking panel
│   └── upload-zone.tsx              # Drag & drop zone (chưa dùng)
├── media-picker-dialog.tsx          # Global media picker (duplicate?)
├── posts/
│   ├── post-comments-tab.tsx        # Comments tab trong post detail
│   ├── post-detail-sheet.tsx        # Post detail sheet (chưa dùng)
│   ├── post-media-tab.tsx           # Media tab trong post detail
│   ├── post-overview-tab.tsx        # Overview tab trong post detail
│   └── post-schedule-tab.tsx        # Schedule tab trong post detail
├── schedules/
│   ├── cadence-guardrails.tsx       # Posting frequency warnings
│   ├── calendar-day-cell.tsx        # Day cell component
│   ├── calendar-event-pill.tsx      # Schedule pill component
│   ├── calendar-event.tsx           # Event component (chưa dùng)
│   ├── calendar-week-header.tsx     # Week header component
│   ├── range-selector.tsx           # Range picker (chưa dùng)
│   ├── schedule-form-sheet.tsx      # Schedule form (duplicate từ features?)
│   ├── schedules-calendar-month.tsx # Month view (chưa implement)
│   ├── schedules-calendar-week.tsx  # Week view component
│   ├── schedules-calendar.tsx       # Calendar wrapper
│   ├── schedules-queue.tsx          # Queue/list view component
│   ├── schedules-view.tsx            # View switcher (calendar/list)
│   └── share-link-button.tsx        # Share link (duplicate?)
└── taxonomy/
    ├── category-manager-dialog.tsx   # Category manager (chưa implement)
    ├── category-select.tsx          # Category selector
    └── tags-combobox.tsx            # Tags combobox với create new

apps/admin/src/hooks/
├── use-comment-list-query.ts        # Comment list query hook
├── use-media-list-query.ts          # Media list query hook
└── use-schedule-list-query.ts       # Schedule list query hook

apps/admin/src/app/(admin)/content/
├── page.tsx                         # Content dashboard
├── posts/
│   ├── page.tsx                     # All posts
│   ├── drafts/page.tsx              # Drafts view
│   ├── scheduled/page.tsx          # Scheduled view
│   ├── new/page.tsx                 # New post
│   └── [id]/edit/page.tsx           # Edit post
├── media/
│   └── page.tsx                     # Media library
├── schedules/
│   └── page.tsx                     # Schedules
└── comments/
    └── page.tsx                     # Comments moderation
```

## 🚀 Usage Examples

### Tạo Post mới

1. Navigate đến `/content/posts/new`
2. `PostEditor` component render với empty form
3. Điền title, slug, excerpt, content
4. Chọn category và tags trong sidebar
5. Attach cover media (Media Picker)
6. Click "Save Draft" button
7. `handleSave()` được gọi
8. `contentProvider.createPost()` với status="draft"
9. Post được tạo và navigate đến `/content/posts/${postId}/edit`
10. Auto-save bắt đầu hoạt động

### Schedule Post

1. Trong Post Editor, chọn `scheduledAt` date trong form
2. Click "Schedule..." trong dropdown menu
3. `handleSchedule()` được gọi
4. `contentProvider.schedulePost()` tạo/update schedule item
5. Post status = "scheduled"
6. Schedule item được tạo với channels
7. Navigate đến Schedules page để xem

### Upload Media

1. Click "Upload Media" trong Media Library
2. `MediaUploadDialog` mở
3. Drag & drop files hoặc click để chọn
4. Validation: max 10MB, allowed types (chưa enforce)
5. Progress indicator (chưa implement)
6. `contentProvider.uploadMedia()` được gọi
7. MediaAsset records được tạo
8. Open Metadata Sheet (chưa tự động mở)
9. Điền title, alt text, tags, source, license
10. Click "Save" → `contentProvider.updateMedia()`
11. Media xuất hiện trong library

### Attach Media to Post

1. Trong Post Editor, click "Attach Media" trong Media card
2. `MediaPickerDialog` mở
3. Search/filter media (chưa implement filter trong picker)
4. Select media
5. Click "Select"
6. Media được attach (heroMediaId hoặc coverMediaId được set)
7. Form update và save

### Moderate Comment

1. Trong Comments page, filter `status=pending`
2. Click row để xem comment
3. `CommentThreadSheet` mở với root comment
4. Click "Approve + Reply"
5. Chọn canned response hoặc viết custom reply
6. Click "Approve + Reply"
7. `updateStatus()` và `reply()` được gọi
8. Comment được approve và reply được gửi
9. Toast notification
10. Thread reload

### Export Schedules

1. Apply filters (range, channel, status)
2. Click "Export CSV" trong toolbar (chưa implement)
3. `contentProvider.exportSchedules()` được gọi
4. CSV string được generate
5. File download: `schedules-2024-01-15.csv`
6. Bao gồm tất cả filtered schedules

## 🔗 Integration Points

### Posts ↔ Schedules

- Schedule Post → Tạo ScheduleItem với channels array
- Unschedule → Update ScheduleItem status to "canceled", Post status to "draft"
- Update Schedule → Update ScheduleItem và Post `scheduledAt`
- Publish Now → Remove ScheduleItem, update Post status

### Posts ↔ Media

- Attach Media → Set heroMediaId/coverMediaId trong Post
- Media Usage Panel → List posts từ `usedInPosts` array
- Deep link: Media → Post Editor (chưa implement)

### Posts ↔ Comments

- Comments count trong Post columns (từ mockComments filter)
- Pending badge nếu có pending comments
- Navigate từ Post → Comments: `/content/comments?postId=${postId}`
- Navigate từ Comments → Post: `/content/posts/${postId}/edit`

### Schedules ↔ Comments

- Schedule published → Post published (via cron job)
- Post published → Comments có thể được approve

## 📊 Data Flow

### Post Creation Flow

```
User fills form
  ↓
Click "Save Draft"
  ↓
handleSave() → contentProvider.createPost()
  ↓
Post created với status="draft"
  ↓
Navigate to /content/posts/${postId}/edit
  ↓
Auto-save bắt đầu (watch form changes)
  ↓
Auto-save sau 2s → contentProvider.updatePost()
```

### Schedule Creation Flow

```
User selects scheduledAt date
  ↓
Click "Schedule..."
  ↓
handleSchedule() → contentProvider.schedulePost()
  ↓
ScheduleItem created với channels
  ↓
Post status = "scheduled"
  ↓
Post scheduledAt updated
```

### Comment Moderation Flow

```
User clicks Approve
  ↓
contentProvider.moderateComment(id, "approve")
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
- Schedule pills với color coding theo channel
- Hover effects
- Drag & drop visual feedback (chưa implement)
- Responsive: Stack layout trên mobile

### Thread Viewer

- Sheet từ bên phải
- Post preview card
- Root comment với replies
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
- Lazy load thumbnails (chưa implement)
- Pagination để tránh load quá nhiều items

**Comments:**
- Server-side pagination
- Debounced search (300ms)

**Auto-save:**
- Debounced 2 seconds
- Silent fail để không interrupt user

## 🐛 Known Issues & Limitations

1. **Mock Provider**: Hiện tại dùng mock data, chưa kết nối real API
2. **Media Upload**: Chưa có real file upload, chỉ tạo mock MediaAsset records
3. **Image Processing**: Chưa có resize/thumbnail generation
4. **Video Preview**: Chưa có video player, chỉ open in new tab
5. **Comment Threading**: Chỉ support 1 level replies (không nested vô hạn)
6. **Schedule Reorder**: OrderIndex chưa persist (UI-only, chưa implement)
7. **Drag & Drop**: Chưa implement drag & drop cho schedules
8. **Rich Text Editor**: Content chỉ là textarea, chưa có rich text editor
9. **Auto-save**: Chưa có visual indicator cho auto-save status
10. **Charts**: Chưa implement charts trong dashboard
11. **Export CSV**: Chưa implement export cho comments và media
12. **Filters**: Một số filters chưa implement (used/unused cho media, etc.)

## 🗺 Roadmap

### Phase 4 (Future)
- S3/R2 integration cho media
- Image processing (resize, thumbnails)
- Video transcoding
- Advanced editor (Lexical với plugins)
- Content templates
- A/B testing
- Drag & drop cho schedules
- Real-time updates (WebSocket)

### Phase 5 (Future)
- Multi-language support
- Content versioning
- Approval workflow
- Content analytics
- SEO optimization tools
- Advanced reporting
