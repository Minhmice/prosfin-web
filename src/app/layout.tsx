import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
  description:
    "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <MarketingLayout>{children}</MarketingLayout>
      </body>
    </html>
  );
}
