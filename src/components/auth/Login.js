import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const Login = ({
  colorModeColors,
  API_URL,
  userWasModified,
  setUserWasModified,
}) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const handleFormChange = (e) => {
    const key = String(e.target.id).split("-")[1];
    setLoginDetails({ ...loginDetails, [key]: e.target.value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginDetails.username === "" || loginDetails.password === "") {
      toast.error(t("toast.error.emptyFields"));
      return;
    }
    for (const key in loginDetails) {
      loginDetails[key] = loginDetails[key].trim();
    }
    axios
      .post(`${API_URL}/auth/login`, loginDetails)
      .then((res) => {
        if (res.status === 200) {
          setLoginDetails({
            username: "",
            password: "",
          });
          const token = res.data;
          const decoded = jwtDecode(token);
          const user = {
            username: decoded.sub,
            roles: decoded.roles,
            token: token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setUserWasModified(-1 * userWasModified);
          toast.success(t("toast.success.login"));
          navigate("/");
          localStorage.setItem("activeNav", "homeNav");
          console.log(localStorage.getItem("activeNav"));
        }
      })
      .catch((err) => {
        toast.error(t("toast.error.auth.invalidCredentials"));
      });
  };
  const navigateToRegister = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
    navigate("/register");
  };
  return (
    <div
      id="login"
      className="w-full h-full flex flex-col justify-center items-center pt-12 pb-56"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <Toaster data-testid={"login-toaster"} />
      <div
        className="text-4xl font-inter font-bold select-none p-12 flex flex-col items-center gap-12 2xl:w-1/3 xl:w-1/2 lg:w-2/3 h-full"
        style={{ color: colorModeColors.title }}
      >
        <span data-testid={"login-title"}>{t("loginPage.title")}</span>
        <form
          className="w-full flex flex-col gap-3 h-full"
          onSubmit={handleLoginSubmit}
          onChange={handleFormChange}
        >
          <label
            htmlFor="login-username"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("loginPage.username")}
          </label>
          <input
            type="text"
            id="login-username"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"login-username"}
          />
          <label
            htmlFor="login-password"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            {t("loginPage.password")}
          </label>
          <input
            type="password"
            id="login-password"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-creme"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
            data-testid={"login-password"}
          />
          <button
            className="mt-5 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl text-black text-base focus:ring-4 focus:ring-lightCreme focus:ring-opacity-80 focus:outline-none"
            type="submit"
            data-testid={"login-button"}
          >
            {t("loginPage.submit")}
          </button>
          <span className="text-base font-normal flex gap-2 justify-center">
            <span>{t("loginPage.newUser.question")}</span>
            <a
              className="font-bold hover:cursor-pointer"
              onClick={navigateToRegister}
              data-testid={"register-link"}
            >
              {t("loginPage.newUser.link")}
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
