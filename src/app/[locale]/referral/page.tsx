import Block from "@/components/common/block/Block";
import InfoCard from "@/components/common/infoCard/InfoCard";
import Faq from "@/components/ui/faq/Faq";
import FaqItem from "@/components/ui/faq/FaqItem";
import Hero from "@/components/ui/hero/Hero";
import { faGem, faHandHoldingDollar, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ReferralHandBlock from "../../../components/referral/referralHandBlock/ReferralHandBlock";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("ReferralPage.title"),
    description: t("ReferralPage.description"),
  };
}

type ReferralPageProps = {
  params: {
    locale: string;
  };
};

const ReferralPage = ({ params: { locale } }: ReferralPageProps) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("ReferralPage");
  return (
    <div className="flex w-full grow flex-col justify-start self-start justify-self-start">
      <Hero
        header={t("hero.header")}
        label={t("hero.label")}
        description={t("hero.description")}
        buttonLabel={t("hero.buttonLabel")}
        buttonLink="#"
      />
      <Block>
        <InfoCard
          variant="topIcon"
          size="lg"
          color="brown"
          icon={faGem}
          header={t("cardsBlock.cards.1.header")}
          description={t("cardsBlock.cards.1.description")}
        />
        <InfoCard
          variant="topIcon"
          size="lg"
          color="green"
          icon={faShareFromSquare}
          header={t("cardsBlock.cards.2.header")}
          description={t("cardsBlock.cards.2.description")}
        />
        <InfoCard
          variant="topIcon"
          size="lg"
          color="violet"
          icon={faHandHoldingDollar}
          header={t("cardsBlock.cards.3.header")}
          description={t("cardsBlock.cards.3.description")}
        />
      </Block>
      <ReferralHandBlock />
      <Faq>
        <FaqItem question={t("faq.questions.1.question")} answer={t("faq.questions.1.answer")} />
        <FaqItem question={t("faq.questions.2.question")} answer={t("faq.questions.2.answer")} />
        <FaqItem question={t("faq.questions.3.question")} answer={t("faq.questions.3.answer")} />
        <FaqItem question={t("faq.questions.4.question")} answer={t("faq.questions.4.answer")} />
        <FaqItem question={t("faq.questions.5.question")} answer={t("faq.questions.5.answer")} />
        <FaqItem question={t("faq.questions.6.question")} answer={t("faq.questions.6.answer")} />
      </Faq>
    </div>
  );
};

export default ReferralPage;
