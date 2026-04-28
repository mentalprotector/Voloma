/**
 * JSON-LD структурированные данные для SEO
 * 
 * Включает:
 * - Organization: информация о компании
 * - Product: для всех моделей кашпо
 * - FAQPage: для раздела частых вопросов
 * - BreadcrumbList: для навигации
 */

import type { Finish, Quality, Shape, Size } from "@/types/product";
import { BASE_PRICES, STAIN_SURCHARGE } from "@/config/pricing";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

/**
 * Схема Organization - информация о компании
 */
export function getOrganizationSchema() {
  const baseUrl = getSiteUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Волома",
    "alternateName": "Voloma",
    "url": baseUrl,
    "logo": `${baseUrl}/voloma-logo.svg`,
    "image": `${baseUrl}/images/hero/voloma-hero-desktop.webp`,
    "description": "Деревянные кашпо для интерьера из карельской сосны",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Республика Карелия",
      "addressLocality": "Петрозаводск",
      "streetAddress": "ул. Тапиола 1"
    },
    "foundingLocation": {
      "@type": "Place",
      "name": "Петрозаводск, Карелия, Россия"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7 8142 27-27-00",
      "email": "hello@voloma.ru",
      "contactType": "sales",
      "availableLanguage": "Russian"
    },
    "sameAs": [],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Деревянные кашпо для интерьера",
        "description": "Интерьерные кашпо из карельской сосны различных форм и размеров"
      }
    }
  };
}

/**
 * Схема WebSite помогает поисковикам и AI-поиску связать бренд с доменом.
 */
export function getWebSiteSchema() {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Волома",
    "alternateName": "Voloma",
    "url": baseUrl,
    "inLanguage": "ru-RU",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    }
  };
}

/**
 * Схема Product для одной модели кашпо
 */
export function getProductSchema(
  name: string,
  description: string,
  shape: Shape,
  size: Size,
  quality: Quality,
  finish: Finish,
  dimensions?: { length: number; width: number; height: number }
) {
  const basePrice = BASE_PRICES[shape][quality][size];
  const finishSurcharge = finish === "natural" ? 0 : STAIN_SURCHARGE;
  const finalPrice = basePrice + finishSurcharge;

  const finishNames: Record<Finish, string> = {
    natural: "натуральная",
    oak_stain: "под дуб",
    rosewood_stain: "под палисандр"
  };

  const qualityNames: Record<Quality, string> = {
    standard: "стандарт",
    premium: "премиум"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${name} (${qualityNames[quality]}, ${finishNames[finish]})`,
    "description": `${description}. Качество: ${qualityNames[quality]}. Отделка: ${finishNames[finish]}.`,
    "brand": {
      "@type": "Brand",
      "name": "Волома"
    },
    "offers": {
      "@type": "Offer",
      "price": finalPrice,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/MadeToOrder",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Волома"
      }
    },
    ...(dimensions && {
      "depth": `${dimensions.length} мм`,
      "width": `${dimensions.width} мм`,
      "height": `${dimensions.height} мм`
    })
  };
}

/**
 * Схема FAQPage для раздела частых вопросов
 */
export function getFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

/**
 * Схема BreadcrumbList для навигации
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": absoluteUrl(item.url)
    }))
  };
}
