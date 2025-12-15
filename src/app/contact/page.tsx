import { contactPageContent } from "@/data/contact-page";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";
import { ContactForm } from "@/components/landing/contact/contact-form";
import { ContactInfoBlock } from "@/components/landing/contact/contact-info-block";
import { ProsfinContactCardWrapper } from "@/components/shared/card/prosfin-contact-card-wrapper";
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
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: CTA Copy */}
          <div className="max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Sẵn sàng nhìn rõ bức tranh tài chính của bạn?
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Điền form bên phải hoặc liên hệ trực tiếp. ProsFIN sẽ phản hồi
              trong vòng 24 giờ làm việc.
            </p>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <span className="leading-relaxed">
                  Hiểu nhanh lãi – lỗ và dòng tiền hiện tại
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <span className="leading-relaxed">
                  Nhận gợi ý ưu tiên 3 việc cần làm trong 30–90 ngày tới
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  ✓
                </span>
                <span className="leading-relaxed">
                  Tất cả trao đổi được bảo mật thông tin
                </span>
              </li>
            </ul>
            <div className="rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed">
              <p className="text-muted-foreground">{privacyNote}</p>
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
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Câu hỏi thường gặp về liên hệ
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

