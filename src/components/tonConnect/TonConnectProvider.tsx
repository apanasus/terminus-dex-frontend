"use client";

import { locales, TONCONNECT_MANIFEST_URL } from "@/config";
import { Locales, TonConnectUIProvider, UIPreferences } from "@tonconnect/ui-react";
import { useLocale } from "next-intl";
import React from "react";

type TonConnectProviderProps = {
  children: React.ReactNode;
};

const TonConnectProvider = ({ children }: TonConnectProviderProps) => {
  const locale = useLocale();

  const newLocale = locale in locales ? locale : "en";

  return (
    <TonConnectUIProvider language={newLocale as Locales} manifestUrl={TONCONNECT_MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  );
};

export default TonConnectProvider;
