import React from "react";
import CategoryNavItem from "./CategoryNavItem";

interface CategoryNavPillsProps {
  children: React.ReactNode;
  isChosenFunc: (name: any) => boolean;
  setChosen: (name: any) => void;
}

const CategoryNav = ({ children, isChosenFunc, setChosen }: CategoryNavPillsProps) => {
  const categoryNavPills = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore
        isChosenFunc,
        setChosen,
      });
    }
  });
  return <div className="flex w-full items-center justify-start text-light-800">{categoryNavPills}</div>;
};

export default CategoryNav;
