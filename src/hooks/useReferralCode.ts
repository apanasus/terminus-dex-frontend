import { REFERRAL_CODE_KEY } from "@/config";
import { useSearchParams } from "next/navigation";

const useReferralCode = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get(REFERRAL_CODE_KEY);

  if (code) localStorage.setItem(REFERRAL_CODE_KEY, code);

  return code;
};
