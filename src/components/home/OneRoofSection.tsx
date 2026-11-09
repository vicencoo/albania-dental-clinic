import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Digital steps in blue, care steps in emerald. */
const iconColor = ["text-brand-blue", "text-brand-blue", "text-brand-green", "text-brand-green"];

const icons: IconName[] = ["cube", "target", "lab", "sparkle"];

/** 3D diagnosis + guided surgery + own lab under one roof. */
export function OneRoofSection() {
  const t = useTranslations("home.oneRoof");
  const pillars = t.raw("pillars") as { title: string; text: string }[];

  return (
    <section id="one-roof" className="bg-brand-white py-28 lg:py-40">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="reveal-right relative mx-auto w-full max-w-sm">
          <ArchImage src="/images/lab/zirconia-bridge.jpg" alt="" ratio="aspect-[3/4]" className="shadow-soft" />
          <div className="reveal-from-right absolute -bottom-8 -right-6 w-48 rounded-xl border border-white/10 bg-brand-obsidian p-6 text-brand-white shadow-soft sm:-right-12">
            <span aria-hidden className="tricolor-line block w-10" />
            <p className="mt-4 font-heading text-2xl font-light leading-tight">{pillars[3]?.title}</p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} />
          <ol className="reveal-stagger mt-14 grid gap-px overflow-clip rounded-xl border border-brand-sand bg-brand-sand sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className="group bg-brand-white p-8 transition-colors duration-500 hover:bg-brand-porcelain"
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-12 place-items-center rounded-full border border-brand-sand transition-colors duration-500 group-hover:border-current ${iconColor[i] ?? "text-brand-green"}`}>
                    <Icon name={icons[i] ?? "tooth"} className="size-5" />
                  </span>
                  <span className="font-heading text-5xl font-light text-brand-sand">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-[1.7rem]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.text}</p>
              </li>
            ))}
          </ol>
          <div className="reveal-from-left mt-10">
            <Button href="/clinic/why-choose-us" variant="secondary">
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
