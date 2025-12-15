Ok, giờ mình chơi “meta”: thay vì chỉ gợi ý ý tưởng, mình viết luôn **prompt cụ thể** để bạn quăng vào Cursor / agent và cho nó tự cải tiến UX + thêm feature.

Mình chia 4 nhóm:

1. Prompt review & nâng UX tổng thể.
2. Prompt cho microcopy / form / CTA.
3. Prompt cho interaction + storytelling (đỡ nhàm chán).
4. Prompt cho **feature mới** (financial quiz, demo dashboard, resource hub…).

Tất cả đều dựa trên best practice UX cho SaaS/B2B & financial advisor website: rõ một conversion chính, social proof mạnh, navigation dễ, form rõ ràng, nội dung nhiều giá trị, thêm công cụ/quiz, scheduling, blog/resources…

Bạn chỉ cần copy từng block, chỉnh nhẹ tên file/folder cho đúng repo là dùng được.

---

## 1. Prompt: UX Review & Refactor toàn bộ marketing pages

**Mục tiêu:** Cho agent đi một vòng từ layout, spacing, responsive, tới navigation — đảm bảo web trông “Big4-grade”, dễ đọc, và chuẩn cho B2B SaaS landing.

> **PROMPT 1 – Global UX Pass**

> Bạn là AI coding agent đang làm việc trong codebase ProsFIN – website tư vấn tài chính cho chủ doanh nghiệp.
> Tech: **Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui, Framer Motion (để sau), GSAP (để sau)**.
> Dữ liệu của các section marketing được lưu trong các file `.ts` trong `src/data/`.
>
> Nhiệm vụ: Thực hiện 1 vòng **UX Review + Refactor nhẹ** cho toàn bộ các trang marketing:
>
> * `app/(marketing)/page.tsx` (landing)
> * `app/(marketing)/services/page.tsx`
> * `app/(marketing)/services/[slug]/page.tsx`
> * `app/(marketing)/process/page.tsx`
> * `app/(marketing)/case-studies/page.tsx`
> * `app/(marketing)/case-studies/[slug]/page.tsx`
> * `app/(marketing)/about/page.tsx`
> * `app/(marketing)/faq/page.tsx`
> * `app/(marketing)/contact/page.tsx`
>
> Yêu cầu chi tiết:
>
> 1. **Layout & hierarchy**
>
>    * Đảm bảo mọi page marketing đều dùng chung `MarketingLayout` + `ProsfinContainer`.
>    * Chuẩn hóa **vertical rhythm**: khoảng cách giữa các section (vd `py-16 md:py-24`) phải nhất quán.
>    * Heading hierarchy: mỗi page có **1 H1**, các H2/H3 logic, đúng semantic.
> 2. **Navigation & anchor**
>
>    * Kiểm tra `SiteHeader` + nav:
>
>      * Link tới các anchor trên landing (`#services`, `#process`, `#trust`, `#about`, `#faq`, `#contact`) phải tồn tại.
>      * Trên mobile dùng `MobileMenu` (Sheet) với cùng danh sách link.
>    * Xử lý scroll-smooth (chỉ front-end, không thêm lib nặng).
> 3. **Responsive & readability**
>
>    * Tối ưu cho mobile-first: đảm bảo mọi section đọc tốt trên màn hình nhỏ: font size, line-height, padding không bị chật.
>    * Điều chỉnh max-width cho đoạn text dài (vd `max-w-2xl`) để tránh “tường chữ”.
> 4. **Visual consistency**
>
>    * Dùng **token màu brand** thống nhất trong theme shadcn (primary, muted, border).
>    * Sử dụng `ProsfinSectionWrapper`, `ProsfinSectionHeading`, các wrapper card (`ProsfinServiceCardWrapper`, `ProsfinProcessCardWrapper`, …) thay vì style rời rạc.
>    * Kiểm tra lại icon size, radius, shadow để trông thống nhất.
> 5. **Accessibility cơ bản**
>
>    * Đảm bảo contrast cho text vs background đủ (theo WCAG cơ bản).
>    * Alt text cơ bản cho hình minh họa.
>    * Button/text link phân biệt rõ (underline / màu / weight).
>
> Đầu ra mong muốn:
>
> * Refactor component và page theo các nguyên tắc trên.
> * Giữ nguyên logic (chưa động tới backend), chỉ sửa UI/UX + layout + semantic.
> * Viết commit theo từng nhóm thay đổi (VD: `feat: standardize marketing layout spacing`, `refactor: unify section headings`).

---

## 2. Prompt: Cải tiến Microcopy, CTA & Form UX

