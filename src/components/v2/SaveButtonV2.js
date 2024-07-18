import React from "react";
import SaveIconV2 from "../icons/SaveIconV2";

const SaveButtonV2 = () => {
  return (
    <button
      id="saveButton"
      className=" w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
    >
      <spam className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
        Add student
      </spam>
      <SaveIconV2 />
    </button>
  );
};

export default SaveButtonV2;
