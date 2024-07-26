import React, { useRef } from "react";
import UploadIconV2 from "../icons/UploadIconV2";

const UploadPassportButton = ({
  studentImages,
  setStudentImages,
  setSelectedOption,
  passportWasChanged,
  setPassportWasChanged,
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
        passport: URL.createObjectURL(file),
      });
      setSelectedOption("passport");
      setPassportWasChanged(-1 * passportWasChanged);
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
        id="uploadPassportButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
        onClick={handleButtonClick}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          {studentImages.passport ? "Change Passport" : "Upload Passport"}
        </span>
        <UploadIconV2 />
      </button>
    </div>
  );
};

export default UploadPassportButton;
