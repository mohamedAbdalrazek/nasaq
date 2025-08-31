import { hasLocale, NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navigation from "@/components/nav/Nav";
type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
export const metadata = {
    title: "Nasaq - Modern Websites for Growing Businesses",
    description:
        "Nasaq is a web development agency specializing in creating modern, responsive websites that help businesses grow and succeed online. We focus on clean design, usability, and performance to deliver exceptional digital experiences.",

    icons: {
        icon: "/logo-white-transparent.png",
    },
};
export default async function RootLayout({children, params}: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <body>
                <NextIntlClientProvider>
                    <Navigation />
                    {children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