Microcopy (text nhỏ ở nút, label, error message, hint) ảnh hưởng trực tiếp tới conversion và cảm giác “người thật nói chuyện với mình”.

> **PROMPT 2 – UX Writing & Microcopy Pass**

> Bạn là UX writer + frontend dev cho ProsFIN.
> Nhiệm vụ: Cải tiến **microcopy** (CTA, label, placeholder, helper text, error) trên tất cả form & button trong marketing pages, để:
>
> * Rõ ràng, ngắn gọn, tập trung vào **outcome** cho user,
> * Tông giọng: **chuyên nghiệp, trấn an, dễ hiểu** (target: chủ DN Việt, không chuyên tài chính),
> * Nhất quán giữa các trang.
>
> Phạm vi:
>
> * Hero CTA + subheadline,
> * Nút trong Services, Process, Case Studies, About, FAQ, Contact,
> * Mọi form: HeroLeadFormModal, Contact form, mini form ở cuối Services / Case / Process.
>
> Hướng dẫn chi tiết:
>
> 1. **CTA button text**
>
>    * Tránh text generic (“Gửi”, “Submit”) → chuyển thành **hành động cụ thể + lợi ích**
>
>      * Ví dụ: “Gửi thông tin” → “Gửi số liệu để ProsFIN xem giúp bức tranh tài chính”
>    * Mỗi màn hình chỉ có 1 CTA chính rõ nhất (primary button), CTA phụ là secondary/ghost, ngắn gọn.
> 2. **Form label & placeholder**
>
>    * Label rõ ràng, thẳng mục đích: “Doanh nghiệp của bạn đang gặp vấn đề gì nhất?” thay vì “Nội dung”.
>    * Placeholder mang tính gợi ý nội dung (ví dụ thực tế) hơn là lặp lại label.
> 3. **Helper text & error message**
>
>    * Thêm helper text nơi cần (email, phone, mô tả vấn đề) để giảm nỗi sợ “viết không đúng”:
>
>      * Ví dụ: “Bạn chỉ cần mô tả sơ bộ, không cần số liệu chi tiết ngay.”
>    * Error message thân thiện, cụ thể:
>
>      * Không: “Lỗi” / “Không hợp lệ”
>      * Mà: “Vui lòng nhập email để ProsFIN có thể phản hồi cho bạn.”
> 4. **Tông giọng nhất quán**
>
>    * Duy trì xưng hô ProsFIN – “bạn / doanh nghiệp bạn”,
>    * Tránh jargon tài chính, nếu bắt buộc dùng thì kết hợp tooltip / giải thích ngắn.
>
> Output:
>
> * Update text trực tiếp trong các file data `.ts` (vd: `src/data/hero.ts`, `services-page.ts`, `contact-page.ts`) thay vì hardcode trong component.
> * Đảm bảo không làm vỡ layout (text quá dài → chia dòng hoặc rút gọn).

---

## 3. Prompt: Interaction & Scrollytelling (cho bớt nhàm chán)

Để landing không nhàm chán mà vẫn “chuyên nghiệp”, trend hiện tại là dùng **micro-interactions** + **scrollytelling nhẹ**: card hover, section reveal khi scroll, metric counter, timeline animate… thay vì animation lòe loẹt.

> **PROMPT 3 – Add Subtle Interactions & Scrollytelling**

