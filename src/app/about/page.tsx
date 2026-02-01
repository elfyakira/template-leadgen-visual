import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Car, ParkingCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import CTASection from "@/components/CTASection";
import siteData from "../../../data/site.json";

export const metadata: Metadata = {
  title: `会社概要${siteData.seo.titleSuffix}`,
  description: `${siteData.company.nameShort}の会社概要。${siteData.localVisual.mainRegion}で創業${siteData.stats.yearsInBusiness}年、地域密着で住まいのお困りごとに対応。代表挨拶、会社情報、沿革をご紹介。`,
};

export default function AboutPage() {
  const { company, contact, locations, stats, history, certifications, ceo } =
    siteData;

  const companyInfo = [
    { label: "会社名", value: company.name },
    { label: "代表者", value: `${company.ceoTitle} ${company.ceo}` },
    { label: "設立", value: company.established },
    { label: "資本金", value: company.capital },
    { label: "従業員数", value: company.employees },
    { label: "事業内容", value: company.business },
    {
      label: "所在地",
      value: `〒${locations.headquarters.zipCode} ${locations.headquarters.fullAddress}`,
    },
    {
      label: "電話番号",
      value: contact.phoneFormatted,
      isPhone: true,
      href: contact.phoneTel,
    },
    { label: "FAX", value: contact.fax },
    { label: "営業時間", value: contact.hours },
    { label: "許可・資格", value: company.license },
    { label: "加盟団体", value: company.associations.join("、") },
  ];

  return (
    <main>
      {/* セクション1: ページヘッダー */}
      <PageHeader
        title="会社概要"
        subtitle={`${siteData.localVisual.mainRegion}で創業${stats.yearsInBusiness}年。地域とともに歩んでいます`}
        backgroundImage={siteData.images.companyExterior}
        height="medium"
      />

      {/* セクション2: 代表挨拶 */}
      <section className="bg-background-warm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            代表挨拶
          </h2>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* 代表写真 */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-64 md:w-full max-w-xs aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={ceo.image}
                  alt={`${ceo.title} ${ceo.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 挨拶文 */}
            <div className="md:col-span-3">
              <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed mb-8">
                {ceo.greeting.catchphrase}
              </p>

              <div className="space-y-6 text-text-muted leading-loose">
                {ceo.greeting.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-8 text-right text-lg font-semibold text-primary">
                {ceo.title} {ceo.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: 経営理念・ビジョン */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* 経営理念 */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-text-muted mb-4">
              経営理念
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-primary leading-relaxed">
              {company.mission}
            </p>
          </div>

          {/* 区切り線 */}
          <div className="w-24 h-px bg-gray-300 mx-auto mb-12" />

          {/* ビジョン */}
          <div>
            <h2 className="text-lg font-semibold text-text-muted mb-4">
              ビジョン
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-text-muted leading-relaxed">
              {company.vision}
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: 会社情報 */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            会社情報
          </h2>

          {/* PC: テーブル形式 */}
          <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <tbody>
                {companyInfo.map((item, index) => (
                  <tr
                    key={index}
                    className={index !== companyInfo.length - 1 ? "border-b border-gray-100" : ""}
                  >
                    <th className="w-40 px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-primary">
                      {item.label}
                    </th>
                    <td className="px-6 py-4 text-text">
                      {item.isPhone && item.href ? (
                        <a
                          href={item.href}
                          className="text-accent hover:text-accent-dark transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SP: カード形式 */}
          <div className="md:hidden space-y-4">
            {companyInfo.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary mb-1">
                  {item.label}
                </p>
                {item.isPhone && item.href ? (
                  <a
                    href={item.href}
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-text">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: 沿革 */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            沿革
          </h2>
          <Timeline items={history} />
        </div>
      </section>

      {/* セクション6: 資格・認定 */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            資格・認定
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    width={48}
                    height={48}
                    className="grayscale hover:grayscale-0 transition-all"
                  />
                </div>
                <p className="text-sm font-semibold text-primary">{cert.name}</p>
                {cert.detail && (
                  <p className="text-xs text-text-muted mt-1">{cert.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション7: アクセス */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            アクセス
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Map */}
            <div className="aspect-video md:aspect-square rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${locations.headquarters.lng}!3d${locations.headquarters.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU3JzA0LjciTiAxMzfCsDA5JzQ0LjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="会社所在地"
              />
            </div>

            {/* アクセス情報 */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                {company.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-text-muted">
                      〒{locations.headquarters.zipCode}
                    </p>
                    <p className="text-text">{locations.headquarters.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <a
                      href={contact.phoneTel}
                      className="text-lg font-bold text-accent hover:text-accent-dark transition-colors"
                    >
                      {contact.phoneFormatted}
                    </a>
                    <p className="text-sm text-text-muted">{contact.hours}</p>
                  </div>
                </div>

                {locations.headquarters.access.map((access, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-text-muted">{access}</p>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <ParkingCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-text-muted">{locations.headquarters.parking}</p>
                </div>
              </div>

              <a
                href={locations.headquarters.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
              >
                Google Mapで見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* セクション8: CTA */}
      <CTASection
        heading="私たちにお任せください"
        subheading="まずはお気軽にご相談ください"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
      />
    </main>
  );
}
