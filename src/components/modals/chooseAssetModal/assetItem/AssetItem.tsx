"use client";

import { TonAsset } from "@/types/ton/TonAsset";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import BN from "bignumber.js";
import { printCoins } from "@/lib/utils/coins";

// === === === === === === ===

type AssetItemProps = {
  asset: TonAsset;
  setAsset: (asset: TonAsset) => void;
  closeModal: () => void;
  balance?: BN | null;
};

// === === === === === === ===

const AssetItem = ({ asset, setAsset, closeModal, balance }: AssetItemProps) => {
  const handleClick = () => {
    setAsset(asset);
    closeModal();
  };

  // === === === === === === ===

  return (
    <div
      className="box-border flex w-full items-center justify-between gap-4 rounded-2xl border-[1px] border-soft-100 p-4
        hover:cursor-pointer hover:bg-soft-100"
      onClick={handleClick}
    >
      <Image
        src={asset.iconUrl}
        alt=""
        width={40}
        height={40}
        className="rounded-full text-center align-middle"
        onError={(event) => {
          // @ts-ignore
          event.target.id = "/static/images/icons/128/unknown-token-128.png";
          // @ts-ignore
          event.target.src = "/static/images/icons/128/unknown-token-128.png";
        }}
        unoptimized={true}
      />
      <div className="flex w-0 grow flex-col">
        <div className="flex w-full items-center justify-start gap-2 overflow-ellipsis">
          <span className="text-base text-light-800">{asset.name}</span>
          {asset.tags?.map((tag) => (
            <span className="h-fit w-fit rounded-[4px] bg-soft-200 text-[10px] font-bold text-rose-500" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex place-items-center justify-between text-xs text-light-900">
          <span className="w-full overflow-ellipsis">{asset.symbol}</span>
          <span className="w-auto">{balance && printCoins(balance, asset.decimals)}</span>
        </div>
      </div>
      <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-soft-200" />
    </div>
  );
};

// === === === === === === ===

export default AssetItem;

// === === === === === === ===
