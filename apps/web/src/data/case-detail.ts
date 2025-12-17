/**
 * Case Study Detail Content Data
 * 
 * This file contains detailed content for individual case study pages.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ApproachStep {
  title: string;
  description: string;
}

export interface CaseStudyDetail {
  slug: string;
  hero: {
    title: string;
    tags: string[];
  };
  context: {
    industry: string;
    size: string;
    duration: string;
    background: string;
  };
  challenges: string[];
  approach: ApproachStep[];
  results: string[];
  quote?: string;
  learnings: string[];
}

export const caseStudyDetailMap: Record<string, CaseStudyDetail> = {
  "dich-vu-sang-tao": {
    slug: "dich-vu-sang-tao",
    hero: {
      title:
        "Từ 'mù mờ dòng tiền' đến 'chủ động dòng tiền 3 tháng tới' cho DN dịch vụ sáng tạo 25 nhân sự",
      tags: ["Dịch vụ", "20-50 nhân sự", "Dòng tiền"],
    },
    context: {
      industry: "Dịch vụ sáng tạo",
      size: "25 nhân sự",
      duration: "3 tháng",
      background:
        "Doanh nghiệp dịch vụ sáng tạo đang tăng trưởng nhanh, doanh thu tăng đều nhưng dòng tiền luôn căng thẳng. Chủ doanh nghiệp không biết 3 tháng tới sẽ có đủ tiền trả lương và trả nợ không.",
    },
    challenges: [
      "Dòng tiền luôn căng thẳng, không biết 3 tháng tới sẽ như thế nào",
      "Chu kỳ công nợ kéo dài, khách hàng trả chậm 60-90 ngày",
      "Không dám đầu tư mở rộng vì sợ thiếu vốn",
      "Không có hệ thống theo dõi và dự báo dòng tiền",
    ],
    approach: [
      {
        title: "Thiết lập hệ thống dự báo dòng tiền",
        description:
          "ProsFIN xây dựng mô hình dự báo dòng tiền dựa trên lịch sử và kế hoạch kinh doanh. Mô hình được thiết kế đơn giản, dễ cập nhật hàng tuần.",
      },
      {
        title: "Phân tích và tối ưu quy trình thu tiền",
        description:
          "Chúng tôi phân tích chu kỳ công nợ và đề xuất cách tối ưu quy trình thu tiền, bao gồm cải thiện invoice process và follow-up với khách hàng.",
      },
      {
        title: "Theo dõi và cảnh báo hàng tháng",
        description:
          "Mỗi tháng, chúng tôi review dòng tiền thực tế vs dự báo, điều chỉnh và cảnh báo sớm khi có nguy cơ thiếu tiền.",
      },
      {
        title: "Hỗ trợ quyết định đầu tư",
        description:
          "Khi doanh nghiệp muốn đầu tư mở rộng, chúng tôi đánh giá tác động tài chính và đề xuất timing phù hợp.",
      },
    ],
    results: [
      "Có dự báo dòng tiền 6 tháng, cập nhật hàng tháng",
      "Quy trình thu tiền rõ ràng, giảm chu kỳ công nợ từ 90 ngày xuống 60 ngày",
      "Tự tin quyết định mở rộng nhờ có cơ sở tài chính",
      "Giảm stress về tài chính, chủ động hơn trong quản lý",
    ],
    quote:
      "Trước đây tôi luôn lo lắng về tiền mặt. Giờ tôi biết chính xác 3 tháng tới sẽ như thế nào và có thể chủ động quyết định.",
    learnings: [
      "Dự báo dòng tiền là công cụ quan trọng để quản lý tài chính, đặc biệt với DN dịch vụ có chu kỳ công nợ dài",
      "Tối ưu quy trình thu tiền có thể cải thiện đáng kể dòng tiền mà không cần tăng doanh thu",
      "Có cơ sở tài chính rõ ràng giúp chủ doanh nghiệp tự tin hơn trong quyết định đầu tư/mở rộng",
    ],
  },
  "san-xuat-nho": {
    slug: "san-xuat-nho",
    hero: {
      title:
        "Xác định và tối ưu 3 khoản chi phí 'ẩn' cho DN sản xuất 35 nhân sự",
      tags: ["Sản xuất", "20-50 nhân sự", "Chi phí"],
    },
    context: {
      industry: "Sản xuất",
      size: "35 nhân sự",
      duration: "90 ngày",
      background:
        "Doanh nghiệp sản xuất nhỏ, lãi trên báo cáo nhưng không biết tiền đi đâu. Chi phí sản xuất tăng đều nhưng không biết khoản nào đang 'ăn' lợi nhuận.",
    },
    challenges: [
      "Lãi trên báo cáo nhưng không biết tiền đi đâu",
      "Chi phí sản xuất tăng đều nhưng không biết khoản nào",
      "Không có hệ thống phân tích chi phí theo sản phẩm",
      "Không biết sản phẩm nào đang lãi, sản phẩm nào đang lỗ",
    ],
    approach: [
      {
        title: "Phân tích chi phí toàn diện",
        description:
          "ProsFIN phân tích chi tiết tất cả chi phí, từ nguyên vật liệu, nhân công, đến chi phí gián tiếp. Chúng tôi xác định được 3 khoản chi phí 'ẩn' đang ăn lợi nhuận.",
      },
      {
        title: "Xây dựng hệ thống theo dõi chi phí",
        description:
          "Chúng tôi xây dựng hệ thống theo dõi chi phí theo sản phẩm, giúp doanh nghiệp biết sản phẩm nào đang lãi, sản phẩm nào đang lỗ.",
      },
      {
        title: "Đề xuất tối ưu chi phí",
        description:
          "Dựa trên phân tích, chúng tôi đề xuất cách tối ưu 3 khoản chi phí 'ẩn', bao gồm đàm phán lại giá với nhà cung cấp và tối ưu quy trình sản xuất.",
      },
      {
        title: "Theo dõi và đánh giá kết quả",
        description:
          "Sau 90 ngày, chúng tôi review lại và đánh giá kết quả. Doanh nghiệp đã giảm chi phí 15% nhờ tối ưu.",
      },
    ],
    results: [
      "Xác định được 3 khoản chi phí 'ẩn' đang ăn lợi nhuận",
      "Có hệ thống theo dõi chi phí theo sản phẩm",
      "Giảm chi phí 15% trong 90 ngày nhờ tối ưu",
      "Hiểu rõ sản phẩm nào đang lãi, sản phẩm nào đang lỗ",
    ],
    quote:
      "Tôi không ngờ có những khoản chi phí 'ẩn' như vậy. Giờ tôi biết chính xác chi phí của từng sản phẩm và có thể quyết định tập trung vào sản phẩm nào.",
    learnings: [
      "Phân tích chi phí chi tiết là bước quan trọng để tối ưu lợi nhuận, đặc biệt với DN sản xuất",
      "Có hệ thống theo dõi chi phí theo sản phẩm giúp doanh nghiệp quyết định tập trung vào sản phẩm nào",
      "Tối ưu chi phí không chỉ là cắt giảm, mà còn là tối ưu quy trình và đàm phán lại giá",
    ],
  },
};

