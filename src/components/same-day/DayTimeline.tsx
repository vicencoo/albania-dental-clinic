import { useTranslations } from "next-intl";
import { StepList } from "@/components/ui/StepList";

/** Timeline of the same-day teeth journey (messages "sameDayHow.steps"). */
export function DayTimeline() {
  const t = useTranslations("sameDayHow");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return <StepList steps={steps} />;
}
