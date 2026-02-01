import type { Metadata } from "next";
import siteData from "../../../data/site.json";

export const metadata: Metadata = {
  title: `施工事例${siteData.seo.titleSuffix}`,
  description: `${siteData.company.nameShort}の施工事例一覧。${siteData.localVisual.mainRegion}を中心に${siteData.stats.projectsCompleted}件以上の施工実績。外壁塗装・屋根工事・リフォームのビフォーアフター写真をご紹介。`,
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
