import HomePage, { generateMetadata } from "@/features/home";
import {
    breadcrumbSchema,
    JsonLd,
    organizationSchema,
    professionalServiceSchema,
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
    const t = await getTranslations({ locale, namespace: "Meta.home" });

    return (
        <>
            <JsonLd
                data={[
                    organizationSchema(),
                    webSiteSchema(typedLocale),
                    professionalServiceSchema(typedLocale),
                    webPageSchema({
                        locale: typedLocale,
                        name: t("title"),
                    }),
                    breadcrumbSchema({
                        locale: typedLocale,
                        items: [{ name: "Home" }],
                    }),
                ]}
            />
            <HomePage />
        </>
    );
}
