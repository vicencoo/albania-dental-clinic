import { StepList } from "@/components/ui/StepList";

export interface TreatmentStepsProps {
  steps: { title: string; text: string }[];
}

/** Step list for a treatment (generic per category until the clinic supplies specifics). */
export function TreatmentSteps({ steps }: TreatmentStepsProps) {
  return <StepList steps={steps} layout="grid" />;
}
