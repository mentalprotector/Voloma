"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

import { Button } from "../ui/Button";

import styles from "./site-header.module.css";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={[styles.header, isScrolled ? styles.scrolled : ""].filter(Boolean).join(" ")}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true">
            <Image
              src="/images/brand/voloma-logo.svg"
              alt=""
              width={40}
              height={40}
              className={styles.brandLogo}
            />
          </span>
          <span className={styles.brandText}>Voloma wood</span>
        </Link>

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
      </div>
    </header>
  );
}
