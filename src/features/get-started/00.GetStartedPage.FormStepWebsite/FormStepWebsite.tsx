import styles from "../00.GetStartedPage/GetStartedPage.module.css";
import type { FormStepWebsiteProps } from "./types";

export function FormStepWebsite({
  register,
  errors,
  t,
  features,
  hasExistingWebsite,
}: FormStepWebsiteProps) {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.stepTitle}>{t("stepTitles.website")}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="websitePurpose">
          {t("labels.websitePurpose")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <textarea
          id="websitePurpose"
          rows={3}
          {...register("websitePurpose", {
            required: t("errors.requiredPurpose"),
          })}
          className={errors.websitePurpose ? styles.error : ""}
          placeholder={t("placeholders.websitePurpose")}
        />
        {errors.websitePurpose && (
          <span className={styles.errorMessage}>
            {errors.websitePurpose.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="targetAudience">
          {t("labels.targetAudience")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <input
          id="targetAudience"
          type="text"
          {...register("targetAudience", {
            required: t("errors.requiredAudience"),
          })}
          className={errors.targetAudience ? styles.error : ""}
          placeholder={t("placeholders.targetAudience")}
        />
        {errors.targetAudience && (
          <span className={styles.errorMessage}>
            {errors.targetAudience.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>
          {t("labels.desiredFeatures")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <div className={styles.checkboxGroup}>
          {features.map((feature) => (
            <label key={feature} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={feature}
                {...register("desiredFeatures", {
                  required: t("errors.requiredFeatures"),
                })}
              />
              <span className={styles.checkboxText}>{feature}</span>
            </label>
          ))}
        </div>
        {errors.desiredFeatures && (
          <span className={styles.errorMessage}>
            {errors.desiredFeatures.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("hasExistingWebsite")} />
          <span className={styles.checkboxText}>{t("labels.hasWebsite")}</span>
        </label>

        {hasExistingWebsite && (
          <div className={styles.formGroup}>
            <label htmlFor="existingWebsiteUrl">
              {t("labels.websiteUrl")}
            </label>
            <input
              id="existingWebsiteUrl"
              type="url"
              {...register("existingWebsiteUrl")}
              placeholder={t("placeholders.websiteUrl")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
