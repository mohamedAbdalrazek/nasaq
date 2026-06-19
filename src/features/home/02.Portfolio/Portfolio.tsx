"use client";

import styles from "./Portfolio.module.css";
import { useTranslations } from "next-intl";
import { PortfolioItem } from "..";
import { projects } from "./lib/data";

export function Portfolio() {
  const t = useTranslations("Portfolio");

  return (
    <section
      aria-labelledby="portfolio-heading"
      className={styles.portfolio}
      id="portfolio"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2
            id="portfolio-heading"
            className={styles.sectionTitle}
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <p className={styles.sectionSubtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.portfolioGrid}>
          {projects.map((project) => (
            <PortfolioItem key={project.titleKey} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
