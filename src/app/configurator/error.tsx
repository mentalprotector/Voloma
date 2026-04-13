"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ConfiguratorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("Configurator error:", error);
    }
  }, [error]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      padding: "2rem",
      textAlign: "center",
    }}>
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: 500,
        marginBottom: "0.5rem",
        fontFamily: "var(--font-display, serif)",
      }}>
        Ошибка в конфигураторе
      </h1>
      <p style={{
        color: "var(--color-text-muted, #a89880)",
        marginBottom: "1.5rem",
        maxWidth: "400px",
      }}>
        Не удалось загрузить конфигуратор. Попробуйте снова или вернитесь на главную страницу.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "0.5rem",
            background: "#1e1e1c",
            color: "#fff",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Сбросить конфигуратор
        </button>
        <Link
          href="/"
          style={{
            padding: "0.6rem 1.2rem",
            border: "1px solid var(--color-border, #ddd3c5)",
            borderRadius: "0.5rem",
            background: "transparent",
            color: "var(--color-text, #1a1310)",
            fontSize: "0.9rem",
            fontWeight: 500,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
