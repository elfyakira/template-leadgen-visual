"use client";

import Link from "next/link";
import {
  Phone,
  FileText,
  Search,
  Handshake,
  CheckCircle,
  Droplet,
  Square,
  Fence,
  Layers,
  ArrowDown,
  Package,
  Thermometer,
  Plus,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import siteData from "../../../data/site.json";

const additionalServiceIcons: { [key: string]: React.ReactNode } = {
  droplet: <Droplet className="w-8 h-8" />,
  square: <Square className="w-8 h-8" />,
  fence: <Fence className="w-8 h-8" />,
  layers: <Layers className="w-8 h-8" />,
  "arrow-down": <ArrowDown className="w-8 h-8" />,
  package: <Package className="w-8 h-8" />,
  thermometer: <Thermometer className="w-8 h-8" />,
  plus: <Plus className="w-8 h-8" />,
};

const processIcons: { [key: string]: React.ReactNode } = {
  phone: <Phone className="w-6 h-6" />,
  search: <Search className="w-6 h-6" />,
  "file-text": <FileText className="w-6 h-6" />,
  handshake: <Handshake className="w-6 h-6" />,
  "check-circle": <CheckCircle className="w-6 h-6" />,
};

export default function ServicePage() {
  const { services, additionalServices, pricing, process, contact } = siteData;

  return (
    <main>
      {/* セクション1: ページヘッダー */}
      <PageHeader
        title="サービス一覧"
        subtitle="住まいのお困りごと、何でもご相談ください"
        backgroundImage="/images/service-hero.jpg"
        height="medium"
      />

      {/* セクション2: サービスカテゴリ一覧 */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-20 md:space-y-24">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                number={String(index + 1).padStart(2, "0")}
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                href={`/service/${service.id}`}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* セクション3: 対応可能な工事一覧 */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInUp className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              その他対応可能な工事
            </h2>
            <p className="text-text-muted">
              以下の工事もお気軽にご相談ください
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-3 text-primary">
                  {additionalServiceIcons[service.icon] || (
                    <Plus className="w-8 h-8" />
                  )}
                </div>
                <p className="font-semibold text-primary">{service.title}</p>
              </div>
            ))}
          </StaggerContainer>

          <FadeInUp delay={200} className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              対応工事について相談する
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* セクション4: 料金目安 */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInUp className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              料金目安
            </h2>
            <p className="text-text-muted">
              ※正式なお見積もりは現地調査後にご提示いたします
            </p>
          </FadeInUp>

          {/* PC: テーブル形式 */}
          <FadeInUp delay={100} className="hidden md:block overflow-hidden rounded-lg shadow-sm mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left font-semibold">
                    サービス
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    料金目安
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">備考</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 text-text">{item.service}</td>
                    <td className="px-6 py-4 text-lg font-bold text-primary">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 text-text-muted text-sm">
                      {item.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeInUp>

          {/* SP: カード形式 */}
          <StaggerContainer className="md:hidden space-y-4 mb-8">
            {pricing.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-primary mb-2">{item.service}</p>
                <p className="text-xl font-bold text-primary mb-1">
                  {item.price}
                </p>
                <p className="text-sm text-text-muted">{item.note}</p>
              </div>
            ))}
          </StaggerContainer>

          {/* 注意書き */}
          <FadeInUp className="bg-gray-50 rounded-lg p-6 mb-8">
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                ※上記は概算の目安です。建物の状態、使用する材料、工事範囲により大きく変動します。
              </li>
              <li>※足場代、諸経費、消費税込みの概算となります。</li>
              <li>
                ※正確な金額は現地調査後にお見積書にてご提示いたします。
              </li>
            </ul>
          </FadeInUp>

          <FadeInUp delay={100} className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors"
            >
              無料見積もりを依頼する
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* セクション5: ご依頼の流れ */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInUp className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              ご依頼の流れ
            </h2>
            <p className="text-text-muted">
              お問い合わせからアフターフォローまで、安心のサポート体制
            </p>
          </FadeInUp>

          {/* PC: 横並び */}
          <FadeInUp delay={100} className="hidden md:flex items-start justify-between">
            {process.map((step, index) => (
              <div key={step.step} className="flex items-start">
                <div className="text-center w-40">
                  {/* 番号とアイコン */}
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                      {processIcons[step.icon] || (
                        <CheckCircle className="w-6 h-6" />
                      )}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h3 className="font-bold text-primary mb-2">{step.title}</h3>

                  {/* 説明 */}
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>

                  {/* バッジ */}
                  {step.badge && (
                    <span
                      className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
                        step.badge === "無料"
                          ? "bg-green-100 text-green-700"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {step.badge}
                    </span>
                  )}
                </div>

                {/* 矢印 */}
                {index < process.length - 1 && (
                  <div className="flex-shrink-0 mt-8 mx-2">
                    <div className="w-8 h-0.5 bg-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </FadeInUp>

          {/* SP: 縦並び */}
          <StaggerContainer className="md:hidden space-y-6">
            {process.map((step, index) => (
              <div key={step.step} className="relative">
                {/* 縦ライン */}
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-300" />
                )}

                <div className="flex gap-4">
                  {/* 番号とアイコン */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                      {processIcons[step.icon] || (
                        <CheckCircle className="w-6 h-6" />
                      )}
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* コンテンツ */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                    {step.badge && (
                      <span
                        className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                          step.badge === "無料"
                            ? "bg-green-100 text-green-700"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {step.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* セクション6: CTA */}
      <CTASection
        heading="どのサービスがいいかわからない方も"
        subheading="専門スタッフが最適なプランをご提案します"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
      />
    </main>
  );
}
