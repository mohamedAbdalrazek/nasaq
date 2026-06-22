import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./NotFoundPage.module.css";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <section className={styles.page} aria-label={t("title")}>
      <div className={styles.content}>
        <p className={styles.code}>{t("heading")}</p>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.message}>{t("message")}</p>
        <Link href="/" className={styles.link}>
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
