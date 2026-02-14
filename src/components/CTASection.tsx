"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import FadeInUp from "./animations/FadeInUp";

interface CTASectionProps {
  heading: string;
  subheading?: string;
  phoneNumber: string;
  phoneTel: string;
  hours?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CTASection({
  heading,
  subheading,
  phoneNumber,
  phoneTel,
  hours,
  buttonLabel = "メールで問い合わせ",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <FadeInUp>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {heading}
          </h2>
        </FadeInUp>
        {subheading && (
          <FadeInUp delay={100}>
            <p className="text-base md:text-lg text-white/70 mb-10">
              {subheading}
            </p>
          </FadeInUp>
        )}

        {/* Phone */}
        <FadeInUp delay={200}>
          <div className="mb-8">
            <a
              href={phoneTel}
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-3xl md:text-5xl font-bold text-accent tracking-wide">
                  {phoneNumber}
                </p>
                {hours && (
                  <p className="text-sm text-white/60 mt-1">{hours}</p>
                )}
              </div>
            </a>
          </div>
        </FadeInUp>

        {/* Divider */}
        <FadeInUp delay={300}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-white/20" />
            <span className="text-white/40 text-sm">または</span>
            <div className="h-px w-16 bg-white/20" />
          </div>
        </FadeInUp>

        {/* Mail Button */}
        <FadeInUp delay={400}>
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold text-lg px-10 py-4 rounded-btn transition-all hover:bg-gray-100 hover:scale-[1.02]"
          >
            <Mail className="w-5 h-5" />
            {buttonLabel}
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
}
