import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";

// === === === === === === ===

type DetailsProps = {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  showTitle?: boolean;
  title?: string;
};

// === === === === === === ===

const Details = ({ children, className = "", bordered = true, showTitle = true, title }: DetailsProps) => {
  // === === === === === === ===

  const [expanded, setExpanded] = React.useState(true);

  if (!title) title = "Details:";

  const onClickHandler = () => {
    setExpanded(!expanded);
  };

  // === === === === === === ===

  return (
    <div
      className={twMerge(
        `box-border flex w-full flex-col rounded-2xl  p-4 transition-all`,
        className,
        expanded ? "gap-4" : "gap-0",
        bordered && "border-[1px] border-dark-600",
      )}
    >
      {showTitle && (
        <div className="flex w-full items-center justify-start text-light-800">
          <span className="">Details:</span>
        </div>
      )}
      <div
        className={twMerge(
          "flex w-full flex-col items-center justify-start gap-2 transition-all duration-500",
          expanded ? "h-auto opacity-100" : "h-0 overflow-hidden opacity-0",
        )}
      >
        {children}
      </div>
      <div className="flex w-full items-center justify-center">
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={onClickHandler}
          className={twMerge(
            "h-4 w-4 cursor-pointer text-soft-300 transition-all duration-500",
            expanded && "rotate-180",
          )}
        />
      </div>
    </div>
  );
};

// === === === === === === ===

export default Details;

// === === === === === === ===
