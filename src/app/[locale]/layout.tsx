import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/shared/components/layout";
import { BASE_URL, GTM_ID } from "@/shared/lib/constants";
import { Toaster } from "react-hot-toast";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Nasaq",
  appleWebApp: {
    title: "Nasaq",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={tajawal.variable}
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <NextIntlClientProvider>
          <a className="skip-to-main" href="#main-content">
            {t("skipToMainContent")}
          </a>
          <header>
            <Nav />
          </header>
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
