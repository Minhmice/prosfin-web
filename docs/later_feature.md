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

