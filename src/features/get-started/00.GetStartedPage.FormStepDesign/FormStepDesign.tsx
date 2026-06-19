import styles from "../00.GetStartedPage/GetStartedPage.module.css";
import type { FormStepDesignProps } from "./types";

export function FormStepDesign({ register, t }: FormStepDesignProps) {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.stepTitle}>{t("stepTitles.design")}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="colorPreferences">
          {t("labels.colorPreferences")}
        </label>
        <input
          id="colorPreferences"
          type="text"
          {...register("colorPreferences")}
          placeholder={t("placeholders.colorPreferences")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="exampleWebsites">
          {t("labels.exampleWebsites")}
        </label>
        <textarea
          id="exampleWebsites"
          rows={3}
          {...register("exampleWebsites")}
          placeholder={t("placeholders.exampleWebsites")}
        />
      </div>
    </div>
  );
}
