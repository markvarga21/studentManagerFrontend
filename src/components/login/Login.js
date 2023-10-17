import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import CustomButton from "../buttons/CustomButton";
import toast, { Toaster } from "react-hot-toast";
import SimpleTextInput from "../inputs/SimpleTextInput";

const Login = ({ setIsUserLogin, setLoginEmail, setDropdownOpen }) => {
  var validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email is empty!");
    } else if (password === "") {
      toast.error("Password is empty!");
    } else if (!email.match(validEmailRegex)) {
      toast.error("Invalid email!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginEmail(email);
          setIsUserLogin(true);
          setDropdownOpen(false);
          console.log(user);
          toast.success("Login successful!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          toast.error("Invalid login credentials!");
        });
    }
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-xl shadow flex justify-start">
        <div className="flex p-6">
          <form>
            <div>
              <h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Login
              </h3>
            </div>

            <div className="mb-4">
              <SimpleTextInput
                labelText={"Email"}
                type={"email"}
                placeholderValue={"name@domain.com"}
                handleInputChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <SimpleTextInput
                labelText={"Password"}
                type={"password"}
                placeholderValue={"●●●●●●●●●●"}
                handleInputChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <CustomButton
              text={"Login"}
              type={"submit"}
              isDisabled={false}
              isLoading={false}
              handleButtonClick={handleLogin}
            />
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
