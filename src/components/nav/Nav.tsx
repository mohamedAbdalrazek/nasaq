// components/Navigation.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./Nav.module.css";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const Navigation = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname()
    const language = useLocale();
    const t = useTranslations("Nav");
    const navItems = useMemo(
        () => [
            { id: "home" },
            { id: "portfolio" },
            { id: "services" },
            { id: "process" },
            { id: "about" },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => {
            // Check scroll position for navbar style
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map((item) =>
                document.getElementById(item.id)
            );
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section) => {
                if (section) {
                    const offsetTop = section.offsetTop;
                    const offsetHeight = section.offsetHeight;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        >
            <div className={`container ${styles.navContainer}`}>
                {/* Logo */}
                <Link
                    className={styles.logo}
                    onClick={() => scrollToSection("home")}
                    href={"/"}
                >
                    {language === "en" ? (
                        <span className={styles.logoText}>Nasaq</span>
                    ) : (
                        <Image
                            alt="Nasaq for digital solutions"
                            width={50}
                            height={50}
                            src={"/logo-white-transparent.png"}
                        />
                    )}
                </Link>

                {/* Desktop Navigation */}
                {pathname==="/" && <div className={styles.navItems}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`${styles.navLink} ${
                                activeSection === item.id ? styles.active : ""
                            }`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <span className={styles.linkText}>
                                {t(item.id)}
                            </span>
                            <span className={styles.linkHover}></span>
                        </button>
                    ))}
                </div>}

                {/* Right side controls */}
                <div className={styles.navControls}>
                    {/* Language switcher */}
                    <button className={styles.languageSwitch}>
                        <Link
                            className={
                                language === "en" ? styles.activeLang : ""
                            }
                            href={pathname}
                            locale="en"
                        >
                            English
                        </Link>
                        <span className={styles.langDivider}>/</span>
                        <Link
                            className={
                                language === "ar" ? styles.activeLang : ""
                            }
                            href={pathname}
                            locale="ar"
                        >
                            عربي
                        </Link>
                    </button>

                    {/* Mobile menu button */}
                    <button
                        className={`${styles.menuToggle} ${
                            isMenuOpen ? styles.open : ""
                        }`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`${styles.mobileMenu} ${
                        isMenuOpen ? styles.open : ""
                    }`}
                >
                    <div className={styles.mobileNavItems}>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles.mobileNavLink} ${
                                    activeSection === item.id
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {t(item.id)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active indicator line */}
            <div
                className={`${styles.activeIndicator} ${
                    language === "ar" ? styles.arActiveIndicator : ""
                }`}
                style={{
                    width: `${pathname === "/"?100 / navItems.length:100}%`,
                    transform: `translateX(${language === "ar" ? "-" : ""}${
                        navItems.findIndex(
                            (item) => item.id === activeSection
                        ) * 100
                    }%)`,
                }}
            ></div>
        </nav>
    );
};

export default Navigation;
