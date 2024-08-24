import React from "react";
import ValidationIcon from "../icons/ValidationIcon";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {useTranslation} from "react-i18next";

const ValidationButtons = ({
  colors,
  API_URL,
  studentId,
  wasValidated,
  setWasValidated,
  handleAutomaticValidation,
}) => {
  const [t, i18n] = useTranslation("global");
  const handleManualValidation = () => {
    axios
      .get(`${API_URL}/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        const passportNumber = res.data.passportNumber;
        axios
          .post(
            `${API_URL}/validations/validateManually?studentId=${studentId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
              },
            }
          )
          .then(() => {
            axios
              .post(
                `${API_URL}/facialValidations/setFacialValidationDataToValid?passportNumber=${passportNumber}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${
                      JSON.parse(localStorage.getItem("user")).token
                    }`,
                  },
                }
              )
              .then(() => {
                setWasValidated(-1 * wasValidated);
                toast.success(t("toast.success.manualValidation"));
              })
              .catch((setFacialValidationErr) => {
                console.error(setFacialValidationErr);
              });
          })
          .catch((validateErr) => {
            console.error(validateErr);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex gap-3">
      <button
        id="validateManuallyButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-xl hover:cursor-pointer border-2 border-darkGray"
        onClick={handleManualValidation}
        data-testid={"manualValidation-button"}
      >
        <Toaster />
        <span
          className="font-inter font-normal select-none 2xl:text-base xl:text-base md:text-sm"
          style={{ color: colors.inputText }}
        >
          {t("userModal.validation.manual")}
        </span>
      </button>
      <button
        id="validateAutomaticallyButton"
        className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
        onClick={handleAutomaticValidation}
        data-testid={"automaticValidation-button"}
      >
        <span className="font-inter font-semibold select-none 2xl:text-base xl:text-base md:text-sm">
          {t("userModal.validation.auto")}
        </span>
        <ValidationIcon />
      </button>
    </div>
  );
};

export default ValidationButtons;
