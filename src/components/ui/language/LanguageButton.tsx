"use client";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import DropDownItem from "@/components/common/dropdownMenu/DropDownItem";
import DropDownMenu from "@/components/common/dropdownMenu/DropDownMenu";
import { locales } from "@/config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";

type LanguageButtonProps = {
  className?: string;
};

const LanguageButton = ({ className = "" }: LanguageButtonProps) => {
  const t = useTranslations("LanguageComponent");
  const currentLocale = useLocale();
  const params = useSearchParams();
  const pathname = usePathname();

  const isSelected = (locale: string) => {
    return locale === currentLocale;
  };

  const setLocale = (locale: string) => {
    if (locale === currentLocale) return "";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    return `${newPathname}${params.size > 0 ? `?${params.toString()}` : ""}`;
  };

  return (
    <DropDownMenu icon={faGlobe} className={className}>
      {locales.map((locale, index) => {
        return (
          <DropDownItem
            key={index}
            label={t(locale)}
            selected={isSelected(locale)}
            href={setLocale(locale)}
            asExternalLink
          />
        );
      })}
    </DropDownMenu>
  );
};

export default LanguageButton;
