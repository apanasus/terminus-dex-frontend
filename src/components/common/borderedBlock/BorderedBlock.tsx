import React from "react";

type BorderedBlockProps = {
  children: React.ReactNode;
};

const BorderedBlock = ({ children }: BorderedBlockProps) => {
  return (
    <div
      className="mb-36 flex flex-wrap justify-center gap-6 rounded-2xl border-2 bg-soft-100 p-6
        shadow-[4px_4px_0_0_rgb(var(--accent-800))] sm:max-w-full xl:flex-nowrap"
    >
      {children}
    </div>
  );
};

export default BorderedBlock;
