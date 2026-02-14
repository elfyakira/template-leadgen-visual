"use client";

import { Check, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FadeInUp } from "@/components/animations";
import siteData from "../../../../data/site.json";

export default function ThanksPage() {
  const { contact } = siteData;

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white py-20">
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* チェックマークアイコン */}
        <FadeInUp>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={3} />
          </div>
        </FadeInUp>

        {/* メインメッセージ */}
        <FadeInUp delay={100}>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            お問い合わせありがとうございます
          </h1>
        </FadeInUp>

        {/* 詳細メッセージ */}
        <FadeInUp delay={200}>
          <div className="text-text-muted space-y-4 mb-10">
            <p>
              ご入力いただいたメールアドレス宛に
              <br className="md:hidden" />
              確認メールをお送りしました。
            </p>
            <p>
              担当者より
              <span className="font-bold text-primary">1営業日以内</span>
              にご連絡いたします。
              <br />
              今しばらくお待ちください。
            </p>
          </div>
        </FadeInUp>

        {/* 区切り線 */}
        <FadeInUp delay={300}>
          <div className="w-32 h-px bg-gray-300 mx-auto mb-10" />
        </FadeInUp>

        {/* 電話案内 */}
        <FadeInUp delay={400}>
          <div className="mb-10">
            <p className="text-text-muted mb-3">お急ぎの場合はお電話ください</p>
            <a
              href={contact.phoneTel}
              className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent-dark transition-colors"
            >
              <Phone className="w-6 h-6" />
              {contact.phoneFormatted}
            </a>
            <p className="text-sm text-text-muted mt-2">
              受付: {contact.hours}
            </p>
          </div>
        </FadeInUp>

        {/* トップへ戻るボタン */}
        <FadeInUp delay={500}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            トップページへ戻る
          </Link>
        </FadeInUp>
      </div>
    </main>
  );
}
