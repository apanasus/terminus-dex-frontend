"use client";

import { useRouter } from "@/navigation";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  variant: "primary" | "secondary";
  size?: "sm" | "lg";
  disabled?: boolean;
  onClick?: ((event?: any) => void) | null;
  href?: string | null;
  className?: string;
  text?: string;
  faIcon?: IconDefinition;
  startsWithIcon?: boolean;
};

const variantPrimaryClasses = "bg-accent-800 text-dark-900 hover:bg-accent-900";
const variantSecondaryClasses =
  "bg-[rgba(255,255,255,0.02)] border-[1px] border-light-800 text-light-800 hover:bg-light-800 hover:text-dark-900";
const disabledClasses = "opacity-25 cursor-default";
const lgClasses = "h-[56px] px-8 py-4 rounded-2xl text-lg";
const smClasses = "h-12 px-6 py-[11px] rounded-xl text-base";

const Button = ({
  variant = "primary",
  size = "lg",
  disabled = false,
  onClick = null,
  href = null,
  className = "",
  text = "",
  faIcon,
  startsWithIcon = false,
}: ButtonProps) => {
  const router = useRouter();

  const clickHandler =
    (href &&
      (() => {
        router.push(href);
      })) ||
    onClick ||
    (() => {
      router.push("#");
    });

  const icon = faIcon && <FontAwesomeIcon icon={faIcon} width={20} />;
  const label = <span>{text}</span>;

  return (
    <button
      className={twMerge(
        "flex w-fit items-center justify-center gap-2 font-semibold transition-colors",
        variant === "primary" ? variantPrimaryClasses : "",
        variant === "secondary" ? variantSecondaryClasses : "",
        size === "lg" ? lgClasses : "",
        size === "sm" ? smClasses : "",
        className,
        disabled ? disabledClasses : "",
      )}
      disabled={disabled}
      onClick={clickHandler}
    >
      {faIcon && startsWithIcon && icon}
      {text && label}
      {faIcon && !startsWithIcon && icon}
    </button>
  );
};

export default Button;
