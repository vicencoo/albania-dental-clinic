/** Skeleton shown while the journal posts load. */
export default function Loading() {
  return (
    <div aria-busy="true">
      <section className="obsidian">
        <div className="container-luxe py-16 lg:py-28">
          <div className="h-14 w-64 animate-pulse rounded-full bg-white/10 lg:h-20 lg:w-96" />
          <div className="mt-7 h-5 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <ul className="container-luxe grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className={i === 0 ? "md:col-span-2 lg:col-span-3" : ""}>
              <div
                className={`grid overflow-clip rounded-4xl border border-brand-sand bg-brand-white ${
                  i === 0 ? "lg:grid-cols-2" : ""
                }`}
              >
                <div className="aspect-16/10 animate-pulse bg-brand-sand" />
                <div className="space-y-4 p-8">
                  <div className="h-3 w-32 animate-pulse rounded-full bg-brand-sand" />
                  <div className="h-8 w-3/4 animate-pulse rounded-full bg-brand-sand" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-brand-sand" />
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-brand-sand" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
