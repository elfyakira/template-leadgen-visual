"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  href?: string;
  reverse?: boolean;
}

export default function ServiceCard({
  number,
  title,
  description,
  features,
  image,
  href,
  reverse = false,
}: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* 画像 */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={reverse ? "md:order-2" : ""}
      >
        <div className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-lg group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </motion.div>

      {/* テキスト */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={reverse ? "md:order-1" : ""}
      >
        <div className="relative">
          {/* 番号（装飾） */}
          <span className="absolute -top-4 -left-2 md:-left-4 text-7xl md:text-8xl font-bold text-gray-100 select-none pointer-events-none">
            {number}
          </span>

          {/* コンテンツ */}
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {title}
            </h3>

            <p className="text-text-muted leading-relaxed mb-6">{description}</p>

            {/* 特徴リスト */}
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text">{feature}</span>
                </li>
              ))}
            </ul>

            {/* リンク */}
            {href && (
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
              >
                このサービスを詳しく見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
