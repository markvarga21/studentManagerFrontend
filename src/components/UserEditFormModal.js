import { React, useState } from "react";
import SimpleTextInput from "./SimpleTextInput";
import GenderSelector from "./GenderSelector";
import AddressInput from "./AddressInput";
import ErrorPanel from "./ErrorPanel";

function UserEditFormModal({
  title,
  closeModal,
  handleFormChange,
  handleFormSubmit,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
  isSaving,
  isErrorPresent,
  errorMessage,
  editUserInfo,
  idPhoto,
  selfiePhoto,
}) {
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
            <div>
              <div className="flex space-x-5">
                <SimpleTextInput
                  type={"text"}
                  labelText={"First name"}
                  htmlFor={"firstName"}
                  name={"firstName"}
                  id={"firstName"}
                  placeholder={"John"}
                  customValue={editUserInfo.firstName}
                />
                <SimpleTextInput
                  type={"text"}
                  labelText={"Last name"}
                  htmlFor={"lastName"}
                  name={"lastName"}
                  id={"lastName"}
                  placeholder={"Doe"}
                  customValue={editUserInfo.lastName}
                />
              </div>
              <div className="flex space-x-5">
                <SimpleTextInput
                  type={"text"}
                  labelText={"Birthdate"}
                  htmlFor={"birthDate"}
                  name={"birthDate"}
                  id={"birthDate"}
                  placeholder={"2005-05-15"}
                  customValue={editUserInfo.birthDate}
                />
                <GenderSelector customValue={editUserInfo.gender} />
              </div>
              <SimpleTextInput
                type={"text"}
                htmlFor={"placeOfBirth"}
                labelText={"Place of birth"}
                placeholder={"Hungary"}
                id={"placeOfBirth"}
                name={"placeOfBirth"}
                customValue={editUserInfo.placeOfBirth}
              />
              <SimpleTextInput
                type={"text"}
                htmlFor={"countryOfCitizenship"}
                labelText={"Country of citizenship"}
                placeholder={"Hungary"}
                id={"countryOfCitizenship"}
                name={"countryOfCitizenship"}
                customValue={editUserInfo.countryOfCitizenship}
              />
              <SimpleTextInput
                type={"text"}
                htmlFor={"passportNumber"}
                labelText={"Passport number"}
                placeholder={"123456789"}
                id={"passportNumber"}
                name={"passportNumber"}
                customValue={editUserInfo.passportNumber}
              />

              <SimpleTextInput
                type={"text"}
                htmlFor={"passportDateOfExpiry"}
                labelText={"Passport date of expiry"}
                placeholder={"1970-01-01"}
                id={"passportDateOfExpiry"}
                name={"passportDateOfExpiry"}
                customValue={editUserInfo.passportDateOfExpiry}
              />
              <SimpleTextInput
                type={"text"}
                htmlFor={"passportDateOfIssue"}
                labelText={"Passport date of issue"}
                placeholder={"1979-01-01"}
                id={"passportDateOfIssue"}
                name={"passportDateOfIssue"}
                customValue={editUserInfo.passportDateOfIssue}
              />
            </div>
            <div className="flex gap-x-3 items-center">
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
                  onClick={showPassport}
                >
                  Show passport
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
              {selfiePhoto ? (
                <></>
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
          </form>
        </div>
        <div className="flex-col">
          <label
            className="block mb-2 text-m text-gray-900 dark:text-white cursor-pointer italic hover:underline"
            onClick={showSelfie}
          >
            Show selfie
          </label>
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
            Static label under selfie
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

export default UserEditFormModal;
