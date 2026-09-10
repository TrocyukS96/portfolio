"use client";

import React, { useState } from "react";

import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  TbBrain,
  TbPackages,
  TbTool,
  TbWorld,
} from "react-icons/tb";

const CATEGORIES = [
  {
    id: "web",
    title: "Web",
    icon: TbWorld,
    skills: portfolioData.skills.web,
  },
  {
    id: "libraries",
    title: "Libraries",
    icon: TbPackages,
    skills: portfolioData.skills.libraries,
  },
  {
    id: "tools",
    title: "Tools",
    icon: TbTool,
    skills: portfolioData.skills.tools,
  },
  {
    id: "ai",
    title: "AI",
    icon: TbBrain,
    skills: portfolioData.skills.aiServices,
  },
] as const;

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.35, ease: "easeOut" as const },
  }),
};

export const TechStack = React.memo(function TechStack() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]["id"]>("web");
  const active = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  return (
    <div className="h-full">
      <SectionHeading
        title="Tech Stack"
        subtitle="Tools in my daily workflow"
        center={false}
        className="mb-8"
      />

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800/20 backdrop-blur-sm">
        {/* Category tabs */}
        <div className="relative flex gap-1 overflow-x-auto border-b border-slate-800 p-2 scrollbar-none">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-slate-400 hover:text-slate-200",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skillTabHighlight"
                    className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={16} className="relative z-10 shrink-0" />
                <span className="relative z-10">{category.title}</span>
                <span
                  className={cn(
                    "relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-slate-800 text-slate-500",
                  )}
                >
                  {category.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="relative min-h-[220px] p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {active.skills.map((skill, index) => (
                <motion.span
                  key={`${activeCategory}-${skill}-${index}`}
                  custom={index}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 0 20px rgba(45, 212, 191, 0.15)",
                  }}
                  className="cursor-default rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Decorative orbit */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 rounded-full border border-secondary/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
});
