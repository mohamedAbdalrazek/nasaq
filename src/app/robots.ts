import { BASE_URL } from "@/shared/lib/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/en/confirmation/", "/ar/confirmation/"],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
