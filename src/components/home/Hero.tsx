import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { stagger } from "@/lib/style";

/** Same-day teeth hero. All motion is CSS (.rise / .unveil / .float / .kenburns). */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate overflow-clip bg-brand-porcelain grain">
      {/* Ambient decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/3 size-[28rem] rounded-full bg-brand-leaf/10 blur-3xl" />
        <div className="absolute -right-24 -top-24 size-[32rem] rounded-full bg-brand-gold/15 blur-3xl" />
        <svg viewBox="0 0 400 400" className="spin-slow absolute right-[8%] top-[12%] size-[38rem] text-brand-gold/25">
          <circle cx="200" cy="200" r="198" fill="none" stroke="currentColor" strokeDasharray="1 9" />
        </svg>
      </div>

      <div className="container-luxe grid items-center gap-14 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-16">
        <div>
          <p className="eyebrow rise" style={stagger(0)}>
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 text-[3.2rem] leading-[0.98] text-brand-ink sm:text-7xl lg:text-[5.6rem]">
            <span className="rise block" style={stagger(1)}>
              {t("title")}
            </span>
            <span className="rise relative inline-block italic text-brand-green" style={stagger(2)}>
              {t("accent")}
              {/* Logo tricolour underline, drawn in after the headline */}
              <span
                aria-hidden
                className="tricolor-line absolute -bottom-1 left-0 w-full origin-left animate-[grow-x_1.2s_0.9s_var(--ease-luxe)_both]"
              />
            </span>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-brand-muted" style={stagger(3)}>
            {t("text")}
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={stagger(4)}>
            <Button href="/book">{t("primary")}</Button>
            <Button href="/same-day-teeth/how-it-works" variant="secondary" icon="arrow">
              {t("secondary")}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ArchImage
            src="/images/team/dr-donela-dede-with-patient.jpg"
            alt={t("imageAlt")}
            animate="load"
            priority
            kenburns
            ratio="aspect-[4/5]"
            position="50% 35%"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="ml-auto w-[82%] shadow-soft"
          />

          {/* Secondary arch: 3D scan */}
          <div className="unveil absolute -left-2 bottom-10 w-[38%] sm:left-0" style={stagger(4)}>
            <div className="arch relative aspect-[3/4] border-4 border-brand-white bg-brand-navy shadow-soft">
              <Image
                src="/images/clinic/tech-3d-ct-scan.jpg"
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Badge */}
          <div
            className="float absolute right-0 top-6 flex items-center gap-3 rounded-2xl border-l-4 border-brand-red bg-brand-white/90 py-3 pl-3 pr-5 shadow-soft backdrop-blur sm:-right-4"
            style={stagger(1)}
          >
            <Image src="/images/brand/logo-mark.png" alt="" width={40} height={40} className="size-10" />
            <p className="max-w-[11rem] font-heading text-lg leading-tight text-brand-ink">{t("badge")}</p>
          </div>
        </div>
      </div>

      <a
        href="#one-roof"
        className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-brand-muted lg:flex"
        style={stagger(6)}
      >
        {t("scroll")}
        <span className="relative h-10 w-px overflow-clip bg-brand-gold/30">
          <span className="float absolute inset-x-0 top-0 h-4 bg-brand-gold" />
        </span>
      </a>
    </section>
  );
}
