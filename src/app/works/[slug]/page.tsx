import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BeforeAfter from "@/components/BeforeAfter";
import ImageGallery from "@/components/ImageGallery";
import CTASection from "@/components/CTASection";
import siteData from "../../../../data/site.json";

// サンプルデータ（実際の運用ではsite.jsonまたはCMSから取得）
const worksData = [
  {
    slug: "okazaki-gaiheki-001",
    title: "岡崎市 外壁塗装工事",
    area: "岡崎市",
    category: "外壁塗装",
    buildingType: "戸建て住宅（2階建て）",
    buildingAge: "約25年",
    workContent: "外壁塗装、コーキング打ち替え",
    materials: ["日本ペイント パーフェクトトップ（シリコン）"],
    duration: "約2週間",
    completedAt: "2024年5月",
    beforeImage: "/images/works/work-01-before.jpg",
    afterImage: "/images/works/work-01-after.jpg",
    galleryImages: [
      "/images/works/work-01-gallery-01.jpg",
      "/images/works/work-01-gallery-02.jpg",
      "/images/works/work-01-gallery-03.jpg",
      "/images/works/work-01-gallery-04.jpg",
    ],
    customerVoice:
      "丁寧な対応で安心してお任せできました。仕上がりも想像以上にきれいで、近所からも褒められています。次は屋根もお願いしたいです。",
    customerInfo: "岡崎市 M様（50代）",
    staffComment:
      "今回は築25年の戸建て住宅で、外壁のチョーキングがかなり進行していました。しっかりと高圧洗浄と下地処理を行い、耐久性の高いシリコン塗料で仕上げました。10年以上は美観を保てると思います。",
    staffName: "塗装職人 山田",
    staffImage: "/images/staff/staff-01.jpg",
  },
  {
    slug: "okazaki-yane-001",
    title: "岡崎市 屋根塗装工事",
    area: "岡崎市",
    category: "屋根工事",
    buildingType: "戸建て住宅（2階建て）",
    buildingAge: "約20年",
    workContent: "屋根塗装（遮熱塗料）",
    materials: ["日本ペイント サーモアイSi"],
    duration: "約1週間",
    completedAt: "2024年6月",
    beforeImage: "/images/works/work-02-before.jpg",
    afterImage: "/images/works/work-02-after.jpg",
    galleryImages: [],
    customerVoice:
      "夏場の2階が暑くて困っていましたが、遮熱塗料を塗ってもらってから体感温度が下がりました。見た目もきれいになって満足です。",
    customerInfo: "岡崎市 T様（40代）",
    staffComment:
      "カラーベスト屋根の塗装でした。高圧洗浄でコケをしっかり落とし、遮熱効果のある塗料で仕上げました。",
    staffName: "塗装職人 山田",
    staffImage: "/images/staff/staff-01.jpg",
  },
  {
    slug: "toyota-gaiheki-001",
    title: "豊田市 外壁塗装工事",
    area: "豊田市",
    category: "外壁塗装",
    buildingType: "戸建て住宅（2階建て）",
    buildingAge: "約30年",
    workContent: "外壁塗装、付帯部塗装",
    materials: ["関西ペイント アレスダイナミックTOP"],
    duration: "約3週間",
    completedAt: "2024年4月",
    beforeImage: "/images/works/work-03-before.jpg",
    afterImage: "/images/works/work-03-after.jpg",
    galleryImages: [],
    customerVoice:
      "30年経った家がまるで新築のようになりました。職人さんの丁寧な仕事ぶりに感心しました。",
    customerInfo: "豊田市 K様（60代）",
    staffComment:
      "築30年のお宅でしたので、下地処理に時間をかけました。ラジカル制御型塗料で長持ちする仕上がりになっています。",
    staffName: "塗装職人 佐藤",
    staffImage: "/images/staff/staff-02.jpg",
  },
  {
    slug: "anjou-reform-001",
    title: "安城市 浴室リフォーム",
    area: "安城市",
    category: "リフォーム",
    buildingType: "戸建て住宅",
    buildingAge: "約25年",
    workContent: "浴室リフォーム（ユニットバス交換）",
    materials: ["TOTO サザナ"],
    duration: "約4日間",
    completedAt: "2024年3月",
    beforeImage: "/images/works/work-04-before.jpg",
    afterImage: "/images/works/work-04-after.jpg",
    galleryImages: [],
    customerVoice:
      "古いタイルの浴室が明るくて暖かいユニットバスに生まれ変わりました。毎日のお風呂が楽しみです。",
    customerInfo: "安城市 S様（50代）",
    staffComment:
      "在来浴室からユニットバスへの交換工事でした。断熱性も向上し、冬でも暖かくお使いいただけます。",
    staffName: "塗装職人 佐藤",
    staffImage: "/images/staff/staff-02.jpg",
  },
  {
    slug: "kariya-gaiheki-001",
    title: "刈谷市 外壁塗装工事",
    area: "刈谷市",
    category: "外壁塗装",
    buildingType: "戸建て住宅（2階建て）",
    buildingAge: "約20年",
    workContent: "外壁塗装、屋根塗装",
    materials: ["日本ペイント パーフェクトトップ"],
    duration: "約2週間",
    completedAt: "2024年7月",
    beforeImage: "/images/works/work-05-before.jpg",
    afterImage: "/images/works/work-05-after.jpg",
    galleryImages: [],
    customerVoice:
      "外壁と屋根を一緒にお願いしました。足場代が1回で済んでお得でした。仕上がりも大満足です。",
    customerInfo: "刈谷市 Y様（40代）",
    staffComment:
      "外壁と屋根のセット塗装でした。同時施工でコストを抑えつつ、丁寧に仕上げました。",
    staffName: "塗装職人 山田",
    staffImage: "/images/staff/staff-01.jpg",
  },
  {
    slug: "nishio-yane-001",
    title: "西尾市 屋根葺き替え工事",
    area: "西尾市",
    category: "屋根工事",
    buildingType: "戸建て住宅（2階建て）",
    buildingAge: "約35年",
    workContent: "屋根葺き替え（瓦→ガルバリウム鋼板）",
    materials: ["アイジー工業 スーパーガルテクト"],
    duration: "約1週間",
    completedAt: "2024年8月",
    beforeImage: "/images/works/work-06-before.jpg",
    afterImage: "/images/works/work-06-after.jpg",
    galleryImages: [],
    customerVoice:
      "古い瓦屋根が軽くて丈夫な金属屋根になりました。地震対策にもなって安心です。",
    customerInfo: "西尾市 O様（60代）",
    staffComment:
      "重い瓦から軽量なガルバリウム鋼板へ葺き替えました。建物への負担が減り、耐震性も向上しています。",
    staffName: "塗装職人 佐藤",
    staffImage: "/images/staff/staff-02.jpg",
  },
];

