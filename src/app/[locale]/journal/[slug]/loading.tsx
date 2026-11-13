/** Skeleton shown while a journal post loads. */
export default function Loading() {
  return (
    <div aria-busy="true">
      <section className="obsidian">
        <div className="container-luxe py-16 lg:py-28">
          <div className="h-14 w-full max-w-2xl animate-pulse rounded-full bg-white/10 lg:h-20" />
          <div className="mt-7 h-5 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
          <div className="mt-9 h-3 w-48 animate-pulse rounded-full bg-white/10" />
        </div>
      </section>

      <div className="container-luxe max-w-3xl py-16 lg:py-20">
        <div className="mb-12 aspect-video animate-pulse rounded-4xl bg-brand-sand" />
        <div className="space-y-4">
          {["w-full", "w-full", "w-5/6", "w-full", "w-2/3"].map((width, i) => (
            <div key={i} className={`h-4 animate-pulse rounded-full bg-brand-sand ${width}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
