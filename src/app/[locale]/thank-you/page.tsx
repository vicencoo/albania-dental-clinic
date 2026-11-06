import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/content/site";
import { stagger } from "@/lib/style";

const KEY = "thankYou";
const PATH = "/thank-you";

type Props = PageProps<"/[locale]/thank-you">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH, { noindex: true });
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="relative overflow-clip bg-brand-porcelain py-28 grain lg:py-36">
      <div className="container-luxe max-w-2xl text-center">
        <span className="rise mx-auto grid size-20 place-items-center rounded-full bg-brand-green text-brand-white shadow-soft">
          <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              strokeDashoffset="24"
              style={{ animation: "draw 0.8s 0.4s var(--ease-luxe) forwards" }}
            />
          </svg>
        </span>
        <h1 className="rise mt-8 text-5xl sm:text-6xl" style={stagger(1)}>
          {t(`pages.${KEY}.title`)}
        </h1>
        <p className="rise mt-5 text-lg text-brand-muted" style={stagger(2)}>
          {t("thankYouPage.text")}
        </p>
        <p className="rise mt-2 text-brand-muted" style={stagger(3)}>
          {t("thankYouPage.next")}
        </p>
        <div className="rise mt-10 flex flex-wrap justify-center gap-4" style={stagger(4)}>
          <Button href="/same-day-teeth">{t("nav.sameDay")}</Button>
          <Button external={site.social.instagram} variant="secondary" leadingIcon="instagram" icon={null}>
            {t("ui.followUs")}
          </Button>
        </div>
        <Icon name="tooth" className="float mx-auto mt-16 size-8 text-brand-gold/60" />
      </div>
    </section>
  );
}
