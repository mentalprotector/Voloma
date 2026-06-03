import type { Finish, Quality, Shape, Size } from "@/types/product";
import { finishLabels, shapeLabels, sizeLabels } from "@/content/site-content";

const qualityLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Премиум",
};

export function buildOrderMessage(params: {
  shape: Shape;
  size: Size;
  finish: Finish;
  quality: Quality;
  showSize: boolean;
}): string {
  const finishLabel = params.finish === "natural" ? "Натуральная" : finishLabels[params.finish];
  const finishNote =
    params.finish === "natural"
      ? "\nВажно: бесцветная сосна без защитного покрытия. Если оставляем натуральный цвет, нужно обсудить защитный слой."
      : "";

  return `Здравствуйте!
Хочу заказать кашпо Волома:
Модель: ${shapeLabels[params.shape]}${params.showSize ? " " + sizeLabels[params.size] : ""}
Тип дерева: ${qualityLabels[params.quality]}
Пропитка: ${finishLabel}${finishNote}`;
}
