import BorderedBlock from "@/components/common/borderedBlock/BorderedBlock";
import InfoCard from "@/components/common/infoCard/InfoCard";
import HomeHandBlock from "@/components/home/HomeHandBlock";
import Faq from "@/components/ui/faq/Faq";
import FaqItem from "@/components/ui/faq/FaqItem";
import Hero from "@/components/ui/hero/Hero";
import Slider from "@/components/ui/slider/Slider";
import SliderItem from "@/components/ui/slider/SliderItem";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGear, faGem, faShield } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "./layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("HomePage.title"),
    description: t("HomePage.description"),
  };
}

export type HomeProps = {
  params: {
    locale: string;
  };
};

export default function Home({ params }: HomeProps) {
  unstable_setRequestLocale(params.locale);

  const t = useTranslations("HomePage");

  return (
    <div className="flex w-full grow flex-col justify-start self-start justify-self-start">
      <Hero
        header={t("hero.header")}
        label={t("hero.label")}
        description={t("hero.description")}
        buttonLabel={t("hero.buttonLabel")}
        buttonLink="exchange"
      />

      <Slider>
        <SliderItem
          imageUrl="/static/images/swap-screen.jpg"
          title={t("slider.slides.1.title")}
          description={t("slider.slides.1.description")}
          buttonLabel={t("slider.slides.1.buttonLabel")}
          buttonUrl="exchange"
        />
        <SliderItem
          imageUrl="/static/images/swap-screen.jpg"
          title={t("slider.slides.2.title")}
          description={t("slider.slides.2.description")}
          buttonLabel={t("slider.slides.2.buttonLabel")}
          buttonUrl="exchange"
        />
      </Slider>

      <BorderedBlock>
        <InfoCard header={t("cardsBlock.1.header")} description={t("cardsBlock.1.text")} icon={faGem} color="soft" />
        <InfoCard
          header={t("cardsBlock.2.header")}
          description={t("cardsBlock.2.text")}
          icon={faGithub}
          color="brown"
        />
        <InfoCard
          header={t("cardsBlock.3.header")}
          description={t("cardsBlock.3.text")}
          icon={faShield}
          color="violet"
        />
        <InfoCard header={t("cardsBlock.4.header")} description={t("cardsBlock.4.text")} icon={faGear} color="meta" />
      </BorderedBlock>

      <HomeHandBlock />

      <Faq header={t("faq.header")}>
        <FaqItem question={t("faq.questions.1.question")} answer={t("faq.questions.1.answer")} />
        <FaqItem question={t("faq.questions.2.question")} answer={t("faq.questions.2.answer")} />
        <FaqItem question={t("faq.questions.3.question")} answer={t("faq.questions.3.answer")} />
        <FaqItem question={t("faq.questions.4.question")} answer={t("faq.questions.4.answer")} />
        <FaqItem question={t("faq.questions.5.question")} answer={t("faq.questions.5.answer")} />
        <FaqItem question={t("faq.questions.6.question")} answer={t("faq.questions.6.answer")} />
      </Faq>
    </div>
  );
}
