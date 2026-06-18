"use client";

import { useEffect, useRef } from "react";
import styles from "./HomePage.module.css";
import { About, Landing, Portfolio, Process, Services } from "..";

export default function HomePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
        }> = [];

        const particaleCount = Math.floor(window.innerWidth / 9);
        for (let i = 0; i < particaleCount; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 0.7;
            const speedY = (Math.random() - 0.5) * 0.5;
            const colors = [
                "rgba(80, 161, 210, .5)",
                "rgba(171, 159, 252, .5)",
                "rgba(76, 175, 80, 0.5)",
                "rgba(255, 152, 0, 0.3)",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particles.push({ x, y, size, speedX, speedY, color });
        }

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.fillStyle = "rgba(18, 18, 18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x;
                    const dy = particle.y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(80, 161, 210, ${
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
            <canvas
                ref={canvasRef}
                aria-hidden
                className={styles.backgroundCanvas}
            ></canvas>
            <Landing />
            <Portfolio />
            <Services />
            <Process />
            <About />
        </>
    );
}
