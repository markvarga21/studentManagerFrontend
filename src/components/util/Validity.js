import React from "react";
import CheckIcon from "../icons/CheckIcon";
import CrossIcon from "../icons/CrossIcon";

const Validity = ({ validity, colorModeColors }) => {
  return (
    <div data-testid={"student-validity"}>
      {validity ? (
        <div
          className="flex gap-1 items-center font-inter font-semibold w-fit pl-2 pr-3 pt-1 pb-1 rounded-xl text-sm"
          style={{
            backgroundColor: colorModeColors.validBack,
            color: colorModeColors.validText,
            border: colorModeColors.validBorder,
          }}
        >
          <CheckIcon />
          <span>Valid</span>
        </div>
      ) : (
        <div
          className="flex gap-1 items-center font-inter font-semibold w-fit pl-2 pr-3 pt-1 pb-1 rounded-xl text-sm"
          style={{
            backgroundColor: colorModeColors.invalidBack,
            color: colorModeColors.invalidText,
            border: colorModeColors.invalidBorder,
          }}
        >
          <CrossIcon />
          <span>Invalid</span>
        </div>
      )}
    </div>
  );
};

export default Validity;
