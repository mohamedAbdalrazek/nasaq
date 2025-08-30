// components/AboutSection.tsx
import styles from "./About.module.css";

const AboutSection = () => {
    return (
        <section className={styles.about} id="about">
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                About{" "}
                                <span className="text-gradient">Nasaq</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Pioneering Egypt&apos;s Digital Transformation
                            </p>
                        </div>

                        <div className={styles.mission}>
                            <h3>Our Mission</h3>
                            <p>
                                At Nasaq, we&apos;re on a mission to transform
                                Egypt&apos;s business landscape by bringing every
                                business online. We believe that in today&apos;s
                                digital age, every company deserves a
                                professional web presence that connects them
                                with their customers 24/7.
                            </p>
                        </div>

                        <div className={styles.vision}>
                            <h3>Our Vision</h3>
                            <p>
                                We envision an Egypt where customers can access
                                all the information they need online,
                                eliminating the need for physical visits. Where
                                businesses thrive in the digital space, reaching
                                wider audiences and serving customers more
                                efficiently through modern web solutions.
                            </p>
                        </div>

                        <div className={styles.values}>
                            <h3>What We Stand For</h3>
                            <div className={styles.valuesGrid}>
                                <div className={styles.valueItem}>
                                    <div className={styles.valueIcon}>🚀</div>
                                    <h4>Modern Technology</h4>
                                    <p>
                                        Using cutting-edge frameworks like
                                        Next.js, React, and TypeScript to build
                                        fast, scalable websites
                                    </p>
                                </div>
                                <div className={styles.valueItem}>
                                    <div className={styles.valueIcon}>🔍</div>
                                    <h4>SEO Excellence</h4>
                                    <p>
                                        Building websites that rank well on
                                        search engines and attract organic
                                        traffic
                                    </p>
                                </div>
                                <div className={styles.valueItem}>
                                    <div className={styles.valueIcon}>📱</div>
                                    <h4>Mobile-First</h4>
                                    <p>
                                        Creating responsive designs that work
                                        perfectly on all devices and screen
                                        sizes
                                    </p>
                                </div>
                                <div className={styles.valueItem}>
                                    <div className={styles.valueIcon}>🎯</div>
                                    <h4>Audience Focused</h4>
                                    <p>
                                        Designing experiences tailored to your
                                        specific target audience and business
                                        goals
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cta}>
                            <h3>Join the Digital Revolution</h3>
                            <p>
                                Ready to transform your business and reach
                                customers online? Let&apos;s work together to create
                                a website that represents your brand and serves
                                your audience.
                            </p>
                            <button className="btn btn-primary">
                                Start Your Digital Journey
                            </button>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
