"use client";

import React, { useState } from "react";

import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { TbBriefcase, TbChevronDown } from "react-icons/tb";

export const ExperienceSection = React.memo(function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full">
      <SectionHeading
        title="Experience"
        subtitle="Where I've built and shipped"
        center={false}
        className="mb-8"
      />

      <div className="relative pl-6">
        {/* Timeline track */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-800">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-primary to-transparent"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="space-y-3">
          {portfolioData.experience.map((exp, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative"
              >
                {/* Timeline node */}
                <motion.span
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    boxShadow: isActive
                      ? "0 0 16px rgba(45, 212, 191, 0.6)"
                      : "0 0 0px rgba(45, 212, 191, 0)",
                  }}
                  className={cn(
                    "absolute -left-6 top-5 z-10 h-3.5 w-3.5 rounded-full border-2 bg-slate-950 transition-colors",
                    isActive ? "border-primary" : "border-slate-600",
                  )}
                />

                <div
                  className={cn(
                    "overflow-hidden rounded-xl border bg-slate-800/20 backdrop-blur-sm transition-colors duration-300",
                    isActive
                      ? "border-primary/40 shadow-lg shadow-primary/5"
                      : "border-slate-800 hover:border-slate-700",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
                    aria-expanded={isActive}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-100 sm:text-lg">
                          {exp.role}
                        </h3>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <TbBriefcase size={14} className="shrink-0 text-primary/70" />
                        <span className="truncate font-medium">{exp.company}</span>
                      </div>
                    </div>

                    <motion.span
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 shrink-0 text-slate-500"
                    >
                      <TbChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <ul className="space-y-2 border-t border-slate-800/80 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
