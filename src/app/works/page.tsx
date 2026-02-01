"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import WorksGrid, { WorkItem } from "@/components/WorksGrid";
import CTASection from "@/components/CTASection";
import siteData from "../../../data/site.json";

// サンプルデータ（実際の運用ではsite.jsonまたはCMSから取得）
const sampleWorks: WorkItem[] = [
  {
    slug: "okazaki-gaiheki-001",
    title: "岡崎市 外壁塗装工事",
    area: "岡崎市",
    category: "外壁塗装",
    thumbnail: "/images/works/work-01.jpg",
    description: "築25年戸建て シリコン塗装",
  },
  {
    slug: "okazaki-yane-001",
    title: "岡崎市 屋根塗装工事",
    area: "岡崎市",
    category: "屋根工事",
    thumbnail: "/images/works/work-02.jpg",
    description: "カラーベスト屋根 遮熱塗装",
  },
  {
    slug: "toyota-gaiheki-001",
    title: "豊田市 外壁塗装工事",
    area: "豊田市",
    category: "外壁塗装",
    thumbnail: "/images/works/work-03.jpg",
    description: "築30年戸建て フッ素塗装",
  },
  {
    slug: "anjou-reform-001",
    title: "安城市 リフォーム工事",
    area: "安城市",
    category: "リフォーム",
    thumbnail: "/images/works/work-04.jpg",
    description: "浴室・洗面所リフォーム",
  },
  {
    slug: "kariya-gaiheki-001",
    title: "刈谷市 外壁塗装工事",
    area: "刈谷市",
    category: "外壁塗装",
    thumbnail: "/images/works/work-05.jpg",
    description: "築20年戸建て シリコン塗装",
  },
  {
    slug: "nishio-yane-001",
    title: "西尾市 屋根工事",
    area: "西尾市",
    category: "屋根工事",
    thumbnail: "/images/works/work-06.jpg",
    description: "屋根葺き替え工事",
  },
];

const areas = ["すべて", "岡崎市", "豊田市", "安城市", "刈谷市", "西尾市", "幸田町"];
const categories = ["すべて", "外壁塗装", "屋根工事", "リフォーム", "防水工事"];

export default function WorksPage() {
  const { contact, stats } = siteData;
  const [selectedArea, setSelectedArea] = useState("すべて");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredWorks = useMemo(() => {
    return sampleWorks.filter((work) => {
      const areaMatch = selectedArea === "すべて" || work.area === selectedArea;
      const categoryMatch =
        selectedCategory === "すべて" || work.category === selectedCategory;
      return areaMatch && categoryMatch;
    });
  }, [selectedArea, selectedCategory]);

  return (
    <main>
      {/* セクション1: ページヘッダー */}
      <PageHeader
        title="施工事例"
        subtitle="これまでの施工実績をご紹介します"
        backgroundImage="/images/works-hero.jpg"
        height="medium"
        badge={{
          label: "総施工件数",
          value: `${stats.projectsCompleted}件以上`,
        }}
      />

      {/* セクション2: フィルター */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          {/* 地域フィルター */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-text-muted mb-2">地域</p>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedArea === area
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text hover:bg-gray-200"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* 工事種別フィルター */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-text-muted mb-2">
              工事種別
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 該当件数 */}
          <p className="text-sm text-text-muted">
            該当件数:{" "}
            <span className="font-bold text-accent">{filteredWorks.length}件</span>
          </p>
        </div>
      </section>

      {/* セクション3: 施工事例グリッド */}
      <section className="bg-background-alt py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <WorksGrid items={filteredWorks} />
        </div>
      </section>

      {/* セクション4: CTA */}
      <CTASection
        heading="あなたのお家も、こんなにきれいに"
        subheading="まずは無料見積もりをご依頼ください"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
      />
    </main>
  );
}
