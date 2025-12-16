import { contactPageContent } from "@/data/contact-page";
import { H2, ProsfinSectionWrapper, ProsfinSectionHeading, Text } from "@/components/shared";
import { ContactForm } from "@/components/landing/contact/contact-form";
import { ContactInfoBlock } from "@/components/landing/contact/contact-info-block";
import { ProsfinContactCardWrapper } from "@/components/shared";
import { contactSectionContent } from "@/data/contact-content";

/**
 * Contact Page
 * 
 * Trang liên hệ và đặt lịch tư vấn.
 */
export default function ContactPage() {
  const { hero, formFields, privacyNote, faqs } = contactPageContent;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          align="center"
          titleSize="xl"
        />
      </ProsfinSectionWrapper>

      {/* Form & Contact Info */}
      <ProsfinSectionWrapper>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
          {/* Left: CTA Copy */}
          <div className="max-w-2xl">
            <H2 className="mb-4">Sẵn sàng nhìn rõ bức tranh tài chính của bạn?</H2>
            <Text as="p" variant="lead" className="mb-6">
              Điền form bên phải hoặc liên hệ trực tiếp. ProsFIN sẽ phản hồi
              trong vòng 24 giờ làm việc.
            </Text>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <Text as="span" variant="body">
                  Hiểu nhanh lãi – lỗ và dòng tiền hiện tại
                </Text>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <Text as="span" variant="body">
                  Nhận gợi ý ưu tiên 3 việc cần làm trong 30–90 ngày tới
                </Text>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <Text as="span" variant="body">
                  Tất cả trao đổi được bảo mật thông tin
                </Text>
              </li>
            </ul>
            <div className="rounded-lg border bg-muted/50 p-4">
              <Text as="p" variant="muted" className="leading-relaxed">
                {privacyNote}
              </Text>
            </div>
          </div>

          {/* Right: Contact Form & Info */}
          <div>
            <ProsfinContactCardWrapper>
              <ContactForm submitLabel="Gửi thông tin & đặt lịch tư vấn" />
              <div className="mt-6 border-t pt-6">
                <ContactInfoBlock
                  contactInfo={contactSectionContent.contactInfo}
                />
              </div>
            </ProsfinContactCardWrapper>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* FAQ Mini */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <H2 className="mb-8">Câu hỏi thường gặp về liên hệ</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-lg border bg-card p-4 shadow-sm md:p-6"
              >
                <Text as="p" variant="large" className="mb-2">
                  {faq.question}
                </Text>
                <Text as="p" variant="muted" className="leading-relaxed">
                  {faq.answer}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

