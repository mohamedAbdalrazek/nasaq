"use client";

import React from "react";
import { FaHome, FaPhoneAlt, FaPrint, FaRocket } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineColorLens } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosBusiness } from "react-icons/io";
import styles from "./Confirmation.module.css";
import { Link } from "@/i18n/navigation";
import { usePrint } from "@/shared/hooks/usePrint";
import {
    formatUrgencyLabel,
    getUrgencyBadgeClass,
} from "./lib/helpers";
import type { ConfirmationProps } from "./types";

export function Confirmation({ booking }: ConfirmationProps) {
    const getUrgencyBadge = (urgency?: string) => {
        if (!urgency) return null;

        return (
            <span
                className={`${styles.urgencyBadge} ${styles[getUrgencyBadgeClass(urgency) ?? "urgencyMedium"]}`}
            >
                {formatUrgencyLabel(urgency)}
            </span>
        );
    };
    const { printRef, print } = usePrint();
    return (
        <section className={styles.reviewSection}>
            <div className="container">
                {/* Header */}
                <div className={styles.reviewHeader}>
                    <div className={styles.successIcon}>✓</div>
                    <h1 className={styles.title}>
                        Request Submitted Successfully!
                    </h1>
                    <p className={styles.subtitle}>
                        Thank you for your interest in Nasaq. Here&apos;s a
                        summary of your project request.
                    </p>
                </div>

                {/* Review Content */}
                <div className={styles.reviewContent} ref={printRef}>
                    {/* Business Information */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>
                                <IoIosBusiness />
                            </span>
                            Business Information
                        </h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Business Name
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.businessName}
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Industry
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.industry}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Website Requirements */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>
                                <IoGlobeOutline />
                            </span>
                            Website Requirements
                        </h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Website Purpose
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.websitePurpose}
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Target Audience
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.targetAudience}
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Existing Website
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.hasExistingWebsite
                                        ? `Yes - ${
                                              booking.existingWebsiteUrl ||
                                              "URL provided"
                                          }`
                                        : "No existing website"}
                                </div>
                            </div>
                        </div>

                        {booking.desiredFeatures.length > 0 && (
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Desired Features
                                </label>
                                <div className={styles.featuresList}>
                                    {booking.desiredFeatures.map(
                                        (feature: string, index: number) => (
                                            <span
                                                key={index}
                                                className={styles.featureTag}
                                            >
                                                {feature}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Design Preferences */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>
                                <MdOutlineColorLens />
                            </span>
                            Design Preferences
                        </h2>
                        <div className={styles.fieldGrid}>
                            {booking.colorPreferences && (
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>
                                        Color Preferences
                                    </label>
                                    <div className={styles.fieldValue}>
                                        {booking.colorPreferences}
                                    </div>
                                </div>
                            )}
                            {booking.exampleWebsites && (
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>
                                        Example Websites
                                    </label>
                                    <div className={styles.fieldValue}>
                                        {booking.exampleWebsites}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline & Budget */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>
                                <LuAlarmClock />
                            </span>
                            Timeline & Budget
                        </h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Preferred Timeline
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.timeline}
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Budget Range
                                </label>
                                <div className={styles.budgetValue}>
                                    {booking.budgetRange}
                                </div>
                            </div>
                            {booking.projectUrgency && (
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>
                                        Project Urgency
                                    </label>
                                    <div className={styles.fieldValue}>
                                        {getUrgencyBadge(
                                            booking.projectUrgency,
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>
                                <FaPhoneAlt />
                            </span>
                            Contact Information
                        </h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Contact Person
                                </label>
                                <div className={styles.fieldValue}>
                                    {booking.contactName}
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Email Address
                                </label>
                                <div className={styles.contactValue}>
                                    <a href={`mailto:${booking.contactEmail}`}>
                                        {booking.contactEmail}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Phone Number
                                </label>
                                <div className={styles.contactValue}>
                                    <a href={`tel:${booking.contactPhone}`}>
                                        {booking.contactPhone}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Preferred Contact Method
                                </label>
                                <div className={styles.contactMethod}>
                                    {booking.contactMethod}
                                </div>
                            </div>
                        </div>

                        {booking.additionalNotes && (
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>
                                    Additional Notes
                                </label>
                                <div className={styles.notesValue}>
                                    {booking.additionalNotes}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Next Steps */}
                    <div className={styles.nextSteps}>
                        <h3 className={styles.nextStepsTitle}>
                            What Happens Next?
                        </h3>
                        <div className={styles.stepsList}>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>1</span>
                                <div className={styles.stepContent}>
                                    <strong>Review Process</strong>
                                    <p>
                                        Our team will review your request within
                                        24 hours
                                    </p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>2</span>
                                <div className={styles.stepContent}>
                                    <strong>Initial Contact</strong>
                                    <p>
                                        We&apos;ll contact you via your
                                        preferred method to discuss details
                                    </p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>3</span>
                                <div className={styles.stepContent}>
                                    <strong>Proposal & Quote</strong>
                                    <p>
                                        You&apos;ll receive a detailed proposal
                                        and quotation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button
                        onClick={print}
                        className={styles.printButton}
                    >
                        <FaPrint /> Print Summary
                    </button>

                    <Link href={"/get-started"} className={styles.newButton}>
                        <FaRocket /> Start New Project
                    </Link>
                    <Link href={"/"} className={styles.homeButton}>
                        <FaHome /> Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
