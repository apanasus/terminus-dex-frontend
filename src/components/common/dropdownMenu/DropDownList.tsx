import React from "react";

type DropDownListProps = {
  children: React.ReactNode;
};

const DropDownList = ({ children }: DropDownListProps) => {
  return <div className="relative flex flex-col min-w-[200px] h-fit w-fit rounded-2xl bg-[#121215]">{children}</div>;
};

export default DropDownList;
