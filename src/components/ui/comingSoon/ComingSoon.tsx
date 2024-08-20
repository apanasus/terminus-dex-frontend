import { useTranslations } from "next-intl";
import styles from "./comingSoon.module.css";

const ComingSoon = () => {
  const t = useTranslations("ComingSoonComponent");

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-3">
      <span className="text-center text-6xl text-slate-100">{t("title")}</span>
      <span className="text-center text-slate-200">{t("description")}</span>
    </section>
  );
};

export default ComingSoon;
