import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const Register = ({ colorModeColors, API_URL }) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [userRegisterDetails, setUserRegisterDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const handleFormChange = (e) => {
    const key = String(e.target.id).split("-")[1];
    if (key === "passwordAgain") {
      return;
    }
    setUserRegisterDetails({ ...userRegisterDetails, [key]: e.target.value });
  };
  const navigateToLogin = () => {
    setUserRegisterDetails({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
    navigate("/login");
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [isWaiting, setIsWaiting] = useState(false);
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      userRegisterDetails.username === "" ||
      userRegisterDetails.email === "" ||
      userRegisterDetails.firstName === "" ||
      userRegisterDetails.lastName === "" ||
      userRegisterDetails.password === ""
    ) {
      toast.error(t("toast.error.emptyFields"));
      return;
    }
    for (const key in userRegisterDetails) {
      userRegisterDetails[key] = userRegisterDetails[key].trim();
    }
    userRegisterDetails.firstName = capitalizeFirstLetter(
      userRegisterDetails.firstName
    );
    userRegisterDetails.lastName = capitalizeFirstLetter(
      userRegisterDetails.lastName
    );
    for (const key in userRegisterDetails) {
      userRegisterDetails[key] = userRegisterDetails[key].trim();
    }
    userRegisterDetails.firstName = userRegisterDetails.firstName.toUpperCase();
    userRegisterDetails.lastName = userRegisterDetails.lastName.toUpperCase();
    axios
      .post(`${API_URL}/auth/register`, userRegisterDetails)
      .then((res) => {
        if (res.status === 200) {
          console.log(JSON.stringify(res.data));
          toast.success(t("toast.success.register"));
          setUserRegisterDetails({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          });
          setIsWaiting(true);
          navigate("/login");
          setIsWaiting(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(t("toast.error.auth.usernameTaken"));
      });
  };
  return (
    <div
      id="register"
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000, style: { width: "fit-content" } }}
      />
      <div
        className="text-4xl font-inter font-bold select-none p-12 flex flex-col items-center gap-12 2xl:w-1/3 xl:w-1/2 lg:w-2/3"
        style={{ color: colorModeColors.title }}
      >
        <span data-testid={"register-title"}>{t("registerPage.title")}</span>
        <form
          className="w-full flex flex-col gap-3 h-full"
          onSubmit={handleRegisterSubmit}
          onChange={handleFormChange}
        >
          <label
            htmlFor="register-username"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("registerPage.username")}
          </label>
          <input
            type="text"
            id="register-username"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"register-username"}
            disabled={isWaiting}
          />
          <label
            htmlFor="register-email"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("registerPage.email")}
          </label>
          <input
            type="email"
            id="register-email"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"register-email"}
            disabled={isWaiting}
          />
          <label
            htmlFor="register-firstName"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("registerPage.firstName")}
          </label>
          <input
            type="text"
            id="register-firstName"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"register-firstName"}
            disabled={isWaiting}
          />
          <label
            htmlFor="register-lastName"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("registerPage.lastName")}
          </label>
          <input
            type="text"
            id="register-lastName"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            data-testid={"register-lastName"}
            disabled={isWaiting}
          />
          <label
            htmlFor="register-password"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("registerPage.password")}
          </label>
          <input
            type="password"
            id="register-password"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"register-password"}
            disabled={isWaiting}
          />
          <button
            className={
              "mt-5 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl shadow-xl text-black text-base focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none "
            }
            type="submit"
            data-testid={"register-button"}
            disabled={isWaiting}
          >
            {isWaiting ? t("registerPage.submit.registering") : t("registerPage.submit.register")}
          </button>
          <span className="text-base font-normal flex gap-2 justify-center">
            <span>{t("registerPage.alreadyUser.question")}</span>
            <a
              className="font-bold hover:cursor-pointer"
              onClick={navigateToLogin}
            >
              {t("registerPage.alreadyUser.link")}
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
