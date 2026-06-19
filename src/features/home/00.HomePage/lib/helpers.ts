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
  const t = await getTranslations({ locale, namespace: "Meta.home" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "",
    title: t("title", {
      default: "Nasaq | Websites & Applications in Egypt",
    }),
    description: t("description", {
      default:
        "Nasaq builds professional websites, scalable apps, and innovative platforms to empower Egyptian businesses in the modern economy.",
    }),
    keywords: t("keywords", {
      default:
        "Nasaq, Egypt websites, website development, mobile apps, digital transformation, Next.js, React, TypeScript, SEO, web applications, Egypt tech company",
    })
      .split(",")
      .map((kw: string) => kw.trim()),
    ogTitle: t("ogTitle", {
      default: "Nasaq – Pioneering Egypt's Digital Transformation",
    }),
    ogDescription: t("ogDescription", {
      default:
        "We empower businesses in Egypt with professional websites, mobile apps, and scalable online platforms. Nasaq makes digital transformation simple, accessible, and impactful.",
    }),
    ogAlt: t("ogAlt", {
      default: "Nasaq digital company in Egypt",
    }),
    twitterTitle: t("twitterTitle", {
      default: "Nasaq | Web & App Development in Egypt",
    }),
    twitterDescription: t("twitterDescription", {
      default:
        "Building websites and apps that help Egyptian businesses thrive in the digital era. Explore how Nasaq transforms ideas into powerful online experiences.",
    }),
  });
}
