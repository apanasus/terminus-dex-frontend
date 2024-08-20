import React from "react";

type StepsBlockItemProps = {
  number: number;
  title: string;
  description: string;
};

const StepsBlockItem = ({ number, title, description }: StepsBlockItemProps) => {
  const numberLabel = ("00" + number).slice(-2);

  return (
    <div className="flex h-full min-h-[260px] w-0 min-w-[200px] flex-grow flex-col gap-[27px] overflow-hidden">
      <span className="text-7xl font-bold text-light-800">{numberLabel}</span>
      <div className="flex w-full flex-col items-start gap-4 p-3 ">
        <span className="text-wrap text-2xl text-light-800">{title}</span>
        <span className="text-wrap text-base text-light-900">{description}</span>
      </div>
    </div>
  );
};

export default StepsBlockItem;
