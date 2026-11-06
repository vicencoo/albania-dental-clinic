import { stagger } from "@/lib/style";

export interface StatStripProps {
  /** Only verified numbers supplied by the clinic. Never invent statistics. */
  items: { value: string; label: string }[];
}

/** Row of verified figures. */
export function StatStrip({ items }: StatStripProps) {
  if (items.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-px overflow-clip rounded-3xl bg-brand-sand sm:grid-cols-4">
      {items.map((item, i) => (
        <div key={item.label} className="reveal bg-brand-white p-6 text-center" style={stagger(i)}>
          <dt className="text-xs uppercase tracking-widest text-brand-muted">{item.label}</dt>
          <dd className="mt-2 font-heading text-4xl text-brand-green">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
