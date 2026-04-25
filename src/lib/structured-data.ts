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

/**
 * Схема Organization - информация о компании
 */
export function getOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Волома",
    "alternateName": "Voloma",
    "url": baseUrl,
    "logo": `${baseUrl}/voloma-logo.svg`,
    "description": "Деревянные кашпо для интерьера из карельской сосны",
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
      "item": item.url
    }))
  };
}
