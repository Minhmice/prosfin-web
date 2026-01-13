/**
 * Recruitment Routes Helpers
 * 
 * Helpers for routing, metadata, and breadcrumbs for recruitment pages.
 */

import type { Metadata } from "next";
import type { RecruitmentPage } from "@/content/recruitment.catalog";
import { getAllRecruitmentPages } from "@/content/recruitment.catalog";
import type { BreadcrumbItemData } from "@/components/site/breadcrumbs";

const SITE_NAME = "ProsFIN";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

/**
 * Build metadata for recruitment hub page
 */
export function getRecruitmentHubMetadata(): Metadata {
  return {
    title: `Tuyển dụng | ${SITE_NAME}`,
    description:
      "Giải pháp Tuyển dụng Nhân sự Tài chính cho Doanh nghiệp. Kết nối đúng người – đúng giai đoạn – đúng nhu cầu quản trị.",
    openGraph: {
      title: `Tuyển dụng | ${SITE_NAME}`,
      description:
        "Giải pháp Tuyển dụng Nhân sự Tài chính cho Doanh nghiệp. Môi giới tuyển dụng và đào tạo chuyên môn.",
      url: `${BASE_URL}/recruitment`,
      type: "website",
    },
  };
}

/**
 * Build metadata for recruitment page detail
 */
export function getRecruitmentPageMetadata(page: RecruitmentPage): Metadata {
  const title = `${page.label} | Tuyển dụng | ${SITE_NAME}`;
  const description =
    page.description ||
    `${page.label} - Giải pháp tuyển dụng nhân sự tài chính chuyên nghiệp.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/recruitment/${page.slug}`,
      type: "website",
    },
  };
}

/**
 * Build breadcrumb for recruitment hub
 */
export function getRecruitmentHubBreadcrumb(): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", href: "/recruitment" },
  ];
}

/**
 * Build breadcrumb for recruitment page
 */
export function getRecruitmentPageBreadcrumb(
  page: RecruitmentPage
): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", href: "/recruitment" },
    { label: page.label, href: `/recruitment/${page.slug}` },
  ];
}

/**
 * Build breadcrumb for talent pool
 */
export function getTalentPoolBreadcrumb(): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", href: "/recruitment" },
    { label: "Talent Pool", href: "/recruitment/talent-pool" },
  ];
}

/**
 * Build breadcrumb for candidate detail
 */
export function getCandidateDetailBreadcrumb(
  candidateCode: string
): BreadcrumbItemData[] {
  return [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", href: "/recruitment" },
    { label: "Talent Pool", href: "/recruitment/talent-pool" },
    { label: candidateCode, href: `/recruitment/talent-pool/${candidateCode}` },
  ];
}

/**
 * Get all recruitment static params for generateStaticParams
 */
export function getAllRecruitmentStaticParams(): Array<{ slug: string }> {
  const pages = getAllRecruitmentPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

