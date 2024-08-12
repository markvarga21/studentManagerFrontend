import React from "react";

const DatePickerV2 = ({
  colorModeColors,
  id,
  label,
  onChange,
  errorFields,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-base font-normal text-tableTextColor">
        {label}
      </label>
      <input
        type="date"
        id={id}
        className="date block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme placeholder-red"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: colorModeColors.buttonBackGround,
          color: colorModeColors.inputText,
        }}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};

export default DatePickerV2;
