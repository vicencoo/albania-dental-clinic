import { isPlaceholder, site, siteUrl } from "@/content/site";
import { treatmentHref, treatments } from "@/content/treatments";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

/**
 * Dentist structured data. Placeholder values are omitted until the clinic confirms them.
 * @param treatmentName translated name of a treatment (e.g. t(treatment.labelKey))
 */
export function dentistSchema(locale: AppLocale, treatmentName: (labelKey: string) => string): Record<string, unknown> {
  const real = (v: string) => (isPlaceholder(v) ? undefined : v);
  const sameAs = Object.values(site.social).filter((v) => !isPlaceholder(v));
  const hasAddress = !isPlaceholder(site.address.street);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${siteUrl()}/#dentist`,
    name: site.name,
    url: localizedUrl(locale, "/"),
    logo: `${siteUrl()}/images/brand/logo-full.png`,
    image: `${siteUrl()}/images/clinic/exterior.webp`,
    telephone: real(site.phone),
    email: real(site.email),
    employee: { "@type": "Person", name: site.leadDoctor, jobTitle: "Dentist" },
    medicalSpecialty: ["Dentistry", "OralSurgery"],
    knowsLanguage: ["sq", "it", "en"],
    areaServed: [site.address.city, "AL", "IT", "GB", "DE", "CH", "GR"].filter((v) => !isPlaceholder(v)),
    availableService: treatments.map((tr) => ({
      "@type": "MedicalProcedure",
      name: treatmentName(tr.labelKey),
      url: localizedUrl(locale, treatmentHref(tr)),
    })),
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: real(site.address.postalCode),
          addressCountry: site.address.country,
        }
      : { "@type": "PostalAddress", addressLocality: real(site.address.city), addressCountry: site.address.country },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

/** WebSite structured data (home page): site name and language for search engines. */
export function websiteSchema(locale: AppLocale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: site.name,
    url: localizedUrl(locale, "/"),
    inLanguage: locale,
    publisher: { "@id": `${siteUrl()}/#dentist` },
  };
}
