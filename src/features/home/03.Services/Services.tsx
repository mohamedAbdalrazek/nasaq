"use client";

import { MdDesignServices, MdDevices, MdSpaceDashboard } from "react-icons/md";
import styles from "./Services.module.css";
import { FaBolt, FaChartLine, FaUniversalAccess } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import type { ServiceMap } from "./types";

export function Services() {
    const t = useTranslations("Services");
    const locale = useLocale();
    const services: ServiceMap[] = [
        {
            title: t("modern.title"),
            description: t("modern.description"),
            features: [t("modern.feature1"), t("modern.feature2")],
            icon: <MdDesignServices className={styles.icon} />,
        },
        {
            title: t("responsive.title"),
            description: t("responsive.description"),
            features: [t("responsive.feature1"), t("responsive.feature2")],
            icon: <MdDevices className={styles.icon} />,
        },
        {
            title: t("seo.title"),
            description: t("seo.description"),
            features: [t("seo.feature1"), t("seo.feature2")],
            icon: <FaChartLine className={styles.icon} />,
        },
        {
            title: t("performance.title"),
            description: t("performance.description"),
            features: [t("performance.feature1"), t("performance.feature2")],
            icon: <FaBolt className={styles.icon} />,
        },
        {
            title: t("dashboard.title"),
            description: t("dashboard.description"),
            features: [t("dashboard.feature1"), t("dashboard.feature2")],
            icon: <MdSpaceDashboard className={styles.icon} />,
        },
        {
            title: t("ux.title"),
            description: t("ux.description"),
            features: [t("ux.feature1"), t("ux.feature2")],
            icon: <FaUniversalAccess className={styles.icon} />,
        },
    ];

    return (
        <section className={styles.services} id="services">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        {t("sectionTitle")}
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {t("sectionSubtitle")}
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                {service.icon}
                            </div>
                            <h3 className={styles.serviceTitle}>
                                {service.title}
                            </h3>
                            <p className={styles.serviceDescription}>
                                {service.description}
                            </p>
                            <ul
                                className={`${styles.serviceFeatures} ${locale === "ar" ? styles.arServiceFeatures : ""}`}
                            >
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
