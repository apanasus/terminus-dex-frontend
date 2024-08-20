"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import styles from "./faq.module.css";

type FaqItemProps = {
  question: string;
  answer: string;
  className?: string;
  size?: "lg" | "sm";
};

const FaqItem = ({ answer, question, className = "", size = "lg" }: FaqItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const rotatedClass = isExpanded ? "-rotate-90" : "";
  const itemAnimationClass = isExpanded ? styles.expanded : styles.collapsed;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col
        ${size === "lg" ? "p-4 md:p-8 " : "py-4"}
        ${className}`}
    >
      <div
        className="flex items-center justify-between text-[#EAECEF] transition-all duration-[500ms] hover:cursor-pointer"
        onClick={toggleExpand}
      >
        <span className={`${size === "lg" ? "text-2xl" : "text-base"}`}>{question}</span>
        <div className={`faq-item flex h-6 w-6 items-center justify-center`}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={`
              ${rotatedClass}
              ${size === "lg" ? "h-6" : "h-4"}
              transition-all duration-[500ms]
            `}
          />
        </div>
      </div>
      <span
        className={`${size === "lg" ? "text-base" : "text-sm"}
          ${itemAnimationClass}
        text-[#EAECEF] text-opacity-80 transition-all duration-[500ms]`}
      >
        {answer}
      </span>
    </div>
  );
};

export default FaqItem;
