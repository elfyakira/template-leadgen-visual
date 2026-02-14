"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import FadeInUp from "./animations/FadeInUp";
import HeroBackground from "./animations/HeroBackground";
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
      <HeroBackground>
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
      </HeroBackground>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-20 py-24 md:py-32">
        {/* Top: Region Name & Phone (PC) */}
        <div className="flex justify-between items-start">
          {/* Region Name */}
          <FadeInUp delay={200}>
            <div>
              <span className="text-xl md:text-3xl font-bold text-white tracking-wider">
                {regionName}
              </span>
              <span className="text-sm md:text-base text-white/80 ml-2">
                の外壁塗装・リフォーム
              </span>
            </div>
          </FadeInUp>

          {/* Phone (PC only) */}
          <FadeInUp delay={200}>
            <div className="hidden md:block">
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
            </div>
          </FadeInUp>
        </div>

        {/* Center: Catchphrase */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <FadeInUp delay={300}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl">
              {catchphrase}
            </h1>
          </FadeInUp>
          {subCatchphrase && (
            <FadeInUp delay={400}>
              <p className="text-base md:text-xl text-white/80 mb-8">
                {subCatchphrase}
              </p>
            </FadeInUp>
          )}

          {/* Stats */}
          <FadeInUp delay={500}>
            <div className="mt-8 mb-10">
              <StatsCounter stats={stats} size="large" color="white" />
            </div>
          </FadeInUp>

          {/* CTA Button */}
          <FadeInUp delay={700}>
            <Link
              href={ctaHref}
              className="inline-block bg-accent text-white text-lg font-bold px-10 py-4 rounded-btn transition-all duration-200 hover:bg-[#d35400] hover:scale-[1.02]"
            >
              {ctaLabel}
            </Link>
          </FadeInUp>
        </div>

        {/* Bottom: Scroll indicator */}
        <FadeInUp delay={1000}>
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-xs mb-2">SCROLL</span>
              <div className="w-px h-8 bg-white/40 animate-bounce" />
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
