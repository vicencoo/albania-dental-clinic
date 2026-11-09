import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { stagger } from "@/lib/style";

/**
 * Same-day teeth hero — dark "obsidian" split layout.
 * Motion is CSS only (.rise / .unveil / .fade-in), slow and calm.
 * TODO: when a high-resolution photo or a short clinic video is available, it can become a
 * full-bleed background here (current photos are too small to be shown full-width sharply).
 */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="obsidian relative isolate overflow-clip">
      {/* Architectural hairlines + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-luxe grid h-full grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="border-l border-white/4 last:border-r" />
          ))}
        </div>
        <div className="absolute right-[2%] top-1/2 size-208 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(15_106_76/0.3),transparent)]" />
      </div>

      <div className="container-luxe grid items-center gap-16 pb-24 pt-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow rise text-brand-leaf" style={stagger(0)}>
            {t("eyebrow")}
          </p>
          <h1 className="display mt-8 text-[3.3rem] text-brand-white sm:text-7xl lg:text-[6.2rem]">
            <span className="rise block" style={stagger(1)}>
              {t("title")}
            </span>
            <span
              className="rise block bg-linear-to-r from-brand-leaf to-brand-azure bg-clip-text pb-2 italic text-transparent"
              style={stagger(2)}
            >
              {t("accent")}
            </span>
          </h1>
          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-brand-white/65"
            style={stagger(3)}
          >
            {t("text")}
          </p>
          <div
            className="rise mt-12 flex flex-wrap items-center gap-4"
            style={stagger(4)}
          >
            <Button href="/book">{t("primary")}</Button>
            <Button
              href="/same-day-teeth/how-it-works"
              variant="outline-light"
              icon="arrow"
            >
              {t("secondary")}
            </Button>
          </div>

          {/* Quiet credential line (replaces the floating badge) */}
          <div
            className="rise mt-14 flex items-center gap-4 border-t border-white/8 pt-8"
            style={stagger(5)}
          >
            <Image
              src="/images/brand/logo-mark.png"
              alt=""
              width={36}
              height={36}
              className="size-9"
            />
            <p className="font-heading text-xl font-light italic text-brand-white/80">
              {t("badge")}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-88 lg:mr-0 lg:max-w-[24rem]">
          {/* Thin offset ring around the arch */}
          <div
            aria-hidden
            className="arch fade-in absolute -inset-4 border border-brand-leaf/25 [--arch-v:29%]"
            style={stagger(3)}
          />
          <ArchImage
            src="/images/team/dr-donela-dede-with-patient.jpg"
            alt={t("imageAlt")}
            animate="load"
            priority
            ratio="aspect-[9/16]"
            position="50% 30%"
            sizes="(min-width: 1024px) 24rem, 22rem"
            className="relative shadow-soft"
          />

          {/* 3D scan detail */}
          <div
            className="unveil absolute -left-10 bottom-12 w-[44%] rounded-xl border border-white/10 bg-brand-obsidian-soft/80 p-2 shadow-soft backdrop-blur sm:-left-16"
            style={stagger(4)}
          >
            <div className="relative aspect-3/4 overflow-clip rounded-lg">
              <Image
                src="/images/clinic/tech-3d-ct-scan.jpg"
                alt=""
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
