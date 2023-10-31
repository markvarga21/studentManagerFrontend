import { React, useEffect, useState } from "react";
import SimpleTextInput from "../inputs/SimpleTextInput";
import GenderSelector from "../inputs/GenderSelector";
import axios from "axios";
import CustomButton from "../buttons/CustomButton";
import RadioSelector from "../inputs/RadioSelector";
import CloseButton from "../buttons/CloseButton";
import toast, { Toaster } from "react-hot-toast";
import SaveIcon from "../icons/SaveIcon";
import ValidateIcon from "../icons/ValidateIcon";
import FillIcon from "../icons/FillIcon";

function UserFormModal({
  closeModal,
  handleFormChange,
  handleFormSubmit,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
  isSaving,
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
}) {
  const [isValidating, setIsValidating] = useState(false);
  const staticPhotoUrl = process.env.PUBLIC_URL + "/images/avatar.jpg";
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

  useEffect(() => {
    if (selfiePhoto === null) {
      setPhotoToShowUrl(staticPhotoUrl);
    } else {
      setPhotoToShowUrl(URL.createObjectURL(selfiePhoto));
    }
  }, [selfiePhoto, staticPhotoUrl]);

  const showSelfie = (event) => {
    if (selfiePhoto === null) {
      toast.error("No selfie uploaded yet.");
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

    const formToSend = new FormData();
    formToSend.append("passport", idPhoto);
    formToSend.append("selfiePhoto", selfiePhoto);

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
      <div className="border-t-8 border-uniGreen bg-white shadow lg:w-11/12 2xl:w-8/12 p-10 flex justify-evenly">
        <div className="flex flex-col space-y-8">
          <h2 className="font-bold text-3xl">Add new student</h2>
          <div className="flex gap-x-5 items-center">
            <div className="flex-col space-y-8">
              <SimpleTextInput
                type={"text"}
                width={"72"}
                labelText={"First name"}
                name={"firstName"}
                id={"firstName"}
                placeholderValue={"John"}
                handleInputChange={handleFormChange}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                passportData={passportData}
                setFormData={setFormData}
              />
              <SimpleTextInput
                type={"text"}
                width={"72"}
                labelText={"Last name"}
                name={"lastName"}
                id={"lastName"}
                placeholderValue={"Doe"}
                handleInputChange={handleFormChange}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                passportData={passportData}
                setFormData={setFormData}
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

          <div className="flex">
            <SimpleTextInput
              type={"text"}
              width={"72"}
              labelText={"Birthdate"}
              name={"birthDate"}
              id={"birthDate"}
              placeholderValue={"2005-05-15"}
              handleInputChange={handleFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
            />
            <GenderSelector
              type={"text"}
              width={"72"}
              labelText={"Gender"}
              placeholderValue={"Male"}
              id={"gender"}
              name={"gender"}
              handleInputChange={handleFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
            />
          </div>
          <SimpleTextInput
            type={"text"}
            width={"36"}
            labelText={"Place of Birth"}
            name={"placeOfBirth"}
            id={"placeOfBirth"}
            placeholderValue={"Hungary"}
            handleInputChange={handleFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
          />

          <div className="saveButton">
            {isSaving ? (
              <CustomButton
                buttonType={"button"}
                isLoading={true}
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
            handleInputChange={handleFormChange}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            passportData={passportData}
            setFormData={setFormData}
          />

          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport number"}
            placeholderValue={"123456789"}
            id={"passportNumber"}
            name={"passportNumber"}
            handleInputChange={handleFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
          />
          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport date of issue"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfIssue"}
            name={"passportDateOfIssue"}
            handleInputChange={handleFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
          />
          <SimpleTextInput
            type={"text"}
            width={"72"}
            labelText={"Passport date of expiry"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfExpiry"}
            name={"passportDateOfExpiry"}
            handleInputChange={handleFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setFormData={setFormData}
          />
          <div className="flex space-x-3">
            <div className="passportValidatorButton">
              {idPhoto === null ? (
                <div className="mt-2">
                  {" "}
                  <input
                    className="hidden"
                    type="file"
                    id="idPhoto"
                    onChange={handleIdPhotoChange}
                  />
                  <label
                    for="idPhoto"
                    className="text-white bg-uniGreen hover:bg-darkUniGreen font-medium rounded-lg text-sm px-5 py-3 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
                  >
                    Upload passport
                  </label>
                </div>
              ) : (
                <div className="mt-2">
                  {" "}
                  <input className="hidden" />
                  <label
                    for="idPhoto"
                    className="text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-3 text-center hover:cursor-not-allowed"
                  >
                    Upload passport
                  </label>
                </div>
              )}
            </div>
            <div className="selfieValidatorButton">
              {selfiePhoto === null ? (
                <div className="mt-2">
                  <input
                    className="hidden"
                    type="file"
                    id="selfiePhoto"
                    onChange={handleSelfiePhotoChange}
                  />
                  <label
                    for="selfiePhoto"
                    className="text-white bg-uniGreen hover:bg-darkUniGreen font-medium rounded-lg text-sm px-5 py-3 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
                  >
                    Upload selfie
                  </label>
                </div>
              ) : (
                <div className="mt-2">
                  <input className="hidden" />
                  <label
                    for="selfiePhoto"
                    className="text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-3 text-center hover:cursor-not-allowed"
                  >
                    Upload selfie
                  </label>
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

export default UserFormModal;
