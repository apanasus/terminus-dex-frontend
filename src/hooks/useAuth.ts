import { AUTH_TOKEN_KEY, REFERRAL_CODE_KEY } from "@/config";
import { getCookie, removeCookie } from "@/lib/cookie";
import { useGetPayloadQuery, useLoginQuery } from "@/redux/apiBackendClient/account/accountApiSlice";
import { updateAuthData } from "@/redux/slices/appSlice";
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export function useAuth() {
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const checkTokenCookieInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  let referralCode = null;
  if (typeof window !== "undefined") {
    referralCode = searchParams.get("ref") as string;
    localStorage.setItem(REFERRAL_CODE_KEY, referralCode);
  }

  const tonProof =
    wallet?.connectItems?.tonProof && !("error" in wallet?.connectItems.tonProof)
      ? wallet.connectItems.tonProof.proof
      : null;

  // Payload query
  const {
    data: payloadData,
    isLoading: payloadIsLoading,
    isError: payloadError,
    refetch: payloadRefetch,
  } = useGetPayloadQuery(undefined, {
    skip: !isConnectionRestored || !!wallet,
    // @ts-ignore
    selectFromResult: ({ data, isLoading, isError, refetch }) => ({
      data,
      isLoading,
      isError,
      refetch,
    }),
    pollingInterval: 1000 * 60 * 10,
    refetchOnMountOrArgChange: true,
  });

  // Auth request query
  const {
    data: loginRequest,
    isLoading: loginRequestIsLoading,
    error: loginRequestError,
    isFetching: loginRequestIsFetching,
  } = useLoginQuery(
    {
      address: wallet?.account.address || "",
      proof: {
        timestamp: tonProof?.timestamp || 0,
        domain: {
          length_bytes: tonProof?.domain.lengthBytes || 0,
          value: tonProof?.domain.value || "",
        },
        signature: tonProof?.signature || "",
        payload: tonProof?.payload || "",
        state_init: wallet?.account?.walletStateInit,
        public_key: wallet?.account?.publicKey,
      },
      referral_code: referralCode || "",
    },
    {
      skip: !wallet || !tonProof,
      selectFromResult: ({ data, isLoading, error, isFetching }) => ({
        data,
        isLoading,
        error,
        isFetching,
      }),
    },
  );

  const removeCookieAndUpdateState = (key: string) => {
    removeCookie(key);
    dispatch(updateAuthData({ authenticated: false }));
  };

  // Check token function
  const checkToken = useCallback(() => {
    if (loginRequestIsFetching) return;

    const token = getCookie(AUTH_TOKEN_KEY);
    if (token && !wallet) {
      removeCookieAndUpdateState(AUTH_TOKEN_KEY);
    }
    if (token) {
      try {
        jwtDecode(token);
      } catch (e) {
        removeCookieAndUpdateState(AUTH_TOKEN_KEY);
      }
      dispatch(updateAuthData({ authenticated: true }));
    } else if (!!wallet) {
      tonConnectUI.disconnect().then(() => {
        if (token) removeCookieAndUpdateState(AUTH_TOKEN_KEY);
      });
    }
  }, [loginRequestIsFetching, tonConnectUI, wallet]);

  // Set tonconnect request parameters and state
  useEffect(() => {
    tonConnectUI.setConnectRequestParameters({ state: "loading" });
    if (payloadData?.code === 0 && !("error" in payloadData)) {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: payloadData.payload },
      });
    } else {
      tonConnectUI.setConnectRequestParameters({
        state: "loading",
      });
    }
  }, [payloadData]);

  // Refetch payload on error
  useEffect(() => {
    if (!payloadIsLoading && payloadError) {
      setTimeout(() => payloadRefetch(), 5000);
    }
  }, [payloadIsLoading, payloadError]);

  // Remove token if wallet is not connected
  useEffect(() => {
    if (isConnectionRestored && !wallet) {
      removeCookieAndUpdateState(AUTH_TOKEN_KEY);
    }
  }, [isConnectionRestored, wallet]);

  // Setting token check interval
  useEffect(() => {
    if (checkTokenCookieInterval.current) {
      clearInterval(checkTokenCookieInterval.current);
    }
    checkTokenCookieInterval.current = setInterval(checkToken, 1000 * 10);
  }, [checkToken]);
}
