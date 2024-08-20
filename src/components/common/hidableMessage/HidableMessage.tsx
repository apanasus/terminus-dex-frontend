"use client";

// === === === === === === ===

import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";

// === === === === === === ===

type HidableMessageProps = {
  text: string;
};

// === === === === === === ===

const HidableMessage = ({ text }: HidableMessageProps) => {
  const [hidden, setHidden] = React.useState(false);

  const hide = () => {
    setHidden(true);
  };

  // === === === === === === ===

  return (
    <div
      className={twMerge("flex w-full items-center justify-center gap-4 hover:cursor-pointer", hidden && "hidden")}
      onClick={hide}
    >
      <FontAwesomeIcon icon={faWarning} className="h-4 w-4 text-yellow-300" />
      <span>{text}</span>
    </div>
  );
};

// === === === === === === ===

export default HidableMessage;

// === === === === === === ===
