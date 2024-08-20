import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("StakePage.title"),
    description: t("StakePage.description"),
  };
}

type StakePageProps = {
  params: {
    locale: string;
  };
};

const StakePage = ({ params: { locale } }: StakePageProps) => {
  unstable_setRequestLocale(locale);

  // const t = useTranslations("StakePage");

  return <ComingSoon />;

  // return (
  //   <div className="my-12 flex w-full grow flex-col items-center justify-start self-start justify-self-start">
  //     <div className="flex w-full max-w-[636px] flex-col items-center justify-start gap-8">
  //       <StakeForm />
  //       <Faq header={t("faq.header")} size="sm" bordered>
  //         <FaqItem question="faq.questions.1.question" answer={t("faq.questions.1.answer")} />
  //         <FaqItem question="faq.questions.2.question" answer={t("faq.questions.2.answer")} />
  //         <FaqItem question="faq.questions.3.question" answer={t("faq.questions.3.answer")} />
  //         <FaqItem question="faq.questions.4.question" answer={t("faq.questions.4.answer")} />
  //         <FaqItem question="faq.questions.5.question" answer={t("faq.questions.5.answer")} />
  //         <FaqItem question="faq.questions.6.question" answer={t("faq.questions.6.answer")} />
  //       </Faq>
  //       <ComplianceMessage />
  //     </div>
  //   </div>
  // );
};

export default StakePage;
