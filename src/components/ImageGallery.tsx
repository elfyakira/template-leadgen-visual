"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export default function ImageGallery({ images, alt = "施工写真" }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // キーボードナビゲーション
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goToPrevious, goToNext]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div>
      {/* メイン画像 */}
      <div
        className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer mb-4"
        onClick={() => openLightbox(activeIndex)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${alt} ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 hover:opacity-100 text-white font-semibold bg-black/50 px-4 py-2 rounded">
            クリックで拡大
          </span>
        </div>
      </div>

      {/* サムネイルギャラリー */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:flex-wrap">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded overflow-hidden transition-all ${
                index === activeIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} サムネイル ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ライトボックス */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* 閉じるボタン */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* 前へボタン */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {/* 画像 */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`${alt} ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>

            {/* 次へボタン */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}

            {/* カウンター */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
