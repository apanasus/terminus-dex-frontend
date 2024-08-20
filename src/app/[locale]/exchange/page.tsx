import ComplianceMessage from "@/components/ui/complianceMessage/ComplianceMessage";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SwapForm from "@/components/exchange/swapForm/SwapForm";
import { RouteProps } from "../layout";
import { Suspense } from "react";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("ExchangePage.title"),
    description: t("ExchangePage.description"),
  };
}

type SwapPageProps = {
  params: {
    locale: string;
  };
};

const SwapPage = ({ params: { locale } }: SwapPageProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="my-12 flex w-full grow flex-col items-center justify-start self-start justify-self-start">
      <div className="flex w-full max-w-[636px] flex-col items-center justify-start gap-8">
        <Suspense>
          <SwapForm />
          <ComplianceMessage />
        </Suspense>
      </div>
    </div>
  );
};

export default SwapPage;
