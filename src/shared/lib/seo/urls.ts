import { BASE_URL } from "@/shared/lib/constants";

export type Locale = "en" | "ar";

export function siteOrigin(): string {
    return BASE_URL;
}

export function localizedPageUrl(
    locale: Locale,
    pathAfterLocale = "",
): string {
    const suffix = pathAfterLocale ? `/${pathAfterLocale}` : "";
    return `${BASE_URL}/${locale}${suffix}`;
}

export function localeToInLanguage(locale: Locale): string {
    return locale === "ar" ? "ar-EG" : "en-US";
}
