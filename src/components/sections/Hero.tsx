"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { TbArrowRight, TbDownload } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { SocialIcons } from "@/components/ui/SocialIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 + i * 0.1, ease: "easeOut" as const },
  }),
};

export const HeroSection = React.memo(function HeroSection() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <section
      id="about"
      className="flex flex-col justify-start relative pt-12 md:pt-16 pb-10"
    >
      {/* Background Gradients */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="container mx-auto px-4 xl:px-24 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-5 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for freelance
              </span>
            </motion.div>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-3 text-sm font-medium tracking-wide text-slate-400"
            >
              Hi, I am
            </motion.p>

            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-4 text-5xl font-bold text-slate-100 md:text-7xl"
            >
              {portfolioData.name}
            </motion.h1>

            <motion.h2
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6 bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-2xl font-semibold text-transparent md:text-4xl"
            >
              {portfolioData.role}
            </motion.h2>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 lg:mx-0"
            >
              {portfolioData.about}
            </motion.p>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-8 lg:items-start"
            >
              <SocialIcons variant="default" />

              <div className="flex flex-row flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-bold text-slate-950 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Projects
                  <TbArrowRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/files/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 px-8 py-3 font-bold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/80 hover:text-white"
                >
                  Resume <TbDownload size={20} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group perspective-1000">
              {/* Deep Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-[2rem] rotate-6 scale-105 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500" />

              {/* Second Layer (Rotated Card) */}
              <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-[2rem] rotate-3 border border-white/10 group-hover:rotate-6 transition-transform duration-500" />

              {/* Main Image Container with Gradient Border */}
              <div className="relative w-full h-full rounded-[2rem] p-[2px] bg-gradient-to-br from-primary to-secondary -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <div className="w-full h-full rounded-[calc(2rem-2px)] overflow-hidden bg-slate-900 relative">
                  <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800 relative">
                    <Image
                      src={portfolioData.profileImage}
                      alt={portfolioData.name}
                      fill
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
