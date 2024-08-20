import { Link } from "@/navigation";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  icon: IconDefinition;
  label: string;
  description: string;
  onClick?: () => void;
  href?: string;
};

const ProfileMenuItem = ({ icon, label, description, onClick = () => {}, href = "#" }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-start justify-start gap-4 p-4 rounded-2xl w-60 hover:bg-[#FFFFFF] hover:bg-opacity-[0.02]"
    >
      <FontAwesomeIcon icon={icon} className="w-6 h-6" />
      <div className="flex flex-col items-start justify-start">
        <span className="font-medium text-base align-text-top text-slate-100">{label}</span>
        <span className="text-xs text-slate-400">{description}</span>
      </div>
    </Link>
  );
};

export default ProfileMenuItem;
