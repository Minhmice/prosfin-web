import { faqPageContent } from "@/data/faq-page";
import { H2, ProsfinSectionWrapper, ProsfinSectionHeading, Text } from "@/components/shared";
import { FaqCategoryAccordion } from "@/components/faq/faq-category-accordion";
import { ProsfinSecondaryButton } from "@/components/shared";

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
              <H2 className="mb-6">{category.label}</H2>
              <FaqCategoryAccordion
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
          <H2 className="mb-4">Vẫn còn câu hỏi riêng?</H2>
          <Text as="p" variant="lead" className="mb-6 mx-auto max-w-2xl">
            Nếu bạn vẫn còn câu hỏi riêng, hãy để lại thông tin. Chúng tôi sẽ
            phản hồi trong vòng 24 giờ làm việc.
          </Text>
          <ProsfinSecondaryButton href="/contact" size="lg">
            Liên hệ với ProsFIN
          </ProsfinSecondaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

