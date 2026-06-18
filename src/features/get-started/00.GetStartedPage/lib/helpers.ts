import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/shared/lib/seo/buildPageMetadata";
import type { Locale } from "@/shared/lib/seo/urls";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta.apply" });

    return buildPageMetadata({
        locale: locale as Locale,
        pathAfterLocale: "get-started",
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
        ogTitle: t("ogTitle", {
            default: "Apply to Nasaq – Start Your Digital Project",
        }),
        ogDescription: t("ogDescription", {
            default:
                "Submit your application to Nasaq and request professional websites, mobile apps, or custom digital platforms designed to grow your business.",
        }),
        ogAlt: t("ogAlt", {
            default: "Apply for digital services at Nasaq",
        }),
        twitterTitle: t("twitterTitle", {
            default: "Apply | Nasaq Digital Services",
        }),
        twitterDescription: t("twitterDescription", {
            default:
                "Fill out Nasaq's application form to request websites, apps, and digital solutions that match your business needs.",
        }),
    });
}
