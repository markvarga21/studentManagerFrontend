import React from "react";

const GenderSelectV2 = ({ id, label, colorModeColors, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-base font-normal text-tableTextColor">
        {label}
      </label>
      <select
        id={id}
        className="block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme appearance-none"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        defaultValue={""}
        onChange={onChange}
      >
        <option id="gender" style={{ color: colorModeColors.inputText }}>
          -
        </option>
        <option key="male" value="Male">
          Male
        </option>
        <option key="female" value="Female">
          Female
        </option>
      </select>
    </div>
  );
};

export default GenderSelectV2;
