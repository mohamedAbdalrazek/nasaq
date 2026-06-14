import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/shared/lib/constants";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta.apply" });

    return {
        title: t("title", {
            default: "Apply | Request a Website or App with Nasaq",
        }),
        description: t("description", {
            default:
                "Fill out Nasaq's application form to request a website, mobile app, or digital solution tailored to your business. Share your goals, timeline, and budget to start your project today.",
        }),
        keywords: t("keywords", {
            default:
                "apply to Nasaq, request website Egypt, website development form, app development Egypt, digital services application, business website request, custom website Egypt, project consultation",
        })
            .split(",")
            .map((kw: string) => kw.trim()),
        openGraph: {
            title: t("ogTitle", {
                default: "Apply to Nasaq – Start Your Digital Project",
            }),
            description: t("ogDescription", {
                default:
                    "Submit your application to Nasaq and request professional websites, mobile apps, or custom digital platforms designed to grow your business.",
            }),
            url: `${BASE_URL}/get-started`,
            siteName: "Nasaq",
            type: "website",
            images: [
                {
                    url: `${BASE_URL}/og/home.png`,
                    width: 1200,
                    height: 630,
                    alt: t("ogAlt", {
                        default: "Apply for digital services at Nasaq",
                    }),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("twitterTitle", {
                default: "Apply | Nasaq Digital Services",
            }),
            description: t("twitterDescription", {
                default:
                    "Fill out Nasaq's application form to request websites, apps, and digital solutions that match your business needs.",
            }),
            images: [`${BASE_URL}/og/home.png`],
        },
        alternates: {
            canonical: `${BASE_URL}/get-started`,
            languages: {
                en: `${BASE_URL}/en/get-started`,
                ar: `${BASE_URL}/ar/get-started`,
            },
        },
    };
}
