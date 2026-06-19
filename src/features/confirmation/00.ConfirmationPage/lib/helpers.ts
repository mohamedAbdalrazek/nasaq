import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/shared/lib/seo/buildPageMetadata";
import type { Locale } from "@/shared/lib/seo/urls";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.confirmation" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "confirmation",
    title: t("title", { default: "Request Submitted | Nasaq" }),
    description: t("description", {
      default:
        "Your project request has been submitted to Nasaq. Review your submission details on this confirmation page.",
    }),
    keywords: [],
    ogTitle: t("title", { default: "Request Submitted | Nasaq" }),
    ogDescription: t("description", {
      default:
        "Your project request has been submitted to Nasaq. Review your submission details on this confirmation page.",
    }),
    ogAlt: t("ogAlt", { default: "Nasaq project request confirmation" }),
    twitterTitle: t("title", { default: "Request Submitted | Nasaq" }),
    twitterDescription: t("description", {
      default:
        "Your project request has been submitted to Nasaq. Review your submission details on this confirmation page.",
    }),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  });
}
