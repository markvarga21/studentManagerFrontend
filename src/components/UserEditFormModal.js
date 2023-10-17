import { React, useState } from "react";
import SimpleTextInput from "./SimpleTextInput";
import GenderSelector from "./GenderSelector";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";
import RadioSelector from "./RadioSelector";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SaveIcon from "./SaveIcon";
import ValidateIcon from "./ValidateIcon";
import FillIcon from "./FillIcon";

function UserEditFormModal({
  title,
  closeModal,
  handleFormSubmit,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
  isSaving,
  editUserInfo,
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
  invalidFields,
  setInvalidFields,
  passportData,
  setFormData,
  handleEditFormChange,
}) {
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

    if (idPhoto === null) {
      toast.error("No passport uploaded yet.");
      return;
    }

    if (editUserInfo.firstName === "" || editUserInfo.lastName === "") {
      toast.error("No first or last name provided.");
      return;
    }

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
        const isIdentical = message.isIdentical;
        const confidence = Math.round(message.confidence * 100);
        if (isIdentical) {
          toast.success(`Photo is ${confidence}% similar!`);
          setIsValidating(false);
          setSelfieIsValid(true);
        } else {
          toast.error(`Faces are not similar!\nConfidence: ${confidence}%`);
          setSelfiePhoto(null);
          setIsValidating(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong when validating the photo!");
        setIsValidating(false);
        setSelfiePhoto(null);
        console.error(err);
      });
  };
  return (
    <div
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="border-t-8 border-uniGreen bg-white shadow w-2/3 p-10 flex justify-evenly">
        <div className="flex flex-col space-y-8">
          <h2 className="font-bold text-3xl">{title}</h2>

          <div className="flex space-x-10 items-center">
            <div className="flex-col space-y-8">
              <SimpleTextInput
                type={"text"}
                width={"72"}
                labelText={"First name"}
                name={"firstName"}
                id={"firstName"}
                placeholderValue={"John"}
                handleInputChange={handleEditFormChange}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                passportData={passportData}
                setFormData={setFormData}
                customValue={editUserInfo.firstName}
              />
              <SimpleTextInput
                type={"text"}
                width={"72"}
                labelText={"Last name"}
                name={"lastName"}
                id={"lastName"}
                placeholderValue={"Doe"}
                handleInputChange={handleEditFormChange}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                passportData={passportData}
                setFormData={setFormData}
                customValue={editUserInfo.lastName}
              />
            </div>

            <div className="fillingButton">
              {idPhoto && !fillingWasSuccessful ? (
                <div>
                  {isFillingData ? (
                    <CustomButton isLoading={true} loadingText={"Filling..."} />
                  ) : (
                    <CustomButton
                      text={"Fill data"}
                      isLoading={false}
                      isDisabled={false}
                      disabledText={""}
                      loadingText={""}
                      handleButtonClick={handleFillFormData}
                      customIcon={<FillIcon />}
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
                      disabledText={"Fill data"}
                      loadingText={""}
                      customIcon={<FillIcon />}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-24">
            <SimpleTextInput
              type={"text"}
              width={"72"}
              labelText={"Birthdate"}
              name={"birthDate"}
              id={"birthDate"}
              placeholderValue={"2005-05-15"}
              handleInputChange={handleEditFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
              customValue={editUserInfo.birthDate}
            />
            <GenderSelector
              type={"text"}
              width={"72"}
              labelText={"Gender"}
              placeholderValue={"Male"}
              id={"gender"}
              name={"gender"}
              handleInputChange={handleEditFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
              selectedOption={editUserInfo.gender}
            />
          </div>
          <SimpleTextInput
            type={"text"}
            width={"36"}
            labelText={"Place of Birth"}
            name={"placeOfBirth"}
            id={"placeOfBirth"}
            placeholderValue={"Hungary"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
            customValue={editUserInfo.placeOfBirth}
          />

          <div className="saveButton">
            {isSaving ? (
              <CustomButton
                buttonType={"button"}
                isLoading={true}
                loadingText={"Updating..."}
              />
            ) : (
              <CustomButton
                buttonType={"submit"}
                text={"Update"}
                isLoading={false}
                isDisabled={false}
                disabledText={""}
                loadingText={""}
                handleButtonClick={handleFormSubmit}
                customIcon={<SaveIcon />}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="h-8"></div>
          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Country of citizenship"}
            placeholderValue={"Hungary"}
            id={"countryOfCitizenship"}
            name={"countryOfCitizenship"}
            handleInputChange={handleEditFormChange}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            passportData={passportData}
            setFormData={setFormData}
            customValue={editUserInfo.countryOfCitizenship}
          />

          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport number"}
            placeholderValue={"123456789"}
            id={"passportNumber"}
            name={"passportNumber"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
            customValue={editUserInfo.passportNumber}
          />
          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport date of issue"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfIssue"}
            name={"passportDateOfIssue"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
            customValue={editUserInfo.passportDateOfIssue}
          />
          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport date of expiry"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfExpiry"}
            name={"passportDateOfExpiry"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
            customValue={editUserInfo.passportDateOfExpiry}
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
                      customIcon={<ValidateIcon />}
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
                        className="text-white bg-uniGreen hover:bg-darkUniGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
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
                <div>
                  {isValidating ? (
                    <CustomButton
                      isLoading={true}
                      loadingText={"Validating..."}
                    />
                  ) : (
                    <CustomButton
                      text={"Validate portrait"}
                      isLoading={false}
                      isDisabled={false}
                      disabledText={""}
                      loadingText={""}
                      handleButtonClick={handleSelfieValidation}
                      customIcon={<ValidateIcon />}
                    />
                  )}
                </div>
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
                        className="text-white bg-uniGreen hover:bg-darkUniGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
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
        <div className="flex flex-col space-y-3 items-center">
          <div className="flex w-full justify-end">
            <CloseButton onButtonClick={closeModal} />
          </div>
          <RadioSelector
            showSelfie={showSelfie}
            selfiePhoto={selfiePhoto}
            showPassport={showPassport}
            idPhoto={idPhoto}
          />
          <img
            src={photoToShowUrl}
            alt="User not known."
            className="object-scale-down h-64 hover:scale-150 shadow-2xl hover:shadow-2xl transition duration-500 ease-in-out"
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default UserEditFormModal;
