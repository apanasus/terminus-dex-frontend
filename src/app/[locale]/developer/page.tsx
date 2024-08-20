import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("DeveloperPage.title"),
    description: t("DeveloperPage.description"),
  };
}

type DeveloperPageProps = {
  params: {
    locale: string;
  };
};

const DeveloperPage = ({ params: { locale } }: DeveloperPageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default DeveloperPage;
