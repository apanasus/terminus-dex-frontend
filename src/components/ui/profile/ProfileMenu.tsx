import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileMenu = ({ children }: Props) => {
  return <div className="flex flex-col gap-0 rounded-2xl bg-[#121215]">{children}</div>;
};

export default ProfileMenu;
