import React from "react";
import Image from "next/image";

type RocketBoxProps = {
  children: React.ReactNode;
  header: string;
};

const RocketBlock = ({ children, header }: RocketBoxProps) => {
  return (
    <section className="relative mb-60 flex w-full flex-col items-center justify-center gap-12">
      <span className="max-w-[600px] text-center text-5xl font-bold text-light-800 md:text-7xl">{header}</span>
      <div className="flex flex-wrap justify-center gap-6 p-6" style={{ zIndex: -2 }}>
        {children}
      </div>
      <Image
        src="/static/images/black-rocket.png"
        alt="rocket"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute left-1/2 top-[95%] h-auto w-[249px] -translate-x-1/2 md:top-[80%]"
        style={{ zIndex: -1 }}
      />
    </section>
  );
};

export default RocketBlock;
