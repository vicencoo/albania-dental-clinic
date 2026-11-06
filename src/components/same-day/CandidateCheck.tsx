"use client";

import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Question = { q: string; options: string[] };

/**
 * Interactive self-check that always points to a consultation (never a medical verdict).
 * Step transitions are CSS (.rise keyed by step).
 */
export function CandidateCheck() {
  const t = useTranslations("sameDayCandidates.check");
  const tUi = useTranslations("ui");
  const questions = t.raw("questions") as Question[];
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const baseId = useId();

  const step = answers.length;
  const done = step >= questions.length;
  const current = questions[step];
  // Question 3 (index 2) asks about an X-ray; index 1 of its options = "No".
  const noXray = answers[2] === 1;

  const focusHeading = () => requestAnimationFrame(() => headingRef.current?.focus());
  const answer = (i: number) => {
    setAnswers((a) => [...a, i]);
    focusHeading();
  };
  const back = () => {
    setAnswers((a) => a.slice(0, -1));
    focusHeading();
  };

  return (
    <div className="relative overflow-clip rounded-[2.25rem] bg-brand-forest p-8 text-brand-white shadow-soft sm:p-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgb(76_154_63/0.35),transparent_45%)]"
      />
      <div className="relative">
        <p className="eyebrow text-brand-gold-light">{t("title")}</p>

        {/* Progress */}
        <div className="mt-5 flex gap-2" aria-hidden>
          {questions.map((_, i) => (
            <span key={i} className="h-1 flex-1 overflow-clip rounded-full bg-brand-white/15">
              <span
                className="block h-full origin-left bg-brand-gold transition-transform duration-700 ease-(--ease-luxe)"
                style={{ transform: `scaleX(${i < step ? 1 : 0})` }}
              />
            </span>
          ))}
        </div>

        <div aria-live="polite">
          {!done && current ? (
            <fieldset key={step} className="rise mt-8">
              <legend className="text-sm text-brand-white/70">
                {t("progress", { current: step + 1, total: questions.length })}
              </legend>
              <h3 ref={headingRef} tabIndex={-1} id={`${baseId}-q`} className="mt-2 text-3xl outline-none sm:text-4xl">
                {current.q}
              </h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {current.options.map((option, i) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answer(i)}
                    className="group flex items-center justify-between rounded-2xl border border-brand-white/20 px-5 py-4 text-left transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-white/10"
                  >
                    {option}
                    <Icon name="arrow" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-brand-white/70 hover:text-brand-white"
                >
                  <Icon name="arrowLeft" className="size-4" /> {t("back")}
                </button>
              )}
            </fieldset>
          ) : (
            <div key="result" className="rise mt-8">
              <span className="grid size-14 place-items-center rounded-full bg-brand-leaf">
                <Icon name="check" className="size-7" />
              </span>
              <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-4xl outline-none">
                {t("resultTitle")}
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-brand-white/80">{t("resultText")}</p>
              {noXray && <p className="mt-2 max-w-2xl text-brand-white/70">{t("resultNoXray")}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/book" variant="light">
                  {tUi("bookCta")}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers([]);
                    focusHeading();
                  }}
                  className="text-sm text-brand-white/70 underline-offset-4 hover:text-brand-white hover:underline"
                >
                  {t("restart")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
