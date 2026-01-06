/**
 * Email Sequences
 * 
 * Template logic for nurture email sequences.
 * Personalization based on topRisks and lead context.
 */

import type { LeadNormalized } from "./lead.types";

export type EmailSequence = "email_0" | "email_1" | "email_2" | "email_3";

export interface EmailTemplate {
  subject: string;
  body: string;
  personalization?: Record<string, string>;
}

/**
 * Get scan data from lead
 */
function getScanData(lead: LeadNormalized) {
  const scan = (lead.meta as any)?.extras?.oneledgerScan || (lead as any).extras?.oneledgerScan;
  return {
    riskLevel: scan?.riskLevel as "low" | "medium" | "high" | "critical" | undefined,
    topRisks: (scan?.topRisks || []) as string[],
    recommendedModuleIds: (scan?.recommendedModuleIds || []) as string[],
  };
}

/**
 * Get email template for sequence
 */
export function getEmailTemplate(lead: LeadNormalized, sequence: EmailSequence): EmailTemplate {
  const scan = getScanData(lead);
  const topRisks = scan.topRisks || [];

  switch (sequence) {
    case "email_0": {
      // Instant: confirm + agenda for assessment call
      return {
        subject: "Xác nhận: ProsFIN đã nhận thông tin khảo sát OneLedger™",
        body: `Chào ${lead.contact.fullName},

Cảm ơn bạn đã đăng ký khảo sát OneLedger™. Chúng tôi đã nhận được thông tin của bạn.

Chúng tôi sẽ liên hệ trong vòng 24-48 giờ để:
- Xác nhận mục tiêu và phạm vi dự án
- Thảo luận về tình trạng hiện tại của hệ thống kế toán
- Đề xuất roadmap và acceptance gates phù hợp

Trong thời gian chờ đợi, bạn có thể:
- Tải về Scope & Acceptance Gates: [link]
- Xem Data Request Checklist: [link]
- Đặt lịch trực tiếp: [calendar link]

Trân trọng,
Đội ngũ ProsFIN`,
      };
    }

    case "email_1": {
      // D+2: "Why numbers diverge (multi-ledger)"
      const isDataIntegrity = topRisks.includes("data_integrity");
      const body = isDataIntegrity
        ? `Chào ${lead.contact.fullName},

Dựa trên thông tin bạn đã cung cấp, chúng tôi nhận thấy doanh nghiệp đang gặp vấn đề về tính nhất quán của số liệu (nhiều bộ sổ).

Bài viết này giải thích tại sao số liệu phân kỳ và cách OneLedger™ giải quyết:
[Link bài viết: "Tại sao số liệu phân kỳ: từ kế toán thuế → kế toán quản trị"]

Nếu bạn muốn thảo luận sâu hơn, hãy đặt lịch: [calendar link]

Trân trọng,
Đội ngũ ProsFIN`
        : `Chào ${lead.contact.fullName},

Chúng tôi đã chuẩn bị một số tài liệu hữu ích về chuẩn hoá hệ thống kế toán:

- "One source of truth cho DN Việt": [link]
- "Chuẩn dữ liệu nội bộ: chart of accounts, mapping, cut-off": [link]

Nếu bạn có câu hỏi, hãy liên hệ: contact@prosfin.vn

Trân trọng,
Đội ngũ ProsFIN`;

      return {
        subject: "Tại sao số liệu phân kỳ và cách giải quyết",
        body,
      };
    }

    case "email_2": {
      // D+5: "Reporting pack starter kit"
      const isReporting = topRisks.includes("no_management_reporting");
      const body = isReporting
        ? `Chào ${lead.contact.fullName},

Báo cáo quản trị là nền tảng để CEO/CFO ra quyết định. Bài viết này hướng dẫn thiết kế reporting pack tối thiểu:

[Link bài viết: "Reporting pack tối thiểu cho CEO/CFO"]

Module M5 (Reporting Pack & Early Warning KPIs) trong OneLedger™ sẽ giúp bạn:
- Báo cáo quản trị CFO-ready trong 5 ngày
- KPI cảnh báo sớm cho cash/margin/AR/AP
- Dashboard spec theo mô hình DN

Xem chi tiết module: [link to module M5]

Trân trọng,
Đội ngũ ProsFIN`
        : `Chào ${lead.contact.fullName},

Chúng tôi đã chuẩn bị tài liệu về báo cáo quản trị:

- "Reporting pack tối thiểu cho CEO/CFO": [link]
- "KPI cảnh báo sớm: cash/margin/AR/AP": [link]

Trân trọng,
Đội ngũ ProsFIN`;

      return {
        subject: "Reporting pack starter kit cho CEO/CFO",
        body,
      };
    }

    case "email_3": {
      // D+9: "Transaction readiness checklist"
      const triggerEvents = (lead.intent as any)?.triggerEvents as string[] | undefined;
      const isTransaction = triggerEvents?.includes("mna") || triggerEvents?.includes("fundraising");
      const body = isTransaction
        ? `Chào ${lead.contact.fullName},

Chuẩn bị cho vay vốn/gọi vốn/M&A đòi hỏi số liệu nhất quán, truy xuất được, và reporting đúng chuẩn thẩm định.

Checklist "Transaction Readiness" bao gồm:
- Baseline số liệu tin cậy
- Audit trail minh bạch
- Reporting pack đúng mục tiêu
- Controls vận hành được

Xem checklist đầy đủ: [link]
Xem Bundle D (Transaction Readiness): [link to bundle-d]

Nếu bạn muốn thảo luận về timeline và phạm vi, hãy đặt lịch: [calendar link]

Trân trọng,
Đội ngũ ProsFIN`
        : `Chào ${lead.contact.fullName},

Chúng tôi đã chuẩn bị checklist "Readiness cho các giai đoạn phát triển":

- Checklist vay vốn/gọi vốn/M&A: [link]
- "Audit trail là gì, vì sao ngân hàng/thẩm định cần?": [link]

Trân trọng,
Đội ngũ ProsFIN`;

      return {
        subject: "Transaction readiness checklist",
        body,
      };
    }
  }
}

/**
 * Get email send schedule
 */
export function getEmailSchedule(sequence: EmailSequence): number {
  // Days after lead submission
  switch (sequence) {
    case "email_0":
      return 0; // Instant
    case "email_1":
      return 2;
    case "email_2":
      return 5;
    case "email_3":
      return 9;
  }
}

