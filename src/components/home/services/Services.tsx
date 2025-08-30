// components/ServicesSection.tsx
import { MdDesignServices, MdDevices, MdSpaceDashboard } from "react-icons/md";
import styles from "./Services.module.css";
import { FaBolt, FaChartLine, FaUniversalAccess } from "react-icons/fa";
import { JSX } from "react";
interface ServiceMap {
    title: string;
    description: string;
    features: string[];
    icon: JSX.Element;
}

const ServicesSection = () => {
    const services:ServiceMap[] = [
        {
            title: "Modern Website Design & Development",
            description:
                "Clean, responsive designs that look great on all devices",
            features: [
                "Focus on usability and accessibility for all users",
                "Tailored to your brand and industry",
            ],
            icon: <MdDesignServices className={styles.icon} />,
        },
        {
            title: "Responsive Web Design",
            description: "Websites that adapt seamlessly to all devices",
            features: [
                "Mobile-first layouts for better user experience",
                "Consistent design across desktops, tablets, and phones",
            ],
            icon: <MdDevices className={styles.icon} />,
        },
        {
            title: "SEO-Friendly Websites",
            description: "Built with SEO best practices from the start",
            features: [
                "Optimized site structure, meta tags, and speed",
                "Helps you rank higher and attract more customers",
            ],
            icon: <FaChartLine className={styles.icon} />,
        },
        {
            title: "Fast & Optimized Performance",
            description: "Lightweight code and optimized assets",
            features: [
                "Websites that load quickly even on slow networks",
                "Better user experience = higher conversions",
            ],
            icon: <FaBolt className={styles.icon} />,
        },
        {
            title: "Intuitive Dashboards & Management Tools",
            description: "Easy-to-use dashboards for content updates",
            features: [
                "Efficient back-end systems to save your team time",
                "No need for technical skills to manage your site",
            ],
            icon: <MdSpaceDashboard className={styles.icon} />,
        },
        {
            title: "UX & Accessibility Excellence",
            description: "Clear navigation and smooth user journeys",
            features: [
                "Accessible for everyone, including people with disabilities",
                "Professional layouts designed to keep visitors engaged",
            ],
            icon: <FaUniversalAccess className={styles.icon} />,
        },
    ];

    return (
        <section className={styles.services} id="services">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Our <span className="text-gradient">Services</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Comprehensive digital solutions tailored to your
                        business needs
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                {service.icon}
                            </div>
                            <h3 className={styles.serviceTitle}>
                                {service.title}
                            </h3>
                            <p className={styles.serviceDescription}>
                                {service.description}
                            </p>
                            <ul className={styles.serviceFeatures}>
                                {service.features.map(
                                    (feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
