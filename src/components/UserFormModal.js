import React from "react";
import SimpleTextInput from "./SimpleTextInput";

function UserFormModal({ closeModal }) {
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-1/4">
        <div className="p-6 lg:p-8">
          <div className="flex">
            <h3 className="mb-10 text-xl font-light text-gray-900 dark:text-white">
              Add details of the user to save
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <form className="space-y-6" action="#">
            <div className="flex space-x-5">
              <SimpleTextInput
                type={"text"}
                labelText={"First name"}
                htmlFor={"firstName"}
                name={"firstName"}
                id={"firstName"}
                placeholder={"John"}
              />
              <SimpleTextInput
                type={"text"}
                labelText={"Last name"}
                htmlFor={"lastName"}
                name={"lastName"}
                id={"lastName"}
                placeholder={"Doe"}
              />
            </div>
            <SimpleTextInput
              type={"email"}
              labelText={"Email"}
              htmlFor={"email"}
              name={"email"}
              id={"email"}
              placeholder={"name@company.com"}
            />
            <SimpleTextInput
              type={"text"}
              labelText={"Birthdate"}
              htmlFor={"birthDate"}
              name={"birthDate"}
              id={"birthDate"}
              placeholder={"2005-05-15"}
            />
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
