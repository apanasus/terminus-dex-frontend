// === === === === === === ===

import { onImageError } from "@/lib/utils/image";
import { TonAsset } from "@/types/ton/TonAsset";
import Image from "next/image";

// === === === === === === ===

type LiquidityPoolProps = {
  firstAsset: TonAsset;
  secondAsset: TonAsset;
};

// === === === === === === ===

const LiquidityPool = ({ firstAsset, secondAsset }: LiquidityPoolProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-soft-100 p-4">
      <div className="flex gap-4">
        <div className="relative flex h-10 min-w-[65px] items-center justify-center">
          <Image
            className="absolute left-0 top-0"
            src={firstAsset.iconUrl}
            height={40}
            width={40}
            alt={firstAsset.symbol}
            onError={onImageError}
          />
          <Image
            className="absolute left-[25px] top-0"
            src={secondAsset.iconUrl}
            height={40}
            width={40}
            alt={secondAsset.symbol}
            onError={onImageError}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1">
          <span className="text-xl font-bold leading-5 text-light-800">
            {firstAsset.symbol}/{secondAsset.symbol}
          </span>
          <span className="text-xs leading-3 text-light-900">
            {firstAsset.name}/{secondAsset.name}
          </span>
        </div>
      </div>
    </div>
  );
};

// === === === === === === ===

export default LiquidityPool;

// === === === === === === ===
