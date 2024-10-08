import React, { useRef } from "react";
import UploadIcon from "../icons/UploadIcon";
import {useTranslation} from "react-i18next";

const UploadPortraitButton = ({
  studentImages,
  setStudentImages,
  setSelectedOption,
  portraitWasChanged,
  setPortraitWasChanged,
}) => {
  const [t, i18n] = useTranslation("global");
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
        data-testid={"portrait-input"}
      />
      <button
        id="uploadPortraitButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
        onClick={handleButtonClick}
        data-testid={"uploadPortrait-button"}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          {studentImages.portrait ? t("userModal.upload.replace.portrait") : t("userModal.upload.new.portrait")}
        </span>
        <UploadIcon />
      </button>
    </div>
  );
};

export default UploadPortraitButton;
