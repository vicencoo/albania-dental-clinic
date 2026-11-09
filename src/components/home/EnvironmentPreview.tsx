import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger } from "@/lib/style";

/** Clinic environment preview — a staggered photo collage. */
export function EnvironmentPreview() {
  const t = useTranslations();
  const photos = [
    {
      src: "/images/clinic/treatment-room.jpg",
      alt: t("environmentPage.gallery.room"),
      className: "row-span-2 reveal-from-left",
    },
    {
      src: "/images/treatments/children.jpg",
      alt: t("environmentPage.gallery.children"),
      className: "reveal-from-right",
    },
    {
      src: "/images/clinic/tech-cbct-unit.jpg",
      alt: t("environmentPage.gallery.cbct"),
      className: "reveal-up",
    },
  ];

  return (
    <section className="bg-brand-white py-28 lg:py-40">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid auto-rows-44 grid-cols-2 gap-4 sm:auto-rows-56">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`lift relative overflow-clip rounded-xl bg-brand-sand ${photo.className} ${
                i === 0
                  ? "rounded-[50%_50%_0.75rem_0.75rem/32%_32%_0.75rem_0.75rem]"
                  : ""
              }`}
              style={stagger(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="reveal-img-zoom zoom-target object-cover"
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
          <div className="reveal-from-right mt-10">
            <Button href="/clinic/environment" variant="secondary">
              {t("home.environment.cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
