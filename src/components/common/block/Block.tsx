import React from "react";

type BlockProps = {
  children: React.ReactNode;
};

const Block = ({ children }: BlockProps) => {
  return <div className="mb-36 flex w-full flex-wrap justify-center gap-6 p-4 md:p-6 lg:flex-nowrap">{children}</div>;
};

export default Block;
