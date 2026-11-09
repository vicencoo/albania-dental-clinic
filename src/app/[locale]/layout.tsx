import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { GoogleAds } from "@/components/analytics/GoogleAds";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site, siteUrl } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { asLocale, localeParams } from "@/lib/locale";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.home" });
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t("title"), template: `%s | ${site.name}` },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ui" });

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-white focus:p-3"
          >
            {t("skipToContent")}
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <GoogleAds />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
