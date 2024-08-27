import React from "react";

const PrimaryButton = ({buttonTitle, onclick}) => {
    return <button
        className="w-full flex items-center justify-center gap-1 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
        onClick={onclick}
        data-testid={"confirmation-button"}
    >
      <span className="font-inter font-semibold select-none text-sm">
        {buttonTitle}
      </span>
    </button>
}

export default PrimaryButton;