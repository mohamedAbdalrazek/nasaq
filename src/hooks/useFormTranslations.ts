import { useTranslations } from "next-intl";

export const useFormTranslations = () => {
    const t = useTranslations("Form")
    const industries = [
        t("industries.retail"),
        t("industries.restaurant"),
        t("industries.healthcare"),
        t("industries.education"),
        t("industries.services"),
        t("industries.realEstate"),
        t("industries.technology"),
        t("industries.creative"),
        t("industries.nonProfit"),
        t("industries.other"),
    ];

    const features = [
        t("features.contactForm"),
        t("features.booking"),
        t("features.ecommerce"),
        t("features.blog"),
        t("features.gallery"),
        t("features.accounts"),
        t("features.multiLanguage"),
        t("features.seo"),
        t("features.dashboard"),
    ];

    const budgetRanges = [
        t("budget.under300"),
        t("budget.300to500"),
        t("budget.500to1000"),
        t("budget.1000to2000"),
        t("budget.2000to3500"),
        t("budget.3500plus"),
    ];

    const timelines = [
        t("timelines.asap"),
        t("timelines.oneMonth"),
        t("timelines.twoThreeMonths"),
        t("timelines.flexible"),
        t("timelines.notSure"),
    ];
    return {industries, features, budgetRanges, timelines}
}