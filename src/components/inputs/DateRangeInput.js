import React from "react";
import { useTranslation } from "react-i18next";

const DateRangeInput = ({ id, label, colorModeColors }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="w-full flex flex-col justify-between gap-2">
      <label
        htmlFor={`${id}-from`}
        className="text-base font-normal text-tableTextColor"
      >
        {label}
      </label>
      <div className="flex gap-5 justify-between w-full">
        <div className="flex gap-1 w-full items-center">
          <input
            type="date"
            id={`${id}-from`}
            className="date block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme placeholder-red"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <div className="w-16" style={{ color: colorModeColors.inputText }}>
            - {t("filterPanel.date.from")}
          </div>
        </div>
        <div className="flex gap-1 w-full items-center">
          <input
            type="date"
            id={`${id}-to`}
            className="date block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme placeholder-red"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <div className="w-16" style={{ color: colorModeColors.inputText }}>
            - {t("filterPanel.date.to")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeInput;
