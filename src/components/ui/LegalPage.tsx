import { useTranslations } from "next-intl";
import { PageHero } from "./PageHero";
import { stagger } from "@/lib/style";

/** Legal / policy page from messages "legal.<key>" (array of {title, text}). */
export function LegalPage({ title, sectionsKey, label }: { title: string; sectionsKey: string; label: string }) {
  const t = useTranslations("legal");
  const sections = t.raw(sectionsKey) as { title: string; text: string }[];

  return (
    <>
      <PageHero title={title} breadcrumbs={[{ label }]} intro={t("updated")} />
      <div className="container-luxe py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="rounded-2xl border border-brand-gold/40 bg-brand-porcelain px-5 py-4 text-sm text-brand-muted">
            {t("draftNote")}
          </p>
          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <section key={section.title} className="reveal" style={stagger(i % 3)}>
                <h2 className="text-3xl">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-muted">{section.text}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
