import React from "react";

const SecondaryButton = ({buttonTitle, onclick, colors}) => {
    return <button
        className="w-full flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-xl hover:cursor-pointer border-[1px] border-darkGray"
        onClick={onclick}
        data-testid={"cancel-button"}
    >
      <span className="font-inter font-semibold select-none text-sm" style={{color: colors.tableContent}}>
        {buttonTitle}
      </span>
    </button>
}

export default SecondaryButton;