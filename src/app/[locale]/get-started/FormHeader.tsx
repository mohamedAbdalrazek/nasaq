import React from "react";
import styles from "./GetStarted.module.css"
import { useTranslations } from "next-intl";
export default function FormHeader() {
    const t = useTranslations("Form")
    return (
        <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{t("title")}</h2>
            <p className={styles.formSubtitle}>{t("subtitle")}</p>
        </div>
    );
}
