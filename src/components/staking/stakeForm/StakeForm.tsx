"use client";

import Details from "@/components/common/details/Details";
import DetailsItem from "@/components/common/details/DetailsItem";
import { TON_ADDRESS } from "@/constants";
import { useBalances } from "@/hooks/useBalances";
import { toDecimal, toNano } from "@/lib/utils/coins";
import { shortAddress } from "@/lib/utils/tonAddress";
import { usePathname, useRouter } from "@/navigation";
import { TonAsset } from "@/redux/apiBackendClient/common/commonTypes";
import { useGetPoolsQuery, useGetPoolStakeDataQuery } from "@/redux/apiBackendClient/staking/stakingApiSlice";
import { StakePool } from "@/redux/apiBackendClient/staking/stakingApiTypes";
import { useTonAddress } from "@tonconnect/ui-react";
import BN from "bignumber.js";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import StakeButton from "../stakeButton/StakeButton";
import StakeInput from "../stakeInput/StakeInput";
import { updateQueryString } from "@/lib/utils/searchParams";

// === === === === === === ===

type StakeFormProps = {};

// === === === === === === ===

const StakeForm = (props: StakeFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [chooseAssetVisible, setChooseAssetVisible] = useState(false);
  const anyModalVisible = chooseAssetVisible;

  const [selectedPool, setSelectedPool] = useState<StakePool | null>(null);
  const [inAssetBalance, setInAssetBalance] = useState<BN>(new BN(0));
  const [outAssetBalance, setOutAssetBalance] = useState<BN>(new BN(0));
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [offerAmount, setOfferAmount] = useState<string>("");

  const { data: pools, isLoading: isPoolsLoading } = useGetPoolsQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({ data, isLoading }),
  });
  const assets = pools?.reduce((acc, pool) => {
    acc.push(pool.inAsset);
    return acc;
  }, [] as TonAsset[]);
  const { data: stakePoolData, isLoading: isStakePoolDataLoading } = useGetPoolStakeDataQuery(
    selectedPool?.address.toString() || "",
    {
      selectFromResult: ({ data, isLoading }) => ({ data, isLoading }),
      skip: !selectedPool,
    },
  );

  const balances = useBalances();

  const isTonOffered = selectedPool?.inAsset.address.equals(TON_ADDRESS);

  // === === === === === === ===

  const stakeAvailable = useCallback((): boolean => {
    if (!selectedPool) return false;
    if (!stakePoolData) return false;
    if (!inAssetBalance) return false;
    if (new BN(offerAmount).gt(toDecimal(inAssetBalance, selectedPool.inAsset.decimals))) return false;
    if (!offerAmount) return false;
    if (new BN(selectedPool.fees).gt(balances?.ton || 0)) return false;
    if (isTonOffered && new BN(offerAmount).gt(toDecimal(new BN(selectedPool.fees), selectedPool.inAsset.decimals)))
      return false;

    return true;
  }, [inAssetBalance, offerAmount, selectedPool, stakePoolData]);

  // === === === === === === ===

  useEffect(() => {
    if (!selectedPool && pools && pools.length > 0) {
      if (searchParams.get("pool")) {
        const pool = pools.find((pool) => pool.address.toString() === searchParams.get("pool"));
        if (pool) {
          setSelectedPool(pool);
          return;
        }
      }
      setSelectedPool(pools[0]);
      const newParams = updateQueryString("pool", pools[0].address.toString(), searchParams);
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, [pools, selectedPool]);

  useEffect(() => {
    if (selectedPool && balances) {
      setInAssetBalance(balances.assets[selectedPool.inAsset.address.toString()] || 0);
      setOutAssetBalance(balances.assets[selectedPool.outAsset.address.toString()] || 0);
    }
  }, [selectedPool, balances]);

  useEffect(() => {
    if (stakePoolData && selectedPool) {
      const rate = toNano(1, selectedPool.inAsset.decimals).div(new BN(stakePoolData.price));
      setExchangeRate(rate.toNumber());
    }
  }, [stakePoolData, selectedPool]);

  // === === === === === === ===

  return (
    <section className="flex w-full max-w-[636px] flex-col gap-8">
      {selectedPool ? (
        <>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="text-4xl font-bold text-light-800">Staking</span>
          </div>
          <div className="flex w-full flex-col gap-4">
            <StakeInput
              inAsset={selectedPool.inAsset}
              inAssetBalance={inAssetBalance}
              outAsset={selectedPool.outAsset}
              outAssetBalance={outAssetBalance}
              setChooseAssetVisible={setChooseAssetVisible}
              apy={selectedPool.apy}
              offerAmount={offerAmount}
              setOfferAmount={setOfferAmount}
              fees={selectedPool.fees}
            />
            <StakeButton isActive={stakeAvailable()} />
            <Details>
              <DetailsItem label="Momentary APY" value={`${selectedPool.apy}%`} />
              {/* <DetailsItem label="Total Staked" value={`${totalStaked} ${selectedPool.inAsset.symbol}`} /> */}
              {/* <DetailsItem label="Stakers" value={stakersCount} /> */}
              <DetailsItem
                label="Exchange rate"
                value={`1 ${selectedPool.outAsset.symbol} = ${exchangeRate} ${selectedPool.inAsset.symbol}`}
              />
              <DetailsItem label="Pool address" value={shortAddress(selectedPool.address.toString())} />
            </Details>
          </div>

          <div
            className={`${anyModalVisible ? "" : "hidden"} fixed left-0 top-0 z-20 h-screen w-screen backdrop-blur-sm`}
          >
            {/* <ChooseAssetModal
              assets={assets}
              visible={chooseAssetVisible}
              setVisible={setChooseAssetVisible}
              setAsset={setAsset}
            /> */}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-3xl font-bold">Loading...</span>
        </div>
      )}
    </section>
  );
};

// === === === === === === ===

export default StakeForm;
