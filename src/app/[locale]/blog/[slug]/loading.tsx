/** Skeleton shown while a blog post loads (light header with title, then text). */
export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="bg-brand-porcelain">
        <div className="container-luxe max-w-3xl py-16 lg:py-28">
          <div className="h-3 w-40 animate-pulse rounded-full bg-brand-sand" />
          <div className="mt-10 h-12 w-full max-w-2xl animate-pulse rounded-full bg-brand-sand lg:h-16" />
          <div className="mt-6 h-3 w-48 animate-pulse rounded-full bg-brand-sand" />
        </div>
      </div>
      <div className="container-luxe max-w-3xl space-y-4 py-12 lg:py-16">
        {["w-full", "w-full", "w-5/6", "w-full", "w-2/3"].map((width, i) => (
          <div key={i} className={`h-4 animate-pulse rounded-full bg-brand-sand ${width}`} />
        ))}
      </div>
    </div>
  );
}
