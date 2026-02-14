"use client";

import Link from "next/link";
import { Phone, MapPin, Car, ParkingCircle, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import AreaMap from "@/components/AreaMap";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import siteData from "../../../data/site.json";

export default function AreaPage() {
  const { company, contact, locations, localVisual } = siteData;

  const mainRegion = localVisual.regions.find((r) => r.isMain);
  const subRegions = localVisual.regions.filter((r) => !r.isMain);

  return (
    <main>
      {/* セクション1: ページヘッダー */}
      <PageHeader
        title="対応エリア"
        subtitle={`${localVisual.mainRegion}を中心に、周辺地域もカバーしています`}
        backgroundImage={siteData.images.companyExterior}
        height="medium"
      />

      {/* セクション2: 対応エリアマップ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* インタラクティブ地図 */}
          <FadeInUp>
            <AreaMap
              regions={localVisual.regions}
              mainArea={localVisual.mainRegion}
              scrollToAreaOnClick={true}
              className="mb-8"
            />
          </FadeInUp>

          <FadeInUp delay={100}>
            <p className="text-text-muted">{localVisual.areaNote}</p>
            <p className="text-text-muted mt-2">{localVisual.areaOutsideNote}</p>
          </FadeInUp>
        </div>
      </section>

      {/* セクション3: エリア別詳細リスト */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* メイン対応エリア */}
          {mainRegion && (
            <FadeInUp className="mb-12" id={`area-${mainRegion.name}`}>
              <h2 className="text-lg font-semibold text-accent mb-4">
                メイン対応エリア
              </h2>
              <div className="bg-white rounded-lg p-6 md:p-8 border-l-4 border-primary shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {mainRegion.name}
                    </h3>
                    <p className="text-lg">
                      施工実績{" "}
                      <span className="text-accent font-bold">
                        {mainRegion.worksCount}件
                      </span>
                      以上
                    </p>
                    {mainRegion.districts && (
                      <p className="text-sm text-text-muted mt-2">
                        対応地区: {mainRegion.districts.join("、")}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/works?area=${mainRegion.name}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    {mainRegion.name}の施工事例を見る
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeInUp>
          )}

          {/* 周辺対応エリア */}
          <FadeInUp delay={100}>
            <h2 className="text-lg font-semibold text-text-muted mb-4">
              周辺対応エリア
            </h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subRegions.map((region) => (
              <div
                key={region.name}
                id={`area-${region.name}`}
                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {region.name}
                </h3>
                <p className="text-sm mb-3">
                  施工実績{" "}
                  <span className="text-accent font-semibold">
                    {region.worksCount}件
                  </span>
                  以上
                </p>
                <Link
                  href={`/works?area=${region.name}`}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors"
                >
                  施工事例を見る
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* セクション4: 対応エリア外について */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
              上記以外の地域にお住まいの方へ
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              リストに記載のない地域でも、対応可能な場合がございます。
              <br className="hidden md:block" />
              遠方の場合は出張費がかかる場合がありますが、まずはお気軽にご相談ください。
              <br className="hidden md:block" />
              お電話またはお問い合わせフォームから、ご住所をお知らせいただければ、対応可否をすぐにお伝えします。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              エリア外でも相談してみる
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* セクション5: 会社所在地 */}
      <section className="bg-background-alt py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
              会社所在地
            </h2>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Map */}
            <FadeInUp className="aspect-video md:aspect-square rounded-lg overflow-hidden shadow-lg">
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
            </FadeInUp>

            {/* アクセス情報 */}
            <FadeInUp delay={100} className="flex flex-col justify-center">
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
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* セクション6: CTA */}
      <CTASection
        heading="お住まいの地域で対応可能か確認できます"
        subheading="まずはお気軽にお問い合わせください"
        phoneNumber={contact.phoneFormatted}
        phoneTel={contact.phoneTel}
        hours={contact.hours}
      />
    </main>
  );
}
