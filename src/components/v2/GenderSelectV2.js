import React from "react";

const GenderSelectV2 = ({ id, label, colorModeColors, onChange }) => {
  return (
    <div className="w-full gender-select-container">
      <label htmlFor={id} className="text-base font-normal text-tableTextColor">
        {label}
      </label>
      <select
        id={id}
        className="gender-select block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme appearance-none"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        defaultValue={""}
        onChange={onChange}
      >
        <option
          id="gender"
          style={{ color: colorModeColors.inputText }}
          className="text-base"
        >
          -
        </option>
        <option key="male" value="MALE" className="text-base h-10 pt-5 pb-5">
          Male
        </option>
        <option key="female" value="FEMALE" className="text-base">
          Female
        </option>
      </select>
    </div>
  );
};

export default GenderSelectV2;
