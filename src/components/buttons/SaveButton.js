import React from "react";
import SaveIcon from "../icons/SaveIcon";

const SaveButton = ({ buttonTitle, onClick }) => {
  return (
    <button
      id="saveButton"
      className=" w-1/3 xl:w-auto flex items-center justify-center gap-1 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
      onClick={onClick}
    >
      <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
        {buttonTitle}
      </span>
      <SaveIcon />
    </button>
  );
};

export default SaveButton;
