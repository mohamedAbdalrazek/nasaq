"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Overlay } from "..";
import styles from "./PortfolioItem.module.css";
import type { PortfolioItemProps } from "./types";

export function PortfolioItem({ project }: PortfolioItemProps) {
    const t = useTranslations("Portfolio");

    return (
        <div className={styles.portfolioItem}>
            <div className={styles.portfolioImage}>
                <Image fill src={project.imageSrc} alt={project.imageAlt} />
                <Overlay
                    href={project.href}
                    label={t("viewProject")}
                    className={styles.overlay}
                />
            </div>
            <h3>{t(project.titleKey)}</h3>
            <p>{t(project.descKey)}</p>
        </div>
    );
}
