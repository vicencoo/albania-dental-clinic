import Image from "next/image";
import { stagger } from "@/lib/style";

export interface VideoTourProps {
  src?: string;
  poster?: string;
  title: string;
  /** Shown as a masonry gallery while no video is available. */
  fallbackImages?: { src: string; caption: string; width: number; height: number }[];
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

  // Masonry columns: every photo keeps its natural aspect ratio — nothing is cropped.
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {fallbackImages.map((image, i) => (
        <figure
          key={image.src}
          className="reveal-scale group mb-4 break-inside-avoid"
          style={stagger(i)}
        >
          <div className="lift overflow-clip rounded-[1.75rem] bg-brand-sand">
            <Image
              src={image.src}
              alt={image.caption}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="zoom-target block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 px-2 text-sm font-medium text-brand-ink">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
