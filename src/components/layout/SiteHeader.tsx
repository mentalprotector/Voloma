"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { publicPath } from "@/lib/public-path";

import { Button } from "../ui/Button";

import styles from "./site-header.module.css";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "");
  const isHome = normalizedPathname === "";
  const isConfigurator =
    normalizedPathname === "/configurator" || normalizedPathname.startsWith("/configurator/");

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
        isHome ? styles.homeHeader : "",
        isScrolled ? styles.scrolled : "",
        isConfigurator ? styles.configuratorHeader : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          styles.inner,
          isHome ? styles.homeInner : "",
          isConfigurator ? styles.configuratorInner : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isConfigurator ? (
          <>
            <Link className={styles.configuratorBack} href="/">
              <span className={styles.configuratorBackIcon} aria-hidden="true">
                ←
              </span>
              Кашпо Волома
            </Link>

            <Link className={styles.brand} href="/">
              <Image
                src={publicPath("/voloma-symbol.svg")}
                alt="Voloma"
                width={386}
                height={411}
                className={styles.brandSymbol}
                priority
              />
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.brand} href="/">
              <Image
                src={publicPath("/voloma-symbol.svg")}
                alt="Voloma"
                width={386}
                height={411}
                className={styles.brandSymbol}
                priority
              />
              <Image
                src={publicPath("/voloma-wordmark.svg")}
                alt="Voloma Wood"
                width={802}
                height={132}
                className={styles.brandWordmark}
                priority
              />
            </Link>

          <nav className={styles.actions} aria-label="Основная навигация">
            <Button
              href="/configurator"
              className={styles.orderButton}
              onClick={() => trackEvent("hero_cta_click", { source: "header_order" })}
            >
              Заказать
            </Button>
          </nav>
          </>
        )}
      </div>
    </header>
  );
}

