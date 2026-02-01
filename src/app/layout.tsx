import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { seo, company, images } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle || company.name,
    template: `%s${seo.titleSuffix}`,
  },
  description: seo.defaultDescription,

  // canonical URL
  alternates: {
    canonical: "/",
  },

  // robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // OGP
  openGraph: {
    title: seo.defaultTitle || company.name,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    siteName: company.name,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: images.ogImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: company.name,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle || company.name,
    description: seo.defaultDescription,
    images: [images.ogImage || "/images/og-image.jpg"],
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#1a2744",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <StructuredData />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
