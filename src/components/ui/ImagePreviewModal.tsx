"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight, TbX } from "react-icons/tb";
import {
  ImageSliderSlide,
  ImageSliderTrack,
} from "@/components/ui/ImageSliderTrack";
import { useSliderAutoplay } from "@/hooks/useSliderAutoplay";

interface ImagePreviewModalProps {
  images: string[];
  title: string;
  initialIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function ImagePreviewModal({
  images,
  title,
  initialIndex,
  open,
  onClose,
  onIndexChange,
}: ImagePreviewModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeIndexRef = useRef(activeIndex);
  const hasSlider = images.length > 1;

  activeIndexRef.current = activeIndex;

  useEffect(() => {
    if (open) setActiveIndex(initialIndex);
  }, [open, initialIndex]);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + images.length) % images.length;
      setActiveIndex(next);
      onIndexChange?.(next);
    },
    [images.length, onIndexChange],
  );

  const { hoverHandlers } = useSliderAutoplay({
    enabled: open && hasSlider,
    onAdvance: () => {
      const next = (activeIndexRef.current + 1) % images.length;
      setActiveIndex(next);
      onIndexChange?.(next);
    },
  });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(activeIndexRef.current - 1);
      if (e.key === "ArrowRight") goTo(activeIndexRef.current + 1);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, goTo]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} preview`}
    >
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-3">
        <div className="flex items-center justify-between gap-4 px-1">
          <p className="truncate text-sm font-medium text-slate-200 sm:text-base">
            {title}
            {hasSlider && (
              <span className="ml-2 text-slate-400">
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="shrink-0 rounded-full bg-slate-800/90 p-2 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <TbX size={20} />
          </button>
        </div>

        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900 ring-1 ring-slate-700/50"
          {...hoverHandlers}
        >
          <ImageSliderTrack activeIndex={activeIndex}>
            {images.map((src, i) => (
              <ImageSliderSlide key={`${src}-${i}`}>
                <Image
                  src={src}
                  alt={`${title} — screenshot ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={i === activeIndex}
                />
              </ImageSliderSlide>
            ))}
          </ImageSliderTrack>

          {hasSlider && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-2 text-slate-100 backdrop-blur-sm transition-colors hover:bg-slate-800"
              >
                <TbChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-2 text-slate-100 backdrop-blur-sm transition-colors hover:bg-slate-800"
              >
                <TbChevronRight size={24} />
              </button>

              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-5 bg-primary"
                        : "w-2 bg-slate-400/70 hover:bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
