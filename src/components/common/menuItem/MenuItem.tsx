import { Link } from "@/navigation";
import React, { CSSProperties } from "react";

import styles from "./menuItem.module.css";
import { useLocale } from "next-intl";
import { Locale } from "@/config";

type MenuItemProps = {
  label: string;
  href: string;
  isSelected?: boolean;
  className?: string;
};

const MenuItem = ({ label, href, isSelected = false, className = "" }: MenuItemProps) => {
  const locale = useLocale();

  return (
    <Link
      href={href}
      className={`${styles.menu_item} ${isSelected ? styles.menu_item_selected : ""} ${className} text-nowrap font-medium transition-colors`}
      locale={locale as Locale}
    >
      {label}
    </Link>
  );
};

export default MenuItem;
