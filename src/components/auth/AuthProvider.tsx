"use client";

import { REFERRAL_CODE_KEY } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import React from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const searchParams = useSearchParams();

  let referralCode = null;

  if (typeof window !== "undefined") {
    referralCode = searchParams.get("ref") as string;
    localStorage.setItem(REFERRAL_CODE_KEY, referralCode);
  }


  return <>{children}</>;
};

export default AuthProvider;
