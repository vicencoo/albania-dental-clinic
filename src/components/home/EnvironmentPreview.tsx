import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger } from "@/lib/style";

/** Clinic environment preview — a staggered photo collage. */
export function EnvironmentPreview() {
  const t = useTranslations();
  const photos = [
    { src: "/images/clinic/treatment-room.jpg", alt: t("environmentPage.gallery.room"), className: "row-span-2" },
    { src: "/images/treatments/children.jpg", alt: t("environmentPage.gallery.children"), className: "" },
    { src: "/images/clinic/tech-cbct-unit.jpg", alt: t("environmentPage.gallery.cbct"), className: "" },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[14rem]">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`reveal-zoom lift relative overflow-clip rounded-[1.75rem] bg-brand-sand ${photo.className} ${
                i === 0 ? "[border-radius:50%_50%_1.75rem_1.75rem/32%_32%_1.75rem_1.75rem]" : ""
              }`}
              style={stagger(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="zoom-target object-cover"
              />
            </figure>
          ))}
        </div>
        <div>
          <SectionHeading
            eyebrow={t("home.environment.eyebrow")}
            title={t("home.environment.title")}
            intro={t("home.environment.text")}
          />
          <div className="reveal mt-10">
            <Button href="/clinic/environment" variant="secondary">
              {t("home.environment.cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
