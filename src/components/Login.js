import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ setIsUserLogin, setLoginEmail, setDropdownOpen }) => {
  var validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email is empty!");
    } else if (password === "") {
      alert("Password is empty!");
    } else if (!email.match(validEmailRegex)) {
      alert("Invalid email!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginEmail(email);
          setIsUserLogin(true);
          setDropdownOpen(false);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          alert("Invalid login credentials!");
        });
    }
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-200 flex items-center">
        <div className="p-6 lg:p-8">
          <form>
            <div className="flex">
              <h3 className="mb-10 text-xl font-light text-gray-900 dark:text-white">
                Login
              </h3>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 h-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                placeholder="●●●●●●●●●●●●●"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 mt-1 block h-7 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
