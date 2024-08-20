"use client";

import Button from "@/components/common/button/Button";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CryptoIcons from "./CryptoIcons";

type HeroProps = {
  header: string;
  label: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
};

const Hero = ({ header, label, description, buttonLabel, buttonLink }: HeroProps) => {
  const { push } = useRouter();
  const buttonOnClick = () => {
    push(buttonLink);
  };

  return (
    <>
      <section className="relative w-full">
        <CryptoIcons />
        <div
          className="absolute left-0 top-0 -z-10 h-[555px] w-full rounded-[2000px] bg-[#FFEA29] blur-[300px]"
          style={{ opacity: "0.04", rotate: "180deg" }}
        ></div>
        <div className="my-36 flex h-full w-full flex-col items-center gap-12">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-4 font-bold text-slate-200">
              <span className="text-center text-6xl md:text-8xl">{header}</span>
              <span className="text-center text-4xl md:text-6xl">{label}</span>
            </div>
            <span className="max-w-[800px] text-center text-2xl text-slate-400">{description}</span>
          </div>
          <Button variant="primary" size="lg" text={buttonLabel} faIcon={faArrowRightLong} onClick={buttonOnClick} />
        </div>
      </section>
      <Image
        src="/static/images/hero-background.png"
        alt="hero-background"
        width={0}
        height={0}
        quality={100}
        sizes="100vw"
        className="absolute left-1/2 top-0 -z-40 h-[583px] w-[100vw] max-w-[1920px]"
        style={{ transform: "translateX(-50%)", objectFit: "cover" }}
        unoptimized={true}
      />
    </>
  );
};

export default Hero;
