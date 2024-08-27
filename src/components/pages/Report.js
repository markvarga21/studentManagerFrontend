import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../util/Loading";
import { useTranslation } from "react-i18next";

const Report = ({ colorModeColors, API_URL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject === "" || description === "") {
      toast.error(t("toast.error.emptyFields"));
      return;
    }
    const username = JSON.parse(localStorage.getItem("user")).username;
    setIsLoading(true);
    axios
      .post(
        `${API_URL}/report`,
        {
          username: username,
          subject: subject,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setSubject("");
        setDescription("");
        document.getElementById("report-subject").value = "";
        document.getElementById("report-description").value = "";
        toast.success(t("toast.success.report"));
      })
      .catch((err) => {
        setIsLoading(false);
        setSubject("");
        setDescription("");
        document.getElementById("report-subject").value = "";
        document.getElementById("report-description").value = "";
        toast.error(t("reportPage.error"));
        console.error(err);
      });
  };

  const [t, i18n] = useTranslation("global");
  return (
    <div
      id="report"
      className="w-full h-full flex flex-col justify-center items-center pt-12 pb-56"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      {isLoading ? <Loading text={t("reportPage.loading")} /> : <></>}
      <Toaster />
      <div
        className="text-4xl font-inter font-bold select-none p-12 flex flex-col items-center gap-12 w-1/2 h-full"
        style={{ color: colorModeColors.title }}
      >
        <span data-testid={"report-title"}>{t("reportPage.title")}</span>{" "}
        <form
          className="w-full flex flex-col gap-3 h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="report-subject" className="sr-only">
            {t("reportPage.subject")}
          </label>
          <input
            type="text"
            id="report-subject"
            className="block p-3 pl-6 text-base font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            placeholder={t("reportPage.subject")}
            onChange={handleSubjectChange}
            autoComplete="off"
          />
          <label htmlFor="report-description" className="sr-only">
            {t("reportPage.description")}
          </label>
          <textarea
            id="report-description"
            className="block p-3 pl-6 text-base font-inter font-medium text-gray-900 border-2 border-gray rounded-lg h-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            placeholder={t("reportPage.description")}
            onChange={handleDescriptionChange}
            autoComplete="off"
          ></textarea>
          <button
            className="mt-5 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl text-black text-base focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
            type="submit"
          >
            {t("reportPage.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
