import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { unstable_setRequestLocale } from "next-intl/server";

type TermsOfUsePageProps = {
  params: {
    locale: string;
  };
};

const TermsOfUsePage = ({ params: { locale } }: TermsOfUsePageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default TermsOfUsePage;
