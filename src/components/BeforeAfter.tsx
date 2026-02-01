"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After画像（背景） */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="施工後"
          fill
          className="object-cover"
          draggable={false}
        />
        {/* Afterラベル */}
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded">
          {afterLabel}
        </span>
      </div>

      {/* Before画像（クリップ） */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
          <Image
            src={beforeImage}
            alt="施工前"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
        {/* Beforeラベル */}
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-gray-700 text-white text-sm font-semibold rounded">
          {beforeLabel}
        </span>
      </div>

      {/* スライダーバー */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* ドラッグハンドル */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <GripVertical className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
