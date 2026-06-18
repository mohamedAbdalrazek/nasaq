import { EMAIL } from "@/shared/lib/constants";
import { siteOrigin } from "@/shared/lib/seo/urls";

export function organizationSchema(): Record<string, unknown> {
    const origin = siteOrigin();

    return {
        "@context": "https://schema.org",
        "@id": `${origin}/#organization`,
        "@type": "Organization",
        name: "Nasaq",
        url: origin,
        logo: `${origin}/web-app-manifest-192x192.png`,
        email: EMAIL,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cairo",
            addressCountry: "EG",
        },
        description:
            "Nasaq is a web development agency in Egypt specializing in modern websites, mobile applications, and digital solutions.",
    };
}
