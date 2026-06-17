import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/shared/lib/constants";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta.home" });

    return {
        title: t("title", {
            default: "Nasaq | Websites & Applications in Egypt",
        }),
        description: t("description", {
            default:
                "Nasaq pioneers Egypt's digital transformation by building professional websites, scalable applications, and innovative platforms to empower businesses in the modern economy.",
        }),
        keywords: t("keywords", {
            default:
                "Nasaq, Egypt websites, website development, mobile apps, digital transformation, Next.js, React, TypeScript, SEO, web applications, Egypt tech company",
        })
            .split(",")
            .map((kw: string) => kw.trim()),
        openGraph: {
            title: t("ogTitle", {
                default: "Nasaq – Pioneering Egypt's Digital Transformation",
            }),
            description: t("ogDescription", {
                default:
                    "We empower businesses in Egypt with professional websites, mobile apps, and scalable online platforms. Nasaq makes digital transformation simple, accessible, and impactful.",
            }),
            url: `${BASE_URL}`,
            siteName: "Nasaq",
            type: "website",
            images: [
                {
                    url: `${BASE_URL}/og/home.png`,
                    width: 1200,
                    height: 630,
                    alt: t("ogAlt", {
                        default: "Nasaq digital company in Egypt",
                    }),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("twitterTitle", {
                default: "Nasaq | Web & App Development in Egypt",
            }),
            description: t("twitterDescription", {
                default:
                    "Building websites and apps that help Egyptian businesses thrive in the digital era. Explore how Nasaq transforms ideas into powerful online experiences.",
            }),
            images: [`${BASE_URL}/og/home.png`],
        },
        alternates: {
            canonical: `${BASE_URL}/`,
            languages: {
                en: `${BASE_URL}/en`,
                ar: `${BASE_URL}/ar`,
            },
        },
    };
}
