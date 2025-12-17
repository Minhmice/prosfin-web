# ProsFIN Web

Website marketing cho ProsFIN (B2B/financial advisory), xây bằng Next.js App Router.

## Tech stack

- **Next.js**: 16.x (App Router)
- **React**: 19.x
- **TypeScript**: 5.x
- **Tailwind CSS**: v4 (import qua `src/app/globals.css`)
- **shadcn/ui + Radix**: UI primitives trong `src/components/ui/**`
- **Form**: React Hook Form + Zod
- **Animation**: Framer Motion + GSAP (một số section)

## Yêu cầu hệ thống

- **Node.js**: khuyến nghị **>= 20**
- **npm**: repo đang dùng `package-lock.json`

## Cài đặt

```bash
npm install
```

## Chạy local (dev)

```bash
npm run dev
```

Mở `http://localhost:3000`.

## Scripts

- **dev**: `npm run dev`
- **lint**: `npm run lint`
- **build**: `npm run build`
- **start** (production): `npm run start`

> Lưu ý: hiện tại project **không có file `.env*`** và cũng **không dùng `process.env`** trong `src/`.

## Routes chính (App Router)

Các page nằm trong `src/app/**`:

- `/` – Landing
- `/services` – Dịch vụ
- `/services/[slug]` – Chi tiết dịch vụ
- `/process` – Quy trình
- `/case-studies` – Câu chuyện khách hàng
- `/case-studies/[slug]` – Chi tiết case study
- `/about` – Về ProsFIN
- `/faq` – FAQ
- `/contact` – Liên hệ
- `/onboarding/*` – Flow onboarding (form)

## Cấu trúc thư mục (high-level)

- `src/app/`: route + layout (Next App Router)
- `src/components/`:
  - `landing/`: section của landing (hero, services, process, about, faq, contact…)
  - `navigation/`: header/nav/mobile menu/sticky CTA
  - `layout/`: layout wrappers (vd: `MarketingLayout`)
  - `shared/`: wrapper UI dùng chung (button/card/section/toast/animation…)
  - `ui/`: **shadcn/ui** (Radix primitives)
- `src/data/`: nội dung dạng data-driven (CTA/microcopy, services, process, faq…)
- `src/hooks/`: custom hooks
- `src/lib/`: utilities (vd: `cn`/helpers)
- `public/`: static assets (logo, icon…)

## Styling & theme

- Global styles + token màu nằm ở `src/app/globals.css` (định nghĩa CSS variables cho theme).
- Alias import: `@/*` trỏ về `src/*` (xem `tsconfig.json`).

## Quy ước khi phát triển (để dễ maintain)

- **Không chỉnh trực tiếp shadcn/ui**: không sửa file trong `src/components/ui/**`. Nếu cần “custom UI”, tạo wrapper trong `src/components/shared/**` hoặc `src/components/**` rồi compose từ `@/components/ui/...`.
- **Component TSX giữ gọn**: ưu tiên tách nhỏ component/hook nếu file bắt đầu dài/khó đọc.
- **Microcopy/data**: text/label/CTA nên đặt trong `src/data/**` thay vì hardcode.

## Ghi chú về form (demo)

Một số form/CTA hiện đang ở mode demo (log/alert) và chưa nối backend/API (có TODO trong code).

## Deploy

Có thể deploy lên Vercel như một Next.js app tiêu chuẩn. Nếu cần cấu hình domain/SEO/analytics, hãy bổ sung theo môi trường triển khai.
