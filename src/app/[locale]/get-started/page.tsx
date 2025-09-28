// components/WebsiteCreationForm.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./GetStarted.module.css";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { FormData } from "@/lib/types";

const WebsiteCreationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [sending, setSending] = useState(false);
    const router = useRouter();
    const t = useTranslations("Form");
    const totalSteps = 5;

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

    const industries = [
        t("industries.retail"),
        t("industries.restaurant"),
        t("industries.healthcare"),
        t("industries.education"),
        t("industries.services"),
        t("industries.realEstate"),
        t("industries.technology"),
        t("industries.creative"),
        t("industries.nonProfit"),
        t("industries.other"),
    ];

    const features = [
        t("features.contactForm"),
        t("features.booking"),
        t("features.ecommerce"),
        t("features.blog"),
        t("features.gallery"),
        t("features.accounts"),
        t("features.multiLanguage"),
        t("features.seo"),
        t("features.dashboard"),
    ];

    const budgetRanges = [
        t("budget.under300"),
        t("budget.300to500"),
        t("budget.500to1000"),
        t("budget.1000to2000"),
        t("budget.2000to3500"),
        t("budget.3500plus"),
    ];

    const timelines = [
        t("timelines.asap"),
        t("timelines.oneMonth"),
        t("timelines.twoThreeMonths"),
        t("timelines.flexible"),
        t("timelines.notSure"),
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
                // Parse error response
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

    const nextStep = async () => {
        const currentFields = steps[currentStep - 1].fields;

        // Trigger validation only for current step's fields
        const isStepValid = await trigger(currentFields as (keyof FormData)[], {
            shouldFocus: true,
        });

        if (!isStepValid) {
            return; // stop if validation fails
        }

        // Mark step as completed if not already
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps((prev) => [...prev, currentStep]);
        }

        // Move to next step safely
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const goToStep = (step: number) => {
        if (completedSteps.includes(step - 1) || step === 1) {
            setCurrentStep(step);
        }
    };

    return (
        <section className={styles.formSection} id="create-website">
            <div className="container">
                <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>{t("title")}</h2>
                    <p className={styles.formSubtitle}>{t("subtitle")}</p>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${
                                    ((currentStep - 1) / (totalSteps - 1)) * 100
                                }%`,
                            }}
                        ></div>
                    </div>
                    <div className={styles.stepIndicators}>
                        {steps.map((step, index) => (
                            <button
                                disabled={sending}
                                key={index}
                                className={`${styles.stepDot} ${
                                    currentStep === index + 1
                                        ? styles.active
                                        : completedSteps.includes(index + 1)
                                          ? styles.completed
                                          : ""
                                }`}
                                onClick={() => goToStep(index + 1)}
                                aria-label={`Go to step ${index + 1}: ${
                                    step.title
                                }`}
                            >
                                <span className={styles.stepNumber}>
                                    {index + 1}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* Step 1: Business Information */}
                    {currentStep === 1 && (
                        <div className={styles.formStep}>
                            <h3 className={styles.stepTitle}>
                                {t("stepTitles.business")}
                            </h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="businessName">
                                    {t("labels.businessName")}{" "}
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <input
                                    id="businessName"
                                    type="text"
                                    {...register("businessName", {
                                        required: t("errors.requiredBusiness"),
                                    })}
                                    className={
                                        errors.businessName ? styles.error : ""
                                    }
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <select
                                    id="industry"
                                    {...register("industry", {
                                        required: t("errors.requiredIndustry"),
                                    })}
                                    className={
                                        errors.industry ? styles.error : ""
                                    }
                                >
                                    <option value="">
                                        {t("industries.title")}
                                    </option>
                                    {industries.map((industry) => (
                                        <option key={industry} value={industry}>
                                            {industry}
                                        </option>
                                    ))}
                                </select>
                                {errors.industry && (
                                    <span className={styles.errorMessage}>
                                        {errors.industry.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Website Details */}
                    {currentStep === 2 && (
                        <div className={styles.formStep}>
                            <h3 className={styles.stepTitle}>
                                {t("stepTitles.website")}
                            </h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="websitePurpose">
                                    {t("labels.websitePurpose")}{" "}
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <textarea
                                    id="websitePurpose"
                                    rows={3}
                                    {...register("websitePurpose", {
                                        required: t("errors.requiredPurpose"),
                                    })}
                                    className={
                                        errors.websitePurpose
                                            ? styles.error
                                            : ""
                                    }
                                    placeholder={t(
                                        "placeholders.websitePurpose",
                                    )}
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <input
                                    id="targetAudience"
                                    type="text"
                                    {...register("targetAudience", {
                                        required: t("errors.requiredAudience"),
                                    })}
                                    className={
                                        errors.targetAudience
                                            ? styles.error
                                            : ""
                                    }
                                    placeholder={t(
                                        "placeholders.targetAudience",
                                    )}
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <div className={styles.checkboxGroup}>
                                    {features.map((feature) => (
                                        <label
                                            key={feature}
                                            className={styles.checkboxLabel}
                                        >
                                            <input
                                                type="checkbox"
                                                value={feature}
                                                {...register(
                                                    "desiredFeatures",
                                                    {
                                                        required: t(
                                                            "errors.requiredFeatures",
                                                        ),
                                                    },
                                                )}
                                            />
                                            <span
                                                className={styles.checkboxText}
                                            >
                                                {feature}
                                            </span>
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
                                    <input
                                        type="checkbox"
                                        {...register("hasExistingWebsite")}
                                    />
                                    <span className={styles.checkboxText}>
                                        {t("labels.hasWebsite")}
                                    </span>
                                </label>

                                {watchedValues.hasExistingWebsite && (
                                    <div className={styles.formGroup}>
                                        <label htmlFor="existingWebsiteUrl">
                                            {t("labels.websiteUrl")}
                                        </label>
                                        <input
                                            id="existingWebsiteUrl"
                                            type="url"
                                            {...register("existingWebsiteUrl")}
                                            placeholder={t(
                                                "placeholders.websiteUrl",
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Design Preferences */}
                    {currentStep === 3 && (
                        <div className={styles.formStep}>
                            <h3 className={styles.stepTitle}>
                                {t("stepTitles.design")}
                            </h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="colorPreferences">
                                    {t("labels.colorPreferences")}
                                </label>
                                <input
                                    id="colorPreferences"
                                    type="text"
                                    {...register("colorPreferences")}
                                    placeholder={t(
                                        "placeholders.colorPreferences",
                                    )}
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
                                    placeholder={t(
                                        "placeholders.exampleWebsites",
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Timeline & Budget */}
                    {currentStep === 4 && (
                        <div className={styles.formStep}>
                            <h3 className={styles.stepTitle}>
                                {t("stepTitles.timeline")}
                            </h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="timeline">
                                    {t("labels.timeline")}{" "}
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <select
                                    id="timeline"
                                    {...register("timeline", {
                                        required: t("errors.requiredTimeline"),
                                    })}
                                    className={
                                        errors.timeline ? styles.error : ""
                                    }
                                >
                                    <option value="">
                                        {t("timelines.title")}
                                    </option>
                                    {timelines.map((timeline) => (
                                        <option key={timeline} value={timeline}>
                                            {timeline}
                                        </option>
                                    ))}
                                </select>
                                {errors.timeline && (
                                    <span className={styles.errorMessage}>
                                        {errors.timeline.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="budgetRange">
                                    {t("labels.budgetRange")}{" "}
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <select
                                    id="budgetRange"
                                    {...register("budgetRange", {
                                        required: t("errors.requiredBudget"),
                                    })}
                                    className={
                                        errors.budgetRange ? styles.error : ""
                                    }
                                >
                                    <option value="">
                                        {t("budget.title")}
                                    </option>
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
                                <label htmlFor="projectUrgency">
                                    {t("labels.projectUrgency")}
                                </label>
                                <select
                                    id="projectUrgency"
                                    {...register("projectUrgency")}
                                >
                                    <option value="">
                                        {t("urgency.select")}
                                    </option>
                                    <option value="urgent">
                                        {t("urgency.urgent")}
                                    </option>
                                    <option value="moderate">
                                        {t("urgency.moderate")}
                                    </option>
                                    <option value="planning">
                                        {t("urgency.planning")}
                                    </option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Contact Information */}
                    {currentStep === 5 && (
                        <div className={styles.formStep}>
                            <h3 className={styles.stepTitle}>
                                {t("stepTitles.contact")}
                            </h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="contactName">
                                    {t("labels.contactName")}{" "}
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <input
                                    id="contactName"
                                    type="text"
                                    {...register("contactName", {
                                        required: t("errors.requiredName"),
                                    })}
                                    className={
                                        errors.contactName ? styles.error : ""
                                    }
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <input
                                    id="contactEmail"
                                    type="email"
                                    {...register("contactEmail", {
                                        required: t("errors.requiredEmail"),
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: t("errors.invalidEmail"),
                                        },
                                    })}
                                    className={
                                        errors.contactEmail ? styles.error : ""
                                    }
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
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
                                    className={
                                        errors.contactPhone ? styles.error : ""
                                    }
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
                                    <span className={styles.requiredStar}>
                                        *
                                    </span>
                                </label>
                                <select
                                    id="contactMethod"
                                    {...register("contactMethod", {
                                        required: t("errors.requiredMethod"),
                                    })}
                                    className={
                                        errors.contactMethod ? styles.error : ""
                                    }
                                >
                                    <option value="">
                                        {t("contactMethod.select")}
                                    </option>
                                    <option value="email">
                                        {t("contactMethod.email")}
                                    </option>
                                    <option value="phone">
                                        {t("contactMethod.phone")}
                                    </option>
                                    <option value="whatsapp">
                                        {t("contactMethod.whatsapp")}
                                    </option>
                                    <option value="any">
                                        {t("contactMethod.any")}
                                    </option>
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
                                    placeholder={t(
                                        "placeholders.additionalNotes",
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
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
                                {sending
                                    ? t("buttons.sending")
                                    : t("buttons.submit")}
                            </button>
                        )}
                    </div>
                </form>

                {/* Step Indicator */}
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
};

export default WebsiteCreationForm;
