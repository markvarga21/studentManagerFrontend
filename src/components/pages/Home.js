import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = ({ user, colorModeColors }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/register");
  };
  const [t, i18n] = useTranslation("global");
  return (
    <div
      id="home"
      className="flex flex-col items-center justify-center w-full gap-10 font-inter pb-56"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <div
        className="w-fit text-5xl font-bold"
        style={{ color: colorModeColors.title }}
        data-testid={"home-title"}
      >
        {t("homePage.title")}
        {user && user !== undefined ? (
          <span>
            , <span className="text-darkCreme">{user.username}</span>!
          </span>
        ) : (
          "!"
        )}
      </div>
      {user && user !== undefined ? (
        <div className="flex flex-col justify-centeri items-center">
          {user.roles !== undefined && user.roles.includes("ADMIN") ? (
            <div
              className="w-2/3 text-center font-normal pt-4 text-lg"
              style={{ color: colorModeColors.tableContent }}
            >
              {t("homePage.adminDescription")}
            </div>
          ) : (
            <div
              className="w-2/3 text-center font-normal pt-4 text-lg"
              style={{ color: colorModeColors.tableContent }}
            >
              {t("homePage.userDescription")}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <div
            className="w-2/3 text-center font-normal pt-4 text-lg"
            style={{ color: colorModeColors.tableContent }}
          >
            {t("homePage.welcomeMessage")}
          </div>
          <div className="flex gap-7">
            <button
              className="pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl font-semibold"
              onClick={handleLoginClick}
              data-testid={"welcome-login-button"}
            >
              {t("homePage.login")}
            </button>
            <button
              className="pt-2 pb-2 pl-4 pr-4 border-2 rounded-xl hover:cursor-pointer"
              style={{
                borderColor: colorModeColors.buttonBorder,
                backgroundColor: colorModeColors.buttonBackGround,
                color: colorModeColors.buttonText,
              }}
              onClick={handleSignUpClick}
              data-testid={"welcome-register-button"}
            >
              {t("homePage.register")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
