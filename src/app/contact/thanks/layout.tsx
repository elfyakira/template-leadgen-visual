import type { Metadata } from "next";
import siteData from "../../../../data/site.json";

export const metadata: Metadata = {
  title: `送信完了${siteData.seo.titleSuffix}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
