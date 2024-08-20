"use client";

// === === === === === === ===

import useHandleOutsideClick from "@/hooks/useHandleOusideClick";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";

// === === === === === === ===

type BaseModalProps = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  size?: "sm" | "lg";
};

// === === === === === === ===

const BaseModal = ({ children, isOpened, setIsOpened: setIsOpened, title, size = "sm" }: BaseModalProps) => {
  // === === === === === === ===

  const handleClose = () => {
    setIsOpened(false);
  };
  const ref = useHandleOutsideClick({ clickHandler: handleClose });

  // === === === === === === ===

  return (
    <div
      className={twMerge("fixed left-0 top-0 z-20 h-screen w-screen backdrop-blur-sm", isOpened ? "block" : "hidden")}
    >
      <div
        className={twMerge(
          isOpened ? "flex" : "hidden",
          size === "sm" ? "h-auto" : "h-full",
          "absolute left-1/2 top-1/2 max-h-[732px] w-full max-w-[526px] -translate-x-1/2 -translate-y-1/2",
          "z-30 flex-col items-center justify-start gap-8 rounded-2xl bg-dark-900 p-8 transition-all",
        )}
        ref={ref}
      >
        {title && (
          <div className="flex w-full items-center justify-between gap-8 text-light-800">
            <span className="text-2xl font-bold">{title}</span>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="h-6 w-6 hover:cursor-pointer" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// === === === === === === ===

export default BaseModal;

// === === === === === === ===
