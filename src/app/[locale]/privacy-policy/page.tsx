import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("PrivacyPolicyPage.title"),
    description: t("PrivacyPolicyPage.description"),
  };
}

type PrivacyPolicyPageProps = {
  params: {
    locale: string;
  };
};

const PrivacyPolicyPage = ({ params: { locale } }: PrivacyPolicyPageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default PrivacyPolicyPage;
