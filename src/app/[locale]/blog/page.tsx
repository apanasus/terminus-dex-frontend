import ComingSoon from "@/components/ui/comingSoon/ComingSoon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RouteProps } from "../layout";

export async function generateMetadata({ params }: RouteProps) {
  const t = await getTranslations({ locale: params.locale });

  return {
    title: t("BlogPage.title"),
    description: t("BlogPage.description"),
  };
}

type BlogPageProps = {
  params: {
    locale: string;
  };
};

const BlogPage = ({ params: { locale } }: BlogPageProps) => {
  unstable_setRequestLocale(locale);

  return <ComingSoon />;
};

export default BlogPage;
