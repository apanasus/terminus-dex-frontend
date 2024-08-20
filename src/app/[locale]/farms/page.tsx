import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("FarmsPage.title"),
    description: t("FarmsPage.description"),
  };
}

type FarmsPageProps = {
  params: {
    locale: string;
  };
};

const FarmsPage = ({ params: { locale } }: FarmsPageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default FarmsPage;
