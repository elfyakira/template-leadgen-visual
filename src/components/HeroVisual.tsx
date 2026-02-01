"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import StatsCounter from "./StatsCounter";

interface Stat {
  label: string;
  value: number;
  unit: string;
}

interface HeroVisualProps {
  backgroundImage: string;
  regionName: string;
  catchphrase: string;
  subCatchphrase?: string;
  stats: Stat[];
  phoneNumber: string;
  phoneTel: string;
  phoneHours?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function HeroVisual({
  backgroundImage,
  regionName,
  catchphrase,
  subCatchphrase,
  stats,
  phoneNumber,
  phoneTel,
  phoneHours,
  ctaLabel = "無料見積もりはこちら",
  ctaHref = "/contact",
}: HeroVisualProps) {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="メインビジュアル"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-20 py-24 md:py-32">
        {/* Top: Region Name & Phone (PC) */}
        <div className="flex justify-between items-start">
          {/* Region Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xl md:text-3xl font-bold text-white tracking-wider">
              {regionName}
            </span>
            <span className="text-sm md:text-base text-white/80 ml-2">
              の外壁塗装・リフォーム
            </span>
          </motion.div>

          {/* Phone (PC only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <a href={phoneTel} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white tracking-wide">
                  {phoneNumber}
                </p>
                {phoneHours && (
                  <p className="text-sm text-white/70">{phoneHours}</p>
                )}
              </div>
            </a>
          </motion.div>
        </div>

        {/* Center: Catchphrase */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl"
          >
            {catchphrase}
          </motion.h1>
          {subCatchphrase && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl text-white/80 mb-8"
            >
              {subCatchphrase}
            </motion.p>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 mb-10"
          >
            <StatsCounter stats={stats} size="large" color="white" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              href={ctaHref}
              className="inline-block bg-accent text-white text-lg font-bold px-10 py-4 rounded-btn transition-all duration-200 hover:bg-[#d35400] hover:scale-[1.02]"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        </div>

        {/* Bottom: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs mb-2">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-white/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
