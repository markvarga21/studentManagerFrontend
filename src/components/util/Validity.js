import React from "react";
import CheckIcon from "../icons/CheckIcon";
import CrossIcon from "../icons/CrossIcon";
import {useTranslation} from "react-i18next";

const Validity = ({ validity, colorModeColors }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div data-testid={"student-validity"}>
      {validity ? (
        <div
          className="flex gap-1 items-center font-inter font-semibold w-fit pl-2 pr-3 pt-1 pb-1 rounded-xl text-sm"
          style={{
            backgroundColor: colorModeColors.validBack,
            color: colorModeColors.validText,
            border: colorModeColors.validBorder,
          }}
        >
          <CheckIcon />
          <span>{t("studentsPage.table.status.valid")}</span>
        </div>
      ) : (
        <div
          className="flex gap-1 items-center font-inter font-semibold w-fit pl-2 pr-3 pt-1 pb-1 rounded-xl text-sm"
          style={{
            backgroundColor: colorModeColors.invalidBack,
            color: colorModeColors.invalidText,
            border: colorModeColors.invalidBorder,
          }}
        >
          <CrossIcon />
          <span>{t("studentsPage.table.status.invalid")}</span>
        </div>
      )}
    </div>
  );
};

export default Validity;
