import AddLiquidityForm from "@/components/liquidity/addLiquidityForm/AddLiquidityForm";
import ComplianceMessage from "@/components/ui/complianceMessage/ComplianceMessage";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { RouteProps } from "../../layout";

// === === === === === === ===

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("ProvideLiquidityPage.title"),
    description: t("ProvideLiquidityPage.description"),
  };
}

// === === === === === === ===

type ProvideLiquidityPageProps = {
  params: {
    locale: string;
  };
};

// === === === === === === ===

const ProvideLiquidityPage = ({ params: { locale } }: ProvideLiquidityPageProps) => {
  unstable_setRequestLocale(locale);

  // === === === === === === ===

  return (
    <div className="my-12 flex w-full grow flex-col items-center justify-start self-start justify-self-start">
      <div className="flex w-full max-w-[636px] flex-col items-center justify-start gap-8">
        <Suspense>
          <AddLiquidityForm />
          <ComplianceMessage />
        </Suspense>
      </div>
    </div>
  );
};

// === === === === === === ===

export default ProvideLiquidityPage;

// === === === === === === ===
