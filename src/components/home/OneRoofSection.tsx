import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger } from "@/lib/style";
import { tone, type Tone } from "@/lib/tone";

const tones: Tone[] = ["blue", "blue", "green", "red"];

const icons: IconName[] = ["cube", "target", "lab", "sparkle"];

/** 3D diagnosis + guided surgery + own lab under one roof. */
export function OneRoofSection() {
  const t = useTranslations("home.oneRoof");
  const pillars = t.raw("pillars") as { title: string; text: string }[];

  return (
    <section id="one-roof" className="py-24 lg:py-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="reveal-right relative mx-auto w-full max-w-sm">
          <ArchImage src="/images/lab/zirconia-bridge.jpg" alt="" ratio="aspect-[3/4]" className="shadow-soft" />
          <div className="reveal-zoom absolute -bottom-8 -right-6 w-44 rounded-[1.5rem] border-t-4 border-brand-red bg-brand-green p-5 text-brand-white shadow-soft sm:-right-12">
            <Icon name="sparkle" className="size-6 text-brand-gold-light" />
            <p className="mt-3 font-heading text-xl leading-tight">{pillars[3]?.title}</p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className="reveal-rotate lift group rounded-[1.75rem] border border-brand-sand bg-brand-white p-7"
                style={stagger(i)}
              >
                <div className="flex items-center justify-between">
                  <span className={`reveal-spin grid size-12 place-items-center rounded-full transition-colors duration-500 group-hover:text-brand-white ${tone[tones[i] ?? "green"].soft} ${tone[tones[i] ?? "green"].text} ${tone[tones[i] ?? "green"].hoverBg}`}>
                    <Icon name={icons[i] ?? "tooth"} className="size-6" />
                  </span>
                  <span className="font-heading text-4xl text-brand-gold/40">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.text}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-10">
            <Button href="/clinic/why-one-of-two" variant="secondary">
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
