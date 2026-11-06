/**
 * Renders structured data. Usage: <JsonLd data={{ "@context": "https://schema.org", ... }} />
 * TODO: Dentist/MedicalClinic schema on home & contact, BreadcrumbList, FAQPage, Article.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
