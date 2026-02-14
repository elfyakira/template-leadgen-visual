import type { Metadata } from "next";
import { seo, company } from "@/lib/site";

export const metadata: Metadata = {
  // === 基本SEO ===
  title: `送信完了${seo.titleSuffix}`,
  description: `${company.name}へのお問い合わせありがとうございます。送信が完了しました。`,

  // === 検索エンジン設定 (感謝ページはインデックス不要) ===
  robots: {
    index: false,
    follow: false,
  },

  // === OpenGraph (SNS共有時) ===
  openGraph: {
    title: `送信完了${seo.titleSuffix}`,
    description: `${company.name}へのお問い合わせ送信完了ページ`,
    url: `${seo.siteUrl}/contact/thanks`,
    siteName: company.name,
    locale: "ja_JP",
    type: "website",
  },

  // === Canonical URL (重複コンテンツ対策) ===
  alternates: {
    canonical: "/contact/thanks",
  },

  // === LLMO対応 (AI検索エンジン最適化) ===
  other: {
    "ai:summary": `${company.name}へのお問い合わせ送信完了ページ。`,
    "ai:topics": "送信完了, お問い合わせ完了, 確認ページ",
  },
};

export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
