import { EMAIL, PHONE_NUMBER } from "@/shared/lib/constants";
import { type Locale, localizedPageUrl, siteOrigin } from "@/shared/lib/seo/urls";

export function professionalServiceSchema(
    locale: Locale,
): Record<string, unknown> {
    const origin = siteOrigin();

    return {
        "@context": "https://schema.org",
        "@id": `${origin}/#professional-service`,
        "@type": "ProfessionalService",
        name: "Nasaq",
        url: localizedPageUrl(locale),
        image: `${origin}/og/home.png`,
        telephone: `+2${PHONE_NUMBER}`,
        email: EMAIL,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cairo",
            addressCountry: "EG",
        },
        areaServed: {
            "@type": "Country",
            name: "Egypt",
        },
        priceRange: "$$",
        description:
            "Website development, mobile applications, SEO optimization, and digital solutions for businesses in Egypt.",
    };
}
