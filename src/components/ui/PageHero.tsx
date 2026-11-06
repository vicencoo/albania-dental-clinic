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

/**
 * Hero used at the top of every inner page: dark "obsidian" surface (emerald glow, or a
 * blue glow for digital / travel pages). Animations: pure CSS load-in.
 */
export function PageHero({ title, eyebrow, intro, breadcrumbs, image, children, className, tone = "warm" }: PageHeroProps) {
  return (
    <section
      className={cx(
        "obsidian relative overflow-clip",
        tone === "sky" &&
          "bg-[radial-gradient(ellipse_60%_55%_at_85%_15%,rgb(31_111_163/0.32),transparent_70%),radial-gradient(ellipse_50%_50%_at_5%_95%,rgb(15_106_76/0.18),transparent_70%)]",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/[0.07]" />

      <div
        className={cx(
          "container-luxe relative grid items-center gap-12 py-16 lg:py-28",
          image && "lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div>
          {breadcrumbs && (
            <div className="fade-in">
              <Breadcrumbs items={breadcrumbs} tone="dark" />
            </div>
          )}
          {eyebrow && (
            <p className={cx("eyebrow rise mt-10", tone === "sky" ? "text-brand-azure" : "text-brand-leaf")} style={stagger(0)}>
              {eyebrow}
            </p>
          )}
          <h1 className="rise display mt-6 max-w-3xl text-5xl text-brand-white sm:text-6xl lg:text-[5.2rem]" style={stagger(1)}>
            {title}
          </h1>
          {intro && (
            <p className="rise mt-7 max-w-2xl text-lg leading-relaxed text-brand-white/65" style={stagger(2)}>
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
              className="absolute -bottom-6 -left-6 hidden size-28 rounded-full border border-white/10 lg:block"
            />
          </div>
        )}
      </div>
    </section>
  );
}
