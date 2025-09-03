"use client";

import React from "react";
import styles from "./Landing.module.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/functions";

export default function Landing() {
    const t = useTranslations("Landing");

    return (
        <section className={styles.hero} id="home">
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <span>{t("badge")}</span>
                    </div>
                    <h1
                        className={styles.heroTitle}
                        dangerouslySetInnerHTML={{
                            __html: t
                                .raw("title")
                                .replace(
                                    /<highlight>(.*?)<\/highlight>/,
                                    `<span class="${styles.highlight}">$1</span>`
                                ),
                        }}
                    />
                    <p className={styles.heroDescription}>{t("description")}</p>
                    <div className={styles.heroButtons}>
                        <button
                            onClick={() => {
                                scrollToSection("portfolio")
                            }}
                            className={`btn btn-primary ${styles.heroBtn}`}
                        >
                            {t("explore")}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <Link
                            href="/get-started"
                            className={`btn btn-secondary ${styles.heroBtn}`}
                        >
                            {t("start")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
