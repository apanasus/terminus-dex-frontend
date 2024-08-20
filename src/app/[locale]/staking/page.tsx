import BlockWithImage from "@/components/common/blockWithImage/BlockWithImage";
import InfoCard from "@/components/common/infoCard/InfoCard";
import MessageBlock from "@/components/common/messageBlock/MessageBlock";
import RocketBlock from "@/components/common/rocketBlock/RocketBlock";
import StatsBlock from "@/components/common/statsBlock/StatsBlock";
import StatsBlockItem from "@/components/common/statsBlock/StatsBlockItem";
import StepsBlock from "@/components/common/stepsBlock/StepsBlock";
import StepsBlockItem from "@/components/common/stepsBlock/StepsBlockItem";
import Faq from "@/components/ui/faq/Faq";
import FaqItem from "@/components/ui/faq/FaqItem";
import Hero from "@/components/ui/hero/Hero";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGear, faGem, faShield } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("StakingPage.title"),
    description: t("StakingPage.description"),
  };
}

type StakingPageProps = {
  params: {
    locale: string;
  };
};

const StakingPage = ({ params: { locale } }: StakingPageProps) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("StakingPage");

  // temp mock data
  const alreadyStakers = 48638;
  const annualPercentageYield = 4.29; // percents
  const totalValueLocked = 181.8; // millions

  return (
    <div className="flex w-full grow flex-col justify-start self-start justify-self-start">
      <Hero
        header={t("hero.header")}
        label={t("hero.label")}
        description={t("hero.description")}
        buttonLabel={t("hero.buttonLabel")}
        buttonLink="staking/stake"
      />

      <StatsBlock>
        <StatsBlockItem value={`${alreadyStakers}`} label={t("statsBlock.cards.1.label")} />
        <StatsBlockItem value={`${annualPercentageYield}%`} label={t("statsBlock.cards.2.label")} />
        <StatsBlockItem value={`${totalValueLocked}M`} label={t("statsBlock.cards.3.label")} />
      </StatsBlock>

      <BlockWithImage
        header={t("imageBlock.header")}
        description={t("imageBlock.text")}
        buttonLabel={t("imageBlock.buttonLabel")}
        buttonHref="staking/stake"
        imageUrl="/static/images/toncoin.png"
      />

      <RocketBlock header={t("rocketBlock.header")}>
        <InfoCard
          header={t("rocketBlock.cards.1.header")}
          description={t("rocketBlock.cards.1.text")}
          icon={faGem}
          color="soft"
        />
        <InfoCard
          header={t("rocketBlock.cards.2.header")}
          description={t("rocketBlock.cards.2.text")}
          icon={faGithub}
          color="brown"
        />
        <InfoCard
          header={t("rocketBlock.cards.3.header")}
          description={t("rocketBlock.cards.3.text")}
          icon={faShield}
          color="violet"
        />
        <InfoCard
          header={t("rocketBlock.cards.4.header")}
          description={t("rocketBlock.cards.4.text")}
          icon={faGear}
          color="meta"
        />
      </RocketBlock>

      <MessageBlock message={t("messageBlock.message")} />

      <StepsBlock header={t("stepsBlock.header")}>
        <StepsBlockItem number={1} title={t("stepsBlock.steps.1.title")} description={t("stepsBlock.steps.1.text")} />
        <StepsBlockItem number={2} title={t("stepsBlock.steps.2.title")} description={t("stepsBlock.steps.2.text")} />
        <StepsBlockItem number={3} title={t("stepsBlock.steps.3.title")} description={t("stepsBlock.steps.3.text")} />
        <StepsBlockItem number={4} title={t("stepsBlock.steps.4.title")} description={t("stepsBlock.steps.4.text")} />
      </StepsBlock>

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

export default StakingPage;
