"use client";

// === === === === === === ===

import useHandleOutsideClick from "@/hooks/useHandleOusideClick";
import { isValidAddress, toStringOptions } from "@/lib/utils/tonAddress";
import { useFindAssetMutation } from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import { updateUserAssets } from "@/redux/slices/dexSlice";
import { TonAsset } from "@/types/ton/TonAsset";
import { faFilterCircleXmark, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Address } from "@ton/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AssetItem from "./assetItem/AssetItem";
import { Balances } from "@/types/ton/TonBalances";
import BaseModal from "../baseModal/BaseModal";
import { useTranslations } from "next-intl";

// === === === === === === ===

type ChooseAssetModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  assets: TonAsset[];
  knownAssets: { [key: string]: TonAsset };
  setAsset: (asset: TonAsset) => void;
  balances?: Balances | null;
  findAssetEnabled?: boolean;
};

// === === === === === === ===

// type AssetCategory = "Popular" | "Community" | "Favorites" | "All";

// === === === === === === ===

const ChooseAssetModal = ({
  visible,
  setVisible,
  assets,
  knownAssets,
  setAsset,
  balances,
  findAssetEnabled = false,
}: ChooseAssetModalProps) => {
  const t = useTranslations("ChooseAssetModal");

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [filteredAssets, setFilteredAssets] = useState<TonAsset[]>(assets);

  const [findAsset] = useFindAssetMutation();
  const [fetchingAsset, setFetchingAsset] = useState(false);

  // const [currentCategory, setCurrentCategory] = useState<AssetCategory>("All");
  // const isChosenFunc = (name: AssetCategory) => currentCategory === name;

  // === === === === === === ===

  const clearSearch = () => {
    setSearchValue("");
  };

  // === === === === === === ===

  const handleClose = () => {
    setVisible(false);
    clearSearch();
  };
  const ref = useHandleOutsideClick({ clickHandler: handleClose });

  // === === === === === === ===

  useEffect(() => {
    const filteredAssetsTemp = assets.sort((a, b) => {
      let compareValue = 0;
      if (balances?.assets[a.address.toString(toStringOptions)]) compareValue = compareValue - 10;
      if (balances?.assets[b.address.toString(toStringOptions)]) compareValue = compareValue + 10;
      if (a.symbol === "TON") compareValue = compareValue - 5;
      if (b.symbol === "TON") compareValue = compareValue + 5;
      if (a.isCommunity) compareValue++;
      if (b.isCommunity) compareValue--;
      if (a.isBlacklisted) compareValue = compareValue + 5;
      if (b.isBlacklisted) compareValue = compareValue - 5;
      if (a.isDeprecated) compareValue = compareValue + 5;
      if (b.isDeprecated) compareValue = compareValue - 5;
      return compareValue;
    });
    setFilteredAssets(filteredAssetsTemp);
  }, [assets, balances]);

  // === === === === === === ===

  useEffect(() => {
    if (searchValue === "") {
      setFilteredAssets(assets);
      return;
    }

    const newFilteredAssets = assets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        (isValidAddress(searchValue) && asset.address.equals(Address.parse(searchValue)))
      );
    });

    if (newFilteredAssets.length === 0 && isValidAddress(searchValue)) {
      const foundAsset = Object.values(knownAssets).find((asset) => asset.address.equals(Address.parse(searchValue)));
      if (foundAsset) {
        newFilteredAssets.push(foundAsset);
      }
    }

    setFilteredAssets(newFilteredAssets);
  }, [searchValue]);

  // === === === === === === ===

  useEffect(() => {
    if (filteredAssets.length > 0) return;

    if (
      findAssetEnabled &&
      isValidAddress(searchValue) &&
      !fetchingAsset &&
      !knownAssets[Address.parse(searchValue).toString(toStringOptions)]
    ) {
      setFetchingAsset(true);
      findAsset(Address.parse(searchValue))
        .then((res) => {
          if (res.data) {
            dispatch(updateUserAssets(res.data));
            setFilteredAssets([res.data]);
          }
        })
        .finally(() => {
          setFetchingAsset(false);
        });
    }
  }, [filteredAssets, searchValue]);

  // === === === === === === ===

  return (
    // <div
    //   className={`
    //     ${visible ? "flex" : "hidden"}
    //     absolute left-1/2 top-1/2 h-full max-h-[732px] w-full max-w-[526px] -translate-x-1/2 -translate-y-1/2
    //     flex-col items-center justify-start gap-8 rounded-2xl bg-dark-900 p-8 transition-all
    //     `}
    //   ref={ref}
    // >
    //   {/* header */}
    //   <div className="flex w-full items-center justify-between text-light-800">
    //     <span className="text-2xl font-bold">Select a token</span>
    //     <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="h-6 w-6 hover:cursor-pointer" />
    //   </div>
    <BaseModal isOpened={visible} setIsOpened={setVisible} title={t("title")} size="lg">
      <div className="flex h-0 w-full grow flex-col items-center justify-start gap-8">
        {/* search bar */}
        <div className="flex w-full items-center justify-start gap-6 rounded-2xl bg-soft-100 p-4">
          <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
          <input
            type="text"
            className="w-full bg-transparent text-start text-base text-light-800 outline-0"
            placeholder={t("searchPlaceholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <FontAwesomeIcon
              icon={faFilterCircleXmark}
              onClick={clearSearch}
              className="h-5 w-5 text-light-900 hover:cursor-pointer"
            />
          )}
        </div>
        {/* category pills */}
        {/* <CategoryNav isChosenFunc={isChosenFunc} setChosen={setCurrentCategory}>
          <CategoryNavItem name="Popular" />
          <CategoryNavItem name="Community" />
          <CategoryNavItem name="Favorites" />
          <CategoryNavItem name="All" />
        </CategoryNav> */}
        {/* assets list */}
        <div className="flex h-0 w-full grow flex-col items-center justify-start gap-2 overflow-y-scroll rounded-2xl">
          {filteredAssets.map((asset) => (
            <AssetItem
              key={asset.address.toString(toStringOptions)}
              asset={asset}
              setAsset={setAsset}
              closeModal={handleClose}
              balance={balances && balances.assets[asset.address.toString(toStringOptions)]}
            />
          ))}
        </div>
      </div>
    </BaseModal>
    // </div>
  );
};

export default ChooseAssetModal;
