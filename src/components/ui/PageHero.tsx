import type { ReactNode } from "react";
import { cx, stagger } from "@/lib/style";
import { ArchImage } from "./ArchImage";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  image?: { src: string; alt: string; position?: string };
  /** Buttons or extra content under the intro. */
  children?: ReactNode;
  className?: string;
  /** "sky" (blue wash) for digital/technology and travel pages. */
  tone?: "warm" | "sky";
}

/** Hero used at the top of every inner page. Animations: pure CSS load-in. */
export function PageHero({ title, eyebrow, intro, breadcrumbs, image, children, className, tone = "warm" }: PageHeroProps) {
  return (
    <section className={cx("relative overflow-clip", tone === "sky" ? "sky-wash" : "bg-brand-porcelain grain", className)}>
      {/* Decorative arches */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className={cx("spin-slow pointer-events-none absolute -right-40 -top-40 size-[34rem]", tone === "sky" ? "text-brand-blue/20" : "text-brand-gold/20")}
      >
        <circle cx="200" cy="200" r="198" fill="none" stroke="currentColor" strokeDasharray="2 10" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" />
      </svg>

      <div
        className={cx(
          "container-luxe relative grid items-center gap-12 py-14 lg:py-20",
          image && "lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div>
          {breadcrumbs && (
            <div className="fade-in">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {eyebrow && (
            <p className={cx("eyebrow rise mt-8", tone === "sky" && "text-brand-blue")} style={stagger(0)}>
              {eyebrow}
            </p>
          )}
          <h1 className="rise mt-4 max-w-3xl text-5xl text-brand-ink sm:text-6xl lg:text-7xl" style={stagger(1)}>
            {title}
          </h1>
          {intro && (
            <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted" style={stagger(2)}>
              {intro}
            </p>
          )}
          {children && (
            <div className="rise mt-9 flex flex-wrap items-center gap-4" style={stagger(3)}>
              {children}
            </div>
          )}
        </div>

        {image && (
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <ArchImage
              src={image.src}
              alt={image.alt}
              position={image.position}
              animate="load"
              priority
              kenburns
              sizes="(min-width: 1024px) 35vw, 80vw"
            />
            <span
              aria-hidden
              className="float absolute -bottom-5 -left-5 hidden size-24 rounded-full border border-brand-gold/40 lg:block"
            />
          </div>
        )}
      </div>
    </section>
  );
}
