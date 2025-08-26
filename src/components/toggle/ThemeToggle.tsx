// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Check if there's a saved theme preference
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            // Default to dark theme
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <span>☀️</span> // Sun icon for light mode
            ) : (
                <span>🌙</span> // Moon icon for dark mode
            )}
        </button>
    );
}
