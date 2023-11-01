import { React, useEffect, useState } from "react";
import SimpleTextInput from "../inputs/SimpleTextInput";
import GenderSelector from "../inputs/GenderSelector";
import CustomButton from "../buttons/CustomButton";
import CloseButton from "../buttons/CloseButton";
import RadioSelector from "../inputs/RadioSelector";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SaveIcon from "../icons/SaveIcon";

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
  actualUser,
  setSelfieIsValid,
  selfieIsValid,
  passportIsValidating,
  invalidFields,
  setInvalidFields,
  passportData,
  setFormData,
  handleEditFormChange,
  setIdPhoto,
  userWasValidated,
  setUserWasValidated,
  formData,
  setPassportData,
  handleInvalidPassport,
  userToEdit,
  setUserToEdit,
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

  const showSelfie = (event) => {
    if (selfiePhoto === null) {
      toast.error("No selfie uploaded yet.");
      return;
    }
    setPhotoToShowUrl(URL.createObjectURL(selfiePhoto));
  };

  useEffect(() => {
    if (selfiePhoto === null) {
      setPhotoToShowUrl(staticPhotoUrl);
    } else {
      setPhotoToShowUrl(URL.createObjectURL(selfiePhoto));
    }
  }, [selfiePhoto, staticPhotoUrl]);

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
          setSelfieIsValid(true);
        } else {
          toast.error(`Faces are not similar!\nConfidence: ${confidence}%`);
          setSelfiePhoto(null);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong when validating the photo!");
        setSelfiePhoto(null);
        console.error(err);
      });
  };

  useEffect(() => {
    const passportNumber = editUserInfo.passportNumber;
    axios
      .get(
        `http://localhost:8080/api/v1/files/${passportNumber}?imageType=PASSPORT`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        if (res.data) {
          const blob = new Blob([res.data], { type: "image/jpeg" });
          setIdPhoto(blob);
        } else {
          toast.error(`No passport found for number '${passportNumber}'!`);
        }
      })
      .catch((err) => console.error(err));

    axios
      .get(
        `http://localhost:8080/api/v1/files/${passportNumber}?imageType=SELFIE`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        if (res.data) {
          const blob = new Blob([res.data], { type: "image/jpeg" });
          setSelfiePhoto(blob);
        } else {
          toast.error(
            `No selfie found for passport number '${passportNumber}'!`
          );
        }
      })
      .catch((err) => console.error(err));
  }, [editUserInfo]);

  const validateUserManually = (event) => {
    axios
      .post(
        `http://localhost:8080/api/v1/validations/validateManually?passportNumber=${editUserInfo.passportNumber}`
      )
      .then((res) => {
        console.log(res);
        toast.success("User successfully validated manually!");
        setUserWasValidated(-1 * userWasValidated);
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const [passportWasValidated, setPassportWasValidated] = useState(false);
  const validatePassport = (e) => {
    e.preventDefault();

    console.log("Validating passport for user: " + JSON.stringify(userToEdit));

    setPassportWasValidated(true);

    const validationLoading = toast.loading("Validating passport...");
    axios
      .post("http://localhost:8080/api/v1/validations/validate", userToEdit)
      .then((res) => {
        const valid = res.data.isValid;
        if (valid) {
          toast.success("Passport is valid!");
          toast.dismiss(validationLoading);

          axios
            .post(
              `http://localhost:8080/api/v1/validations/validateManually?passportNumber=${userToEdit.passportNumber}`
            )
            .then(() => {
              setUserWasValidated(-1 * userWasValidated);
              closeModal();
            });
        } else {
          toast.error("Passport is not valid!");
          toast.dismiss(validationLoading);
          const passportData = res.data.studentDto;
          console.log(passportData);
          setPassportData(passportData);
          handleInvalidPassport(passportData);
        }
      })
      .catch((err) => {
        toast.dismiss(validationLoading);
        const response = err.response.data;
        const message = response.message;
        const percentage = Math.round(100 * response.percentage);
        toast.error(message + "\n" + percentage + "%");
      });
  };

  const handleEditFormClose = (event) => {
    setPassportWasValidated(false);
    setInvalidFields({
      firstName: false,
      lastName: false,
      birthDate: false,
      placeOfBirth: false,
      countryOfCitizenship: false,
      gender: false,
      passportNumber: false,
      passportDateOfExpiry: false,
      passportDateOfIssue: false,
    });
    closeModal();
  };

  const [faceValidityMessage, setFaceValidityMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/facialValidations/${editUserInfo.passportNumber}`
      )
      .then((res) => {
        const data = res.data;
        const percentage = Math.round(100 * data.percentage);
        const valid = data.isValid;
        if (valid) {
          const message = `\u2705 Photo is ${percentage}% similar!`;
          setFaceValidityMessage(message);
        } else {
          const message = `\u274C Photos are only ${percentage}% similar!`;
          setFaceValidityMessage(message);
        }
      })
      .catch(() => {
        setFaceValidityMessage("\u274C Photo is not yet validated!");
      });
  }, [editUserInfo]);

  return (
    <div
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="flex border-t-8 border-uniGreen bg-white shadow lg:w-11/12 2xl:w-8/12 p-10 justify-evenly">
        <div className="flex flex-col space-y-8">
          <h2 className="font-bold text-3xl">{title}</h2>
          <SimpleTextInput
            type={"text"}
            width={"full"}
            labelText={"First name"}
            name={"firstName"}
            id={"firstName"}
            placeholderValue={"John"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.firstName}
            editFormData={editUserInfo}
          />
          <SimpleTextInput
            type={"text"}
            width={"full"}
            labelText={"Last name"}
            name={"lastName"}
            id={"lastName"}
            placeholderValue={"Doe"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.lastName}
            editFormData={editUserInfo}
          />
          <div className="flex">
            <SimpleTextInput
              type={"text"}
              width={"3/4"}
              labelText={"Birthdate"}
              name={"birthDate"}
              id={"birthDate"}
              placeholderValue={"2005-05-15"}
              handleInputChange={handleEditFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setEditFormData={setUserToEdit}
              customValue={editUserInfo.birthDate}
              editFormData={editUserInfo}
            />
            <GenderSelector
              type={"text"}
              width={"3/4"}
              labelText={"Gender"}
              placeholderValue={"Male"}
              id={"gender"}
              name={"gender"}
              handleInputChange={handleEditFormChange}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setEditFormData={setUserToEdit}
              selectedOption={editUserInfo.gender}
              editFormData={editUserInfo}
            />
          </div>
          <SimpleTextInput
            type={"text"}
            width={"full"}
            labelText={"Place of Birth"}
            name={"placeOfBirth"}
            id={"placeOfBirth"}
            placeholderValue={"Hungary"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.placeOfBirth}
            editFormData={editUserInfo}
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

        <div className="flex flex-col items-center space-y-8">
          <div className="h-8"></div>
          <SimpleTextInput
            type={"text"}
            width={"3/4"}
            labelText={"Country of citizenship"}
            placeholderValue={"Hungary"}
            id={"countryOfCitizenship"}
            name={"countryOfCitizenship"}
            handleInputChange={handleEditFormChange}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.countryOfCitizenship}
            editFormData={editUserInfo}
          />

          <SimpleTextInput
            type={"text"}
            width={"3/4"}
            labelText={"Passport number"}
            placeholderValue={"123456789"}
            id={"passportNumber"}
            name={"passportNumber"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.passportNumber}
            editFormData={editUserInfo}
          />
          <SimpleTextInput
            type={"text"}
            width={"3/4"}
            labelText={"Passport date of issue"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfIssue"}
            name={"passportDateOfIssue"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.passportDateOfIssue}
            editFormData={editUserInfo}
          />
          <SimpleTextInput
            type={"text"}
            width={"3/4"}
            labelText={"Passport date of expiry"}
            placeholderValue={"1979-12-31"}
            id={"passportDateOfExpiry"}
            name={"passportDateOfExpiry"}
            handleInputChange={handleEditFormChange}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            passportData={passportData}
            setEditFormData={setUserToEdit}
            customValue={editUserInfo.passportDateOfExpiry}
            editFormData={editUserInfo}
          />
          <div className="flex flex-col items-center">
            <div className="autoValidation">
              {passportWasValidated || userToEdit.valid ? (
                <CustomButton isDisabled={true} disabledText={"Validated!"} />
              ) : (
                <div>
                  <CustomButton
                    text={"Validate automatically"}
                    handleButtonClick={validatePassport}
                  />
                </div>
              )}
            </div>
            <div className="manualValidation">
              {!userToEdit.valid ? (
                <div
                  className="text-gray-700 italic hover:cursor-pointer hover:text-uniGreen hover:underline"
                  onClick={validateUserManually}
                >
                  Manual validation
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <div className="flex w-full justify-end">
            <CloseButton onButtonClick={handleEditFormClose} />
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
            className="object-scale-down h-64 hover:scale-150 hover:shadow-2xl transition duration-300 ease-in-out"
          />
          <div>{faceValidityMessage}</div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default UserEditFormModal;
