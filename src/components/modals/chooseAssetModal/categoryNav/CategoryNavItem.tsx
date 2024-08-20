import React from "react";

type CategoryNavItemProps = {
  name: string;
  isChosenFunc?: (name: any) => boolean;
  setChosen?: (name: any) => void;
};

const CategoryNavItem = ({ name, isChosenFunc = () => false, setChosen = () => {} }: CategoryNavItemProps) => {
  const isChosen = isChosenFunc(name);
  const clickHandler = () => {
    setChosen(name);
  };

  return (
    <div
      className={`
        ${isChosen ? "border-b-[1px] border-accent-800 text-accent-800 " : ""}
        flex h-12 w-full items-center justify-center rounded-t-2xl px-2 hover:cursor-pointer hover:bg-soft-100
        sm:px-4
      `}
      onClick={clickHandler}
    >
      {name}
    </div>
  );
};

export default CategoryNavItem;
