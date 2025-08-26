// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle system for background
        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
        }> = [];

        // Create particles
        for (let i = 0; i < 150; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 0.7;
            const speedY = (Math.random() - 0.5) * 0.5;
            const colors = [
                "rgba(107, 78, 255, 0.5)",
                "rgba(142, 125, 255, 0.5)",
                "rgba(76, 175, 80, 0.3)",
                "rgba(255, 152, 0, 0.3)",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particles.push({ x, y, size, speedX, speedY, color });
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.fillStyle = "rgba(18, 18, 18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Draw connections between nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x;
                    const dy = particle.y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(107, 78, 255, ${
                            1 - distance / 100
                        })`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <>
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className={styles.backgroundCanvas}
            ></canvas>

            {/* Navigation */}
            <nav className={styles.nav}>
                <div className={`container ${styles.navContainer}`}>
                    <div className={styles.logo}>
                        <Image alt="Nasaq for digital solutions" width={100} height={100} src={"/logo-white-transparent.png"} className={styles.logo} />
                    </div>
                    <div className={styles.navLinks}>
                        <Link href="/services">Services</Link>
                        <Link href="/portfolio">Work</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={`container ${styles.heroContainer}`}>
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span>Innovating Digital Experiences</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            We Craft{" "}
                            <span className={styles.highlight}>
                                Digital Solutions
                            </span>{" "}
                            That Drive Your Business Forward
                        </h1>
                        <p className={styles.heroDescription}>
                            Nasaq specializes in creating cutting-edge websites
                            and applications that combine elegant design with
                            powerful functionality. Let us transform your vision
                            into reality.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link
                                href="/portfolio"
                                className={`btn btn-primary ${styles.heroBtn}`}
                            >
                                Explore Our Work
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="/contact"
                                className={`btn btn-secondary ${styles.heroBtn}`}
                            >
                                Start a Project
                            </Link>
                        </div>
                    </div>
                    {/* <div className={styles.heroVisual}>
                        <div className={styles.cube}>
                            <div className={styles.cubeFace}></div>
                            <div className={styles.cubeFace}></div>
                            <div className={styles.cubeFace}></div>
                            <div className={styles.cubeFace}></div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Stats Section
            <section className={styles.stats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber} data-count="150">
                                0
                            </div>
                            <div className={styles.statLabel}>
                                Projects Completed
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber} data-count="95">
                                0
                            </div>
                            <div className={styles.statLabel}>
                                Happy Clients
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber} data-count="12">
                                0
                            </div>
                            <div className={styles.statLabel}>Awards Won</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber} data-count="7">
                                0
                            </div>
                            <div className={styles.statLabel}>
                                Years Experience
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Services Section */}
            {/* <section className={styles.services}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Our <span className="text-gradient">Services</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            We offer comprehensive digital solutions to help
                            your business thrive
                        </p>
                    </div>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <div className={styles.iconWrapper}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M12 6V3"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M12 21V18"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M21 12H18"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M6 12H3"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3>Web Development</h3>
                            <p>
                                Custom websites built with modern frameworks
                                like Next.js, optimized for performance and SEO.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Responsive Design</li>
                                <li>E-commerce Solutions</li>
                                <li>CMS Integration</li>
                            </ul>
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <div className={styles.iconWrapper}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M12 9V12"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M12 12H15"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3>Mobile Applications</h3>
                            <p>
                                Native and cross-platform mobile apps that
                                deliver exceptional user experiences.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>iOS & Android Development</li>
                                <li>React Native</li>
                                <li>App Store Optimization</li>
                            </ul>
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>
                                <div className={styles.iconWrapper}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14 5H21"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M14 8H19"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V9C20 8.46957 19.7893 7.96086 19.4142 7.58579C19.0391 7.21071 18.5304 7 18 7H10L6 3C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5Z"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3>UI/UX Design</h3>
                            <p>
                                User-centered designs that combine aesthetics
                                with functionality for optimal engagement.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>User Research</li>
                                <li>Wireframing & Prototyping</li>
                                <li>Design Systems</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Transform Your Digital Presence?</h2>
                        <p>
                            Let&apos;s collaborate to create something extraordinary
                            for your business.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
