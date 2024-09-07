import React from "react";
import { useTranslation } from "react-i18next";

const CountrySelectInput = ({ id, label, countries, colorModeColors }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-base font-normal text-tableTextColor"
        >
          {label}
        </label>
      </div>
      <select
        id={id}
        className="p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme appearance-none"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        defaultValue={""}
      >
        <option value="" disabled>
          {t("filterPanel.options.country")}
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelectInput;
