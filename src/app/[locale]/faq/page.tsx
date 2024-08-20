import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("FaqPage.title"),
    description: t("FaqPage.description"),
  };
}

type FaqPageProps = {
  params: {
    locale: string;
  };
};

const FaqPage = ({ params: { locale } }: FaqPageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default FaqPage;
