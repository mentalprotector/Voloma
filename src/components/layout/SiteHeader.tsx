"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

import { Button } from "../ui/Button";

import styles from "./site-header.module.css";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isConfigurator = pathname === "/configurator";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        styles.header,
        isScrolled ? styles.scrolled : "",
        isConfigurator ? styles.configuratorHeader : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={[styles.inner, isConfigurator ? styles.configuratorInner : ""].filter(Boolean).join(" ")}>
        <Link className={styles.brand} href="/">
          Voloma
        </Link>

        {isConfigurator ? null : (
          <nav className={styles.actions} aria-label="Основная навигация">
            <a
              className={styles.aboutLink}
              href="#about"
              onClick={() => trackEvent("hero_cta_click", { source: "header_about" })}
            >
              О кашпо
            </a>

            <Button
              href="/configurator"
              className={styles.orderButton}
              onClick={() => trackEvent("hero_cta_click", { source: "header_order" })}
            >
              Заказать
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
