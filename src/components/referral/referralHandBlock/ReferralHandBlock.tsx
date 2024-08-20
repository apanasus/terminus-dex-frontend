import HandBlock from "@/components/common/handBlock/HandBlock";
import ProgressBar from "@/components/common/progressBar/ProgressBar";
import React from "react";

type Props = {};

const ReferralHandBlock = (props: Props) => {
  return (
    <HandBlock
      header={"Referral Rewards Level"}
      text={"Invite your friends. Earn cryptocurrency together."}
      buttonLabel={"GET REFERRAL LINK"}
    >
      <div className="flex w-full flex-col gap-8 text-base text-light-900">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between">
            <span>From 1st Level Referral</span>
            <span>20%</span>
          </div>
          <ProgressBar current={80} max={100} />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between">
            <span>From 2nd Level Referral</span>
            <span>4%</span>
          </div>
          <ProgressBar current={50} max={100} />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between">
            <span>NFT Bonus Multiplicator</span>
            <span>1X</span>
          </div>
          <ProgressBar current={35} max={100} />
        </div>
      </div>
    </HandBlock>
  );
};

export default ReferralHandBlock;
