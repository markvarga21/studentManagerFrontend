import React from "react";

const InputV2 = ({
  colorModeColors,
  id,
  label,
  placeholder,
  onChange,
  errorFields,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-base font-normal text-tableTextColor">
        {label}
      </label>
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
        onChange={onChange}
      />
    </div>
  );
};

export default InputV2;
