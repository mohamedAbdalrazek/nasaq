"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Confirmation.module.css";
import { FormData } from "@/lib/types";
import { useRouter } from "@/i18n/navigation";
import { FaHome, FaPhoneAlt, FaPrint, FaRocket } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineColorLens } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosBusiness } from "react-icons/io";
import { EMAIL, PHONE_NUMBER } from "@/lib/constants";
import LoadingPage from "@/components/loading/Loading";
export default function Page() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<FormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!id) return;

        const fetchBooking = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/booking/get?bookingId=${id}`);

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    throw new Error(
                        errorData?.error || "Failed to fetch booking",
                    );
                }

                const data = await res.json();
                setBooking(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) return <LoadingPage size="large" />;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!booking) return <p>No booking found.</p>;

    const handlePrint = () => {
        if (!printRef.current) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
      <html>
        <head>
          <title>Website Project Request - ${booking.businessName}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background: white;
              color: #222222;
            }
            .printHeader { 
              text-align: center; 
              margin-bottom: 30px;
              border-bottom: 3px solid #6b4eff;
              padding-bottom: 20px;
            }
            .printSection { 
              margin-bottom: 25px;
              break-inside: avoid;
            }
            .printSectionTitle { 
              color: #6b4eff;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 8px;
              margin-bottom: 15px;
              font-size: 18px;
            }
            .printFieldGroup { 
              margin-bottom: 12px;
            }
            .printFieldLabel { 
              font-weight: 600;
              color: #333;
              margin-bottom: 4px;
            }
            .printFieldValue { 
              color: #666;
              padding-left: 15px;
            }
            .printFeatures { 
              list-style: none;
              padding: 0;
            }
            .printFeature { 
              background: #f5f5f5;
              padding: 6px 12px;
              margin: 4px;
              border-radius: 4px;
              display: inline-block;
            }
            .printFooter { 
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #999;
              font-size: 14px;
            }
            @media print {
              body { margin: 1cm; }
              .printSection { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="printHeader">
            <h1 style="color: #6b4eff; margin: 0 0 10px 0;">Nasaq Digital Solutions</h1>
            <h2 style="color: #333; margin: 0 0 5px 0;">Website Project Request Confirmation</h2>
            <p style="color: #666; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          ${printRef.current.innerHTML}
          <div class="printFooter">
            <p>Thank you for choosing Nasaq for your digital transformation journey.</p>
            <p><strong>Contact:</strong> ${EMAIL} | +2${PHONE_NUMBER} | Cairo, Egypt</p>
            <p>This proposal is valid for 30 days from the date of generation.</p>
          </div>
        </body>
      </html>
    `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const getUrgencyBadge = (urgency?: string) => {
        if (!urgency) return null;

        const urgencyClass =
            {
                urgent: styles.urgencyHigh,
                moderate: styles.urgencyMedium,
                planning: styles.urgencyLow,
            }[urgency] || styles.urgencyMedium;

        return (
            <span className={`${styles.urgencyBadge} ${urgencyClass}`}>
                {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            </span>
        );
    };

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
                        onClick={handlePrint}
                        className={styles.printButton}
                    >
                        <FaPrint /> Print Summary
                    </button>

                    <button
                        onClick={() => router.push("/get-started")}
                        className={styles.newButton}
                    >
                        <FaRocket /> Start New Project
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className={styles.homeButton}
                    >
                        <FaHome /> Back to Home
                    </button>
                </div>
            </div>
        </section>
    );
}