> Bạn là frontend dev cho ProsFIN, dùng **Framer Motion + GSAP** cùng Next.js/TS/Tailwind/shadcn.
> Mục tiêu: Thêm **micro-interactions tinh tế** & **scrollytelling nhẹ** cho landing + 1–2 page quan trọng, để tăng engagement nhưng vẫn giữ vibe Big4 (không màu mè quá đà).
>
> Phạm vi ưu tiên:
>
> * Landing: Hero, Process section, Trust section (metrics + logo), Case strip.
> * `/process`: timeline quy trình.
> * `/case-studies/[slug]`: kể story khi scroll.
>
> Yêu cầu:
>
> 1. **Reveal on scroll (section-level)**
>
>    * Dùng Framer Motion cho hiệu ứng `fade + slide up` khi section vào viewport (chỉ 1 lần, không lặp nhiều, tránh chóng mặt).
>    * Tạo hook `useInViewAnimation` để reuse: input là delay & direction.
> 2. **Card hover states**
>
>    * Services, Process, Case, Team card: thêm hover state rõ ràng:
>
>      * nâng nhẹ (`translate-y-1`),
>      * shadow nhấn,
>      * border-primary subtle.
>    * Giữ transition mượt (`transition-all`, 150–200ms).
> 3. **Animated metrics & counters**
>
>    * Ở Trust/About (`ProsfinMetricPill`): thêm count-up animation khi vào viewport (vd từ 0 → 50+).
>    * Dùng requestAnimationFrame hoặc small library nhẹ, tránh import nặng.
> 4. **Scrollytelling cho Process / Case detail**
>
>    * `/process`: khi user scroll qua từng step, highlight step hiện tại (border, background), đồng thời text mô tả bên cạnh thay đổi tương ứng.
>    * `/case-studies/[slug]`:
>
>      * chia story thành 3 block: Problem → Approach → Result;
>      * dùng scroll-driven animation nhẹ để chuyển giữa các block (opacity/position).
> 5. **Performance & accessibility**
>
>    * Lazy-load animation logic: dynamic import Framer Motion/GSAP cho các component marketing (không ảnh hưởng dashboard sau này).
>    * Không sử dụng parallax nặng, tránh làm site “lag” trên mobile/3G.
>
> Output:
>
> * Component mới/hook được đặt trong `src/components/shared/animation/` hoặc `src/hooks/`.
> * Document ngắn trong comment về cách dùng mỗi API animation.

---

## 4. Prompt: Thêm Feature để site “dày” & hữu ích hơn

Các best-practice cho website tài chính & advisor đều nhấn mạnh: **website không chỉ là brochure**, mà nên có **tool/experience tương tác**: calculator, quiz, resource hub, scheduling, client portal entry…, giúp người dùng ở lại lâu hơn và cảm nhận giá trị trước khi liên hệ.

Dưới đây là vài feature rất hợp ProsFIN + prompt tương ứng.

---

### 4.1. Feature: “Financial Health Self-Check” – Quiz/Checklist tương tác

> **PROMPT 4 – Build Financial Health Self-Check Tool**

> Mục tiêu: Tạo một **financial health self-check** đơn giản trên web ProsFIN, nơi chủ DN tự trả lời 6–10 câu hỏi nhanh để:
>
> * Nhận 1 “mức độ sức khỏe tài chính” sơ bộ (VD: Đỏ / Vàng / Xanh),
> * Nhận 3 gợi ý hành động nhẹ,
> * Được mời book call nếu muốn đi sâu.
>
> Tech & UX yêu cầu:
>
> 1. Tech:
>
>    * Next.js + shadcn/ui, data câu hỏi trong `src/data/health-check.ts`.
>    * Logic tính điểm **chỉ front-end**, không liên quan dữ liệu thực tế (đây là quiz marketing).
>    * Kết quả không phải tư vấn tài chính chính thức, chỉ là gợi ý sơ bộ.
> 2. UX:
>
>    * Mỗi câu hỏi: 3–5 lựa chọn, text dễ hiểu, không jargon.
>    * Tiến trình hiển thị (stepper hoặc progress bar).
>    * Sau khi hoàn thành:
>
>      * Show badge trạng thái (Đỏ/Vàng/Xanh),
>      * 3 bullet gợi ý hành động,
>      * CTA: “Đặt lịch để ProsFIN xem chi tiết số liệu của bạn”.
> 3. Vị trí:
>
>    * Embed một bản rút gọn ở landing (Trust hoặc Services),
>    * Page riêng `/health-check` để share link từ social.
>
> Output:
>
> * Component: `HealthCheckWizard` trong `src/components/health-check/`.
> * Data-driven, dễ chỉnh câu hỏi/gợi ý trong file `.ts`.

---

### 4.2. Feature: Demo “Dashboard preview” – cho user thấy mình sẽ nhận được gì

Các site tài chính & fintech hiện đại hay show **interactive dashboard preview** để user hình dung benefit.

> **PROMPT 5 – Build Interactive Dashboard Preview**

> Mục tiêu: Tạo một **Dashboard Preview** (mock) trên landing / `/services`, cho thấy cách ProsFIN trình bày:
>
> * Health score,
> * 2–3 KPI chính (profit, cashflow),
> * Alert + “3 việc cần làm”.
>
> Yêu cầu:
>
> 1. Đây chỉ là **mock UI**, data lấy từ `src/data/dashboard-demo.ts`, không call API.
> 2. Người dùng có thể:
>
>    * Chọn “ngành” (dropdown) → đổi ví dụ KPI / câu chữ,
>    * Hover vào KPI để xem tooltip giải thích (dùng `ProsfinTooltip`).
> 3. Layout:
>
>    * Card lớn health score, 2–3 card nhỏ KPI, 1 panel “3 hành động gợi ý”.
>    * Tông màu consistent với brand, không quá khoa học viễn tưởng.
> 4. Integration:
>
>    * Đặt section này ngay sau phần “Vấn đề” / trước “Dịch vụ” trên landing,
>    * CTA dưới block: “Muốn xem dashboard cho chính doanh nghiệp bạn? → Đặt lịch”.
>
> Output:
>
> * Component: `DashboardPreviewSection` trong `src/components/landing/`.
> * Data file `dashboard-demo.ts` với các preset theo ngành.

