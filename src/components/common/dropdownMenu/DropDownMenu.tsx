import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DropDownList from "./DropDownList";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import styles from "./dropdown.module.css";
import useHandleOutsideClick from "@/hooks/useHandleOusideClick";

type DropDownMenuProps = {
  label?: string;
  icon?: IconDefinition;
  children: React.ReactNode;
  className?: string;
};

const DropDownMenu = ({ label, icon, children, className = "" }: DropDownMenuProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const collapse = () => {
    setIsExpanded(false);
  };

  const ref = useHandleOutsideClick({
    clickHandler: collapse,
  });

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!label && !icon) throw new Error("'label' or 'icon' is required!");

  return (
    <nav
      className={`${styles.dropdown_button} ${className}
        relative z-20 flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-colors`}
      ref={ref}
    >
      <div onClick={toggleExpand} className="flex h-full w-full items-center justify-center">
        {icon ? <FontAwesomeIcon icon={icon} size="sm" /> : <span>{label}</span>}
      </div>
      <div
        className={`absolute left-full top-[110%] -translate-x-full overflow-hidden rounded-2xl ${
          !isExpanded && "hidden"
        } transition-all`}
        onClick={collapse}
      >
        <DropDownList>{children}</DropDownList>
      </div>
    </nav>
  );
};

export default DropDownMenu;
