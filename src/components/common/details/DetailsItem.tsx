import React from "react";
import { twMerge } from "tailwind-merge";

type DetailsItemProps = {
  label: string;
  value: string | number;
  onClick?: () => void;
};

const DetailsItem = ({ label, value, onClick }: DetailsItemProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full items-center justify-between text-sm text-light-900",
        onClick && "hover:cursor-pointer",
      )}
      onClick={onClick}
    >
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
};

export default DetailsItem;
