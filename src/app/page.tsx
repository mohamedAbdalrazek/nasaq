// app/page.tsx
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.animatedOrbs}>
                        <div className={styles.orb1}></div>
                        <div className={styles.orb2}></div>
                        <div className={styles.orb3}></div>
                    </div>
                </div>

                <div className={`container ${styles.heroContainer}`}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Transforming Ideas into{" "}
                            <span className="text-gradient">
                                Digital Excellence
                            </span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Nasaq creates stunning websites and applications
                            that help businesses thrive in the digital world. We
                            blend innovative design with cutting-edge technology
                            to deliver exceptional user experiences.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link href="/portfolio" className="btn btn-primary">
                                View Our Work
                            </Link>
                            <Link href="/contact" className="btn btn-secondary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <div className={styles.codeVisual}>
                            <div className={styles.codeLine}></div>
                            <div className={styles.codeLine}></div>
                            <div className={styles.codeLine}></div>
                            <div className={styles.codeLine}></div>
                            <div className={styles.codeLine}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className="container">
                    <h2 className={`text-center ${styles.sectionTitle}`}>
                        Our <span className="text-gradient">Services</span>
                    </h2>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2L2 7L12 12L22 7L12 2Z"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M2 17L12 22L22 17"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M2 12L12 17L22 12"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <h3>Web Development</h3>
                            <p>
                                Custom websites built with modern technologies
                                like Next.js, React, and TypeScript for optimal
                                performance.
                            </p>
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 17H7V7H17V17Z"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5Z"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M10 14H14"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <h3>Mobile Applications</h3>
                            <p>
                                Cross-platform mobile apps that provide seamless
                                experiences on iOS and Android devices.
                            </p>
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M3 12H7M17 12H21"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M12 3V7M12 17V21"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <h3>UI/UX Design</h3>
                            <p>
                                User-centered designs that combine aesthetics
                                with functionality to create engaging
                                experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className={styles.portfolio}>
                <div className="container">
                    <h2 className={`text-center ${styles.sectionTitle}`}>
                        Featured <span className="text-gradient">Work</span>
                    </h2>
                    <div className={styles.portfolioGrid}>
                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.overlay}>
                                    <button className="btn btn-primary">
                                        View Project
                                    </button>
                                </div>
                            </div>
                            <h3>E-Commerce Platform</h3>
                            <p>
                                Modern online store with seamless checkout
                                experience
                            </p>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.overlay}>
                                    <button className="btn btn-primary">
                                        View Project
                                    </button>
                                </div>
                            </div>
                            <h3>Health & Fitness App</h3>
                            <p>
                                Mobile application for tracking workouts and
                                nutrition
                            </p>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.overlay}>
                                    <button className="btn btn-primary">
                                        View Project
                                    </button>
                                </div>
                            </div>
                            <h3>Corporate Website</h3>
                            <p>
                                Rebranding and website redesign for tech company
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link href="/portfolio" className="btn btn-secondary">
                            See All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to bring your idea to life?</h2>
                        <p>
                            Let&apos;s discuss how we can help your business grow
                            with a custom digital solution.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Start a Project
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
