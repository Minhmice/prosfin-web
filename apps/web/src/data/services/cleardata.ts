/**
 * ClearData Service Content Data
 * 
 * Typed content data cho ProsFIN ClearData™ service page.
 * Tất cả copy được lấy từ wireframe example.
 * 
 * NOTE: Dùng marker {tm} trong content để đánh dấu phần cần superscript.
 * Ví dụ: "ClearData{tm}" sẽ được parse thành "ClearData™" ở component level.
 */

// NOTE(Figma): Content structure corresponds to ClearData™ wireframe sections.

export interface TrustBadge {
  label: string;
}

export interface HeroContent {
  title: string;
  subheadline: string;
  bullets: string[];
  trustBadges: TrustBadge[];
  formTitle: string;
  formDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  privacyNote: string;
}

export interface LeadMagnetContent {
  title: string;
  subheadline: string;
  bullets: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  note: string;
}

export interface ConsequenceCard {
  title: string;
  description: string;
  solution: string;
}

export interface ConsequencesContent {
  title: string;
  subheadline: string;
  cards: ConsequenceCard[];
}

export interface SolutionPillar {
  title: string;
  description: string;
}

export interface SolutionContent {
  eyebrow: string;
  title: string;
  definition: string;
  keyOutcomes: string[];
  pillarsTitle: string;
  pillars: SolutionPillar[];
  diagramSteps: string[];
}

export interface ComparisonRow {
  category: string;
  traditional: string;
  cleardata: string;
}

export interface DifferentiationContent {
  title: string;
  subheadline: string;
  comparisonRows: ComparisonRow[];
  inlineCtaTitle: string;
  inlineCtaPrimaryLabel: string;
  inlineCtaSecondaryLabel: string;
}

export interface ScopeCard {
  title: string;
  items: string[];
}

export interface ScopeContent {
  title: string;
  subheadline: string;
  cards: ScopeCard[];
  deliverablesTitle: string;
  deliverables: string[];
  deliverablesNote: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  bullets: string[];
  outputTag: string;
}

export interface ProcessContent {
  title: string;
  subheadline: string;
  steps: ProcessStep[];
  assuranceTitle: string;
  assuranceText: string;
  assuranceBadges: string[];
}

export interface OutcomeItem {
  title: string;
}

export interface OutcomeBlock {
  title: string;
  description: string;
}

export interface OutcomesContent {
  title: string;
  paragraph: string;
  items: OutcomeItem[];
  snapshotTitle: string;
  blocks: OutcomeBlock[];
  kpiTags: string[];
}

export interface CommitmentCard {
  title: string;
  description: string;
}

export interface CommitmentsContent {
  title: string;
  subheadline: string;
  cards: CommitmentCard[];
}

export interface PricingContent {
  title: string;
  subheadline: string;
  priceAmount: string;
  pricePeriod: string;
  priceNote: string;
  includedItems: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  fitTitle: string;
  fitItems: string[];
  notFitTitle: string;
  notFitItems: string[];
  note: string;
}

export interface FaqItem {
  question: string;
  answer?: string;
}

export interface FaqContent {
  title: string;
  subheadline: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  bullets: string[];
  trustBadges: string[];
  formTitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  privacyNote: string;
}

export interface ThankYouContent {
  title: string;
  body: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  note: string;
}

export interface ClearDataContent {
  hero: HeroContent;
  leadMagnet: LeadMagnetContent;
  consequences: ConsequencesContent;
  solution: SolutionContent;
  differentiation: DifferentiationContent;
  scope: ScopeContent;
  process: ProcessContent;
  outcomes: OutcomesContent;
  commitments: CommitmentsContent;
  pricing: PricingContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  thankYou: ThankYouContent;
}

