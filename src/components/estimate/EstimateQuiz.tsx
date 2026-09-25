"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  TbArrowLeft,
  TbArrowRight,
  TbCheck,
  TbClock,
  TbRefresh,
  TbStack2,
} from "react-icons/tb";
import { cn } from "@/lib/utils";
import {
  Answers,
  EstimateResult,
  Extra,
  calculateEstimate,
  emptyAnswers,
  estimateSteps,
  isComplete,
  isStepAnswered,
} from "@/lib/estimate";

const ESTIMATE_BRIEF_KEY = "estimate-brief";

export function EstimateQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const step = estimateSteps[stepIndex];
  const progress = result ? 100 : Math.round((stepIndex / estimateSteps.length) * 100);
  const answered = step ? isStepAnswered(step, answers) : false;

  const selectSingle = (optionId: string) => {
    if (!step || step.multiple) return;
    setAnswers((current) => ({ ...current, [step.id]: optionId }));
  };

  const toggleExtra = (optionId: Extra) => {
    setAnswers((current) => {
      if (optionId === "none") return { ...current, extras: ["none"] };
      const withoutNone = current.extras.filter((item) => item !== "none");
      const extras = withoutNone.includes(optionId)
        ? withoutNone.filter((item) => item !== optionId)
        : [...withoutNone, optionId];
      return { ...current, extras };
    });
  };

  const goNext = () => {
    if (!answered) return;
    if (stepIndex < estimateSteps.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }
    if (isComplete(answers)) setResult(calculateEstimate(answers));
  };

  const restart = () => {
    setAnswers(emptyAnswers());
    setStepIndex(0);
    setResult(null);
  };

  const discuss = () => {
    if (!result) return;
    try {
      sessionStorage.setItem(ESTIMATE_BRIEF_KEY, result.brief);
    } catch {
      /* Private mode can block storage; the contact form still works empty. */
    }
    window.location.href = "/#contact";
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-primary"
        >
          <TbArrowLeft size={16} />
          Back to the site
        </Link>
        <h1 className="mb-3 text-4xl font-bold text-slate-100 md:text-5xl">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {result ? "Your estimate" : "What do you actually need?"}
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          {result
            ? "A planning range from answers like yours, based on the kind of work already on this site."
            : "Six short questions. At the end you get a product type, a budget range, a timeline, and the stack I would use."}
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
          <span>{result ? "Done" : `Question ${stepIndex + 1} of ${estimateSteps.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            animate={{ width: `${Math.max(progress, 6)}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result ? (
          <ResultCard key="result" result={result} onRestart={restart} onDiscuss={discuss} />
        ) : (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-black/20 md:p-8"
          >
            <h2 className="text-2xl font-bold text-slate-100">{step.title}</h2>
            <p className="mt-2 mb-6 text-slate-400">{step.hint}</p>

            <div className="flex flex-col gap-3" role={step.multiple ? "group" : "radiogroup"} aria-label={step.title}>
              {step.options.map((option) => {
                const selected = step.multiple
                  ? answers.extras.includes(option.id as Extra)
                  : answers[step.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role={step.multiple ? "checkbox" : "radio"}
                    aria-checked={selected}
                    onClick={() =>
                      step.multiple ? toggleExtra(option.id as Extra) : selectSingle(option.id)
                    }
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
                      selected
                        ? "border-primary/70 bg-primary/10"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-800/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-slate-950",
                        step.multiple ? "rounded-md" : "rounded-full",
                        selected ? "border-primary bg-primary" : "border-slate-600 bg-transparent"
                      )}
                    >
                      {selected && <TbCheck size={14} />}
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-100">{option.label}</span>
                      <span className="mt-1 block text-sm text-slate-400">{option.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white disabled:invisible"
              >
                <TbArrowLeft size={18} />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!answered}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-bold text-slate-950 shadow-lg shadow-primary/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {stepIndex === estimateSteps.length - 1 ? "See the estimate" : "Next"}
                <TbArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultCard({
  result,
  onRestart,
  onDiscuss,
}: {
  result: EstimateResult;
  onRestart: () => void;
  onDiscuss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6"
    >
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Closest match</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-100">{result.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{result.summary}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <p className="text-sm text-slate-500">Approximate budget</p>
            <p className="mt-2 text-2xl font-bold text-slate-100 md:text-3xl">{result.priceLabel}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <TbClock size={16} />
              Approximate time
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-100 md:text-3xl">{result.timeLabel}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-slate-400">
          {result.factors.map((factor) => (
            <li key={factor} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{factor}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          A planning range from similar work, not a fixed quote. The final number comes after a short look at the details.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-8">
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-slate-400">
          <TbStack2 size={16} />
          Stack for this kind of work
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {result.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {result.projects.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-bold text-slate-100">Similar work</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {result.projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-primary/40"
              >
                <div className="relative h-40 bg-slate-800">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover object-top"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-100">{project.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-400">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onDiscuss}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-bold text-slate-950 shadow-lg shadow-primary/20"
        >
          Discuss this estimate
          <TbArrowRight size={18} />
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
        >
          <TbRefresh size={18} />
          Start over
        </button>
      </div>
    </motion.div>
  );
}
