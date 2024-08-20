import BackgroundNoise from "@/components/common/background/BackgroundNoise";
import HidableMessage from "@/components/common/hidableMessage/HidableMessage";
import TonConnectProvider from "@/components/tonConnect/TonConnectProvider";
import { languages, locales } from "@/config";
import { ReduxProvider } from "@/redux/provider";
import { ResolvingMetadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { Suspense } from "react";
import Footer from "../../components/ui/footer/Footer";
import Header from "../../components/ui/header/Header";

const videoFont = localFont({
  src: [
    {
      path: "../../assets/fonts/video/Video-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/video/Video-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/video/Video-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/video/Video-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/video/Video-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale }));
}

export type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: RouteProps, parent: ResolvingMetadata) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: {
      template: `${t("LocaleLayout.title")} | %s`,
      default: t("LocaleLayout.title"),
    },
    description: t("LocaleLayout.description"),
    alternates: {
      canonical: `${process.env["HOST"]}`,
      languages,
    },
  };
}

export type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  unstable_setRequestLocale(params.locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <TonConnectProvider>
        <html lang={params.locale}>
          <body className={`${videoFont.className} overflow-x-hidden`}>
            <ReduxProvider>
              <div className="main-container">
                <Suspense>
                  <Header />
                  <HidableMessage text="Working on Testnet for now!" />
                  <div className="flex w-full grow flex-col items-center justify-center transition-opacity">
                    {children}
                  </div>
                  <Footer />
                </Suspense>
              </div>
              <BackgroundNoise />
            </ReduxProvider>
          </body>
        </html>
      </TonConnectProvider>
    </NextIntlClientProvider>
  );
}
