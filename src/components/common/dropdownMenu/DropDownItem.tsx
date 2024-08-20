import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "@/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  label?: string;
  icon?: IconDefinition | string;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
  asExternalLink?: boolean;
  className?: string;
};

const DropDownItem = ({
  label,
  icon,
  selected,
  onClick,
  href = "#",
  asExternalLink = false,
  className = "",
}: Props) => {
  const router = useRouter();

  const RootElement = onClick ? "div" : asExternalLink ? "a" : Link;

  const clickHandler = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (href) {
      router.push(href);
      return;
    }
  };

  return (
    <RootElement
      className={`
        ${selected && "bg-[rgba(255,255,255,0.02)]"} ${className}
        relative flex h-12 w-full items-center justify-between gap-4 px-4 py-4 transition-colors
        hover:cursor-pointer hover:bg-[#FFFFFF] hover:bg-opacity-[0.02]
      `}
      href={href}
      onClick={clickHandler}
    >
      <div className="flex items-center gap-2 text-base text-slate-200">
        {icon &&
          (typeof icon === "string" ? (
            <img src={icon} className="h-6 w-6" />
          ) : (
            <FontAwesomeIcon icon={icon} className="h-6 w-6" />
          ))}
        {label && <span>{label}</span>}
      </div>
      {selected && (
        <div className="flex items-center gap-0 text-sm text-[#FFD029]">
          <FontAwesomeIcon icon={faCheck} className="z-10 h-4 w-4" />
          <FontAwesomeIcon icon={faCheck} className="h-4 w-4 -translate-x-[75%]" />
        </div>
      )}
    </RootElement>
  );
};

export default DropDownItem;
