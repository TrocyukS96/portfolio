"use client";

import React, { useState } from "react";

import { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  TbArrowLeft,
  TbBrandGithub,
  TbChevronRight,
  TbExternalLink,
} from "react-icons/tb";
import Link from "next/link";
import { ProjectImages } from "@/components/ui/ProjectImages";

const CARD_HEIGHT = "h-[480px]";

const CARD_FACE_CLASS = cn(
  "col-start-1 row-start-1 flex h-full flex-col rounded-lg overflow-hidden border border-slate-800 bg-slate-800/30 [backface-visibility:hidden]",
  CARD_HEIGHT,
);

export const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index < 3 ? index * 0.08 : 0 }}
      className={cn(
        "group relative h-full",
        CARD_HEIGHT,
        !isFlipped && "transition-transform duration-300 hover:-translate-y-2",
      )}
    >
      <div className={cn("h-full [perspective:1200px]", CARD_HEIGHT)}>
        <div
          className={cn(
            "relative grid h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]",
            CARD_HEIGHT,
            isFlipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front */}
          <div
            className={cn(
              CARD_FACE_CLASS,
              "group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10",
            )}
          >
            <ProjectImages images={project.images} title={project.title} />

            <div className="flex min-h-0 flex-1 flex-col p-5">
              <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-100 transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="mb-3 line-clamp-3 text-sm text-slate-400">
                {project.description}
              </p>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <TbBrandGithub size={16} /> Code
                    </Link>
                  )}
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
                    >
                      <TbExternalLink size={16} /> Live Demo
                    </Link>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-primary/50 hover:bg-primary/20 hover:shadow-md hover:shadow-primary/10"
                >
                  More
                  <TbChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className={cn(
              CARD_FACE_CLASS,
              "absolute inset-0 h-full w-full [transform:rotateY(180deg)] border-primary/30 shadow-xl shadow-primary/10",
            )}
          >
            <div className="flex h-full min-h-0 flex-col p-5">
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="mb-4 inline-flex shrink-0 items-center gap-1 self-start text-sm text-slate-400 transition-colors hover:text-white"
              >
                <TbArrowLeft size={16} /> Back
              </button>

              <h3 className="mb-3 shrink-0 line-clamp-2 text-xl font-bold text-slate-100">
                {project.title}
              </h3>

              <div className="project-card-scroll min-h-0 flex-1 overflow-y-auto pr-2">
                <p className="mb-5 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mb-5 space-y-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-slate-300"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 pb-1">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
