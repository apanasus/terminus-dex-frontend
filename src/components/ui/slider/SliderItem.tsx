"use client";

import Button from "@/components/common/button/Button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { useRouter } from "@/navigation";

type SliderItemProps = {
  imageUrl: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonOnClick?: ((event: any) => void) | null;
  buttonUrl?: string;
  leftClick?: ((event: any) => void) | null;
  rightClick?: ((event: any) => void) | null;
};

const SliderItem = ({
  imageUrl,
  title,
  description,
  buttonLabel,
  buttonOnClick = null,
  buttonUrl,
  leftClick = null,
  rightClick = null,
}: SliderItemProps) => {
  const router = useRouter();

  if (!buttonOnClick && !buttonUrl) {
    return null;
  }

  const buttonClickHandler = buttonOnClick
    ? buttonOnClick
    : () => {
        router.push(buttonUrl || "/");
      };

  return (
    <div className="flex h-[645px] w-full items-center justify-between gap-8">
      <div
        className="
          absolute -z-10 flex w-full justify-end overflow-hidden opacity-100
          md:static md:z-0 md:block md:w-auto md:min-w-[30%] md:opacity-100"
      >
        <Image
          src={imageUrl}
          alt="Image not found! Sorry."
          width={385}
          height={645}
          className="rounded-2xl border-4 border-slate-300 shadow-[-10px_10px_0_0_rgba(255,255,255,0.16)]"
        />
        <div className="absolute z-0 h-full w-full backdrop:blur-md md:hidden"></div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 sm:gap-12 md:max-w-[65%] md:py-8">
        {rightClick && leftClick && (
          <div className="flex flex-row gap-2">
            <Button
              faIcon={faArrowLeft}
              variant="secondary"
              size="sm"
              onClick={leftClick}
              className="border-2 border-slate-700"
            />
            <Button
              faIcon={faArrowRight}
              variant="secondary"
              size="sm"
              onClick={rightClick}
              className="border-2 border-slate-700"
            />
          </div>
        )}
        <div className="flex flex-col justify-start gap-8">
          <div className="w-full justify-start">
            <span className="text-5xl font-bold text-light-800 md:text-7xl">{title}</span>
          </div>
          <div className="w-full justify-start">
            <span className="justify-start text-xl text-light-900">{description}</span>
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={buttonClickHandler} text={buttonLabel} className="mt-auto" />
      </div>
    </div>
  );
};

export default SliderItem;
