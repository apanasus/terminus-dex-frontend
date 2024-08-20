"use client";

// === === === === === === ===

import React from "react";
import BaseModal from "../baseModal/BaseModal";
import Button from "@/components/common/button/Button";

// === === === === === === ===

type TransactionResultProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  success: boolean;
};

// === === === === === === ===

const TransactionResultModal = ({ isOpened, setIsOpened, success }: TransactionResultProps) => {
  return (
    <BaseModal isOpened={isOpened} setIsOpened={setIsOpened} title={success ? "Successfully" : "Rejected"}>
      <div className="flex w-full flex-col gap-2">
        <span className="text-light-800">
          {success ? "Transaction was successfully sent!" : "Transaction was rejected!"}
        </span>
        <span className="text-light-900">{success ? "Check your wallet for details." : "Try again later."}</span>
      </div>
      <Button variant="primary" onClick={() => setIsOpened(false)} text="Continue" />
    </BaseModal>
  );
};

// === === === === === === ===

export default TransactionResultModal;

// === === === === === === ===
