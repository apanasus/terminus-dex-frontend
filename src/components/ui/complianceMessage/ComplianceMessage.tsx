import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

type ComplianceMessageProps = {};

const ComplianceMessage = (props: ComplianceMessageProps) => {
  const t = useTranslations("TermsOfUsePage");
  return (
    <Link href="/terms-of-use" className="w-full text-center">
      <span className="text-center text-sm text-light-900">{t("complianceMessage")}</span>
    </Link>
  );
};

export default ComplianceMessage;
