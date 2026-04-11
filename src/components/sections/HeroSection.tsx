import { Button } from "../ui/Button";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div className={styles.media}>
            <picture className={styles.picture}>
              <source
                media="(min-width: 768px)"
                srcSet="/images/hero/voloma-hero-desktop.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero/voloma-hero-mobile.webp" type="image/webp" />
              <img
                alt="Деревянные кашпо Волома разных размеров и оттенков крупным планом"
                className={styles.image}
                fetchPriority="high"
                src="/images/hero/voloma-hero-mobile.webp"
              />
            </picture>
          </div>

          <div className={styles.copy}>
            <p className={styles.subtitle}>Форма, размер и оттенок под ваше пространство.</p>
            <h1 className={styles.title}>Деревянные кашпо для интерьера</h1>
            <Button href="/configurator" size="lg">
              Собрать своё кашпо
            </Button>
            <p className={styles.priceAnchor}>от 1 900 ₽ · готово за 3 рабочих дня</p>
          </div>
        </div>
      </div>
    </section>
  );
}
