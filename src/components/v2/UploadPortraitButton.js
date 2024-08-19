import React, { useRef } from "react";
import UploadIconV2 from "../icons/UploadIconV2";

const UploadPortraitButton = ({
  studentImages,
  setStudentImages,
  setSelectedOption,
  portraitWasChanged,
  setPortraitWasChanged,
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      setStudentImages({
        ...studentImages,
        portrait: file,
      });
      setSelectedOption("portrait");
      setPortraitWasChanged(-1 * portraitWasChanged);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <button
        id="uploadPortraitButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
        onClick={handleButtonClick}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          {studentImages.portrait ? "Change Portrait" : "Upload Portrait"}
        </span>
        <UploadIconV2 />
      </button>
    </div>
  );
};

export default UploadPortraitButton;
