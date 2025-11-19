import React from "react";
import styles from "./GetStarted.module.css";
export default function FormProgressBar({
    currentStep,
    totalSteps,
    steps,
    sending,
    goToStep,
}: {
    currentStep: number;
    totalSteps: number;
    steps: { title: string; fields: string[] }[];
    sending: boolean;
    goToStep: (step: number) => void;
}) {
    return (
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
                                : currentStep > index
                                  ? styles.completed
                                  : ""
                        }`}
                        onClick={() => goToStep(index + 1)}
                        aria-label={`Go to step ${index + 1}: ${step.title}`}
                    >
                        <span className={styles.stepNumber}>{index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
