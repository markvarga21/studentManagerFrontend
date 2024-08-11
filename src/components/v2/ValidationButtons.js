import React from "react";
import ValidationIcon from "./ValidationIcon";

const ValidationButtons = ({ colors }) => {
  const handleAutomaticValidation = () => {
    console.log("Automatic validation");
  };
  const handleManualValidation = () => {
    console.log("Manual validation");
  };
  return (
    <div className="flex gap-3">
      <button
        id="validateManuallyButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-xl hover:cursor-pointer border-2 border-darkGray"
        onClick={handleManualValidation}
      >
        <span
          className="font-inter font-normal select-none 2xl:text-base xl:text-base md:text-sm"
          style={{ color: colors.inputText }}
        >
          Manual validate
        </span>
      </button>
      <button
        id="validateAutomaticallyButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
        onClick={handleAutomaticValidation}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          Validate
        </span>
        <ValidationIcon />
      </button>
    </div>
  );
};

export default ValidationButtons;
