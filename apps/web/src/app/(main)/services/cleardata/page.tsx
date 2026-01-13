import type { Metadata } from "next";
import { ClearDataPageContent } from "./components/cleardata-page-content";

export const metadata: Metadata = {
  title: "ProsFIN ClearData™ - Chuẩn hoá dữ liệu kế toán | ProsFIN",
  description:
    "Dịch vụ kế toán–thuế theo chuẩn dữ liệu, giúp doanh nghiệp chuyển từ '2 sổ' sang một hệ số liệu nhất quán, truy vết và đối chiếu được.",
  keywords: ["Kế toán", "Chuẩn hoá dữ liệu", "Kế toán dịch vụ", "ClearData"],
  openGraph: {
    title: "ProsFIN ClearData™ - Chuẩn hoá dữ liệu kế toán",
    description:
      "Dịch vụ kế toán–thuế theo chuẩn dữ liệu, giúp doanh nghiệp chuyển từ '2 sổ' sang một hệ số liệu nhất quán, truy vết và đối chiếu được.",
    url: "/services/cleardata",
  },
};

/**
 * ClearData Service Page
 * 
 * Custom service page cho ProsFIN ClearData™.
 * Không dùng ServiceRenderer, tự render các sections.
 */
export default function ClearDataServicePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "ProsFIN ClearData™" },
  ];

  return (
    <>
      {/* ClearData Content */}
      <ClearDataPageContent breadcrumbItems={breadcrumbItems} />
    </>
  );
}

