import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { GlobalJsonLd } from "@/components/seo/global-jsonld";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn"
  ),
  title: {
    default: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
    template: "%s | ProsFIN",
  },
  description:
    "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
  keywords: [
    "tư vấn tài chính",
    "tài chính doanh nghiệp",
    "dòng tiền",
    "báo cáo tài chính",
    "kế toán",
    "SME",
    "startup",
    "tư vấn thuế",
  ],
  authors: [{ name: "ProsFIN" }],
  creator: "ProsFIN",
  publisher: "ProsFIN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "ProsFIN",
    title: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
    description:
      "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProsFIN - Tư vấn tài chính doanh nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
    description:
      "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <GlobalJsonLd />
      </head>
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <MarketingLayout>{children}</MarketingLayout>
      </body>
    </html>
  );
}
