"use client";

import { Phone, Mail, Check, ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import siteData from "../../../data/site.json";

export default function ContactPage() {
  const { company, contact, locations, faq } = siteData;

  return (
    <main>
      {/* セクション1: ページヘッダー */}
      <PageHeader
        title="お問い合わせ・無料見積もり"
        subtitle="お気軽にご相談ください"
        height="short"
      />

      {/* セクション2: 問い合わせ方法の選択 */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* 電話エリア */}
            <FadeInUp className="border border-gray-200 rounded-lg p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-primary">
                  お電話でのお問い合わせ
                </h2>
              </div>
              <a
                href={contact.phoneTel}
                className="block text-3xl md:text-4xl font-bold text-accent hover:text-accent-dark transition-colors mb-3"
              >
                {contact.phoneFormatted}
              </a>
              <p className="text-text-muted">
                受付時間: {contact.hours}
              </p>
            </FadeInUp>

            {/* フォームエリア */}
            <FadeInUp delay={100} className="border border-gray-200 rounded-lg p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-primary">
                  フォームでのお問い合わせ
                </h2>
              </div>
              <p className="text-text-muted mb-4">
                以下のフォームにご記入ください
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                フォームへスクロール
                <ChevronDown className="w-5 h-5" />
              </a>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* セクション3: お問い合わせフォーム */}
      <section id="contact-form" className="bg-background-alt py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
              お問い合わせフォーム
            </h2>
          </FadeInUp>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* フォーム（左 2/3） */}
            <FadeInUp delay={100} className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
              <ContactForm />
            </FadeInUp>

            {/* 補足情報（右 1/3） */}
            <StaggerContainer className="space-y-6">
              {/* このフォームについて */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-4">
                  このフォームについて
                </h3>
                <ul className="space-y-3">
                  {[
                    "無料でご相談いただけます",
                    "強引な営業は一切いたしません",
                    "24時間受付（返答は営業時間内）",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 返答目安 */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-4">返答目安</h3>
                <p className="text-text-muted mb-4">
                  <span className="text-xl font-bold text-primary">
                    1営業日以内
                  </span>
                  にご連絡いたします。
                </p>
                <p className="text-text-muted text-sm mb-4">
                  お急ぎの場合はお電話ください。
                </p>
                <a
                  href={contact.phoneTel}
                  className="flex items-center gap-2 text-accent font-bold text-lg hover:text-accent-dark transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {contact.phoneFormatted}
                </a>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* セクション4: よくあるご質問 */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
              よくあるご質問
            </h2>
          </FadeInUp>
          <FadeInUp delay={100}>
            <Accordion items={faq} />
          </FadeInUp>
        </div>
      </section>

      {/* セクション5: 会社情報 */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              {company.name}
            </h2>
          </FadeInUp>
          <FadeInUp delay={100} className="text-white/80 space-y-2">
            <p>
              〒{locations.headquarters.zipCode}{" "}
              {locations.headquarters.fullAddress}
            </p>
            <p>
              TEL:{" "}
              <a
                href={contact.phoneTel}
                className="text-accent hover:text-accent-dark transition-colors"
              >
                {contact.phoneFormatted}
              </a>{" "}
              / FAX: {contact.fax}
            </p>
            <p>営業時間: {contact.hours}</p>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
