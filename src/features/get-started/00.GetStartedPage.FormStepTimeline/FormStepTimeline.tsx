import styles from "../00.GetStartedPage/GetStartedPage.module.css";
import type { FormStepTimelineProps } from "./types";

export function FormStepTimeline({
  register,
  errors,
  t,
  timelines,
  budgetRanges,
}: FormStepTimelineProps) {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.stepTitle}>{t("stepTitles.timeline")}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="timeline">
          {t("labels.timeline")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <select
          id="timeline"
          {...register("timeline", {
            required: t("errors.requiredTimeline"),
          })}
          className={errors.timeline ? styles.error : ""}
        >
          <option value="">{t("timelines.title")}</option>
          {timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
        {errors.timeline && (
          <span className={styles.errorMessage}>{errors.timeline.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budgetRange">
          {t("labels.budgetRange")}{" "}
          <span className={styles.requiredStar}>*</span>
        </label>
        <select
          id="budgetRange"
          {...register("budgetRange", {
            required: t("errors.requiredBudget"),
          })}
          className={errors.budgetRange ? styles.error : ""}
        >
          <option value="">{t("budget.title")}</option>
          {budgetRanges.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
        {errors.budgetRange && (
          <span className={styles.errorMessage}>
            {errors.budgetRange.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="projectUrgency">{t("labels.projectUrgency")}</label>
        <select id="projectUrgency" {...register("projectUrgency")}>
          <option value="">{t("urgency.select")}</option>
          <option value="urgent">{t("urgency.urgent")}</option>
          <option value="moderate">{t("urgency.moderate")}</option>
          <option value="planning">{t("urgency.planning")}</option>
        </select>
      </div>
    </div>
  );
}
