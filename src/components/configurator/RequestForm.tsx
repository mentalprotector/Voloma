"use client";

import { useEffect, useRef, useState } from "react";

import { colorLabels, qualityLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { selectionToSlug } from "@/lib/product-matching";
import type { MatchType, VariantSelection } from "@/types/product";

import { Button } from "../ui/Button";
import styles from "./request-form.module.css";

type FormMode = "standard" | "custom";
type SubmitState = "idle" | "submitting" | "success";

interface RequestFormProps {
  selection: VariantSelection;
  mode: FormMode;
  matchType: MatchType;
}

export function RequestForm({ selection, mode, matchType }: RequestFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const helperText =
    mode === "custom"
      ? "Опишите желаемый размер, оттенок или особенность проекта. Это попадёт в заявку как кастомный запрос."
      : "Оставьте контакт, и можно будет уточнить детали по выбранной конфигурации.";

  function handleSubmit(formData: FormData) {
    setSubmitState("submitting");

    trackEvent("submit_request", {
      mode,
      slug: selectionToSlug(selection),
      matchType,
      name: String(formData.get("name") ?? ""),
    });

    timerRef.current = window.setTimeout(() => {
      setSubmitState("success");
    }, 750);
  }

  return (
    <section className={styles.card} id="request-form">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{mode === "custom" ? "Кастомный запрос" : "Заявка"}</p>
          <h2 className={styles.title}>
            {mode === "custom" ? "Расскажите о своём варианте" : "Оставить заявку на подбор"}
          </h2>
        </div>
        <p className={styles.helper}>{helperText}</p>
      </div>
      <div className={styles.selection}>
        <span>{shapeLabels[selection.shape]}</span>
        <span>{sizeLabels[selection.size]}</span>
        <span>{colorLabels[selection.color]}</span>
        <span>{qualityLabels[selection.quality]}</span>
      </div>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          handleSubmit(formData);
        }}
      >
        <label className={styles.field}>
          <span>Имя</span>
          <input aria-label="Имя" name="name" placeholder="Как к вам обращаться" required />
        </label>
        <label className={styles.field}>
          <span>Контакт</span>
          <input
            aria-label="Контакт"
            name="contact"
            placeholder="Телефон, Telegram или email"
            required
          />
        </label>
        <label className={[styles.field, styles.fieldWide].join(" ")}>
          <span>Комментарий</span>
          <textarea
            aria-label="Комментарий"
            defaultValue={
              mode === "custom"
                ? "Нужен свой размер или оттенок."
                : `Интересует ${shapeLabels[selection.shape].toLowerCase()} кашпо ${sizeLabels[
                    selection.size
                  ]}.`
            }
            name="comment"
            placeholder="Коротко опишите задачу"
            rows={5}
          />
        </label>
        <div className={styles.actions}>
          <Button disabled={submitState === "submitting"} size="lg" type="submit">
            {submitState === "submitting" ? "Отправляем..." : "Отправить запрос"}
          </Button>
          <p aria-live="polite" className={styles.response}>
            {submitState === "success"
              ? "Заглушка MVP: заявка принята в интерфейсе, дальше сюда можно подключить CRM, email или CMS."
              : "На этапе MVP форма работает как интерфейсная заглушка без внешнего бэкенда."}
          </p>
        </div>
      </form>
    </section>
  );
}

