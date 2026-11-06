import Image from "next/image";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/content/site";
import { Button } from "./Button";
import { stagger } from "@/lib/style";

export interface CTABandProps {
  title: string;
  text?: string;
}

/** Full-width call-to-action band linking to /book (and WhatsApp once configured). */
export function CTABand({ title, text }: CTABandProps) {
  const t = useTranslations("ui");
  const wa = whatsappHref();

  return (
    <section className="relative isolate overflow-clip bg-brand-forest text-brand-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgb(76_154_63/0.35),transparent_45%),radial-gradient(circle_at_85%_80%,rgb(176_141_87/0.3),transparent_45%)]"
      />
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={420}
        height={420}
        aria-hidden
        className="parallax pointer-events-none absolute -right-16 -top-10 -z-10 w-80 opacity-[0.07] lg:w-[26rem]"
      />
      <div className="container-luxe flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <span aria-hidden className="ornament reveal w-40 text-xs">◆</span>
          <h2 className="reveal mt-6 text-4xl sm:text-5xl" style={stagger(1)}>
            {title}
          </h2>
          {text && (
            <p className="reveal mt-4 text-lg text-brand-white/75" style={stagger(2)}>
              {text}
            </p>
          )}
        </div>
        <div className="reveal-left flex flex-wrap gap-4" style={stagger(2)}>
          <Button href="/book" variant="light">
            {t("bookCta")}
          </Button>
          {wa && (
            <Button external={wa} variant="outline-light" leadingIcon="whatsapp" icon={null}>
              {t("whatsappCta")}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
