import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterV2 = ({ colorModeColors, API_URL }) => {
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
      toast.error("Please fill in all fields.");
      return;
    }

    axios
      .post(`${API_URL}/auth/register`, userRegisterDetails)
      .then((res) => {
        if (res.status === 200) {
          console.log(JSON.stringify(res.data));
          toast.success("Registration successful! Now please log in.");
          setUserRegisterDetails({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          });
          setIsWaiting(true);
          setTimeout(() => {
            navigate("/login");
            setIsWaiting(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
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
        <span>Sign up</span>
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
            Username
          </label>
          <input
            type="text"
            id="register-username"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <label
            htmlFor="register-email"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            Email
          </label>
          <input
            type="email"
            id="register-email"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <label
            htmlFor="register-firstName"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            First name
          </label>
          <input
            type="text"
            id="register-firstName"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <label
            htmlFor="register-lastName"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            Last name
          </label>
          <input
            type="text"
            id="register-lastName"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
          />
          <label
            htmlFor="register-password"
            className="text-base font-medium"
            style={{ color: colorModeColors.inputText }}
          >
            Password
          </label>
          <input
            type="password"
            id="register-password"
            className="block p-3 pl-6 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-full"
            style={{
              borderColor: colorModeColors.buttonBorder,
              backgroundColor: colorModeColors.buttonBackGround,
              color: colorModeColors.inputText,
            }}
            autoComplete="off"
          />
          <button
            className={
              "mt-5 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl shadow-xl text-black text-base " +
              (isWaiting ? "cursor-not-allowed" : "hover:cursor-pointer")
            }
            type="submit"
            disabled={isWaiting}
          >
            Register
          </button>
          <span className="text-base font-normal flex gap-2 justify-center">
            <span>Already have an account?</span>
            <a
              className="font-bold hover:cursor-pointer"
              onClick={navigateToLogin}
            >
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterV2;
