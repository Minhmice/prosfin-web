/**
 * Landing Content Adapter
 * 
 * Content adapter layer for landing page.
 * Currently reads from data files, but can be swapped for DB/API in Phase 3.
 */

import { type LandingContent } from "./types";
import { heroContent } from "@/data/heroContent";
import { problemSectionContent } from "@/data/problem-content";
import { servicesSectionContent } from "@/data/services-content";
import { processSectionContent } from "@/data/process-content";
import { faqSectionContent } from "@/data/faq-content";
import { contactSectionContent } from "@/data/contact-content";

/**
 * Get landing page content
 * 
 * Aggregates all content needed for landing page.
 * In Phase 3, this can be replaced with API/DB calls.
 * 
 * @returns LandingContent object
 */
export function getLandingContent(): LandingContent {
  return {
    hero: {
      eyebrow: heroContent.eyebrow,
      title: heroContent.headline,
      subtitle: heroContent.subheadline,
      stats: heroContent.stats,
      heroImage: heroContent.heroImage,
      cta: {
        label: heroContent.primaryCta.label,
        href: heroContent.primaryCta.href,
        variant: "primary",
        type: heroContent.primaryCta.href.startsWith("#") ? "scroll" : "link",
      },
    },
    trust: {
      title: "Được tin tưởng bởi",
      logos: [
        // Placeholder - sẽ thay bằng logos thật
        { name: "Client 1", logo: "/images/logo-placeholder.svg" },
        { name: "Client 2", logo: "/images/logo-placeholder.svg" },
        { name: "Client 3", logo: "/images/logo-placeholder.svg" },
      ],
    },
    solutions: {
      eyebrow: problemSectionContent.eyebrow,
      title: problemSectionContent.title,
      subtitle: problemSectionContent.subtitle,
      items: problemSectionContent.problems.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        link: undefined,
      })),
      cta: problemSectionContent.cta
        ? {
            label: problemSectionContent.cta.label,
            href: problemSectionContent.cta.href,
            variant: "primary",
          }
        : undefined,
    },
    servicesPreview: {
      eyebrow: servicesSectionContent.eyebrow,
      title: servicesSectionContent.title,
      subtitle: servicesSectionContent.subtitle,
      services: servicesSectionContent.services.map((s) => ({
        id: s.id,
        slug: s.id,
        title: s.name,
        summary: s.shortDescription,
        shortDescription: s.shortDescription,
        idealClient: s.idealClient,
        pillBenefits: s.pillBenefits,
        ctaLabel: s.ctaLabel,
        ctaType: s.ctaType,
        ctaTarget: s.ctaTarget,
        tags: [],
      })),
      cta: {
        label: "Xem toàn bộ dịch vụ",
        href: "/services",
        variant: "outline",
      },
    },
    processPreview: {
      eyebrow: processSectionContent.eyebrow,
      title: processSectionContent.title,
      subtitle: processSectionContent.subtitle,
      steps: processSectionContent.steps.map((s, idx) => ({
        id: s.id || `step-${idx + 1}`,
        order: idx + 1,
        title: s.title,
        description: s.description,
        deliverables: "deliverables" in s && Array.isArray(s.deliverables) ? s.deliverables : [],
      })),
      cta: {
        label: "Xem quy trình chi tiết",
        href: "/process",
        variant: "outline",
      },
    },
    faq: {
      eyebrow: faqSectionContent.eyebrow,
      title: faqSectionContent.title,
      subtitle: faqSectionContent.subtitle,
      items: faqSectionContent.items,
      cta: {
        label: "Xem thêm câu hỏi",
        href: "/faq",
        variant: "outline",
      },
    },
    proof: {
      eyebrow: "Câu chuyện khách hàng",
      title: "Kết quả thực tế từ các doanh nghiệp đã đồng hành",
      subtitle: "Một số tình huống ProsFIN đã hỗ trợ (được ẩn danh để bảo mật)",
      items: [
        {
          id: "proof-1",
          industry: "Sản xuất",
          result: "Giảm áp lực dòng tiền trong 3 tháng",
          description: "DN sản xuất 25 nhân sự đã cải thiện dòng tiền và có báo cáo tài chính rõ ràng hơn.",
          link: "/case-studies/example-1",
        },
        {
          id: "proof-2",
          industry: "Dịch vụ",
          result: "Tối ưu chi phí và tăng lợi nhuận 15%",
          description: "Studio dịch vụ sáng tạo đã xác định được các khoản chi phí không cần thiết và tối ưu hóa ngân sách.",
          link: "/case-studies/example-2",
        },
      ],
      cta: {
        label: "Xem thêm câu chuyện khách hàng",
        href: "/case-studies",
        variant: "outline",
      },
    },
    finalCta: {
      eyebrow: contactSectionContent.eyebrow,
      title: contactSectionContent.title,
      subtitle: contactSectionContent.subtitle,
      formFields: undefined,
    },
  };
}

