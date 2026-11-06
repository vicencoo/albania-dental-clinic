import { isPlaceholder, site, siteUrl } from "@/content/site";

/** Dentist structured data. Placeholder values are omitted until the clinic confirms them. */
export function dentistSchema(): Record<string, unknown> {
  const real = (v: string) => (isPlaceholder(v) ? undefined : v);
  const sameAs = Object.values(site.social).filter((v) => !isPlaceholder(v));
  const hasAddress = !isPlaceholder(site.address.street);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.name,
    url: siteUrl(),
    logo: `${siteUrl()}/images/brand/logo-full.png`,
    image: `${siteUrl()}/images/team/dr-donela-dede-with-patient.jpg`,
    telephone: real(site.phone),
    email: real(site.email),
    employee: { "@type": "Person", name: site.leadDoctor, jobTitle: "Dentist" },
    medicalSpecialty: ["Dentistry", "OralSurgery"],
    availableService: ["Dental implants", "All-on-4", "All-on-6", "Endodontics", "Aesthetic dentistry"].map((name) => ({
      "@type": "MedicalProcedure",
      name,
    })),
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: real(site.address.postalCode),
          addressCountry: site.address.country,
        }
      : { "@type": "PostalAddress", addressCountry: site.address.country },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}
