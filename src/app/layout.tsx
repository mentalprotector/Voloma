import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { FooterVisibilityWrapper } from "@/components/layout/FooterVisibilityWrapper";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteContent } from "@/content/site-content";
import { getOrganizationSchema } from "@/lib/structured-data";
import { YandexMetrika } from "@/lib/yandex-metrika";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Волома - деревянные кашпо для интерьера из карельской сосны",
    template: "%s - Волома",
  },
  description: siteContent.description,
  keywords: [
    "деревянные кашпо",
    "кашпо для интерьера",
    "карельская сосна",
    "интерьерные кашпо",
    "кашпо из дерева",
    "деревянные горшки",
    "кашпо на заказ",
    "Волома",
    "Voloma",
    "кашпо Петрозаводск",
  ],
  authors: [{ name: "Волома" }],
  creator: "Волома",
  publisher: "Волома",
  // TODO: Update URL when custom domain is configured
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Волома - деревянные кашпо для интерьера",
    description: siteContent.description,
    url: "/",
    siteName: "Волома",
    images: [
      {
        url: "/voloma-logo.svg",
        width: 220,
        height: 80,
        alt: "Волома - деревянные кашпо для интерьера",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Волома - деревянные кашпо для интерьера",
    description: siteContent.description,
  },
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
  verification: {
    // TODO: Add verification codes when registered in Yandex.Webmaster and Google Search Console
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const organizationSchema = getOrganizationSchema();
  
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <YandexMetrika />
      </head>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <FooterVisibilityWrapper>
          <SiteFooter />
        </FooterVisibilityWrapper>
      </body>
    </html>
  );
}
