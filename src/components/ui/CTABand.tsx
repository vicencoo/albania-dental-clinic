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
    <section className="obsidian relative isolate overflow-clip border-t border-white/[0.06]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_70%_at_15%_50%,rgb(15_106_76/0.35),transparent_70%),radial-gradient(ellipse_40%_60%_at_90%_80%,rgb(31_111_163/0.25),transparent_70%)]"
      />
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={420}
        height={420}
        aria-hidden
        className="parallax pointer-events-none absolute -right-16 -top-10 -z-10 w-80 opacity-[0.05] grayscale lg:w-[26rem]"
      />
      <div className="container-luxe flex flex-col items-start gap-10 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-32">
        <div className="max-w-2xl">
          <span aria-hidden className="tricolor-line reveal-from-left block w-16" />
          <h2 className="reveal-text display mt-8 text-[2.6rem] sm:text-6xl" style={stagger(1)}>
            {title}
          </h2>
          {text && (
            <p className="reveal mt-5 text-lg text-brand-white/60" style={stagger(2)}>
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
