import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// === === === === === === ===

type FormWarningProps = {
  text: string;
};

// === === === === === === ===

const FormWarning = ({ text }: FormWarningProps) => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border-[1px] border-dark-600 p-4">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-red" />
      <div>
        <p className="text-light-900">{text}</p>
      </div>
    </div>
  );
};

// === === === === === === ===

export default FormWarning;
