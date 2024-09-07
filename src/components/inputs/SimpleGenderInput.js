import React from "react";
import { useTranslation } from "react-i18next";

const SimpleGenderInput = ({ colorModeColors }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between">
        <label
          htmlFor={"filter-gender"}
          className="text-base font-normal text-tableTextColor"
        >
          {t("userModal.inputs.gender.label")}
        </label>
      </div>
      <select
        id={"filter-gender"}
        className="p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme appearance-none"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        defaultValue={""}
      >
        <option value="" disabled>
          {t("filterPanel.options.gender")}
        </option>
        <option value={"MALE"} className="text-base h-10 pt-5 pb-5">
          {t("userModal.inputs.gender.values.male")}
        </option>
        <option value={"FEMALE"} className="text-base h-10 pt-5 pb-5">
          {t("userModal.inputs.gender.values.female")}
        </option>
      </select>
    </div>
  );
};

export default SimpleGenderInput;
