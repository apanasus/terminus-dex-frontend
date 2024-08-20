import React from "react";
import BorderedBlock from "../borderedBlock/BorderedBlock";

type StepsBlockProps = {
  header: string;
  children: React.ReactNode;
};

const StepsBlock = ({ header, children }: StepsBlockProps) => {
  return (
    <section className="flex w-full flex-col gap-16">
      <div className="flex items-center justify-center">
        <span className="text-center text-5xl text-light-800 md:text-7xl">{header}</span>
      </div>
      <BorderedBlock>{children}</BorderedBlock>
    </section>
  );
};

export default StepsBlock;
