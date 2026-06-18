import GetStartedPage, { generateMetadata } from "@/features/get-started";
import {
    breadcrumbSchema,
    JsonLd,
    organizationSchema,
    webPageSchema,
    webSiteSchema,
} from "@/shared/components/seo";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/shared/lib/seo/urls";

export { generateMetadata };

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;
    const typedLocale = locale as Locale;
    const t = await getTranslations({ locale, namespace: "Meta.apply" });
    const nav = await getTranslations({ locale, namespace: "Nav" });

    return (
        <>
            <JsonLd
                data={[
                    organizationSchema(),
                    webSiteSchema(typedLocale),
                    webPageSchema({
                        locale: typedLocale,
                        name: t("title"),
                        pathAfterLocale: "get-started",
                    }),
                    breadcrumbSchema({
                        locale: typedLocale,
                        items: [
                            { name: nav("home") },
                            {
                                name: t("breadcrumb"),
                                pathAfterLocale: "get-started",
                            },
                        ],
                    }),
                ]}
            />
            <GetStartedPage />
        </>
    );
}
