import { React, useEffect, useState } from "react";
import SimpleTextInput from "../inputs/SimpleTextInput";
import CustomButton from "../buttons/CustomButton";
import RadioSelector from "../inputs/RadioSelector";
import CloseButton from "../buttons/CloseButton";
import toast, { Toaster } from "react-hot-toast";
import SaveIcon from "../icons/SaveIcon";
import UploadIcon from "../icons/UploadIcon";

function UserFormModal({
  closeModal,
  handleFormChange,
  handleFormSubmit,
  handleIdPhotoChange,
  handleSelfiePhotoChange,
  isSaving,
  idPhoto,
  selfiePhoto,
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
  whatWasChanged,
}) {
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

  return (
    <div
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      {isFillingData ? (
        <div
          id="freezePanel"
          className="bg-gray-800 bg-opacity-75 w-full h-full z-60 fixed"
        ></div>
      ) : (
        <> </>
      )}

      <div className="border-t-8 border-uniGreen bg-white shadow lg:w-11/12 2xl:w-8/12 p-10 flex justify-evenly">
        <div className="flex flex-col space-y-8">
          <h2 className="font-bold text-3xl">Add new student</h2>

          <SimpleTextInput
            type={"text"}
            width={"3/4"}
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
            width={"3/4"}
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

          <div className="flex">
            <SimpleTextInput
              type={"text"}
              width={"3/4"}
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
            <SimpleTextInput
              type={"text"}
              width={"3/4"}
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
            width={"3/4"}
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
            width={"3/4"}
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
            width={"3/4"}
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
            width={"3/4"}
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
            width={"3/4"}
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
          <div className="md:flex md:flex-col lg:flex lg:flex-col 2xl:flex 2xl:flex-row gap-3">
            <div className="passportValidatorButton">
              {idPhoto === null ? (
                <div className="pr-2 flex bg-uniGreen justify-center content-center hover:bg-darkUniGreen rounded-lg">
                  {" "}
                  <input
                    className="hidden"
                    type="file"
                    id="idPhoto"
                    onChange={handleIdPhotoChange}
                  />
                  <label
                    for="idPhoto"
                    className="text-white font-medium text-sm pl-5 pr-2 py-3 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
                  >
                    Upload passport
                  </label>
                  <UploadIcon isDisabled={false} />
                </div>
              ) : (
                <div>
                  <div className="pr-2 flex bg-gray-500 justify-center content-center rounded-lg">
                    {" "}
                    <input className="hidden" />
                    <label
                      for="idPhoto"
                      className="text-white font-medium text-sm px-5 py-3 text-center hover:cursor-not-allowed"
                    >
                      Upload passport
                    </label>
                    <UploadIcon idDisabled={true} />
                  </div>
                </div>
              )}
            </div>
            <div className="selfieValidatorButton">
              {selfiePhoto === null ? (
                <div className="pr-2 flex bg-uniGreen justify-center content-center hover:bg-darkUniGreen rounded-lg">
                  <input
                    className="hidden"
                    type="file"
                    id="selfiePhoto"
                    onChange={handleSelfiePhotoChange}
                  />
                  <label
                    for="selfiePhoto"
                    className="text-white font-medium text-sm px-5 py-3 text-center hover:cursor-pointer focus:ring-4 ring-lightUniGreen"
                  >
                    Upload selfie
                  </label>
                  <UploadIcon isDisabled={false} />
                </div>
              ) : (
                <div className="pr-2 flex bg-gray-500 justify-center content-center rounded-lg">
                  <input className="hidden" />
                  <label
                    for="selfiePhoto"
                    className="text-white font-medium text-sm px-5 py-3 text-center hover:cursor-not-allowed"
                  >
                    Upload selfie
                  </label>
                  <UploadIcon idDisabled={true} />
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
            whatWasChanged={whatWasChanged}
          />
          <img
            src={photoToShowUrl}
            alt="User not known."
            className="object-scale-down md:h-48 lg:h-56 2xl:h-64 shadow-2xl hover:shadow-2xl transition duration-500 ease-in-out"
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default UserFormModal;
