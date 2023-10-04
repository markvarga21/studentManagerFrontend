import { React, useState } from "react";
import SimpleTextInput from "./SimpleTextInput";
import GenderSelector from "./GenderSelector";
import ErrorPanel from "./ErrorPanel";
import axios from "axios";

function UserFormModal({
  title,
  closeModal,
  handleFormChange,
  handleFormSubmit,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
  isSaving,
  isErrorPresent,
  errorMessage,
  idPhoto,
  selfiePhoto,
  handleFillFormData,
  setSelfiePhoto,
  isFillingData,
  fillingWasSuccessful,
  validatePassport,
  actualUser,
  setSelfieIsValid,
  selfieIsValid,
}) {
  const [validationLabelText, setValidationLabelText] = useState(
    "Photo is not validated yet"
  );
  const [isValidating, setIsValidating] = useState(false);
  const staticPhotoUrl =
    "https://www.gravatar.com/avatar/447eccb3e9777173f1efc80d8e100e96.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg";
  const [photoToShowUrl, setPhotoToShowUrl] = useState(
    selfiePhoto === null ? staticPhotoUrl : URL.createObjectURL(selfiePhoto)
  );
  const showPassport = (event) => {
    event.preventDefault();
    setPhotoToShowUrl(URL.createObjectURL(idPhoto));
  };

  const showSelfie = (event) => {
    event.preventDefault();
    if (selfiePhoto === null) {
      alert("No selfie photo uploaded yet.");
      return;
    }
    setPhotoToShowUrl(URL.createObjectURL(selfiePhoto));
  };

  const handleSelfieValidation = (event) => {
    event.preventDefault();

    const formToSend = new FormData();
    formToSend.append("passport", idPhoto);
    formToSend.append("selfiePhoto", selfiePhoto);
    formToSend.append("firstName", actualUser.firstName);
    formToSend.append("lastName", actualUser.lastName);

    setIsValidating(true);
    axios
      .post("http://localhost:8080/api/v1/faces/validate", formToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const message = res.data;
        if (message.isValid) {
          setValidationLabelText(
            `\u2705 Photo is ${Number(message.proba) * 100}% similar`
          );
          setIsValidating(false);
          setSelfieIsValid(true);
        } else {
          setValidationLabelText(`\u274C Faces are not similar`);
          setSelfiePhoto(null);
          setIsValidating(false);
        }
      })
      .catch((err) => {
        setValidationLabelText(`\u274C Faces are not similar`);
        console.error(err);
      });
  };

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
              {title}
            </h3>
          </div>

          <form
            className="space-y-6"
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <div className="">
                <div className="flex space-x-5 items-center">
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
                  {idPhoto && !fillingWasSuccessful ? (
                    <div>
                      {isFillingData ? (
                        <button
                          disabled
                          className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-white-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="#1C64F2"
                            />
                          </svg>
                          Filling...
                        </button>
                      ) : (
                        <button
                          onClick={handleFillFormData}
                          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Fill data from passport
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {fillingWasSuccessful ? (
                        <button
                          disabled
                          className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Successfully filled!
                        </button>
                      ) : (
                        <button
                          disabled
                          className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Fill data from passport
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-5">
                  <SimpleTextInput
                    type={"text"}
                    labelText={"Birthdate"}
                    htmlFor={"birthDate"}
                    name={"birthDate"}
                    id={"birthDate"}
                    placeholder={"2005-05-15"}
                  />
                  <GenderSelector />
                </div>
                <SimpleTextInput
                  type={"text"}
                  htmlFor={"placeOfBirth"}
                  labelText={"Place of birth"}
                  placeholder={"Hungary"}
                  id={"placeOfBirth"}
                  name={"placeOfBirth"}
                />
                <SimpleTextInput
                  type={"text"}
                  htmlFor={"countryOfCitizenship"}
                  labelText={"Country of citizenship"}
                  placeholder={"Hungary"}
                  id={"countryOfCitizenship"}
                  name={"countryOfCitizenship"}
                />
              </div>
              <div className="masodik-oszlop flex-col">
                <SimpleTextInput
                  type={"text"}
                  htmlFor={"passportNumber"}
                  labelText={"Passport number"}
                  placeholder={"123456789"}
                  id={"passportNumber"}
                  name={"passportNumber"}
                />
                <SimpleTextInput
                  type={"text"}
                  htmlFor={"passportDateOfExpiry"}
                  labelText={"Passport date of expiry"}
                  placeholder={"1979-12-31"}
                  id={"passportDateOfExpiry"}
                  name={"passportDateOfExpiry"}
                />
                <SimpleTextInput
                  type={"text"}
                  htmlFor={"passportDateOfIssue"}
                  labelText={"Passport date of issue"}
                  placeholder={"1979-12-31"}
                  id={"passportDateOfIssue"}
                  name={"passportDateOfIssue"}
                />
              </div>
            </div>
            <div className="flex gap-x-2 flex-row items-center">
              {isSaving ? (
                <button
                  disabled
                  type="button"
                  className="w-full py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Saving...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-15 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              )}
              <button
                className="w-15 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={closeModal}
              >
                Close without saving
              </button>
              {idPhoto ? (
                <button
                  className="w-15 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={validatePassport}
                >
                  Validate passport
                </button>
              ) : (
                <div>
                  <input
                    className="hidden"
                    type="file"
                    id="idPhoto"
                    onChange={handleIdPhotoChange}
                  />
                  <label
                    for="idPhoto"
                    className="w-15 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                  >
                    Upload passport
                  </label>
                </div>
              )}
              {selfiePhoto && !selfieIsValid ? (
                <button
                  onClick={handleSelfieValidation}
                  className="w-15 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Validate portrait
                </button>
              ) : (
                <div>
                  {selfieIsValid ? (
                    <button
                      disabled
                      type="button"
                      class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-gray-20focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600"
                    >
                      Selfie is valid!
                    </button>
                  ) : (
                    <div>
                      <input
                        className="hidden"
                        type="file"
                        id="selfiePhoto"
                        onChange={handleSelfiePhotoChange}
                      />
                      <label
                        for="selfiePhoto"
                        className="w-15 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                      >
                        Upload portrait
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex-col">
          <div className="flex-row">
            <label
              className="block mb-2 text-m text-gray-900 dark:text-white cursor-pointer italic hover:underline"
              onClick={showSelfie}
            >
              Show selfie
            </label>
            <label
              className="block mb-2 text-m text-gray-900 dark:text-white cursor-pointer italic hover:underline"
              onClick={showPassport}
            >
              Show passport
            </label>
          </div>
          {photoToShowUrl ? (
            <img
              src={photoToShowUrl}
              className="w-70"
              alt="User's ID or selfie photo."
            />
          ) : (
            <img
              src={staticPhotoUrl}
              className="w-30"
              alt="Static photo if non of the photos are shown."
            />
          )}

          <label className="block mb-2 text-m font-medium text-gray-900 dark:text-white">
            {validationLabelText}
          </label>
        </div>
        <div className="flex align-middle items-center flex-col p-2 space-y-5">
          {isErrorPresent ? (
            <ErrorPanel
              title={errorMessage.title}
              details={errorMessage.details}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
