"use client";

import { motion } from "framer-motion";
import { Check, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import siteData from "../../../../data/site.json";

export default function ThanksPage() {
  const { contact } = siteData;

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white py-20">
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* チェックマークアイコン */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-8"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* メインメッセージ */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-primary mb-6"
        >
          お問い合わせありがとうございます
        </motion.h1>

        {/* 詳細メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-text-muted space-y-4 mb-10"
        >
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
        </motion.div>

        {/* 区切り線 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6 }}
          className="w-32 h-px bg-gray-300 mx-auto mb-10"
        />

        {/* 電話案内 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-10"
        >
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
        </motion.div>

        {/* トップへ戻るボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            トップページへ戻る
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