export const clearDataContent: ClearDataContent = {
  hero: {
    title: "Doanh nghiệp bạn có đang sống chung với '2 sổ kế toán'?",
    subheadline:
      "Dữ liệu không nhất quán khiến bạn không truy vết, không đối chiếu, và khó giải trình khi cần.",
    bullets: [
      "Một nguồn dữ liệu nhất quán",
      "Truy vết & đối chiếu rõ ràng",
      "Quản trị được cho CEO/CFO",
    ],
    trustBadges: [
      { label: "Bảo mật dữ liệu" },
      { label: "Chuẩn hoá số liệu" },
      { label: "Tư vấn trực tiếp" },
    ],
    formTitle: "Nhận Checklist CLEAR",
    formDescription:
      "Checklist 15 điểm tự soi rủi ro 'kẹt 2 sổ' và lộ trình làm sạch dữ liệu.",
    primaryCtaLabel: "Nhận Checklist CLEAR",
    secondaryCtaLabel: "Đặt lịch tư vấn 15–30 phút",
    privacyNote:
      "ProsFIN cam kết bảo mật. Thông tin chỉ dùng để gửi checklist và liên hệ khi bạn đồng ý.",
  },
  leadMagnet: {
    title: "NHẬN CHECKLIST CLEAR — 15 điểm tự soi rủi ro 'kẹt 2 sổ'",
    subheadline:
      "Checklist giúp bạn xác định phần nào đang lệch, mức độ rủi ro, và gợi ý lộ trình làm sạch dữ liệu theo từng bước.",
    bullets: [
      "Xác định điểm lệch: công nợ, kho, giá vốn, chi phí",
      "Ước lượng mức rủi ro & mức độ cần xử lý",
      "Gợi ý lộ trình chuyển đổi an toàn, không gián đoạn",
    ],
    primaryCtaLabel: "Nhận Checklist CLEAR",
    secondaryCtaLabel: "Đặt lịch tư vấn 15–30 phút",
    note: "Nhận qua email/Zalo trong thời gian ngắn.",
  },
  consequences: {
    title: "Vì sao biết rủi ro nhưng vẫn chưa dám chuyển?",
    subheadline:
      "Đa số doanh nghiệp không thiếu thiện chí, mà thiếu một lộ trình đủ an toàn để làm sạch dữ liệu.",
    cards: [
      {
        title: "Sợ đụng vào quá khứ — càng làm càng rối",
        description:
          "Nhiều khoản lệch tích tụ lâu, thiếu đối chiếu theo nguồn chứng từ nên càng chạm càng khó.",
        solution: "Cần làm theo bước, khoanh vùng đúng điểm lệch.",
      },
      {
        title: "Thiếu người đủ năng lực tổ chức lại",
        description:
          "Không phải ai cũng vừa hiểu nghiệp vụ vừa dựng được hệ mã, quy trình và kiểm soát dữ liệu.",
        solution: "Cần bộ checklist + chuẩn hoá để giảm phụ thuộc cá nhân.",
      },
      {
        title: "Sợ ảnh hưởng vận hành hiện tại",
        description:
          "Lo dừng hệ thống, chậm chốt số, ảnh hưởng bán hàng/kho/thu chi.",
        solution: "Cần lộ trình triển khai không gián đoạn.",
      },
    ],
  },
  solution: {
    eyebrow: "GIẢI PHÁP",
    title: "ProsFIN ClearData{tm} là gì?",
    definition:
      "ClearData{tm} là dịch vụ kế toán–thuế theo chuẩn dữ liệu, thiết kế để giúp doanh nghiệp chuyển từ '2 sổ' sang một hệ số liệu nhất quán, truy vết và đối chiếu được; vừa đáp ứng nghĩa vụ thuế, vừa phục vụ quản trị và làm việc với ngân hàng/đối tác.",
    keyOutcomes: ["Nhất quán", "Truy vết", "Quản trị được"],
    pillarsTitle: "3 mục tiêu chính",
    pillars: [
      {
        title: "Chuẩn hoá dữ liệu đầu vào",
        description:
          "Chuẩn hệ mã, chứng từ, luồng ghi nhận để số liệu 'đúng nguồn'.",
      },
      {
        title: "Đối chiếu & làm sạch theo bước",
        description:
          "Khoanh vùng điểm lệch (công nợ/kho/giá vốn/chi phí) và xử lý có kiểm soát.",
      },
      {
        title: "Báo cáo phục vụ quyết định",
        description:
          "Tạo lớp báo cáo quản trị để CEO/CFO nhìn được bức tranh thật.",
      },
    ],
    diagramSteps: ["Chuẩn hoá", "Đối chiếu", "Báo cáo"],
  },
  differentiation: {
    title: "Khác gì so với dịch vụ kế toán thông thường?",
    subheadline:
      "Không chỉ 'làm xong kỳ', mục tiêu là tạo một hệ dữ liệu đủ sạch để bạn quản trị và giải trình.",
    comparisonRows: [
      {
        category: "Mục tiêu",
        traditional: "Chốt số, nộp báo cáo đúng hạn",
        cleardata: "Một hệ số liệu nhất quán: thuế + quản trị + đối chiếu",
      },
      {
        category: "Cách làm",
        traditional: "Xử lý theo sự vụ, tuỳ người làm",
        cleardata: "Chuẩn hoá luồng dữ liệu + checklist + quy trình đối chiếu",
      },
      {
        category: "Truy vết & đối chiếu",
        traditional: "Khó truy vết khi phát sinh",
        cleardata: "Truy vết theo chứng từ, đối chiếu theo bước",
      },
      {
        category: "Phụ thuộc nhân sự",
        traditional: "Phụ thuộc 1–2 người nắm 'bí kíp'",
        cleardata: "Giảm phụ thuộc bằng chuẩn hoá & chuyển giao",
      },
      {
        category: "Kết quả cho CEO/CFO",
        traditional: "Nhận báo cáo nhưng khó dùng để quyết định",
        cleardata: "Có lớp báo cáo quản trị, phản ánh thực tế hơn",
      },
    ],
    inlineCtaTitle: "Muốn biết doanh nghiệp bạn đang lệch ở đâu?",
    inlineCtaPrimaryLabel: "Nhận Checklist CLEAR",
    inlineCtaSecondaryLabel: "Book call 15–30 phút",
  },
  scope: {
    title: "ClearData{tm} bao gồm những gì?",
    subheadline:
      "Phạm vi được thiết kế để vừa đảm bảo nghĩa vụ kế toán–thuế, vừa làm sạch và chuẩn hoá dữ liệu để quản trị.",
    cards: [
      {
        title: "Kế toán – Thuế định kỳ",
        items: [
          "Ghi nhận & hạch toán theo chuẩn",
          "Kê khai/hoàn thiện hồ sơ định kỳ",
          "Rà soát lỗi sai phổ biến",
        ],
      },
      {
        title: "Rà soát & Làm sạch dữ liệu",
        items: [
          "Chuẩn số dư, công nợ, kho, giá vốn",
          "Chuẩn hệ mã & danh mục",
          "Đối chiếu theo chứng từ, truy vết",
        ],
      },
      {
        title: "Giảm rủi ro & Tối ưu hợp lệ",
        items: [
          "Soát rủi ro thuế theo nhóm nghiệp vụ",
          "Tối ưu chi phí hợp lệ (đúng bản chất)",
          "Khuyến nghị kiểm soát phòng ngừa",
        ],
      },
      {
        title: "Báo cáo quản trị cho CEO/CFO",
        items: [
          "Báo cáo tổng quan dễ đọc",
          "Chỉ số trọng yếu theo hoạt động",
          "Q&A/đồng hành ra quyết định",
        ],
      },
    ],
    deliverablesTitle: "Đầu ra bạn nhận được",
    deliverables: [
      "Checklist CLEAR (15 điểm)",
      "Bộ hệ mã/danh mục chuẩn hoá (template)",
      "Bảng đối chiếu công nợ/kho/giá vốn (mẫu)",
      "Biên bản/nhật ký làm sạch dữ liệu theo kỳ",
      "Báo cáo quản trị (mẫu 1–2 trang)",
      "Khuyến nghị kiểm soát nội bộ tối thiểu",
      "Hướng dẫn bàn giao để tự duy trì",
    ],
    deliverablesNote:
      "Deliverables có thể tinh chỉnh theo quy mô & mức độ phức tạp.",
  },
  process: {
    title: "Triển khai theo 3 bước — không gián đoạn vận hành",
    subheadline:
      "Lộ trình được thiết kế để xử lý theo bước, khoanh vùng điểm lệch và ổn định hệ dữ liệu dần theo thời gian.",
    steps: [
      {
        number: "01",
        title: "Khảo sát & Khoanh vùng điểm lệch",
        bullets: [
          "Thu thập dữ liệu & hiện trạng sổ sách",
          "Xác định khu vực rủi ro: công nợ/kho/chi phí",
          "Chốt phạm vi ưu tiên theo tác động",
        ],
        outputTag: "Risk map + scope",
      },
      {
        number: "02",
        title: "Chuẩn hoá & Đối chiếu theo bước",
        bullets: [
          "Chuẩn hệ mã/danh mục + quy tắc ghi nhận",
          "Đối chiếu theo chứng từ, tạo nhật ký xử lý",
          "Giải quyết điểm lệch theo thứ tự ưu tiên",
        ],
        outputTag: "Clean data log",
      },
      {
        number: "03",
        title: "Ổn định hệ số liệu & Chuyển giao duy trì",
        bullets: [
          "Thiết lập checklist kiểm soát định kỳ",
          "Báo cáo quản trị tối thiểu cho CEO/CFO",
          "Bàn giao template + hướng dẫn vận hành",
        ],
        outputTag: "Handover pack",
      },
    ],
    assuranceTitle: "Nguyên tắc triển khai",
    assuranceText:
      "Nguyên tắc triển khai: làm theo bước, ưu tiên ổn định, không đứt gãy vận hành.",
    assuranceBadges: ["Khoanh vùng", "Đối chiếu", "Chuyển giao"],
  },
  outcomes: {
    title: "Bạn được gì sau ClearData{tm} ?",
    paragraph:
      "Mục tiêu không phải 'đẹp sổ', mà là một hệ dữ liệu đủ sạch để bạn vận hành, quản trị và giải trình.",
    items: [
      { title: "Một hệ dữ liệu sạch và nhất quán" },
      { title: "Giảm rủi ro đối chiếu thuế và hồ sơ" },
      { title: "Không lệ thuộc vào một cá nhân" },
      { title: "Số liệu phản ánh thực tế tốt hơn" },
      { title: "CEO/CFO ra quyết định trên dữ liệu đáng tin" },
    ],
    snapshotTitle: "Outcome Snapshot",
    blocks: [
      {
        title: "Data Integrity",
        description: "Số liệu nhất quán, truy vết được theo chứng từ",
      },
      {
        title: "Compliance Readiness",
        description: "Đáp ứng nghĩa vụ thuế và sẵn sàng đối chiếu",
      },
      {
        title: "Management Visibility",
        description: "Báo cáo quản trị phản ánh bức tranh thực tế",
      },
    ],
    kpiTags: ["Truy vết", "Đối chiếu", "Báo cáo"],
  },
  commitments: {
    title: "Cam kết khi triển khai",
    subheadline:
      "Chúng tôi tập trung vào tính đúng bản chất, khả năng đối chiếu và chuyển giao để doanh nghiệp tự duy trì.",
    cards: [
      {
        title: "Đúng hạn – đúng bản chất – đối chiếu được",
        description:
          "Đảm bảo tính chính xác và khả năng truy vết theo chứng từ",
      },
      {
        title: "Đồng hành đến khi hệ số liệu ổn định",
        description:
          "Hỗ trợ liên tục cho đến khi dữ liệu được làm sạch và ổn định",
      },
      {
        title: "Bảo mật dữ liệu & kiểm soát truy cập",
        description:
          "Quy trình xử lý thông tin có kiểm soát và bảo mật",
      },
      {
        title: "Chuyển giao checklist & template vận hành",
        description:
          "Trang bị công cụ để đội ngũ tự duy trì sau khi triển khai",
      },
    ],
  },
  pricing: {
    title: "Chi phí và mức độ phù hợp",
    subheadline:
      "Chi phí phụ thuộc quy mô và mức độ phức tạp chứng từ; khảo sát nhanh để chốt phạm vi trước khi triển khai.",
    priceAmount: "5–10 triệu",
    pricePeriod: "/ tháng",
    priceNote:
      "Tuỳ quy mô, số lượng hoá đơn/chứng từ, và mức độ cần làm sạch dữ liệu.",
    includedItems: [
      "Kế toán – thuế định kỳ",
      "Rà soát & làm sạch theo bước",
      "Báo cáo quản trị tối thiểu",
    ],
    primaryCtaLabel: "Nhận Checklist CLEAR",
    secondaryCtaLabel: "Đặt lịch tư vấn 15–30 phút",
    fitTitle: "Phù hợp nếu…",
    fitItems: [
      "DN nhỏ/siêu nhỏ, muốn chuẩn hoá số liệu",
      "Doanh thu thường dưới 30 tỷ/năm (hoặc chưa rõ)",
      "CEO không rành kế toán/thuế nhưng muốn an toàn",
      "Đang có '2 sổ' hoặc số liệu lệch theo kỳ",
      "Thuê kế toán ngoài nhưng không hỗ trợ quản trị",
      "Từng bị nhắc hồ sơ/thiếu chứng từ/lo rủi ro",
    ],
    notFitTitle: "Chưa phù hợp nếu…",
    notFitItems: [
      "Cần dịch vụ chỉ để 'đối phó' hồ sơ, không muốn chuẩn hoá",
      "Không sẵn sàng cung cấp dữ liệu/chứng từ để đối chiếu",
      "DN rất lớn cần hệ thống ERP/đội dự án chuyên sâu ngay",
      "Kỳ vọng xử lý 'một lần là xong' nhưng không duy trì quy trình",
    ],
    note: "Nếu doanh thu >30 tỷ/năm, có thể cần gói/đội hình triển khai khác — hãy book call để được định hướng.",
  },
  faq: {
    title: "Câu hỏi thường gặp",
    subheadline:
      "Một vài băn khoăn phổ biến trước khi bắt đầu chuẩn hoá dữ liệu.",
    items: [
      {
        question: "ClearData{tm} có phải là 'làm lại sổ' từ đầu không?",
        answer:
          "Không. ClearData{tm} làm theo bước, khoanh vùng điểm lệch ưu tiên và chuẩn hoá dần hệ dữ liệu. Mục tiêu là ổn định số liệu và khả năng đối chiếu, không phải 'làm lại tất cả' ngay lập tức.",
      },
      {
        question: "Có cần dừng hoạt động để triển khai không?",
        answer:
          "Không cần. Triển khai song song với vận hành, ưu tiên các hạng mục ít gây gián đoạn trước, sau đó xử lý dần các điểm lệch theo lộ trình đã thống nhất.",
      },
      {
        question: "Doanh nghiệp tôi đang có 2 sổ, có làm được không?",
        answer:
          "Có thể. Chúng tôi sẽ đánh giá hiện trạng dữ liệu/chứng từ, xác định phần nào đang lệch và thiết kế lộ trình chuyển đổi để tiến tới một hệ số liệu nhất quán, truy vết và đối chiếu được.",
      },
      {
        question: "Tôi sợ 'đụng vào quá khứ' sẽ phát sinh rủi ro?",
        answer:
          "Lo lắng này là bình thường. ClearData{tm} xử lý theo nguyên tắc khoanh vùng, đối chiếu theo chứng từ và có nhật ký xử lý rõ ràng để kiểm soát rủi ro, tránh 'đụng đâu rối đó'.",
      },
      {
        question: "Thông tin và dữ liệu có được bảo mật không?",
        answer:
          "Có. ProsFIN cam kết bảo mật và kiểm soát truy cập dữ liệu. Thông tin chỉ dùng cho việc gửi checklist và hỗ trợ/triển khai theo phạm vi bạn đồng ý.",
      },
      {
        question: "Giá 5–10 triệu/tháng bao gồm những gì?",
        answer:
          "Thường bao gồm kế toán–thuế định kỳ, rà soát & làm sạch dữ liệu theo bước, chuẩn hoá danh mục/hệ mã cơ bản và báo cáo quản trị tối thiểu. Chi phí cụ thể phụ thuộc quy mô và số lượng chứng từ.",
      },
      {
        question: "Bao lâu thì thấy 'ổn'?",
        answer:
          "Tuỳ mức độ lệch và độ đầy đủ chứng từ. Thông thường bạn sẽ thấy cải thiện sau vài kỳ khi đối chiếu đi vào nề nếp và checklist kiểm soát được duy trì đều.",
      },
      {
        question: "Nếu doanh thu >30 tỷ/năm thì sao?",
        answer:
          "Vẫn có thể triển khai, nhưng thường cần gói/đội hình phù hợp hơn (phạm vi rộng hơn, yêu cầu hệ thống và kiểm soát cao hơn). Bạn nên đặt lịch trao đổi nhanh để được định hướng đúng ngay từ đầu.",
      },
    ],
  },
  finalCta: {
    eyebrow: "BẮT ĐẦU TỪ HÔM NAY",
    title: "Nhận Checklist CLEAR để biết doanh nghiệp bạn đang lệch ở đâu",
    bullets: [
      "Xác định điểm lệch trọng yếu",
      "Ước lượng mức rủi ro",
      "Gợi ý lộ trình làm sạch theo bước",
    ],
    trustBadges: ["Bảo mật", "Không gián đoạn", "Chuyển giao"],
    formTitle: "Nhận Checklist CLEAR",
    primaryCtaLabel: "Nhận Checklist",
    secondaryCtaLabel: "Đặt lịch tư vấn 15–30 phút",
    privacyNote:
      "ProsFIN cam kết bảo mật. Thông tin chỉ dùng để gửi checklist và liên hệ khi bạn đồng ý.",
  },
  thankYou: {
    title: "Cảm ơn bạn. Checklist CLEAR đã được ghi nhận.",
    body: "Chúng tôi sẽ gửi checklist qua email/Zalo. Nếu bạn muốn đi nhanh hơn, đặt lịch tư vấn 15–30 phút.",
    primaryCtaLabel: "Đặt lịch tư vấn",
    secondaryCtaLabel: "Quay lại trang",
    note: "Nếu không thấy email, hãy kiểm tra Spam/Promotions.",
  },
};

