import { React, useState } from "react";
import SimpleTextInput from "./SimpleTextInput";
import GenderSelector from "./GenderSelector";
import axios from "axios";
import CustomButton from "./CustomButton";
import RadioSelector from "./RadioSelector";
import CloseButton from "./CloseButton";
import toast, { Toaster } from "react-hot-toast";

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
    if (idPhoto === null) {
      toast.error("No passport uploaded yet.");
      return;
    }
    setPhotoToShowUrl(URL.createObjectURL(idPhoto));
  };

  const showSelfie = (event) => {
    if (selfiePhoto === null) {
      toast.error("No portrait uploaded yet.");
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
          toast.success("Faces are similar!");
          setIsValidating(false);
          setSelfieIsValid(true);
        } else {
          toast.error("Faces are not similar!");
          setSelfiePhoto(null);
          setIsValidating(false);
        }
      })
      .catch((err) => {
        toast.error("Faces are similar!");
        console.error(err);
      });
  };

  return (
    <div
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="border-t-4 border-uniGreen bg-white rounded-2xl shadow dark:bg-white w-2/3 p-10 flex justify-evenly">
        <div className="flex flex-col space-y-8">
          <h2 className="font-bold text-3xl">Add new student</h2>
          <div className="flex space-x-20 items-center">
            <div className="flex-col space-y-8">
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
            </div>

            <div className="fillingButton">
              {idPhoto && !fillingWasSuccessful ? (
                <div>
                  {isFillingData ? (
                    <CustomButton isLoading={true} loadingText={"Filling..."} />
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
          </div>

          <div className="flex space-x-24">
            <SimpleTextInput
              labelText={"Birthdate"}
              name={"birthDate"}
              id={"birthDate"}
              placeholderValue={"2005-05-15"}
              isThereError={false}
            />
            <SimpleTextInput
              labelText={"Gender"}
              placeholderValue={"Male"}
              id={"gender"}
              name={"gender"}
              isThereError={false}
            />
          </div>
          <SimpleTextInput
            labelText={"Place of birth"}
            placeholderValue={"Hungary"}
            id={"placeOfBirth"}
            name={"placeOfBirth"}
            isThereError={false}
          />

          <div className="saveButton">
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
                handleButtonClick={handleFormSubmit}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="h-8"></div>
          <SimpleTextInput
            labelText={"Country of citizenship"}
            placeholderValue={"Hungary"}
            id={"countryOfCitizenship"}
            name={"countryOfCitizenship"}
            isThereError={false}
          />
          <SimpleTextInput
            labelText={"Passport number"}
            placeholderValue={"123456789"}
            id={"passportNumber"}
            name={"passportNumber"}
            isErrorPresent={false}
          />
          <SimpleTextInput
            labelText={"Passport date of issue"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfIssue"}
            name={"passportDateOfIssue"}
            isErrorPresent={false}
          />
          <SimpleTextInput
            labelText={"Passport date of expiry"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfExpiry"}
            name={"passportDateOfExpiry"}
            isErrorPresent={false}
          />
          <div className="flex space-x-3">
            <div className="passportValidatorButton">
              {idPhoto && !passportIsValid ? (
                <div>
                  {passportIsValidating === true ? (
                    <CustomButton
                      isLoading={true}
                      loadingText={"Validating..."}
                    />
                  ) : (
                    <CustomButton
                      text={"Validate passport"}
                      isLoading={false}
                      isDisabled={false}
                      disabledText={""}
                      loadingText={""}
                      handleButtonClick={validatePassport}
                    />
                  )}
                </div>
              ) : (
                <div>
                  {passportIsValid ? (
                    <div>
                      {" "}
                      <CustomButton
                        isLoading={false}
                        isDisabled={true}
                        disabledText={"Passport is valid!"}
                        loadingText={""}
                      />
                    </div>
                  ) : (
                    <div>
                      {" "}
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
            </div>
            <div className="portraitValidatorButton">
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
          </div>
        </div>
        <div className="flex flex-col space-y-3 items-end">
          <div className="">
            <CloseButton onButtonClick={closeModal} />
          </div>
          <RadioSelector showSelfie={showSelfie} showPassport={showPassport} />
          <img
            src={photoToShowUrl}
            alt="User not known."
            className="object-scale-down w-64 hover:scale-150 shadow-2xl hover:shadow-2xl transition duration-500 ease-in-out"
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default UserFormModal;
