"use client";

import { Link } from "@/navigation";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./InfoCard.module.css";

type InfoCardBoxProps = {
  icon: IconDefinition;
  header: string;
  description: string;
  variant?: "bottomIcon" | "topIcon";
  color?: "soft" | "brown" | "green" | "violet" | "meta";
  size?: "md" | "lg";
};

const InfoCard = ({
  icon,
  header,
  description,
  variant = "bottomIcon",
  color = "soft",
  size = "md",
}: InfoCardBoxProps) => {
  const cardStyles = `${styles["advantage_card--" + color]}`;
  const iconStyles = `${styles["advantage_card--" + color + "__icon"]}`;
  const triangleStyles = `${styles["advantage_card--" + color + "__triangle"]}`;

  const width = size === "md" ? "294px" : "416px";
  const minWidth = size === "md" ? "294px" : "294px";

  return (
    <Link
      href="#"
      className={`${cardStyles}
        relative box-border flex h-[301px] w-0 grow flex-col overflow-hidden rounded-2xl p-8 pb-12 transition-colors`}
      style={{ minWidth: minWidth, maxWidth: width }}
    >
      <div className="absolute left-0 top-0 box-border h-full w-full rounded-2xl border-4 border-soft-200" />
      <div
        className={`absolute -left-8 top-full h-14 w-20 -translate-y-9 rotate-45 border-[5px]
          border-[rgba(0,0,0,0.8)]`}
      >
        <div className={`${triangleStyles} transitions-colors h-full w-full`}></div>
      </div>
      <div className="flex h-full flex-col items-start justify-start gap-4">
        {(variant === "topIcon" || size === "lg") && (
          <div className="mb-8 flex items-center justify-between">
            <FontAwesomeIcon icon={icon} className={`${iconStyles} h-14 w-14 text-soft-100 transition-colors`} />
          </div>
        )}
        <span className="text-2xl font-bold text-light-800">{header}</span>
        <span className="text-base text-light-900">{description}</span>
        {variant === "bottomIcon" && size === "md" && (
          <div className="mt-auto flex w-full items-center justify-between">
            <span className="text-base text-light-900 underline">Read more</span>
            <FontAwesomeIcon icon={icon} className={`${iconStyles} h-14 w-14 text-soft-100 transition-colors`} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default InfoCard;
