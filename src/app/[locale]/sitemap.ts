import { BASE_URL } from "@/shared/lib/constants";
import { MetadataRoute } from "next";



export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/en/`, lastModified: new Date() },
        { url: `${BASE_URL}/en/get-started`, lastModified: new Date() },

        // Arabic routes if applicable
        { url: `${BASE_URL}/ar`, lastModified: new Date() },
        { url: `${BASE_URL}/ar/get-started`, lastModified: new Date() },
    ];

    return staticRoutes;
}
