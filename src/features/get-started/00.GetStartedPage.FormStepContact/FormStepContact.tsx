import styles from "../00.GetStartedPage/GetStartedPage.module.css";
import type { FormStepContactProps } from "./types";

export function FormStepContact({
  register,
  errors,
  t,
}: FormStepContactProps) {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.stepTitle}>{t("stepTitles.contact")}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="contactName">
          {t("labels.contactName")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <input
          id="contactName"
          type="text"
          {...register("contactName", {
            required: t("errors.requiredName"),
          })}
          className={errors.contactName ? styles.error : ""}
        />
        {errors.contactName && (
          <span className={styles.errorMessage}>
            {errors.contactName.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contactEmail">
          {t("labels.contactEmail")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <input
          id="contactEmail"
          type="email"
          {...register("contactEmail", {
            required: t("errors.requiredEmail"),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("errors.invalidEmail"),
            },
          })}
          className={errors.contactEmail ? styles.error : ""}
        />
        {errors.contactEmail && (
          <span className={styles.errorMessage}>
            {errors.contactEmail.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contactPhone">
          {t("labels.contactPhone")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <input
          id="contactPhone"
          type="tel"
          {...register("contactPhone", {
            required: t("errors.requiredPhone"),
            minLength: {
              value: 10,
              message: t("errors.invalidPhone"),
            },
          })}
          className={errors.contactPhone ? styles.error : ""}
        />
        {errors.contactPhone && (
          <span className={styles.errorMessage}>
            {errors.contactPhone.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contactMethod">
          {t("labels.contactMethod")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <select
          id="contactMethod"
          {...register("contactMethod", {
            required: t("errors.requiredMethod"),
          })}
          className={errors.contactMethod ? styles.error : ""}
        >
          <option value="">{t("contactMethod.select")}</option>
          <option value="email">{t("contactMethod.email")}</option>
          <option value="phone">{t("contactMethod.phone")}</option>
          <option value="whatsapp">{t("contactMethod.whatsapp")}</option>
          <option value="any">{t("contactMethod.any")}</option>
        </select>
        {errors.contactMethod && (
          <span className={styles.errorMessage}>
            {errors.contactMethod.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="additionalNotes">
          {t("labels.additionalNotes")}
        </label>
        <textarea
          id="additionalNotes"
          rows={4}
          {...register("additionalNotes")}
          placeholder={t("placeholders.additionalNotes")}
        />
      </div>
    </div>
  );
}
