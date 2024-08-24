import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {useTranslation} from "react-i18next";

const RadioButtonGroup = ({
  colorModeColors,
  studentImages,
  setActualImage,
  selectedOption,
  setSelectedOption,
}) => {
  const [t, i18n] = useTranslation("global");
  const handleOptionChange = (option) => {
    if (option === "passport" && studentImages.passport == null) {
      return;
    }
    if (option === "portrait" && studentImages.portrait == null) {
      return;
    }
    setSelectedOption(option);
    if (option === "passport") {
      setActualImage(URL.createObjectURL(studentImages.passport));
    } else {
      setActualImage(URL.createObjectURL(studentImages.portrait));
    }
  };

  useEffect(() => {
    if (studentImages.passport !== null) {
      setActualImage(URL.createObjectURL(studentImages.passport));
    } else {
      setActualImage("https://placehold.co/300.png?text=?");
    }
  }, [studentImages]);

  return (
    <div className="w-full flex gap-4 justify-center">
      <Toaster />
      <div
        className="pt-2 pb-2 pl-4 pr-4 font-semibold rounded-xl cursor-pointer"
        style={
          selectedOption === "passport"
            ? { backgroundColor: "#E1B77A" }
            : {
                backgroundColor: colorModeColors.radioBack,
                color: colorModeColors.radioText,
              }
        }
        onClick={() => handleOptionChange("passport")}
      >
        <input
          type="radio"
          id="passport"
          value="Passport"
          checked={selectedOption === "passport"}
          onChange={() => handleOptionChange("passport")}
          className="sr-only"
        />
        <label htmlFor="passport" className="cursor-pointer">
            {t("userModal.files.passport")}
        </label>
      </div>

      <div
        className="pt-2 pb-2 pl-4 pr-4 font-semibold rounded-xl cursor-pointer"
        style={
          selectedOption === "portrait"
            ? { backgroundColor: "#E1B77A" }
            : {
                backgroundColor: colorModeColors.radioBack,
                color: colorModeColors.radioText,
              }
        }
        onClick={() => handleOptionChange("portrait")}
      >
        <input
          type="radio"
          id="portrait"
          value="Portrait"
          checked={selectedOption === "portrait"}
          onChange={() => handleOptionChange("portrait")}
          className="sr-only"
        />
        <label htmlFor="portrait" className="cursor-pointer">
            {t("userModal.files.portrait")}
        </label>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
