import { useLocale } from "next-intl";
import type { Faq } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "./Icon";
import { stagger } from "@/lib/style";

export interface FAQAccordionProps {
  items: Faq[];
  /** Emit FAQPage JSON-LD (only once per page). */
  schema?: boolean;
}

/** Native <details> accordion — keyboard accessible, animated with CSS only. */
export function FAQAccordion({ items, schema = true }: FAQAccordionProps) {
  const locale = useLocale() as AppLocale;
  if (items.length === 0) return null;

  return (
    <>
      <div className="accordion divide-y divide-brand-sand border-y border-brand-sand">
        {items.map((faq, i) => (
          <details key={faq.id} className="group reveal" style={stagger(i)} name="faq">
            <summary className="flex items-center justify-between gap-6 py-6 text-left">
              <span className="font-heading text-2xl text-brand-ink transition-colors group-hover:text-brand-green">
                {faq.question[locale]}
              </span>
              <span className="chevron grid size-10 shrink-0 place-items-center rounded-full border border-brand-gold/50 text-brand-gold">
                <Icon name="plus" className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 leading-relaxed text-brand-muted">{faq.answer[locale]}</p>
          </details>
        ))}
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((faq) => ({
              "@type": "Question",
              name: faq.question[locale],
              acceptedAnswer: { "@type": "Answer", text: faq.answer[locale] },
            })),
          }}
        />
      )}
    </>
  );
}
