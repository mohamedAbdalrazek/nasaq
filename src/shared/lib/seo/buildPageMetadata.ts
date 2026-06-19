import { BASE_URL } from "@/shared/lib/constants";
import type { Metadata } from "next";
import { localizedPageUrl, type Locale } from "./urls";

type BuildPageMetadataOptions = {
  locale: Locale;
  pathAfterLocale: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogAlt: string;
  ogImagePath?: string;
  twitterTitle: string;
  twitterDescription: string;
  robots?: Metadata["robots"];
};

export function buildPageMetadata(options: BuildPageMetadataOptions): Metadata {
  const {
    locale,
    pathAfterLocale,
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogAlt,
    ogImagePath = "/og/home.png",
    twitterTitle,
    twitterDescription,
    robots,
  } = options;

  const canonical = localizedPageUrl(locale, pathAfterLocale);
  const ogImage = `${BASE_URL}${ogImagePath}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "Nasaq",
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [ogImage],
    },
    alternates: {
      canonical,
      languages: {
        "en-US": localizedPageUrl("en", pathAfterLocale),
        "ar-EG": localizedPageUrl("ar", pathAfterLocale),
        "x-default": localizedPageUrl("en", pathAfterLocale),
      },
    },
    ...(robots ? { robots } : {}),
  };
}
