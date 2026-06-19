import styles from "../00.GetStartedPage/GetStartedPage.module.css";
import type { FormStepBusinessProps } from "./types";

export function FormStepBusiness({
  register,
  errors,
  t,
  industries,
}: FormStepBusinessProps) {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.stepTitle}>{t("stepTitles.business")}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="businessName">
          {t("labels.businessName")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <input
          id="businessName"
          type="text"
          {...register("businessName", {
            required: t("errors.requiredBusiness"),
          })}
          className={errors.businessName ? styles.error : ""}
        />
        {errors.businessName && (
          <span className={styles.errorMessage}>
            {errors.businessName.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="industry">
          {t("labels.industry")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <select
          id="industry"
          {...register("industry", {
            required: t("errors.requiredIndustry"),
          })}
          className={errors.industry ? styles.error : ""}
        >
          <option value="">{t("industries.title")}</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        {errors.industry && (
          <span className={styles.errorMessage}>{errors.industry.message}</span>
        )}
      </div>
    </div>
  );
}
