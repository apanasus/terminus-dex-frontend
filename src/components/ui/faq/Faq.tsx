import React, { cloneElement } from "react";

import { useTranslations } from "next-intl";

type FaqProps = {
  children: React.ReactNode;
  header?: string;
  className?: string;
  size?: "lg" | "sm";
  bordered?: boolean;
};

const Faq = ({ children, header, className = "", size = "lg", bordered = false }: FaqProps) => {
  const t = useTranslations("faq");

  let clonedChildren;
  if (size === "sm") {
    clonedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return cloneElement(child, {
          // @ts-ignore
          size: "sm",
        });
      }
    });
  } else {
    clonedChildren = children;
  }

  return (
    <section
      className={`
          ${size === "lg" ? "mb-36 gap-8 md:gap-16" : "gap-4 p-4"}
          ${bordered ? "box-border rounded-2xl border-[1px] border-dark-600" : ""}
          flex w-full flex-col overflow-hidden
          ${className}
        `}
    >
      <div
        className={`${size === "lg" ? "justify-center text-4xl sm:text-5xl md:text-7xl" : "justify-start text-3xl"}
          flex w-full items-center font-bold text-light-800`}
      >
        {header || t("defaultHeader")}
      </div>
      <div>{clonedChildren}</div>
    </section>
  );
};

export default Faq;
