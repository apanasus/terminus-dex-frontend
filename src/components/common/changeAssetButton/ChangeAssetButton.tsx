import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type ChangeAssetButtonProps = {
  assetSymbol: string;
  assetIconUrl: string;
  onClick: () => void;
};

const ChangeAssetButton = ({ assetIconUrl, assetSymbol, onClick }: ChangeAssetButtonProps) => (
  <div className="flex justify-start gap-2 hover:cursor-pointer" onClick={onClick}>
    <Image
      src={assetIconUrl}
      alt=""
      width={32}
      height={32}
      className="rounded-full border-2 border-[#05060A]"
      // @ts-ignore
      onError={(event) => {
        // @ts-ignore
        event.target.id = "/static/images/icons/128/unknown-token-128.png";
        // @ts-ignore
        event.target.srcset = "/static/images/icons/128/unknown-token-128.png";
      }}
    />
    <div className="jus flex items-center gap-2 text-[#05060A]">
      <span className="text-2xl font-bold">{assetSymbol}</span>
      <FontAwesomeIcon className="h-4 w-4" icon={faChevronDown} />
    </div>
  </div>
);

export default ChangeAssetButton;
