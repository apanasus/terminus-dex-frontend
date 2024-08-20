import React from "react";

type StatsBlockItemProps = {
  value: string | number;
  label: string;
};

const StatsBlockItem = ({ value, label }: StatsBlockItemProps) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-2 py-6 md:py-12">
      <span className="text-6xl font-bold text-light-800">{value}</span>
      <span className="text-base font-medium text-light-900">{label}</span>
      <div className="box-border h-[10px] w-[10px] rounded-2xl border-2 border-[#15161A] bg-accent-800 shadow-[4px_4px_0_0_rgb(255,97,47)]"></div>
    </div>
  );
};

export default StatsBlockItem;
