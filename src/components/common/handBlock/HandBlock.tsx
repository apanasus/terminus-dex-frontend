"use client";

import Image from "next/image";
import React from "react";
import Button from "../button/Button";
import handImage from "@/assets/images/hand.png";

type HandBlockProps = {
  buttonOnClick?: () => void;
  buttonHref?: string;
  header: string;
  text: string;
  buttonLabel: string;
  children?: React.ReactNode;
};

const HandBlock = ({ buttonOnClick, buttonHref, header, text, buttonLabel, children }: HandBlockProps) => {
  return (
    <section className="relative mb-36 flex w-full flex-1 items-start justify-between px-4 md:px-0 lg:min-h-[550px] ">
      <div className="flex w-1/2 flex-grow flex-col gap-8">
        <span className="text-5xl font-bold text-light-800 md:text-7xl">{header}</span>
        <span className="text-xl text-light-900">{text}</span>
        {children && <div>{children}</div>}
        <Button
          variant="primary"
          text={buttonLabel}
          href={buttonHref}
          onClick={buttonOnClick}
          className="mx-auto mt-6 lg:mx-0 lg:mt-12"
        />
      </div>
      <div
        className="absolute left-0 top-0 -z-10 flex w-full flex-grow items-center justify-center opacity-10
        lg:static lg:left-0 lg:z-0 lg:w-1/2 lg:-translate-x-0 lg:opacity-100"
      >
        <Image
          src="/static/images/toncoin.png"
          alt="toncoin"
          width={306}
          height={306}
          className=" drop-shadow-[0px_24px_150px_rgba(255,208,41,0.48)]"
        />
      </div>
      <div
        className="absolute left-1/2 top-[75%] -z-10 h-fit min-h-[536px] w-[100vw] max-w-[1920px] -translate-x-1/2 overflow-hidden opacity-10
          lg:top-[60%] lg:opacity-100"
      >
        <div className="relative h-full w-full">
          <Image
            src={handImage}
            alt="hand"
            width={810}
            height={536}
            className="absolute left-1/2 min-w-[810px] -translate-x-1/4 scale-x-[-1] lg:left-[58%] lg:-translate-x-0"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default HandBlock;
