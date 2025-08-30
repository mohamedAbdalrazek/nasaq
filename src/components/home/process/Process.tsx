// components/ProcessSection.tsx
"use client";

import { useState } from "react";
import styles from "./Process.module.css";

const ProcessSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "Consultation",
            description:
                "We begin with a detailed discussion to understand your goals, target audience, and specific requirements.",
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Planning & Design",
            description:
                "We create a comprehensive project roadmap and design mockups that align with your vision and brand identity.",
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 15H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Development",
            description:
                "Our team builds your solution using modern technologies and best practices for optimal performance.",
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 17L18 12L13 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 17L11 12L6 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Launch & Support",
            description:
                "We deploy your project and provide ongoing maintenance to ensure long-term success and growth.",
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section className={styles.process} id="process">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Our <span className="text-gradient">Process</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Simple, transparent workflow from concept to launch
                    </p>
                </div>

                <div className={styles.processContainer}>
                    {/* Progress bar */}
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${
                                    (activeStep / (steps.length - 1)) * 100
                                }%`,
                            }}
                        ></div>
                    </div>

                    {/* Steps */}
                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`${styles.step} ${
                                    index === activeStep ? styles.active : ""
                                } ${
                                    index < activeStep ? styles.completed : ""
                                }`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className={styles.stepIndicator}>
                                    <div className={styles.stepIcon}>
                                        {step.icon}
                                    </div>
                                    <div className={styles.stepNumber}>
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className={styles.stepTitle}>
                                    {step.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Step content */}
                    <div className={styles.stepContent}>
                        <div className={styles.contentWrapper}>
                            <p className={styles.stepDescription}>
                                {steps[activeStep].description}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className={styles.navigation}>
                        <button
                            className={styles.navButton}
                            onClick={() =>
                                setActiveStep((prev) => Math.max(0, prev - 1))
                            }
                            disabled={activeStep === 0}
                        >
                            Previous
                        </button>

                        <div className={styles.stepDots}>
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${
                                        index === activeStep
                                            ? styles.active
                                            : ""
                                    }`}
                                    onClick={() => setActiveStep(index)}
                                />
                            ))}
                        </div>

                        <button
                            className={styles.navButton}
                            onClick={() =>
                                setActiveStep((prev) =>
                                    Math.min(steps.length - 1, prev + 1)
                                )
                            }
                            disabled={activeStep === steps.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
