import Button from "@/components/common/button/Button";
import React from "react";

type StakeButtonProps = {
  isActive: boolean;
};

const StakeButton = ({ isActive }: StakeButtonProps) => {
  return (
    <div>
      <Button variant={"primary"} className="w-full transition-all" text="STAKE" disabled={!isActive} />
    </div>
  );
};

export default StakeButton;
