import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("TokenPage.title"),
    description: t("TokenPage.description"),
  };
}

type TokenPageProps = {
  params: {
    locale: string;
  };
};

const TokenPage = ({ params }: TokenPageProps) => {
  unstable_setRequestLocale(params.locale);

  return <ComingSoon />;
};

export default TokenPage;
