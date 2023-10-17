import { Radio } from "@material-tailwind/react";
import React from "react";

const RadioSelector = ({ showSelfie, selfiePhoto, showPassport, idPhoto }) => {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#00AE82"
        className="h-full w-full scale-105 border-0"
      >
        <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
      </svg>
    );
  }
  return (
    <div className="flex gap-10">
      <Radio
        name="type"
        onClick={showSelfie}
        icon={<Icon />}
        className="border-uniGreen bg-lightUniGreen p-0 transition-all hover:before:opacity-0"
        label={"Portrait"}
      />
      <Radio
        name="type"
        onClick={showPassport}
        icon={<Icon />}
        className="border-uniGreen bg-lightUniGreen p-0 transition-all hover:before:opacity-0"
        label={"Passport"}
      />
    </div>
  );
};

export default RadioSelector;
