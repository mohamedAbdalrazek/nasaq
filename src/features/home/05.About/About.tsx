"use client";

import { MdMobileFriendly, MdRocket, MdSearch } from "react-icons/md";
import { GiBullseye } from "react-icons/gi";
import styles from "./About.module.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function About() {
  const t = useTranslations("About");

  return (
    <section
      aria-labelledby="about-heading"
      className={styles.about}
      id="about"
    >
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.sectionHeader}>
              <h2 id="about-heading" className={styles.sectionTitle}>
                {t("title")}{" "}
              </h2>
              <p className={styles.sectionSubtitle}>{t("subtitle")}</p>
            </div>

            <div className={styles.mission}>
              <h3>{t("mission.title")}</h3>
              <p>{t("mission.text")}</p>
            </div>

            <div className={styles.vision}>
              <h3>{t("vision.title")}</h3>
              <p>{t("vision.text")}</p>
            </div>

            <div className={styles.values}>
              <h3>{t("values.title")}</h3>
              <div className={styles.valuesGrid}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <MdRocket />
                  </div>
                  <h4>{t("values.items.technology.title")}</h4>
                  <p>{t("values.items.technology.text")}</p>
                </div>

                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <MdSearch />
                  </div>
                  <h4>{t("values.items.seo.title")}</h4>
                  <p>{t("values.items.seo.text")}</p>
                </div>

                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <MdMobileFriendly />
                  </div>
                  <h4>{t("values.items.mobile.title")}</h4>
                  <p>{t("values.items.mobile.text")}</p>
                </div>

                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <GiBullseye />
                  </div>
                  <h4>{t("values.items.audience.title")}</h4>
                  <p>{t("values.items.audience.text")}</p>
                </div>
              </div>
            </div>

            <div className={styles.cta}>
              <h3>{t("cta.title")}</h3>
              <p>{t("cta.text")}</p>
              <Link href={"/get-started"} className="btn btn-primary">
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
