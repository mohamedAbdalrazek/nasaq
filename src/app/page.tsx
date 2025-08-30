// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Home.module.css";
import Image from "next/image";
import ServicesSection from "@/components/home/services/Services";
import ProcessSection from "@/components/home/process/Process";
import AboutSection from "@/components/home/about/About";

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
                        <Image
                            alt="Nasaq for digital solutions"
                            width={100}
                            height={100}
                            src={"/logo-white-transparent.png"}
                            className={styles.logo}
                        />
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
                </div>
            </section>
            <section className={styles.portfolio}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Our <span className="text-gradient">Work</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            A selection of projects we’ve crafted with modern design, speed, and usability in mind.
                        </p>
                    </div>
                    <div className={styles.portfolioGrid}>
                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <Image
                                    fill
                                    src={"/projects/hawya.png"}
                                    alt="Hawya Car Rental Website"
                                />

                                <div className={styles.overlay}>
                                    <Link
                                        href={"https://hawya-rental.com/"}
                                        className="btn btn-primary"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                            <h3>Hawya Car Rental</h3>
                            <p>
                                Modern online store with seamless checkout
                                experience
                            </p>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <Image
                                    fill
                                    src={"/projects/razan.png"}
                                    alt="Razan academy for quranic studies"
                                />

                                <div className={styles.overlay}>
                                    <Link
                                        href={"https://razan-academy.net/"}
                                        className="btn btn-primary"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                            <h3>Razan Academy</h3>
                            <p>
                                Mobile application for tracking workouts and
                                nutrition
                            </p>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <Image
                                    fill
                                    src={"/projects/clinic.png"}
                                    alt="Ent clinic"
                                />
                                <div className={styles.overlay}>
                                    <Link
                                        href={"http://clinicent.vercel.app/"}
                                        className="btn btn-primary"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                            <h3>ENT Clinic</h3>
                            <p>
                                Rebranding and website redesign for tech company
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ServicesSection />
            <ProcessSection />
            <AboutSection  />
        </>
    );
}
