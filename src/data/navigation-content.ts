/**
 * Navigation Content Data
 * 
 * This file contains navigation items for the site header.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dịch vụ",
    href: "/#services", // Anchor link to landing section
  },
  {
    label: "Quy trình",
    href: "/#process", // Anchor link to landing section
  },
  {
    label: "Câu chuyện khách hàng",
    href: "/case-studies",
  },
  {
    label: "Về ProsFIN",
    href: "/about",
  },
  {
    label: "FAQ",
    href: "/#faq", // Anchor link to landing section
  },
];

export const headerCtaLabel = "Đặt lịch tư vấn";

