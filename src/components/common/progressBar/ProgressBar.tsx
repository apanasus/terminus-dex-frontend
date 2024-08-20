import React from "react";

type ProgressBarProps = {
  current: number;
  max: number;
};

const ProgressBar = ({ current, max }: ProgressBarProps) => {
  const progressPercent = Math.round((current / max) * 100);

  return (
    <div className="h-3 w-full rounded-[2px] bg-dark-800">
      <div
        className="h-full rounded-[2px] bg-gradient-to-r from-[#FED02B] to-[#FE902B]"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
