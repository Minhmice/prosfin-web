import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AdminShell } from "@/components/admin/admin-shell";
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
  title: {
    default: "Admin | ProsFIN",
    template: "%s | Admin | ProsFIN",
  },
  description: "ProsFIN Admin Dashboard",
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
        <AdminShell>{children}</AdminShell>
        <Toaster />
      </body>
    </html>
  );
}

