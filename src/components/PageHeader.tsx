"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundBlur?: boolean;
  overlayOpacity?: number;
  height?: "tall" | "medium" | "short";
  badge?: {
    label: string;
    value: string;
  };
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
  backgroundBlur = true,
  overlayOpacity = 0.6,
  height = "medium",
  badge,
}: PageHeaderProps) {
  const heightClasses = {
    tall: "h-[280px] md:h-[400px]",
    medium: "h-[200px] md:h-[300px]",
    short: "h-[160px] md:h-[200px]",
  };

  return (
    <section className={`relative ${heightClasses[height]} w-full overflow-hidden`}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className={`object-cover ${backgroundBlur ? "scale-105" : ""}`}
            style={{
              filter: backgroundBlur ? "blur(4px)" : undefined,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] to-[#2d3a4f]" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-3"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-white/80"
          >
            {subtitle}
          </motion.p>
        )}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full">
              <span className="text-white/80">{badge.label}</span>
              <span>{badge.value}</span>
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
