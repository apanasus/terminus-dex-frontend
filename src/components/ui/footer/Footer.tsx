import Link from "next/link";
import React from "react";
import Image from "next/image";

import styles from "./footer.module.css";
import Socials from "../../common/socials/Socials";
import MenuItem from "../../common/menuItem/MenuItem";
import { useTranslations } from "next-intl";
import BackgroundBlur from "@/components/common/background/BackgroundBlur";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  const t = useTranslations("FooterComponent");

  return (
    <footer className={`${styles.footer} relative flex-wrap justify-center lg:flex-nowrap lg:justify-between`}>
      <Link href="/" className={`${styles.logo} hidden lg:flex`}>
        <Image src="/static/images/logo.png" alt="logo" width="32" height={"32"} className="h-auto" />
      </Link>
      <div
        className={`${styles.footer_menu} static hidden
          sm:flex
          lg:absolute lg:left-1/2 lg:w-fit lg:-translate-x-1/2`}
      >
        <MenuItem href="/developer" label={t("menu.developer")} />
        <MenuItem href="/blog" label={t("menu.blog")} />
        <MenuItem href="/faq" label={t("menu.faq")} />
        <MenuItem href="/privacy-policy" label={t("menu.privacy-policy")} />
        <MenuItem href="/terms-of-use" label={t("menu.terms-of-use")} />
      </div>
      <div className={styles.socials}>
        <Socials />
      </div>
      <div className="absolute left-1/2 top-0 h-[1px] -translate-x-1/2 bg-slate-800" style={{ width: "100vw" }}></div>
      <BackgroundBlur />
    </footer>
  );
};

export default Footer;
