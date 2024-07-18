import React from "react";
import CloseIcon from "../icons/CloseIcon";
import SaveButtonV2 from "./SaveButtonV2";
import UploadPassportButton from "./UploadPassportButton";
import UploadPortraitButton from "./UploadPortraitButton";

const UserModalV2 = () => {
  return (
    <div
      id="outer"
      className="w-full h-full bg-green-300 flex justify-center items-center"
    >
      <div className="bg-red-500 w-3/4 h-3/4 p-12 flex flex-col gap-8">
        <div
          id="editTitle"
          className="font-bold 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl flex justify-between items-center"
        >
          <span>Edit existing data</span>
          <CloseIcon />
        </div>
        <form className="w-full h-full flex gap-10 flex-wrap">
          <div
            id="left"
            className="bg-blue-500 flex-grow w-full xl:w-auto flex flex-col gap-5"
          >
            A
          </div>
          <div
            id="middle"
            className="bg-blue-500 flex-grow w-full xl:w-auto flex flex-col gap-5"
          >
            B
          </div>
          <div
            id="right"
            className="bg-blue-500 flex-grow w-full xl:w-auto flex flex-col gap-5"
          >
            C
          </div>
        </form>
        <div
          id="buttonGroup"
          className="w-full flex justify-between gap-10 bg-blue-500 max-h-10"
        >
          <SaveButtonV2 />
          <div className="flex gap-3 bg-gray justify-end md:w-full xl:w-2/3">
            <UploadPassportButton />
            <UploadPortraitButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModalV2;
