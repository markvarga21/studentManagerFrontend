import React from "react";

const SimpleTextInput = ({ id, label, placeholder, colorModeColors }) => {
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
      <input
        type="text"
        id={id}
        className="block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        autoComplete="off"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SimpleTextInput;
