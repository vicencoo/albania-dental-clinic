import { useTranslations } from "next-intl";
import { ArchImage } from "@/components/ui/ArchImage";
import { Icon, type IconName } from "@/components/ui/Icon";
import { stagger } from "@/lib/style";

const icons: IconName[] = ["cube", "lab", "clock", "sparkle"];

/** Digital laboratory showcase. */
export function LabShowcase() {
  const t = useTranslations("laboratoryPage");
  const points = t.raw("points") as { title: string; text: string }[];

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <ArchImage src="/images/lab/zirconia-bridge.jpg" alt={t("imageAlt")} className="shadow-soft" />
        <div className="float absolute -right-8 top-10 hidden rounded-2xl bg-brand-white px-5 py-4 shadow-soft sm:block">
          <p className="eyebrow">CAD/CAM</p>
          <p className="mt-1 font-heading text-2xl">Zirconia</p>
        </div>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {points.map((point, i) => (
          <li key={point.title} className="reveal-flip lift rounded-[1.75rem] bg-brand-porcelain p-7" style={stagger(i)}>
            <Icon name={icons[i] ?? "lab"} className={`size-7 ${i < 2 ? "text-brand-blue" : "text-brand-green"}`} />
            <h3 className="mt-5 text-2xl">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{point.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
