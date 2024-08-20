"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../button/Button";

const NotFoundMessage = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="not-found-container flex-grow">
      <div className="bg-404 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50"
            y="50"
            lengthAdjust="spacingAndGlyphs"
            textLength="100%"
            height="100"
            fontSize="100"
            textAnchor="middle"
          >
            <tspan color="red" alignmentBaseline="central">
              404
            </tspan>
          </text>
        </svg>
      </div>
      <Image src="/static/images/404.png" alt="404" width={300} height={311} />
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="text-center text-6xl font-bold text-slate-100">{t("message.header")}</span>
        <span className="text-center text-slate-200">{t("message.description")}</span>
      </div>
      <Button variant="primary" size="sm" className="px-10" text={t("message.buttonLabel")} href="/" />
    </div>
  );
};

export default NotFoundMessage;
