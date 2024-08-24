import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import SaveButton from "../buttons/SaveButton";
import UploadPassportButton from "../buttons/UploadPassportButton";
import UploadPortraitButton from "../buttons/UploadPortraitButton";
import Input from "../inputs/Input";
import DatePicker from "../inputs/DatePicker";
import GenderSelect from "../inputs/GenderSelect";
import RadioButtonGroup from "../buttons/RadioButtonGroup";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../util/Loading";
import ValidationButtons from "../buttons/ValidationButtons";
import {useTranslation} from "react-i18next";

const UserModal = ({
  mode,
  colorModeColors,
  studentId,
  setStudentId,
  modalTitle,
  buttonTitle,
  isEditActive,
  setIsEditActive,
  isAddStudentActive,
  setIsAddStudentActive,
  API_URL,
  setUser,
  studentUserWasModified,
  setStudentUserWasModified,
  setIsModalActive,
  wasValidated,
  setWasValidated,
  editSubmitted,
  setEditSubmitted,
}) => {
  const [t, i18n] = useTranslation("global");
  const [student, setStudent] = useState({
    id: studentId,
    firstName: "",
    lastName: "",
    birthDate: "",
    placeOfBirth: "",
    countryOfCitizenship: "",
    gender: "",
    passportNumber: "",
    passportDateOfIssue: "",
    passportDateOfExpiry: "",
  });
  const [studentImages, setStudentImages] = useState({
    portrait: null,
    passport: null,
  });

  const [actualImage, setActualImage] = useState(
    studentImages.portrait === null && studentImages.passport === null
      ? "https://placehold.co/300.png?text=?"
      : studentImages.portrait !== null
      ? studentImages.portrait
      : studentImages.passport
  );

  const handleCloseClick = () => {
    setPassportData({
      firstName: "",
      lastName: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      gender: "",
      passportNumber: "",
      passportDateOfIssue: "",
      passportDateOfExpiry: "",
    });
    setStudent({
      id: studentId,
      firstName: "",
      lastName: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      gender: "",
      passportNumber: "",
      passportDateOfIssue: "",
      passportDateOfExpiry: "",
    });
    setModified(false);
    if (mode === "edit") {
      editCleanup();
    } else {
      addCleanup();
    }
    setErrorFields(DEFAULT_ERROR_FIELDS);
  };

  const addCleanup = () => {
    setStudentImages({
      portrait: null,
      passport: null,
    });
    setStudent({
      id: studentId,
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      passportNumber: "",
      passportDateOfIssue: "",
      passportDateOfExpiry: "",
    });
    setCloseWasClicked(-1 * closeWasClicked);
    setIsAddStudentActive(false);
  };

  const editCleanup = () => {
    setStudentId(null);
    setStudentImages({
      portrait: null,
      passport: null,
    });
    setCloseWasClicked(-1 * closeWasClicked);
    setStudent({
      id: studentId,
      firstName: "",
      lastName: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      gender: "",
      passportNumber: "",
      passportDateOfIssue: "",
      passportDateOfExpiry: "",
    });
    setIsEditActive(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const [selectedOption, setSelectedOption] = useState("passport");
  const [passportWasChanged, setPassportWasChanged] = useState(0);
  const [portraitWasChanged, setPortraitWasChanged] = useState(1);
  const [closeWasClicked, setCloseWasClicked] = useState(1);

  useEffect(() => {
    if (studentImages.passport !== null) {
      setActualImage({
        ...studentImages,
        passport: URL.createObjectURL(studentImages.passport),
      });
      setActualImage(URL.createObjectURL(studentImages.passport));
    } else {
      setActualImage("https://placehold.co/300.png?text=?");
    }
  }, [passportWasChanged, closeWasClicked]);

  useEffect(() => {
    if (studentImages.portrait !== null) {
      setActualImage({
        ...studentImages,
        portrait: URL.createObjectURL(studentImages.portrait),
      });
      setActualImage(URL.createObjectURL(studentImages.portrait));
    } else {
      setActualImage("https://placehold.co/300.png?text=?");
    }
  }, [portraitWasChanged, closeWasClicked]);

  function base64ToBlob(base64) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
  }

  const [isFetchStudentWaiting, setIsFetchStudentWaiting] = useState(false);
  const [isFetchImagesWaiting, setIsFetchImagesWaiting] = useState(false);
  const [studentWasModified, setStudentWasModified] = useState(1);
  useEffect(() => {
    if (isEditActive) {
      console.log(`Loading student with id: ${studentId}`);
      setIsFetchImagesWaiting(true);
      setIsFetchStudentWaiting(true);
      axios
        .get(`${API_URL}/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((res) => {
          setStudent(res.data);
          setIsFetchStudentWaiting(false);
        })
        .catch((err) => {
          console.error(err);
        });

      axios
        .get(`${API_URL}/files/combined/${studentId}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((res) => {
          const portraitBytes = res.data.selfieImage;
          const passportBytes = res.data.passportImage;
          const portraitBlob = base64ToBlob(portraitBytes);
          const passportBlob = base64ToBlob(passportBytes);
          setStudentImages({
            portrait: portraitBlob,
            passport: passportBlob,
          });
          setIsFetchImagesWaiting(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [studentId, studentWasModified]);

  useEffect(() => {
    if (isEditActive) {
      if (isFetchStudentWaiting || isFetchImagesWaiting) {
        console.log("Edit loading started...");
      } else if (!isFetchStudentWaiting && !isFetchImagesWaiting) {
        console.log("Edit loading finished!");
      }
    }
  }, [isEditActive]);

  const handleFormChange = (e) => {
    const key = String(e.target.id);
    setStudent({ ...student, [key]: e.target.value });
    console.log(student);
  };

  useEffect(() => {
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("countryOfCitizenship").value =
      student.countryOfCitizenship;
    document.getElementById("placeOfBirth").value = student.placeOfBirth;
    document.getElementById("passportNumber").value = student.passportNumber;
    document.getElementById("birthDate").value = student.birthDate;
    document.getElementById("passportDateOfIssue").value =
      student.passportDateOfIssue;
    document.getElementById("passportDateOfExpiry").value =
      student.passportDateOfExpiry;
    document.getElementById("gender").value = student.gender;
  }, [student]);

  const checkEmptyFields = () => {
    for (const key in student) {
      if (student[key] === "") {
        console.log(`Empty field: ${key}`);
        return true;
      }
    }
    if (studentImages.portrait === null || studentImages.passport === null) {
      return true;
    }
    return false;
  };

  const handleStudentUpdate = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
        .then((res) => {
          const studentWithoutUpdate = res.data;
          const studentToUpdate = student;
          delete studentToUpdate.valid;
          delete studentWithoutUpdate.valid;
          if (JSON.stringify(studentWithoutUpdate) === JSON.stringify(studentToUpdate)) {
            toast.error(t("toast.error.updateWithNoModification"));
          } else {
            axios
                .put(`${API_URL}/students/${studentId}`, student, {
                  headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                  },
                })
                .then((res) => {
                  // setEditSubmitted(-1 * editSubmitted);
                  toast.success(t("toast.success.student.update"));
                  setStudentWasModified(-1 * studentWasModified);
                  setStudentUserWasModified(-1 * studentUserWasModified);
                  setIsModalActive(false);
                  setWasValidated(-1 * wasValidated);
                })
                .catch((err) => {
                  console.error(err);
                });
          }
        })
        .catch((err) => {console.error(err)});
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (checkEmptyFields()) {
      toast.error(t("toast.error.noFile"));
      return;
    }
    setLoadingText(t("loading.savingData"));
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const roles = user.roles.replace("[", "").replace("]", "").replace(" ", "");
    const username = user.username;
    for (const key in student) {
      student[key] = student[key].trim();
    }
    // Saving student
    axios
      .post(
        `${API_URL}/students?username=${username}&roles=${roles}`,
        student,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then((userRes) => {
        console.log(`Student data saved!`);
        console.log(`Passport data: ${passportData}`);
        // Saving passport validation
        axios
          .post(`${API_URL}/validations`, passportData, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          })
          .then(() => {
            console.log("Passport validation saved");
            // Saving images
            const passportBlob = new Blob([studentImages.passport]);
            const portraitBlob = new Blob([studentImages.portrait]);
            const imageForm = new FormData();
            if (studentImages.passport) {
              console.log(`Passport is ${studentImages.passport}`);
              imageForm.append("passport", passportBlob);
            } else {
              console.error("Passport image is missing");
            }
            if (studentImages.portrait) {
              console.log(`Portrait is ${studentImages.portrait}`);
              imageForm.append("selfie", portraitBlob);
            } else {
              console.error("Portrait image is missing");
            }
            console.log(imageForm);
            const studentId = userRes.data.id;
            const url = `${API_URL}/files/upload/${studentId}`;
            console.log(`Saving images for student with id: ${studentId}`);
            console.log(`URL: ${url}`);
            axios
              .post(`${API_URL}/files/upload/${studentId}`, imageForm, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                },
              })
              .then(() => {
                setIsLoading(false);
                setPassportWasChanged(-1 * passportWasChanged);
                setStudent({
                  id: studentId,
                  firstName: "",
                  lastName: "",
                  birthDate: "",
                  placeOfBirth: "",
                  countryOfCitizenship: "",
                  gender: "",
                  passportNumber: "",
                  passportDateOfIssue: "",
                  passportDateOfExpiry: "",
                });
                setPassportData({
                  firstName: "",
                  lastName: "",
                  birthDate: "",
                  placeOfBirth: "",
                  countryOfCitizenship: "",
                  gender: "",
                  passportNumber: "",
                  passportDateOfIssue: "",
                  passportDateOfExpiry: "",
                });
                setModified(false);
                const savedStudentId = userRes.data.id;
                setStudentImages({
                  portrait: null,
                  passport: null,
                });
                setStudent({
                  id: studentId,
                  firstName: "",
                  lastName: "",
                  gender: "",
                  birthDate: "",
                  placeOfBirth: "",
                  countryOfCitizenship: "",
                  passportNumber: "",
                  passportDateOfIssue: "",
                  passportDateOfExpiry: "",
                });
                setCloseWasClicked(-1 * closeWasClicked);
                setStudentUserWasModified(-1 * studentUserWasModified);
                setIsModalActive(false);
                setIsAddStudentActive(false);
                toast.success(t("toast.success.student.add"));
                console.log(`Add student modal is: ${isAddStudentActive}`);
              })
              .catch((err) => {
                console.error(err);
                console.log("Error saving images");
                setIsLoading(false);
                setIsAddStudentActive(false);
              });
          })
          .catch((err) => {
            console.error(err);
            console.log("Error saving passport validation");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        console.log("Error saving student");
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(t("loading.loading"));

  const [passportData, setPassportData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    placeOfBirth: "",
    countryOfCitizenship: "",
    gender: "",
    passportNumber: "",
    passportDateOfIssue: "",
    passportDateOfExpiry: "",
  });
  const [modified, setModified] = useState(false);

  const [facialValidity, setFacialValidity] = useState(
    t("facialValidation.notYetValidated")
  );
  useEffect(() => {
    const studentIdValue = studentId ? "/" + studentId : "";
    axios
      .get(`${API_URL}/students${studentIdValue}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((studentRes) => {
        const passportNumber = studentRes.data.passportNumber;
        axios
          .get(`${API_URL}/facialValidations/${passportNumber}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          })
          .then((res) => {
            const data = res.data;
            const roundedPercent = (data.percentage * 100).toFixed(2);
            const valid = data.isValid;
            if (valid) {
              const message = `\u2705 ${t("facialValidation.validPreText")} ${roundedPercent}% ${t("facialValidation.similarityText")}!`;
              setFacialValidity(message);
            } else {
              const message = `\u274C ${t("facialValidation.invalidPreText")} ${roundedPercent}% ${t("facialValidation.similarityText")}!`;
              setFacialValidity(message);
            }
          })
          .catch((err) => {
            setFacialValidity(`\u274C ${t("facialValidation.notYetValidated")}`);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isEditActive, wasValidated, studentWasModified]);

  const DEFAULT_ERROR_FIELDS = {
    firstName: {
      error: false,
      replacement: "",
    },
    lastName: {
      error: false,
      replacement: "",
    },
    birthDate: {
      error: false,
      replacement: "",
    },
    placeOfBirth: {
      error: false,
      replacement: "",
    },
    countryOfCitizenship: {
      error: false,
      replacement: "",
    },
    gender: {
      error: false,
      replacement: "",
    },
    passportNumber: {
      error: false,
      replacement: "",
    },
    passportDateOfIssue: {
      error: false,
      replacement: "",
    },
    passportDateOfExpiry: {
      error: false,
      replacement: "",
    },
  };
  const [errorFields, setErrorFields] = useState(DEFAULT_ERROR_FIELDS);
  const handleAutomaticValidation = () => {
    const studentJson = JSON.stringify(student);
    const passport = studentImages.passport;
    const formData = new FormData();
    formData.append("passport", passport);
    formData.append("studentJson", studentJson);
    setLoadingText(t("loading.validation"));
    setIsLoading(true);
    axios
      .post(`${API_URL}/validations/validate`, formData, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((autoRes) => {
        if (autoRes.data.isValid) {
          axios
            .post(
              `${API_URL}/validations/validateManually?studentId=${studentId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                },
              }
            )
            .then((vmRes) => {
              toast.success(t("toast.success.autoValidation"));
              setIsLoading(false);
              setWasValidated(-1 * wasValidated);
            })
            .catch((err) => {
              console.error(err);
              setIsLoading(false);
            });
        } else {
          const correctStudent = autoRes.data.studentDto;
          delete correctStudent.id;
          const keys = Object.keys(correctStudent);
          const errorTemp = errorFields;
          for (let key of keys) {
            const currentVal = student[key];
            const correctVal = correctStudent[key];
            if (currentVal !== correctVal) {
              if (correctVal !== "") {
                errorTemp[key].error = true;
                errorTemp[key].replacement = correctVal;
              }
            }
          }
          setWasValidated(-1 * wasValidated);
          setIsLoading(false);
          setLoadingText("");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  const acceptReplacement = (e) => {
    const id = e.target.className.split(" ")[0];
    console.log(id);
    const replacement = errorFields[id].replacement;
    document.getElementById(id).value = replacement;
    setStudent({ ...student, [id]: replacement });
    setErrorFields({ ...errorFields, [id]: { error: false, replacement: "" } });
  };
  return (
    <div
      id="outer"
      className="w-full h-full flex justify-center items-center z-20 absolute top-0 left-0"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(80, 80, 80, 0.4)",
      }}
    >
      <div
        id="userModal"
        className="w-4/6 h-fit max-h-[80%] p-12 flex flex-col gap-8 rounded-xl overflow-auto"
        style={{
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
          backgroundColor: colorModeColors.tableHeader,
        }}
      >
        {isLoading ? <Loading text={loadingText} /> : <></>}
        <div
          id="editTitle"
          className="font-bold 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl flex justify-between items-center"
        >
          <span
            style={{ color: colorModeColors.title }}
            data-testid={"addData-title"}
          >{modalTitle}</span>
          <CloseIcon
            color={colorModeColors.icon}
            handleClick={handleCloseClick}
          />
        </div>
        <form className="w-full h-full flex gap-6 flex-wrap">
          <div
            id="left"
            className="flex-grow w-full xl:w-auto flex flex-col gap-3"
          >
            <Input
              id={"firstName"}
              label={t("userModal.inputs.firstName.label")}
              colorModeColors={colorModeColors}
              placeholder={t("userModal.inputs.firstName.placeholder")}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"firstName"}
            />
            <Input
              id={"lastName"}
              label={t("userModal.inputs.lastName.label")}
              colorModeColors={colorModeColors}
              placeholder={t("userModal.inputs.firstName.placeholder")}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"lastName"}
            />
            <div className="flex gap-2 justify-stretch">
              <DatePicker
                id={"birthDate"}
                label={t("userModal.inputs.dateOfBirth.label")}
                colorModeColors={colorModeColors}
                onChange={handleFormChange}
                errorFields={errorFields}
                acceptReplacement={acceptReplacement}
                testId={"birthDate"}
              />
              <GenderSelect
                id={"gender"}
                label={t("userModal.inputs.gender.label")}
                colorModeColors={colorModeColors}
                onChange={handleFormChange}
                errorFields={errorFields}
                acceptReplacement={acceptReplacement}
                testId={"gender"}
              />
            </div>
            <Input
              id="placeOfBirth"
              label={t("userModal.inputs.placeOfBirth.label")}
              colorModeColors={colorModeColors}
              placeholder={t("userModal.inputs.placeOfBirth.placeholder")}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"placeOfBirth"}
            />
          </div>
          <div
            id="middle"
            className="flex-grow w-full xl:w-auto flex flex-col gap-3"
          >
            <Input
              id={"countryOfCitizenship"}
              label={t("userModal.inputs.countryOfCitizenship.label")}
              colorModeColors={colorModeColors}
              placeholder={t("userModal.inputs.countryOfCitizenship.placeholder")}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"countryOfCitizenship"}
            />
            <Input
              id={"passportNumber"}
              label={t("userModal.inputs.passportNumber.label")}
              colorModeColors={colorModeColors}
              placeholder={t("userModal.inputs.passportNumber.placeholder")}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"passportNumber"}
            />
            <DatePicker
              id={"passportDateOfIssue"}
              label={t("userModal.inputs.passportDateOfIssue.label")}
              colorModeColors={colorModeColors}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"passportDateOfIssue"}
            />
            <DatePicker
              id={"passportDateOfExpiry"}
              label={t("userModal.inputs.passportDateOfExpiry.label")}
              colorModeColors={colorModeColors}
              onChange={handleFormChange}
              errorFields={errorFields}
              acceptReplacement={acceptReplacement}
              testId={"passportDateOfExpiry"}
            />
          </div>
          <div
            id="right"
            className="flex-grow w-full xl:w-auto flex flex-col items-center justify-evenly gap-3"
          >
            <RadioButtonGroup
              colorModeColors={colorModeColors}
              studentImages={studentImages}
              setActualImage={setActualImage}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <img
              id="studentImage"
              src={actualImage}
              alt="Student images"
              className="w-48 h-48 object-cover rounded-lg"
            />
            {isEditActive ? (
              <div style={{ color: colorModeColors.inputText }} data-testid={"facial-validity"}>
                {facialValidity}
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
        <div
          id="buttonGroup"
          className="w-full flex justify-between gap-10 max-h-10"
        >
          <SaveButton
            buttonTitle={buttonTitle}
            onClick={isAddStudentActive ? handleSaveClick : handleStudentUpdate}
          />
          <div className="flex gap-3 justify-end md:w-full xl:w-2/3">
            {isEditActive ? (
              <>
                {JSON.parse(localStorage.getItem("user")).roles.includes(
                  "ROLE_ADMIN"
                ) ? (
                  <ValidationButtons
                    colors={colorModeColors}
                    API_URL={API_URL}
                    studentId={studentId}
                    wasValidated={wasValidated}
                    setWasValidated={setWasValidated}
                    handleAutomaticValidation={handleAutomaticValidation}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {" "}
                <UploadPassportButton
                  studentImages={studentImages}
                  setStudentImages={setStudentImages}
                  setSelectedOption={setSelectedOption}
                  passportWasChanged={passportWasChanged}
                  setPassportWasChanged={setPassportWasChanged}
                  passportData={passportData}
                  setPassportData={setPassportData}
                  API_URL={API_URL}
                  setIsLoading={setIsLoading}
                  setLoadingText={setLoadingText}
                  modified={modified}
                  setModified={setModified}
                  student={student}
                  setStudent={setStudent}
                />
                <UploadPortraitButton
                  studentImages={studentImages}
                  setStudentImages={setStudentImages}
                  setSelectedOption={setSelectedOption}
                  portraitWasChanged={portraitWasChanged}
                  setPortraitWasChanged={setPortraitWasChanged}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
