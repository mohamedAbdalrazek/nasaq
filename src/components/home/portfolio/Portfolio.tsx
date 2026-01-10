"use client";
import React from "react";
import styles from "./Portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PortfolioSection() {
    const t = useTranslations("Portfolio");

    return (
        <section className={styles.portfolio} id="portfolio">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2
                        className={styles.sectionTitle}
                        dangerouslySetInnerHTML={{ __html: t("title") }}
                    />
                    <p className={styles.sectionSubtitle}>{t("subtitle")}</p>
                </div>

                <div className={styles.portfolioGrid}>
                    {/* marakeb Project */}
                    <div className={styles.portfolioItem}>
                        <div className={styles.portfolioImage}>
                            <Image
                                fill
                                src={"/projects/marakeb.png"}
                                alt="marakeb Car Rental Website"
                            />
                            <div className={styles.overlay}>
                                <Link
                                    target="blank"
                                    href={"http://marakeb.co/"}
                                    className="btn btn-primary"
                                >
                                    {t("viewProject")}
                                </Link>
                            </div>
                        </div>
                        <h3>{t("marakebTitle")}</h3>
                        <p>{t("marakebDesc")}</p>
                    </div>

                    {/* Razan Project */}
                    <div className={styles.portfolioItem}>
                        <div className={styles.portfolioImage}>
                            <Image
                                fill
                                src={"/projects/razan.png"}
                                alt="Razan Academy Website"
                            />
                            <div className={styles.overlay}>
                                <Link
                                    target="blank"
                                    href={"https://razan-academy.net/"}
                                    className="btn btn-primary"
                                >
                                    {t("viewProject")}
                                </Link>
                            </div>
                        </div>
                        <h3>{t("razanTitle")}</h3>
                        <p>{t("razanDesc")}</p>
                    </div>

                    {/* Clinic Project */}
                    <div className={styles.portfolioItem}>
                        <div className={styles.portfolioImage}>
                            <Image
                                fill
                                src={"/projects/clinic.png"}
                                alt="ENT Clinic Website"
                            />
                            <div className={styles.overlay}>
                                <Link
                                    target="blank"
                                    href={"http://clinicent.vercel.app/"}
                                    className="btn btn-primary"
                                >
                                    {t("viewProject")}
                                </Link>
                            </div>
                        </div>
                        <h3>{t("clinicTitle")}</h3>
                        <p>{t("clinicDesc")}</p>
                    </div>
                    <div className={styles.portfolioItem}>
                        <div className={styles.portfolioImage}>
                            <Image
                                fill
                                src={"/projects/afif.png"}
                                alt="Afif Website"
                            />
                            <div className={styles.overlay}>
                                <Link
                                    target="blank"
                                    href={"http://afif-app.vercel.app/"}
                                    className="btn btn-primary"
                                >
                                    {t("viewProject")}
                                </Link>
                            </div>
                        </div>
                        <h3>{t("afifTitle")}</h3>
                        <p>{t("afifDesc")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
