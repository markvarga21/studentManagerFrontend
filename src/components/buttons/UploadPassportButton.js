import React, { useRef, useState } from "react";
import UploadIcon from "../icons/UploadIcon";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UploadPassportButton = ({
  studentImages,
  setStudentImages,
  setSelectedOption,
  passportWasChanged,
  setPassportWasChanged,
  passportData,
  setPassportData,
  API_URL,
  setIsLoading,
  setLoadingText,
  modified,
  setModified,
  student,
  setStudent,
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
        passport: file,
      });
      setSelectedOption("passport");
      setPassportWasChanged(-1 * passportWasChanged);
      extractDataFromPassport(file);
    } catch (error) {
      console.error(error);
    }
  };

  const extractDataFromPassport = (passport) => {
    setLoadingText("Extracting data from passport");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("passport", passport);
    axios
      .post(`${API_URL}/form/extractData`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to extract data from passport!");
          return;
        }
        fillFormDataFromPassport(res.data);
        setPassportData(res.data);
        const studentCopy = { ...res.data };
        delete studentCopy.id;
        delete studentCopy.valid;
        setStudent(studentCopy);
        console.log(student);
        setIsLoading(false);
        toast.success("Data extracted from passport successfully!");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to extract data from passport!");
      });
  };

  const fillFormDataFromPassport = (data) => {
    const fieldIdsToFill = [
      "firstName",
      "lastName",
      "gender",
      "birthDate",
      "placeOfBirth",
      "countryOfCitizenship",
      "passportNumber",
      "passportDateOfExpiry",
      "passportDateOfIssue",
    ];
    console.log(`Modified: ${modified}`);
    for (const fieldId of fieldIdsToFill) {
      const inputElement = document.getElementById(fieldId);
      // if ((inputElement.value === "" && !modified) || modified) {
      inputElement.value = data[fieldId];
      // }
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
        data-testid={"passport-input"}
      />
      <Toaster />
      <button
        id="uploadPassportButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
        onClick={handleButtonClick}
        data-testid={"uploadPassport-button"}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          {studentImages.passport ? "Change Passport" : "Upload Passport"}
        </span>
        <UploadIcon />
      </button>
    </div>
  );
};

export default UploadPassportButton;
