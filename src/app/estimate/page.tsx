import type { Metadata } from "next";
import { EstimateQuiz } from "@/components/estimate/EstimateQuiz";

export const metadata: Metadata = {
  title: "Estimate your project",
  description:
    "Answer a few questions to see what kind of site or product you need, a planning range for budget and time, and the stack behind it.",
};

export default function EstimatePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-64 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />
      <div className="container relative mx-auto px-4 py-10 md:py-16 xl:px-24">
        <EstimateQuiz />
      </div>
    </div>
  );
}