export function generateStaticParams() {
  return worksData.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = worksData.find((w) => w.slug === slug);

  if (!work) {
    return {
      title: `施工事例が見つかりません${siteData.seo.titleSuffix}`,
    };
  }

  return {
    title: `${work.title}${siteData.seo.titleSuffix}`,
    description: `${work.area}の${work.category}事例。${work.buildingType}、${work.buildingAge}のお宅。${siteData.company.nameShort}のビフォーアフター写真をご紹介。`,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { contact } = siteData;

  const work = worksData.find((w) => w.slug === slug);

  if (!work) {
    return (
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            施工事例が見つかりませんでした
          </h1>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            施工事例一覧へ戻る
          </Link>
        </div>
      </main>
    );
  }

  const workInfo = [
    { label: "施工地域", value: work.area },
    { label: "建物種別", value: work.buildingType },
    { label: "築年数", value: work.buildingAge },
    { label: "工事内容", value: work.workContent },
    { label: "使用塗料", value: work.materials.join("、") },
    { label: "施工期間", value: work.duration },
    { label: "施工時期", value: work.completedAt },
  ];

  // 関連事例（同じカテゴリの他の事例）
  const relatedWorks = worksData
    .filter((w) => w.category === work.category && w.slug !== work.slug)
    .slice(0, 3);

  return (
    <main>
      {/* パンくずリスト */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/works" className="hover:text-primary transition-colors">
              施工事例
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{work.title}</span>
          </nav>
        </div>
      </div>

      {/* セクション1: ビフォーアフター */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
            {work.title}
          </h1>
          <BeforeAfter
            beforeImage={work.beforeImage}
            afterImage={work.afterImage}
          />
        </div>
      </section>

      {/* セクション2: 工事概要 */}
      <section className="bg-background-alt py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-8">
            工事概要
          </h2>

          {/* PC: テーブル形式 */}
          <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <tbody>
                {workInfo.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index !== workInfo.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <th className="w-32 px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-primary">
                      {item.label}
                    </th>
                    <td className="px-6 py-4 text-text">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SP: カード形式 */}
          <div className="md:hidden space-y-3">
            {workInfo.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary mb-1">
                  {item.label}
                </p>
                <p className="text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション3: 施工写真ギャラリー */}
      {work.galleryImages.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-8">
              施工写真
            </h2>
            <ImageGallery images={work.galleryImages} alt={work.title} />
          </div>
        </section>
      )}

      {/* セクション4: お客様の声 */}
      {work.customerVoice && (
        <section className="bg-background-alt py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-8">
              お客様の声
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">
                  "
                </span>
                <p className="text-lg text-text leading-relaxed pl-6">
                  {work.customerVoice}
                </p>
              </div>
              <p className="text-right text-text-muted mt-6">
                {work.customerInfo}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* セクション5: 担当者コメント */}
      {work.staffComment && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-8">
              担当者より
            </h2>
            <div className="flex gap-6 items-start">
              {/* 担当者写真 */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={work.staffImage || "/images/staff/default.jpg"}
                    alt={work.staffName || "担当者"}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-primary text-center mt-2">
                  {work.staffName}
                </p>
              </div>

              {/* コメント吹き出し */}
              <div className="flex-1 bg-gray-50 rounded-lg p-6 relative">
                <div className="absolute left-0 top-6 -translate-x-full">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-50" />
                </div>
                <p className="text-text leading-relaxed">{work.staffComment}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* セクション6: 関連事例 */}
      {relatedWorks.length > 0 && (
        <section className="bg-background-alt py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-8">
              関連する施工事例
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relatedWorks.map((relatedWork) => (
                <Link
                  key={relatedWork.slug}
                  href={`/works/${relatedWork.slug}`}
                  className="block group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={relatedWork.afterImage}
                      alt={relatedWork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                      {relatedWork.area}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold text-primary">
                    {relatedWork.category}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/works"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
              >
                施工事例一覧へ戻る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* セクション7: CTA */}
      <CTASection
        heading="この事例のような工事をご希望ですか？"
        subheading="まずはお気軽にご相談ください"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
      />
    </main>
  );
}