---

### 4.3. Feature: Resource / Insights Hub nhẹ – `/resources`

> **PROMPT 6 – Build Lightweight Resources/Insights Page**

> Mục tiêu: Tạo `/resources` – trang tập hợp các bài viết/tài liệu ngắn ProsFIN dùng để educate chủ DN (dưới dạng card), theo best practice content hub cho B2B/financial.
>
> Yêu cầu:
>
> 1. Data:
>
>    * Tạo `src/data/resources.ts` với list bài: title, slug, topic, format (article/video/checklist), short summary, level (basic/advanced).
> 2. Page `/resources`:
>
>    * Hero: “Tài nguyên cho chủ doanh nghiệp đọc hiểu tài chính”.
>    * Filter: theo topic + level (dùng shadcn `Tabs` + `Select`).
>    * Grid card: bấm vào dẫn sang `/resources/[slug]` (page chi tiết hoặc tạm thời là external link).
> 3. Integrate với landing:
>
>    * Thêm một strip “Mới trên blog/insights” ở gần cuối landing với 3 bài mới nhất.
>    * CTA: “Xem tất cả tài nguyên” → `/resources`.
>
> Output:
>
> * Components: `ResourcesSection`, `ResourceCard`, page `/resources`.
> * Giữ code đơn giản, data-driven.

---

### 4.4. Feature: “Who we help” segmentation page nhỏ – `/who-we-help`

> **PROMPT 7 – Build Who-We-Help Segmentation Page**

> Mục tiêu: Làm một page nhỏ `/who-we-help` hoặc section mạnh trong `/services` dùng **Tabs** để nói thẳng với 2–3 nhóm khách hàng chính, tránh cảm giác chung chung.
>
> Yêu cầu:
>
> 1. Dùng shadcn `Tabs`, tạo component `ProsfinSegmentTabs`:
>
>    * Tab: “Chủ doanh nghiệp SME”, “Startup / DN trẻ”, “Phòng kế toán / tài chính nội bộ”.
> 2. Trong mỗi tab:
>
>    * 3–5 pain điển hình,
>    * 2–3 outcome ProsFIN thường mang lại,
>    * Link tới gói dịch vụ phù hợp (slug trong `/services`).
> 3. Đặt link tới page này từ:
>
>    * Hero (link nhẹ “ProsFIN phù hợp với ai?”),
>    * Services page (section riêng).
>
> Output:
>
> * Component + data `.ts`, dễ maintain.

---

### 4.5. Feature: Sticky Mobile CTA + Scroll-to-top

> **PROMPT 8 – Add Mobile Sticky CTA & Scroll-to-Top**

> Mục tiêu: Tăng conversion trên mobile theo best-practice SaaS/B2B: CTA luôn sẵn sàng, nhưng không làm phiền.
>
> Yêu cầu:
>
> 1. **Sticky Mobile CTA bar**:
>
>    * Chỉ hiển thị trên viewport nhỏ (`md:hidden`).
>    * Dính dưới: full-width bar với 1 primary button: “Đặt lịch tư vấn” → mở `HeroLeadFormModal` hoặc `/contact`.
> 2. **Scroll-to-top button**:
>
>    * Icon nhỏ ở góc dưới phải (`fixed`), chỉ hiện sau khi scroll xuống một đoạn.
>    * Click → smooth scroll về top.
> 3. Đảm bảo:
>
>    * Không che footer (thêm spacing cuối page),
>    * Accessible (ARIA label, focusable).

---

Nếu bạn muốn, bước tiếp theo mình có thể:

* Gom toàn bộ lại thành **IMPLEMENTATION PLAN (frontend)**: thứ tự chạy từng prompt trong Cursor (pass UX, pass microcopy, thêm interaction, thêm feature A/B/C), hoặc
* Viết riêng một **prompt “orchestrator”** cho Cursor kiểu: “đây là AGENTS.md + TechDesign + toàn bộ TODO UX/feature; hãy chọn task nhỏ và implement dần, mỗi commit một nhóm”.
