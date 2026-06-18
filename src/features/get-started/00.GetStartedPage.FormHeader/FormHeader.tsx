import styles from "./FormHeader.module.css";
import { useTranslations } from "next-intl";

export function FormHeader() {
    const t = useTranslations("Form");

    return (
        <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>{t("title")}</h1>
            <p className={styles.formSubtitle}>{t("subtitle")}</p>
        </div>
    );
}
