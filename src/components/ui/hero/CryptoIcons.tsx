import React from "react";
import Image from "next/image";

import styles from "./cryptoIcons.module.css";

const CryptoIcons = () => {
  return (
    <div className="absolute left-1/2 top-0 -z-10 h-[490px] w-full max-w-full -translate-x-1/2 overflow-hidden">
      <Image
        className={`${styles.crypto_icon} absolute left-[777px] top-[148px] rotate-[-8deg]`}
        style={{ left: "calc(50% + 129px" }}
        src="/static/images/icons/SOLANA-3d-coin-128.webp"
        width={40}
        height={40}
        alt="SOL"
      />
      <Image
        className={`${styles.crypto_icon} absolute left-[337px] top-[7px] rotate-[-10deg]`}
        style={{ left: "calc(50% - 311px" }}
        src="/static/images/icons/TRX-3d-coin-128.webp"
        width={40}
        height={40}
        alt="TRX"
      />
      <Image
        className={`${styles.crypto_icon} absolute left-[1243px] top-[215px] rotate-[-8deg]`}
        style={{ left: "calc(50% + 595px" }}
        src="/static/images/icons/USDC-3d-coin-128.webp"
        width={48}
        height={48}
        alt="USDC"
      />
      <Image
        className={`${styles.crypto_icon} absolute left-[325px] top-[261px]`}
        style={{ left: "calc(50% - 323px" }}
        src="/static/images/icons/Phantom-128.png"
        width={40}
        height={40}
        alt="Phantom"
      />
      <Image
        className={`${styles.crypto_icon} absolute left-[0px] top-[210px] rotate-[-10deg]`}
        style={{ left: "calc(50% - 648px)" }}
        src="/static/images/icons/TON-3d-coin-128.webp"
        width={64}
        height={64}
        alt="TON"
      />
      <Image
        className={`${styles.crypto_icon} absolute left-[984px] top-[447px] rotate-[-11deg]`}
        style={{ left: "calc(50% + 336px" }}
        src="/static/images/icons/USDT-3d-coin-128.webp"
        width={40}
        height={40}
        alt="USDT"
      />
    </div>
  );
};

export default CryptoIcons;
