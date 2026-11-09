import Image from "next/image";
import { cx, stagger } from "@/lib/style";

export interface VideoTourProps {
  src?: string;
  poster?: string;
  title: string;
  /** Shown as a mosaic while no video is available. */
  fallbackImages?: { src: string; caption: string }[];
}

/** Clinic video tour (no preload, native controls) or a photo mosaic fallback. */
export function VideoTour({
  src,
  poster,
  title,
  fallbackImages = [],
}: VideoTourProps) {
  if (src) {
    return (
      <div className="reveal-scale overflow-clip rounded-4xl bg-brand-forest shadow-soft">
        <video
          controls
          preload="none"
          poster={poster}
          className="aspect-video w-full"
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-56 grid-cols-2 gap-4 md:auto-rows-64 md:grid-cols-4">
      {fallbackImages.map((image, i) => (
        <figure
          key={image.src}
          className={cx(
            "reveal-scale lift group relative overflow-clip rounded-[1.75rem] bg-brand-sand",
            i === 0 && "row-span-2 md:col-span-2",
            i === 3 && "md:col-span-2",
          )}
          style={stagger(i)}
        >
          <Image
            src={image.src}
            alt={image.caption}
            fill
            sizes="(min-width: 768px) 40vw, 50vw"
            className="zoom-target object-cover"
          />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-brand-white/85 px-4 py-2 text-xs font-medium text-brand-ink backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
