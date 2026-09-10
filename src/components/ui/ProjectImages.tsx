"use client";

import React, { useCallback, useState } from "react";
import { useSliderAutoplay } from "@/hooks/useSliderAutoplay";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { ImagePreviewModal } from "@/components/ui/ImagePreviewModal";
import {
  ImageSliderSlide,
  ImageSliderTrack,
} from "@/components/ui/ImageSliderTrack";

const IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

interface ProjectImagesProps {
  images: string[];
  title: string;
}

export function ProjectImages({ images, title }: ProjectImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const hasSlider = images.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  const { hoverHandlers } = useSliderAutoplay({
    enabled: hasSlider && !isPreviewOpen,
    onAdvance: () => setActiveIndex((prev) => (prev + 1) % images.length),
  });

  const openPreview = () => setIsPreviewOpen(true);

  const closePreview = () => setIsPreviewOpen(false);

  return (
    <>
      <div
        className="relative aspect-video w-full overflow-hidden flex-shrink-0 group/slider"
        {...hoverHandlers}
      >
        <div
          className="h-full cursor-pointer"
          onClick={openPreview}
          role="button"
          tabIndex={0}
          aria-label={`Open ${title} preview`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPreview();
            }
          }}
        >
          <ImageSliderTrack activeIndex={activeIndex}>
            {images.map((src, i) => (
              <ImageSliderSlide key={`${src}-${i}`}>
                <Image
                  src={src}
                  alt={`${title} — screenshot ${i + 1}`}
                  fill
                  sizes={IMAGE_SIZES}
                  className="object-cover"
                  loading={i === 0 ? "lazy" : undefined}
                />
              </ImageSliderSlide>
            ))}
          </ImageSliderTrack>
        </div>

        {hasSlider && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex - 1);
              }}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-1.5 text-slate-100 opacity-0 backdrop-blur-sm transition-opacity hover:bg-slate-800 group-hover/slider:opacity-100 focus-visible:opacity-100"
            >
              <TbChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex + 1);
              }}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-1.5 text-slate-100 opacity-0 backdrop-blur-sm transition-opacity hover:bg-slate-800 group-hover/slider:opacity-100 focus-visible:opacity-100"
            >
              <TbChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  aria-label={`Go to screenshot ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-slate-400/70 hover:bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ImagePreviewModal
        images={images}
        title={title}
        initialIndex={activeIndex}
        open={isPreviewOpen}
        onClose={closePreview}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
