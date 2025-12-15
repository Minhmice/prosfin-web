import { faqPageContent } from "@/data/faq-page";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";
import { ProsfinFaqAccordion } from "@/components/shared/accordion/prosfin-faq-accordion";
import { ProsfinSecondaryButton } from "@/components/shared/button/prosfin-secondary-button";

/**
 * FAQ Page
 * 
 * Trang câu hỏi thường gặp đầy đủ.
 */
export default function FaqPage() {
  const { hero, categories, items } = faqPageContent;

  // Group items by category
  const itemsByCategory = categories.map((category) => ({
    category,
    items: items.filter((item) => item.categoryId === category.id),
  }));

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

      {/* FAQ by Category */}
      <ProsfinSectionWrapper>
        <div className="space-y-12">
          {itemsByCategory.map(({ category, items: categoryItems }) => (
            <div key={category.id}>
              <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                {category.label}
              </h2>
              <ProsfinFaqAccordion
                items={categoryItems.map((item) => ({
                  id: item.id,
                  question: item.question,
                  answer: item.answerLong,
                }))}
              />
            </div>
          ))}
        </div>
      </ProsfinSectionWrapper>

      {/* Still Need Help */}
      <ProsfinSectionWrapper background="muted">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Vẫn còn câu hỏi riêng?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Nếu bạn vẫn còn câu hỏi riêng, hãy để lại thông tin. Chúng tôi sẽ
            phản hồi trong vòng 24 giờ làm việc.
          </p>
          <ProsfinSecondaryButton href="/contact" size="lg">
            Liên hệ với ProsFIN
          </ProsfinSecondaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

