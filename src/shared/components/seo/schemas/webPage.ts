import {
  type Locale,
  localeToInLanguage,
  localizedPageUrl,
  siteOrigin,
} from "@/shared/lib/seo/urls";

type WebPageSchemaOptions = {
  locale: Locale;
  name: string;
  pathAfterLocale?: string;
  datePublished?: string;
  dateModified?: string;
};

type BreadcrumbItem = {
  name: string;
  pathAfterLocale?: string;
};

type BreadcrumbSchemaOptions = {
  locale: Locale;
  items: ReadonlyArray<BreadcrumbItem>;
};

export function webPageSchema(
  options: WebPageSchemaOptions,
): Record<string, unknown> {
  const {
    locale,
    name,
    pathAfterLocale = "",
    datePublished,
    dateModified,
  } = options;
  const pageUrl = localizedPageUrl(locale, pathAfterLocale);
  const origin = siteOrigin();
  const webSiteId = `${origin}/${locale}/#website`;

  return {
    "@context": "https://schema.org",
    "@id": `${pageUrl}/#webpage`,
    "@type": "WebPage",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: localeToInLanguage(locale),
    isPartOf: {
      "@id": webSiteId,
      "@type": "WebSite",
    },
    name,
    url: pageUrl,
  };
}

export function breadcrumbSchema(
  options: BreadcrumbSchemaOptions,
): Record<string, unknown> {
  const { items, locale } = options;
  if (items.length === 0) {
    throw new Error(
      "breadcrumbSchema: `items` must contain at least one entry",
    );
  }

  const last = items[items.length - 1];
  const breadcrumbOwnerUrl = localizedPageUrl(locale, last?.pathAfterLocale);

  return {
    "@context": "https://schema.org",
    "@id": `${breadcrumbOwnerUrl}/#breadcrumb`,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: localizedPageUrl(locale, item.pathAfterLocale),
      name: item.name,
      position: index + 1,
    })),
  };
}
