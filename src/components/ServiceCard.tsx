"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import FadeInUp from "./animations/FadeInUp";
import FadeInImage from "./animations/FadeInImage";

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
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* 画像 */}
      <div className={reverse ? "md:order-2" : ""}>
        <FadeInImage
          src={image}
          alt={title}
          width={600}
          height={400}
          direction={reverse ? "right" : "left"}
          containerClassName="relative aspect-[3/2] rounded-lg overflow-hidden shadow-lg"
          className="object-cover w-full h-full"
        />
      </div>

      {/* テキスト */}
      <FadeInUp delay={200} className={reverse ? "md:order-1" : ""}>
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
      </FadeInUp>
    </div>
  );
}
