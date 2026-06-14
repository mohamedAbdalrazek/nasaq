import { hasLocale, NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/shared/components/layout";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["200", "300", "400", "500", "700", "800", "900"],
    variable: "--font-tajawal",
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={tajawal.variable}
        >
            <Head>
                <meta name="apple-mobile-web-app-title" content="Nasaq" />
            </Head>
            <body>
                <NextIntlClientProvider>
                    <Nav />
                    {children}
                    <Footer />
                    <Toaster position="top-center" reverseOrder={false} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
