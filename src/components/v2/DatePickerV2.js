import React from "react";

const DatePickerV2 = ({
  colorModeColors,
  id,
  label,
  onChange,
  errorFields,
  acceptReplacement,
}) => {
  const RED_HEX = "#F44336";
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-base font-normal text-tableTextColor"
        >
          {label}
        </label>
        {errorFields[id].error && (
          <div className="flex gap-3 items-center mb-1">
            <div
              className={`${id} hover:cursor-pointer underline`}
              onClick={acceptReplacement}
              style={{ color: colorModeColors.inputText }}
            >
              Accept
            </div>
            <div className="bg-creme pt-1 pb-1 pl-2 pr-2 rounded-lg font-semibold text-black">
              {errorFields[id].replacement}
            </div>
          </div>
        )}
      </div>
      <input
        type="date"
        id={id}
        className="date block p-3 pl-6 text-sm font-inter font-semibold text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme placeholder-red"
        style={{
          borderColor: colorModeColors.buttonBorder,
          backgroundColor: errorFields[id].error
            ? RED_HEX
            : colorModeColors.buttonBackGround,
          color: errorFields[id].error ? "white" : colorModeColors.inputText,
        }}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};

export default DatePickerV2;
