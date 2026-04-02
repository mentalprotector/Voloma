import type { Color, Quality, Shape, Size } from "@/types/product";

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
    "Voloma — деревянные кашпо для интерьера: спокойная подача бренда, конфигуратор форм, размеров, оттенков и уровня качества.",
  hero: {
    title: "Деревянные кашпо для интерьера",
    subtitle: "Форма, размер и оттенок под ваше пространство.",
    cta: "Собрать своё кашпо",
  },
  features: [
    {
      title: "Карельская сосна",
      description:
        "Спокойная фактура и плотная древесина, отобранная для аккуратного внешнего вида.",
      image: {
        src: "/images/features/voloma-feature.jpg",
        alt: "Деревянное кашпо Voloma в общем ракурсе",
        position: "center 38%",
        tone: "sand",
      },
    },
    {
      title: "Живая текстура",
      description: "Каждое изделие сохраняет естественный рисунок дерева.",
      image: {
        src: "/images/hero/voloma-hero-edge.jpg",
        alt: "Крупный план текстуры дерева на кашпо Voloma",
        position: "center center",
        tone: "linen",
      },
    },
    {
      title: "Аккуратная сборка",
      description: "Точные соединения и ровная геометрия.",
      image: {
        src: "/images/hero/voloma-hero.jpg",
        alt: "Деталь угла и аккуратных соединений деревянного кашпо",
        position: "center 58%",
        tone: "clay",
      },
    },
    {
      title: "Пропитка DUFA",
      description: "Защищает поверхность от влаги и повседневного износа.",
      image: {
        src: "/images/hero/voloma-hero-mobile.webp",
        alt: "Поверхность кашпо с ровным защитным покрытием",
        position: "center 48%",
        tone: "mist",
      },
    },
    {
      title: "Под ваш размер и цвет",
      description: "Выбирайте форму, размер и оттенок под своё пространство.",
      image: {
        alt: "Несколько вариантов деревянных кашпо Voloma рядом",
        tone: "forest",
      },
    },
  ] satisfies SiteFeature[],
  howItWorks: [
    "Выберите форму и размер",
    "Подберите цвет и качество",
    "Посмотрите вариант и отправьте заявку",
  ],
  about: {
    title: "О Voloma",
    description:
      "Мы делаем деревянные кашпо спокойно и точно: с вниманием к материалу, пропорциям и тому, как изделие выглядит в реальном интерьере.",
    points: [
      "Натуральная древесина и аккуратная обработка.",
      "Два уровня визуального отбора: standard и premium.",
      "Можно сделать кастомный размер или оттенок.",
    ],
  },
  finalCta: {
    title: "Подберите кашпо под свой интерьер",
    description:
      "Конфигуратор поможет быстро определить форму, размер, оттенок и нужный уровень визуального отбора.",
    cta: "Перейти в конфигуратор",
  },
  configurator: {
    eyebrow: "Конфигуратор Voloma",
    title: "Подбор изделия без лишней сложности",
    description:
      "Сначала форма, затем размер, оттенок и уровень качества. Если фото варианта ещё не подготовлены, интерфейс честно покажет, куда их добавить.",
    qualityTitle: "Чем отличаются standard и premium",
    qualityDescription:
      "Разница не в маркетинге, а в степени визуального отбора древесины.",
    customTitle: "Нужен свой размер или оттенок?",
    customDescription:
      "Можно оставить запрос на индивидуальное изготовление. Это удобно для нестандартных ниш, длинных композиций и оттенков под конкретный интерьер.",
  },
};

export const shapeLabels: Record<Shape, string> = {
  square: "Квадратное",
  rect: "Прямоугольное",
  long: "Длинное",
};

export const sizeLabels: Record<Size, string> = {
  s: "S",
  m: "M",
  l: "L",
};

export const colorLabels: Record<Color, string> = {
  oak: "Дуб",
  walnut: "Орех",
  charcoal: "Графит",
};

export const qualityLabels: Record<Quality, string> = {
  standard: "Standard",
  premium: "Premium",
};

export const availabilityLabels = {
  in_stock: "В наличии",
  made_to_order: "Изготовление под заказ",
  preorder: "Предзаказ",
} as const;
