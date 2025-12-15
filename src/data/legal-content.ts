/**
 * Legal Content Data
 * 
 * This file contains legal/disclosure content for the footer.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface LegalContent {
  copyright: string;
  disclaimer: string;
  footerLinks: FooterLinkGroup[];
}

export const legalContent: LegalContent = {
  copyright: "© 2025 ProsFIN. All rights reserved.",
  disclaimer:
    "Các thông tin trên website mang tính chất tham khảo, không phải là cam kết chắc chắn về kết quả tài chính hay tư vấn đầu tư.",
  footerLinks: [
    {
      title: "Điều hướng",
      links: [
        { label: "Dịch vụ", href: "#services" },
        { label: "Quy trình", href: "#process" },
        { label: "Về ProsFIN", href: "#about" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { label: "Chính sách bảo mật", href: "/privacy" },
        { label: "Điều khoản sử dụng", href: "/terms" },
      ],
    },
  ],
};

