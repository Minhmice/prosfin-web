/**
 * Case Studies Content Data
 * 
 * This file contains all content for the /case-studies pages.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface CaseStudyFilter {
  id: string;
  label: string;
  type: "industry" | "size";
}

export interface CaseStudyListItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  size: string;
  problems: string[];
  results: string[];
}

export interface CaseStudyStat {
  id: string;
  label: string;
  value: string;
}

export interface CaseStudiesContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta?: { label: string; href: string };
  };
  filters: CaseStudyFilter[];
  cases: CaseStudyListItem[];
  stats: CaseStudyStat[];
}

export const caseStudiesContent: CaseStudiesContent = {
  hero: {
    eyebrow: "Câu chuyện khách hàng",
    title: "Câu chuyện khách hàng",
    subtitle:
      "Một số tình huống ProsFIN đã đồng hành (được ẩn danh / điều chỉnh số liệu để bảo mật).",
    cta: {
      label: "Trao đổi về tình huống tương tự doanh nghiệp bạn",
      href: "/contact",
    },
  },
  filters: [
    { id: "all", label: "Tất cả", type: "industry" },
    { id: "manufacturing", label: "Sản xuất", type: "industry" },
    { id: "service", label: "Dịch vụ", type: "industry" },
    { id: "trading", label: "Thương mại", type: "industry" },
    { id: "small", label: "<20 nhân sự", type: "size" },
    { id: "medium", label: "20-50 nhân sự", type: "size" },
    { id: "large", label: ">50 nhân sự", type: "size" },
  ],
  cases: [
    {
      id: "case-1",
      slug: "dich-vu-sang-tao",
      title: "Giảm áp lực dòng tiền trong 3 tháng cho DN dịch vụ sáng tạo",
      industry: "Dịch vụ",
      size: "20-50 nhân sự",
      problems: [
        "Dòng tiền luôn căng thẳng, không biết 3 tháng tới sẽ như thế nào",
        "Chu kỳ công nợ kéo dài, khách hàng trả chậm",
        "Không dám đầu tư mở rộng vì sợ thiếu vốn",
      ],
      results: [
        "Có dự báo dòng tiền 6 tháng, cập nhật hàng tháng",
        "Quy trình thu tiền rõ ràng, giảm chu kỳ công nợ 20%",
        "Tự tin quyết định mở rộng nhờ có cơ sở tài chính",
      ],
    },
    {
      id: "case-2",
      slug: "san-xuat-nho",
      title: "Xác định và tối ưu 3 khoản chi phí 'ẩn' cho DN sản xuất",
      industry: "Sản xuất",
      size: "20-50 nhân sự",
      problems: [
        "Lãi trên báo cáo nhưng không biết tiền đi đâu",
        "Chi phí sản xuất tăng đều nhưng không biết khoản nào",
        "Không có hệ thống phân tích chi phí theo sản phẩm",
      ],
      results: [
        "Xác định được 3 khoản chi phí 'ẩn' đang ăn lợi nhuận",
        "Có hệ thống theo dõi chi phí theo sản phẩm",
        "Giảm chi phí 15% trong 90 ngày nhờ tối ưu",
      ],
    },
    {
      id: "case-3",
      slug: "startup-tech",
      title: "Từ 'mù mờ số liệu' đến 'sẵn sàng pitch investor' cho startup",
      industry: "Dịch vụ",
      size: "<20 nhân sự",
      problems: [
        "Chưa có hệ thống kế toán bài bản",
        "Cần số liệu để pitch investor nhưng không biết bắt đầu từ đâu",
        "Không hiểu unit economics và burn rate",
      ],
      results: [
        "Có hệ thống báo cáo tài chính đơn giản, dễ hiểu",
        "Hiểu rõ unit economics và burn rate",
        "Sẵn sàng pitch investor với số liệu đáng tin cậy",
      ],
    },
  ],
  stats: [
    {
      id: "stat-1",
      label: "% khách hàng thấy rõ dòng tiền sau 3 tháng",
      value: "95%",
    },
    {
      id: "stat-2",
      label: "% khách quay lại gói tiếp theo",
      value: "80%",
    },
    {
      id: "stat-3",
      label: "Năm kinh nghiệm",
      value: "8+",
    },
    {
      id: "stat-4",
      label: "DN đã tư vấn",
      value: "120+",
    },
  ],
};

