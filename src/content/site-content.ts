import type { Finish, Quality, Shape, Size } from "@/types/product";

export type FeatureImageTone = "sand" | "linen" | "clay" | "mist" | "forest";

export interface SiteFeature {
  title: string;
  description: string;
  image?: {
    alt: string;
    position?: string;
    src?: string;
    tone?: FeatureImageTone;
  };
}

export const siteContent = {
  brandName: "Voloma",
  siteTitle: "Voloma",
  description:
    "Voloma — деревянные кашпо для интерьера: спокойная подача бренда, конфигуратор форм, размеров, вариантов пропитки и уровня качества.",
  hero: {
    title: "Деревянные кашпо для интерьера",
    subtitle: "Форма, размер и пропитка под ваше пространство.",
    cta: "Собрать своё кашпо",
  },
  features: [
    {
      title: "Карельская сосна",
      description:
        "Спокойная фактура и плотная древесина, отобранная для аккуратного внешнего вида.",
      image: {
        src: "/images/features/custom/feature-01.jpg",
        alt: "Деревянное кашпо Voloma из фотоархива бренда",
        position: "center 48%",
        tone: "sand",
      },
    },
    {
      title: "Живая текстура",
      description: "Каждое изделие сохраняет естественный рисунок дерева.",
      image: {
        src: "/images/features/custom/feature-02.jpg",
        alt: "Фактура дерева и поверхность кашпо Voloma крупным планом",
        position: "center 54%",
        tone: "linen",
      },
    },
    {
      title: "Аккуратная сборка",
      description: "Точные соединения и ровная геометрия.",
      image: {
        src: "/images/features/custom/feature-03.jpg",
        alt: "Аккуратная сборка деревянного кашпо Voloma",
        position: "center 54%",
        tone: "clay",
      },
    },
    {
      title: "Декоративная пропитка",
      description: "Защищает поверхность от влаги и повседневного износа, подчёркивает фактуру дерева.",
      image: {
        src: "/images/hero/voloma-hero-mobile.webp",
        alt: "Поверхность кашпо с ровным защитным покрытием",
        position: "center 48%",
        tone: "mist",
      },
    },
    {
      title: "Под ваш размер и пропитку",
      description: "Выбирайте форму, размер и вариант пропитки под своё пространство.",
      image: {
        src: "/images/features/custom/feature-05.jpg",
        alt: "Разные варианты деревянных кашпо Voloma на фото",
        position: "center 52%",
        tone: "forest",
      },
    },
  ] satisfies SiteFeature[],
  howItWorks: [
    "Выберите форму и размер",
    "Подберите пропитку и качество",
    "Посмотрите вариант и отправьте заявку",
  ],
  about: {
    title: "О Voloma",
    description:
      "Мы делаем деревянные кашпо спокойно и точно: с вниманием к материалу, пропорциям и тому, как изделие выглядит в реальном интерьере.",
    points: [
      "Натуральная древесина и аккуратная обработка.",
      "Два уровня визуального отбора: стандарт и премиум.",
      "Можно сделать кастомный размер или вариант пропитки.",
    ],
  },
  finalCta: {
    title: "Подберите кашпо под свой интерьер",
    description:
      "Конфигуратор поможет быстро определить форму, размер, вариант пропитки и нужный уровень качества.",
    cta: "Перейти в конфигуратор",
  },
  configurator: {
    eyebrow: "Конфигуратор Voloma",
    title: "Подбор изделия без лишней сложности",
    description:
      "Сначала форма, затем размер, вариант пропитки и уровень качества. Если фото варианта ещё не подготовлены, интерфейс честно покажет, куда их добавить.",
    qualityTitle: "Чем отличаются стандарт и премиум",
    qualityDescription:
      "Разница не в маркетинге, а в степени визуального отбора древесины.",
    customTitle: "Нужен свой размер или вариант пропитки?",
    customDescription:
      "Можно оставить запрос на индивидуальное изготовление. Это удобно для нестандартных ниш, длинных композиций и пропитки под конкретный интерьер.",
  },
};

export const shapeLabels: Record<Shape, string> = {
  narrow: "Узкое",
  square: "Квадратное",
  rect: "Прямоугольное",
};

export const sizeLabels: Record<Size, string> = {
  s: "S",
  m: "M",
  l: "L",
};

/** Labels for the stain finish options */
export const finishLabels: Record<Finish, string> = {
  natural: "Без цветной обработки",
  oak_stain: "Под дуб",
  rosewood_stain: "Под палисандр",
};

export const qualityLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Премиум",
};

export const woodTypeHints: Record<Quality, string> = {
  standard: "Естественный рисунок дерева, допустимы сучки",
  premium: "Более однородная поверхность, минимум сучков",
};

export const availabilityLabels = {
  in_stock: "В наличии",
  made_to_order: "Изготовление под заказ",
  preorder: "Предзаказ",
} as const;
