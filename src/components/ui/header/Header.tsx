"use client";

import DropDownItem from "@/components/common/dropdownMenu/DropDownItem";
import DropDownMenu from "@/components/common/dropdownMenu/DropDownMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "../../common/menuItem/MenuItem";
import LanguageButton from "../language/LanguageButton";
import ProfileButton from "../profile/ProfileButton";
import styles from "./header.module.css";
import { useAuth } from "@/hooks/useAuth";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const pathname = usePathname();
  const t = useTranslations("HeaderComponent");

  useAuth();

  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <header className={`${styles.header} relative gap-4`}>
      <Link href="/" className={`${styles.logo} flex items-center font-bold`}>
        <Image src="/static/images/logo.png" alt="logo" width="32" height={"32"} className="h-auto" />
        <span className="hidden text-2xl sm:block ">Terminus</span>
      </Link>
      <nav
        className={`${styles.main_menu}
          hidden
          lg:flex
          xl:absolute xl:left-1/2 xl:-translate-x-1/2`}
      >
        <MenuItem href="/exchange" label={t("menu.exchange")} isSelected={isSelected("/exchange")} />
        <MenuItem href="/liquidity" label={t("menu.liquidity")} isSelected={isSelected("/liquidity")} />
        <MenuItem href="/staking" label={t("menu.staking")} isSelected={isSelected("/staking")} />
        <MenuItem href="/farms" label={t("menu.farms")} isSelected={isSelected("/farms")} />
        <MenuItem href="/token" label={t("menu.token")} isSelected={isSelected("/token")} />
        <MenuItem href="/referral" label={t("menu.referral")} isSelected={isSelected("/referral")} />
      </nav>
      <div className="ml-auto flex flex-row-reverse gap-4 lg:flex-row">
        <LanguageButton />
        <ProfileButton />
      </div>
      <DropDownMenu icon={faBars} className="lg:hidden">
        <DropDownItem label={t("menu.exchange")} href="/exchange" />
        <DropDownItem label={t("menu.liquidity")} href="/liquidity" />
        <DropDownItem label={t("menu.staking")} href="/staking" />
        <DropDownItem label={t("menu.farms")} href="/farms" />
        <DropDownItem label={t("menu.token")} href="/token" />
        <DropDownItem label={t("menu.referral")} href="/referral" />

        <DropDownItem label={t("menu.developer")} href="/developer" className="sm:hidden" />
        <DropDownItem label={t("menu.blog")} href="/blog" className="sm:hidden" />
        <DropDownItem label={t("menu.faq")} href="/faq" className="sm:hidden" />
        <DropDownItem label={t("menu.privacy-policy")} href="/privacy-policy" className="sm:hidden" />
        <DropDownItem label={t("menu.terms-of-use")} href="/terms-of-use" className="sm:hidden" />
      </DropDownMenu>
    </header>
  );
};

export default Header;
