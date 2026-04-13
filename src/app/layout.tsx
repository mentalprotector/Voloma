import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";

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
    default: "Волома | Деревянные кашпо для интерьера из карельской сосны",
    template: "%s | Волома",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Волома | Деревянные кашпо для интерьера",
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
    title: "Волома | Деревянные кашпо для интерьера",
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
    // Добавить ID верификации после регистрации в Яндекс.Вебмастере
    // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  icons: {
    icon: "/favicon.svg",
  },
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
        <SiteFooter />
      </body>
    </html>
  );
}
