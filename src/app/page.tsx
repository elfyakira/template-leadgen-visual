"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import CTASection from "@/components/CTASection";
import PhoneButton from "@/components/PhoneButton";
import {
  company,
  contact,
  images,
  localVisual,
  services,
  reasons,
  getStatsForHero,
} from "@/lib/site";

// セクション2: サービス概要
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
            私たちができること
          </h2>
          <p className="text-text-muted">
            住まいのお悩み、何でもご相談ください
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/service#${service.id}`} className="block">
                <div className="relative aspect-[4/3] mb-6 rounded-card overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm md:text-base mb-4 line-clamp-3">
                  {service.description}
                </p>
                <span className="text-link">詳しく見る</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// セクション3: 施工事例ハイライト
function WorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // ダミーの施工事例データ
  const worksData = [
    { slug: "okazaki-gaiheki-001", title: "外壁塗装", area: "岡崎市", image: "/images/works/work-01.jpg" },
    { slug: "okazaki-yane-001", title: "屋根塗装", area: "岡崎市", image: "/images/works/work-02.jpg" },
    { slug: "toyota-gaiheki-001", title: "外壁塗装", area: "豊田市", image: "/images/works/work-03.jpg" },
    { slug: "anjou-reform-001", title: "リフォーム", area: "安城市", image: "/images/works/work-04.jpg" },
    { slug: "kariya-gaiheki-001", title: "外壁塗装", area: "刈谷市", image: "/images/works/work-05.jpg" },
    { slug: "nishio-yane-001", title: "屋根工事", area: "西尾市", image: "/images/works/work-06.jpg" },
  ];

  return (
    <section ref={ref} className="section-padding bg-background-alt">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
            施工事例
          </h2>
          <p className="text-text-muted">
            地域のお客様から選ばれ続けています
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {worksData.map((work, index) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <Link href={`/works/${work.slug}`} className="block">
                <div className="relative aspect-square rounded-card overflow-hidden">
                  <Image
                    src={work.image}
                    alt={`${work.area} ${work.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Area Tag */}
                  <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {work.area}
                  </span>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-semibold">詳細を見る</span>
                  </div>
                </div>
                <p className="mt-3 text-sm md:text-base font-semibold text-primary">
                  {work.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/works" className="btn-secondary inline-flex items-center gap-2">
            施工事例をもっと見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// セクション4: 選ばれる理由
function ReasonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
            選ばれる理由
          </h2>
          <p className="text-text-muted">
            地域のお客様に信頼される3つのポイント
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-2/5"
          >
            <div className="relative aspect-[4/5] rounded-card overflow-hidden sticky top-24">
              <Image
                src="/images/craftsman.jpg"
                alt="職人の作業風景"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Reasons */}
          <div className="lg:w-3/5 space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex items-start gap-6">
                  <span className="text-4xl md:text-5xl font-black text-accent/20">
                    {reason.number}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold text-primary mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-text-muted text-sm md:text-base leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// セクション5: 対応エリア概要
function AreaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-padding bg-background-alt">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
            対応エリア
          </h2>
          <p className="text-text-muted">
            {localVisual.mainRegion}を中心に、近隣地域もカバーしています
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Map Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-gray-100">
              <Image
                src={images.areaMap || "/images/area-map.svg"}
                alt="対応エリアマップ"
                fill
                className="object-contain p-4"
              />
            </div>
          </motion.div>

          {/* Area List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-1/2"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {localVisual.regions.map((region) => (
                <span
                  key={region.name}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium ${
                    region.isMain
                      ? "bg-primary text-white"
                      : "bg-white text-primary border border-primary/20"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {region.name}
                  {region.worksCount && (
                    <span className="text-xs opacity-70">({region.worksCount}件)</span>
                  )}
                </span>
              ))}
            </div>

            {localVisual.areaNote && (
              <p className="text-text-muted text-sm mb-4">
                {localVisual.areaNote}
              </p>
            )}
            {localVisual.areaOutsideNote && (
              <p className="text-text-muted text-sm mb-6">
                ※{localVisual.areaOutsideNote}
              </p>
            )}

            <Link href="/area" className="text-link">
              対応エリアを詳しく見る
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// メインページコンポーネント
export default function HomePage() {
  const stats = getStatsForHero();

  return (
    <>
      {/* セクション1: ファーストビュー */}
      <HeroVisual
        backgroundImage={images.heroMain || "/images/hero-main.jpg"}
        regionName={localVisual.mainRegion}
        catchphrase={company.catchphrase}
        stats={stats}
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        phoneHours={contact.hours}
        ctaLabel="無料見積もりはこちら"
        ctaHref="/contact"
      />

      {/* セクション2: サービス概要 */}
      <ServicesSection />

      {/* セクション3: 施工事例ハイライト */}
      <WorksSection />

      {/* セクション4: 選ばれる理由 */}
      <ReasonsSection />

      {/* セクション5: 対応エリア概要 */}
      <AreaSection />

      {/* セクション6: CTA */}
      <CTASection
        heading="まずはお気軽にご相談ください"
        subheading="無料見積もり・現地調査"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
        buttonLabel="メールで問い合わせ"
        buttonHref="/contact"
      />

      {/* SP用フローティング電話ボタン */}
      <PhoneButton
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        variant="floating"
      />
    </>
  );
}
