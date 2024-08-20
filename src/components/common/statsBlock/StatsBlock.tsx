import React from "react";

type StatsBlockProps = {
  children: React.ReactNode;
};

const StatsBlock = ({ children }: StatsBlockProps) => {
  return (
    <section className="relative mb-36 flex w-full flex-col items-center justify-between gap-0 md:flex-row md:gap-6">
      <div className="absolute left-1/2 -z-10 h-full w-[100vw] -translate-x-1/2 bg-soft-100"></div>
      {children}
    </section>
  );
};

export default StatsBlock;
