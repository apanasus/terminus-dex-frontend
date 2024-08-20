import { useGetBalancesQuery } from "@/redux/apiBackendClient/account/accountApiSlice";
import { selectAuthData } from "@/redux/slices/appSlice";
import { Balances } from "@/types/ton/TonBalances";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// === === === === === === ===

export const useBalances = () => {
  const address = useTonAddress();
  const wallet = useTonWallet();
  const authData = useSelector(selectAuthData);

  const { data, error } = useGetBalancesQuery(address, {
    selectFromResult: ({ data, error }) => ({ data, error }),
    skip: address === "" || !authData.authenticated,
    pollingInterval: 30 * 1000,
    refetchOnMountOrArgChange: true,
  });

  const [balanceData, setBalanceData] = useState<Balances | null>(data || null);

  // === === === === === === ===

  useEffect(() => {
    if (!data) {
      setBalanceData(null);
      return;
    }
    setBalanceData(data);
  }, [wallet, data]);

  // === === === === === === ===

  return balanceData || null;
};

// === === === === === === ===
