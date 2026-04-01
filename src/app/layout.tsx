import type { Metadata, Viewport } from "next";
import { Lora, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteContent } from "@/content/site-content";

import "./globals.css";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Voloma | Деревянные кашпо для интерьера",
    template: "%s | Voloma",
  },
  description: siteContent.description,
  openGraph: {
    title: "Voloma | Деревянные кашпо для интерьера",
    description: siteContent.description,
    locale: "ru_RU",
    siteName: "Voloma",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f1e8",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${lora.variable} ${manrope.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
