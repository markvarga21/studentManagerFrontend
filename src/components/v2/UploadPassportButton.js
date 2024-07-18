import React from "react";
import UploadIconV2 from "../icons/UploadIconV2";

const UploadPassportButton = () => {
  return (
    <button
      id="uploadPassportButton"
      className=" w-1/3 xl:w-auto flex items-center justify-center gap-3 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
    >
      <spam className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
        Upload passport
      </spam>
      <UploadIconV2 />
    </button>
  );
};

export default UploadPassportButton;
