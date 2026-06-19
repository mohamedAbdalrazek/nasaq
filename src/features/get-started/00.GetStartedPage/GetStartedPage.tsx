"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./GetStartedPage.module.css";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { FormData } from "@/shared/lib/types";
import { useFormTranslations } from "@/shared/hooks/useFormTranslations";
import { useSteps } from "@/shared/hooks/useSteps";
import {
  FormHeader,
  FormProgressBar,
  FormStepBusiness,
  FormStepContact,
  FormStepDesign,
  FormStepTimeline,
  FormStepWebsite,
} from "..";

export default function GetStartedPage() {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const t = useTranslations("Form");
  const totalSteps = 5;
  const { industries, features, budgetRanges, timelines } =
    useFormTranslations();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      desiredFeatures: [],
      hasExistingWebsite: false,
    },
  });

  const watchedValues = watch();

  const steps: { title: string; fields: string[] }[] = [
    {
      title: t("stepTitles.business"),
      fields: ["businessName", "industry"],
    },
    {
      title: t("stepTitles.website"),
      fields: [
        "websitePurpose",
        "targetAudience",
        "desiredFeatures",
        "hasExistingWebsite",
        "existingWebsiteUrl",
      ],
    },
    {
      title: t("stepTitles.design"),
      fields: ["designStyle", "colorPreferences", "exampleWebsites"],
    },
    {
      title: t("stepTitles.timeline"),
      fields: ["timeline", "budgetRange", "projectUrgency"],
    },
    {
      title: t("stepTitles.contact"),
      fields: [
        "contactName",
        "contactEmail",
        "contactPhone",
        "contactMethod",
        "additionalNotes",
      ],
    },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setSending(true);
      const res = await fetch("/api/booking/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit booking");
      }

      const resData = await res.json();
      if (!resData.ok) {
        throw new Error(resData.error || "Failed to submit booking");
      }
      router.push(`confirmation/${resData.id}`);
      toast.success("Booking request submitted successfully!");
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
      console.error("Booking request failed:", err);
    } finally {
      setSending(false);
    }
  };

  const { nextStep, prevStep, goToStep, currentStep } = useSteps(
    steps,
    trigger,
    totalSteps,
  );

  const stepProps = { register, errors, t };

  return (
    <section className={styles.formSection} id="create-website">
      <div className="container">
        <FormHeader />

        <FormProgressBar
          totalSteps={totalSteps}
          goToStep={goToStep}
          currentStep={currentStep}
          steps={steps}
          sending={sending}
        />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {currentStep === 1 && (
            <FormStepBusiness {...stepProps} industries={industries} />
          )}

          {currentStep === 2 && (
            <FormStepWebsite
              {...stepProps}
              features={features}
              hasExistingWebsite={watchedValues.hasExistingWebsite}
            />
          )}

          {currentStep === 3 && <FormStepDesign {...stepProps} />}

          {currentStep === 4 && (
            <FormStepTimeline
              {...stepProps}
              timelines={timelines}
              budgetRanges={budgetRanges}
            />
          )}

          {currentStep === 5 && <FormStepContact {...stepProps} />}

          <div className={styles.formNavigation}>
            {currentStep > 1 && (
              <button
                disabled={sending}
                type="button"
                onClick={prevStep}
                className={styles.navButton}
              >
                {t("buttons.previous")}
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                disabled={sending}
                type="button"
                onClick={nextStep}
                className={styles.navButtonPrimary}
              >
                {t("buttons.next")}
              </button>
            ) : (
              <button
                disabled={sending}
                type="submit"
                className={styles.submitButton}
              >
                {sending ? t("buttons.sending") : t("buttons.submit")}
              </button>
            )}
          </div>
        </form>

        <div className={styles.stepInfo}>
          {steps[currentStep - 1].title} |{" "}
          {t("stepIndicator", {
            current: currentStep,
            total: totalSteps,
          })}
        </div>
      </div>
    </section>
  );
}
