import Image from "next/image";
import Button from "../button/Button";

type BlockWithImageProps = {
  header: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
  buttonOnclick?: () => void;
  imageUrl: string;
};

const BlockWithImage = ({
  header,
  description,
  buttonLabel,
  buttonHref,
  buttonOnclick,
  imageUrl,
}: BlockWithImageProps) => {
  return (
    <section className="relative mb-36 flex w-full flex-1 gap-32">
      <div className="flex w-0 flex-grow flex-col items-center justify-start gap-12 lg:items-start">
        <div className="flex w-full flex-col gap-8">
          <div className="text-5xl font-bold text-light-800 md:text-7xl">{header}</div>
          <div className="text-xl text-light-900">{description}</div>
        </div>
        <Button variant="primary" href={buttonHref} onClick={buttonOnclick} text={buttonLabel} />
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 flex w-full flex-grow -translate-x-1/2 items-center justify-center opacity-10
          lg:static lg:left-0 lg:z-0  lg:w-0 lg:flex-grow lg:-translate-x-0 lg:opacity-100"
      >
        <Image
          src="/static/images/toncoin-bg.png"
          alt="toncoin"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute -z-10 h-auto w-full"
        />
        <Image
          src={imageUrl}
          alt="image"
          width={306}
          height={306}
          className="drop-shadow-[0px_24px_150px_rgba(255,208,41,0.48)]"
        />
      </div>
    </section>
  );
};

export default BlockWithImage;
