import React from "react";
import SimpleTextInput from "./SimpleTextInput";
import NationalityList from "./NationalityList";
import GenderSelector from "./GenderSelector";
import AddressInput from "./AddressInput";

function UserFormModal({
  closeModal,
  handleFormChange,
  handleFormSubmit,
  verifyIdentity,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
}) {
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-200 flex items-center">
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

          <form
            className="space-y-6"
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
          >
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
            <AddressInput addressType={"Birthplace"} />
            <NationalityList />
            <GenderSelector />
            <AddressInput addressType={"Address"} />
            <SimpleTextInput
              type={"tel"}
              htmlFor={"phoneNumber"}
              labelText={"Phone number"}
              placeholder={"20 123 4567"}
              id={"phoneNumber"}
              name={"phoneNumber"}
            />
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        </div>
        <div className="flex align-middle items-center flex-col p-2 space-y-5">
          <div>
            <label className="block mb-2 text-m font-medium text-gray-900 dark:text-white">
              ID photo
            </label>
            <div class="mb-3">
              <input
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="idPhoto"
                onChange={handleIdPhotoChange}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-m font-medium text-gray-900 dark:text-white">
              Selfie
            </label>
            <div class="mb-3">
              <input
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="selfiePhoto"
                onChange={handleSelfiePhotoChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={verifyIdentity}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
