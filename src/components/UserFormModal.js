import { React, useState } from "react";
import SimpleTextInput from "./SimpleTextInput";
import GenderSelector from "./GenderSelector";
import ErrorPanel from "./ErrorPanel";
import axios from "axios";
import CustomButton from "./CustomButton";

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
  passportIsValidating,
  passportIsValid,
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
                    labelText={"First name"}
                    name={"firstName"}
                    id={"firstName"}
                    placeholderValue={"John"}
                    isThereError={false}
                  />
                  <SimpleTextInput
                    labelText={"Last name"}
                    name={"lastName"}
                    id={"lastName"}
                    placeholderValue={"Doe"}
                    isThereError={false}
                  />
                  {idPhoto && !fillingWasSuccessful ? (
                    <div>
                      {isFillingData ? (
                        <CustomButton
                          isLoading={true}
                          loadingText={"Filling..."}
                        />
                      ) : (
                        <CustomButton
                          text={"Fill data from passport"}
                          isLoading={false}
                          isDisabled={false}
                          disabledText={""}
                          loadingText={""}
                          handleButtonClick={handleFillFormData}
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      {fillingWasSuccessful ? (
                        <CustomButton
                          isLoading={false}
                          isDisabled={true}
                          disabledText={"Successfully filled!"}
                          loadingText={""}
                        />
                      ) : (
                        <CustomButton
                          isLoading={false}
                          isDisabled={true}
                          disabledText={"Fill data from passport"}
                          loadingText={""}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-5">
                  <SimpleTextInput
                    labelText={"Birthdate"}
                    name={"birthDate"}
                    id={"birthDate"}
                    placeholderValue={"2005-05-15"}
                    isThereError={false}
                  />
                  <GenderSelector isErrorPresent={false} />
                </div>
                <SimpleTextInput
                  labelText={"Place of birth"}
                  placeholderValue={"Hungary"}
                  id={"placeOfBirth"}
                  name={"placeOfBirth"}
                  isThereError={false}
                />
                <SimpleTextInput
                  labelText={"Country of citizenship"}
                  placeholderValue={"Hungary"}
                  id={"countryOfCitizenship"}
                  name={"countryOfCitizenship"}
                  isThereError={false}
                />
              </div>
              <div className="masodik-oszlop flex-col">
                <SimpleTextInput
                  labelText={"Passport number"}
                  placeholderValue={"123456789"}
                  id={"passportNumber"}
                  name={"passportNumber"}
                  isErrorPresent={false}
                />
                <SimpleTextInput
                  labelText={"Passport date of expiry"}
                  placeholderValue={"1979-12-31"}
                  id={"passportDateOfExpiry"}
                  name={"passportDateOfExpiry"}
                  isErrorPresent={false}
                />
                <SimpleTextInput
                  labelText={"Passport date of issue"}
                  placeholderValue={"1979-12-31"}
                  id={"passportDateOfIssue"}
                  name={"passportDateOfIssue"}
                  isErrorPresent={false}
                />
              </div>
            </div>
            <div className="flex gap-x-2 flex-row items-center">
              {isSaving ? (
                <CustomButton
                  buttonType={"button"}
                  text={"Save"}
                  isLoading={true}
                  isDisabled={true}
                  disabledText={""}
                  loadingText={"Saving..."}
                />
              ) : (
                <CustomButton
                  buttonType={"submit"}
                  text={"Save"}
                  isLoading={false}
                  isDisabled={false}
                  disabledText={""}
                  loadingText={""}
                />
              )}

              {idPhoto && !passportIsValid ? (
                <CustomButton
                  buttonType={"button"}
                  text={"Validate passport"}
                  isLoading={false}
                  isDisabled={false}
                  disabledText={""}
                  loadingText={""}
                  handleButtonClick={validatePassport}
                />
              ) : (
                <div>
                  {passportIsValid ? (
                    <CustomButton
                      isLoading={false}
                      isDisabled={true}
                      disabledText={"Passport is valid!"}
                      loadingText={""}
                    />
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
                        className="text-white bg-uniGreen hover:bg-uniGreenLight focus:ring-4 focus:outline-none focus:ring-uniGreenLight font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-uniGreenLight dark:hover:bg-uniGreenLight dark:focus:ring-uniGreenLight hover:cursor-pointer"
                      >
                        Upload passport
                      </label>
                    </div>
                  )}
                </div>
              )}
              {selfiePhoto && !selfieIsValid ? (
                <CustomButton
                  text={"Validate portrait"}
                  isLoading={false}
                  isDisabled={false}
                  disabledText={""}
                  loadingText={""}
                  handleButtonClick={handleSelfieValidation}
                />
              ) : (
                <div>
                  {selfieIsValid ? (
                    <CustomButton
                      isLoading={false}
                      isDisabled={true}
                      disabledText={"Selfie is valid!"}
                      loadingText={""}
                    />
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
                        className="text-white bg-uniGreen hover:bg-uniGreenLight focus:ring-4 focus:outline-none focus:ring-uniGreenLight font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-uniGreenLight dark:hover:bg-uniGreenLight dark:focus:ring-uniGreenLight hover:cursor-pointer"
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
