import {
  type Locale,
  localizedPageUrl,
  siteOrigin,
} from "@/shared/lib/seo/urls";

export function webSiteSchema(locale: Locale): Record<string, unknown> {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@id": `${origin}/${locale}/#website`,
    "@type": "WebSite",
    name: "Nasaq",
    url: localizedPageUrl(locale),
  };
}
