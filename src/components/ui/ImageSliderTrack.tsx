"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSliderTrackProps {
  activeIndex: number;
  children: React.ReactNode;
  className?: string;
}

export function ImageSliderTrack({
  activeIndex,
  children,
  className,
}: ImageSliderTrackProps) {
  return (
    <motion.div
      className={cn("flex h-full", className)}
      animate={{ x: `-${activeIndex * 100}%` }}
      transition={{
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ImageSliderSlide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full min-w-full w-full flex-shrink-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
