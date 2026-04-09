# Voloma Site — Документация для Claude

## 📋 О проекте

**Voloma** — производство деревянных кашпо для интерьера с онлайн-конфигуратором подбора формы, размера, пропитки и уровня качества.

- **Стек**: Next.js 16, React 19, TypeScript, CSS Modules
- **Продакшен URL**: https://voloma.94.140.224.220.sslip.io
- **Репозиторий**: `C:\dev\voloma-site`
- **Основные страницы**:
  - `/` — Лендинг с обзором продукции
  - `/configurator` — Конфигуратор кастомизации кашпо

## 🎯 Текущее состояние (2026-04-08)

### ✅ Завершено
- **Реальные данные**: Размеры, цены, доступность — актуальны
- **Галерея**: Полностью реализована с lightbox, grid, thumbnails, touch gestures
- **Конфигуратор**: Двухколоночный layout (media + controls), упрощённая логика выбора
- **Билд**: Проект стабилен — `npm run lint`, `typecheck`, `build` проходят

### ⚠️ В процессе
- **Наполнение галереи**: Только `квадратное/natural` имеет реальные изображения
- **Редизайн конфигуратора**: Layout пересобран, но нужна полировка UX/UI

### ❓ Открытые вопросы
1. **Sticky mobile CTA** — оставить или убрать?
2. **Визуальная унификация** — spacing, hierarchy, surface consistency

## 📁 Ключевые артефакты и документы

### 🎨 Дизайн и архитектура
- [CONFIGURATOR_RELAYOUT_BRIEF.md](CONFIGURATOR_RELAYOUT_BRIEF.md) — Бриф редизайна конфигуратора
  - Проблемы текущей архитектуры
  - Целевое решение (responsive flow)
  - Критерии приёмки

### 👥 История работы с AI
- [JUMPSTART_GLM_2026-04-06.md](JUMPSTART_GLM_2026-04-06.md) — Handoff от Codex (устаревший)
  - Детальный план редизайна на 2 дня
  - Статус изменений к 2026-04-06
  - **Примечание**: Данные по ценам и размерам были обновлены пользователем, статус Codex устарел

- [QWEN.md](QWEN.md) — Память от Qwen о деплое
  - Процесс деплоя через SSH
  - Server: `192.168.28.90`, container: `voloma-landing`

## 🗂️ Структура проекта

### Конфигурация и данные
```
src/
├── config/
│   ├── pricing.ts           # Цены (реальные данные)
│   └── availability.ts      # Доступность размеров, габариты
├── data/
│   └── product-variants.ts  # Варианты продуктов + галерея
├── lib/
│   ├── gallery-images.ts    # Логика путей к изображениям
│   └── product-matching.ts  # Matching strategies для галереи
└── types/
    └── product.ts           # TypeScript типы
```

### Компоненты конфигуратора
```
src/components/configurator/
├── Configurator.tsx         # Главный компонент (логика + layout)
├── ConfiguratorControls.tsx # Селекторы опций
├── ImageGallery.tsx         # Галерея с lightbox
├── StickyMobileCTA.tsx      # Мобильный sticky CTA
└── Lightbox.tsx             # Фуллскрин просмотр изображений
```

## 🖼️ Состояние галереи изображений

### Структура папок
```
public/images/cashpo/configs/
├── квадратное/
│   └── natural/            # ✅ 24 файла (8 large + 8 medium + 8 thumbnails)
│   ├── oak-stain/           # ❌ Пусто
│   └── rosewood-stain/      # ❌ Пусто
├── прямоугольное/
│   ├── natural/             # ❌ Пусто
│   ├── oak-stain/           # ❌ Пусто
│   └── rosewood-stain/      # ❌ Пусто
└── узкое-{S,M,L}/
    ├── natural/             # ❌ Пусто
    ├── oak-stain/           # ❌ Пусто
    └── rosewood-stain/      # ❌ Пусто
```

### Логика галереи
- `getGalleryImages()` — строит пути к изображениям по конфигурации
- Matching strategy fallbacks если точного варианта нет
- Grid: 4 фотографии, Lightbox: до 8 фотографий
- Формат: WebP (thumbnails, medium, large)

## 💰 Цены и размеры (актуальные)

### Цены (рубли)
```
Узкое (narrow):
  S: Стандарт 1900 ₽ | Премиум 2300 ₽
  M: Стандарт 2000 ₽ | Премиум 2600 ₽
  L: Стандарт 2500 ₽ | Премиум 3300 ₽

Квадратное (square):
  M: Стандарт 2700 ₽ | Премиум 3500 ₽

Прямоугольное (rect):
  M: Стандарт 3700 ₽ | Премиум 5000 ₽

Дополнительно:
  Пропитка (oak/rosewood): +800 ₽
  Колёсики: Включены в стоимость (кроме узкого S)
```

### Доступность размеров
- **Узкое**: S, M, L
- **Квадратное**: M
- **Прямоугольное**: M

## 🚀 Деплой (процесс от Qwen)

### Требуемые шаги
1. `git add -A && git commit && git push`
2. `tar czf voloma-deploy.tar.gz --exclude=node_modules --exclude=.next --exclude=.git --exclude=voloma-deploy.tar.gz .`
3. `scp voloma-deploy.tar.gz matveyrl-1@192.168.28.90:~/voloma-deploy.tar.gz`
4. `ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && rm -rf src components config content data lib types public deploy-remote.sh Dockerfile .dockerignore next.config.ts next-env.d.ts tsconfig.json package.json package-lock.json eslint.config.mjs README.md && cd ~ && tar xzf voloma-deploy.tar.gz -C ~/voloma-current/ && cd ~/voloma-current && docker build -t voloma-site ."`
5. `ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && bash deploy-remote.sh"`

### Инфраструктура
- **Server**: `192.168.28.90`, user: `matveyrl-1`
- **Container**: `voloma-landing` (port 3000)
- **Network**: `web_proxy`, proxied by `global-proxy` (Caddy)
- **Source на сервере**: `~/voloma-current/`

## 🔧 Команды для разработки

```bash
# Установка зависимостей
npm install

# Dev server
npm run dev

# Production build
npm run build
npm start

# Проверки
npm run lint
npm run typecheck
```

## 🎯 Приоритетные задачи

### Критично
1. **Наполнить галерею** изображениями для всех вариантов
2. **Проверить matching logic** — корректно ли работает fallback для вариантов без изображений

### Важно
1. **Решить судьбу sticky CTA** на мобильных
2. **Полировка UI** — spacing, hierarchy, consistency
3. **Проверить breakpoints** — особенно 320px, 360px, 375px, 390px, 414px

### Желательно
1. **Accessibility pass** — keyboard navigation, focus states
2. **Animation polish** — плавность переходов
3. **Performance** — lazy loading, image optimization

## 📞 Контакты

- **Продакшен**: https://voloma.94.140.224.220.sslip.io
- **Server**: matveyrl-1@192.168.28.90

---

*Последнее обновление: 2026-04-08*
