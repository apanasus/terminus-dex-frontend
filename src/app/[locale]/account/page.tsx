import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";
import { Suspense } from "react";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("AccountPage.title"),
    description: t("AccountPage.description"),
  };
}

type AccountPageProps = {
  params: {
    locale: string;
  };
};

const AccountPage = ({ params: { locale } }: AccountPageProps) => {
  unstable_setRequestLocale(locale);

  <Suspense>
    return <ComingSoon />;
  </Suspense>;

  // return (
  //   <div className="relative my-12 flex w-full grow items-start justify-center self-start justify-self-start">
  //     <div className="absolute left-0 top-0 hidden lg:flex">A Side</div>
  //     <div className="max-w-[636px] grow">
  //       <AccountBlock />
  //     </div>
  //   </div>
  // );
};

export default AccountPage;
