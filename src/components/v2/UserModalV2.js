import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import SaveButtonV2 from "./SaveButtonV2";
import UploadPassportButton from "./UploadPassportButton";
import UploadPortraitButton from "./UploadPortraitButton";
import InputV2 from "./InputV2";
import DatePickerV2 from "./DatePickerV2";
import GenderSelectV2 from "./GenderSelectV2";
import RadioButtonGroupV2 from "./RadioButtonGroupV2";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Loading from "./Loading";

const UserModalV2 = ({
  mode,
  colorModeColors,
  studentId,
  setStudentId,
  modalTitle,
  buttonTitle,
  setIsEditActive,
  isAddStudentActive,
  setIsAddStudentActive,
  API_URL,
  setUser,
}) => {
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
      setActualImage({ ...studentImages, passport: studentImages.passport });
      setActualImage(studentImages.passport);
    } else {
      setActualImage("https://placehold.co/300.png?text=?");
    }
  }, [passportWasChanged, closeWasClicked]);

  useEffect(() => {
    if (studentImages.portrait !== null) {
      setActualImage({ ...studentImages, portrait: studentImages.portrait });
      setActualImage(studentImages.portrait);
    } else {
      setActualImage("https://placehold.co/300.png?text=?");
    }
  }, [portraitWasChanged, closeWasClicked]);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:5000/students/${studentId}`)
    //   .then((res) => {
    //     setStudent(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [studentId]);

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
    document.getElementById("passportDateOfIssue").value = student.dateOfIssue;
    document.getElementById("passportDateOfExpiry").value =
      student.dateOfExpiry;
    document.getElementById("gender").value = student.gender;
  }, [studentId]);

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

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (checkEmptyFields()) {
      toast.error("Please fill in all fields, and upload both pictures.");
      return;
    }
    setLoadingText("Saving data");
    setIsLoading(true);
    // Saving student
    axios
      .post(`${API_URL}/students`, student, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
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
                setIsAddStudentActive(false);
                toast.success(`Student with id '${savedStudentId}' saved!`);
              })
              .catch((err) => {
                console.error(err);
                console.log("Error saving images");
                setIsLoading(false);
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
  const [loadingText, setLoadingText] = useState("Loading");

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
        className="w-4/6 h-fit p-12 flex flex-col gap-8 rounded-xl overflow-auto"
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
          <span style={{ color: colorModeColors.title }}>{modalTitle}</span>
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
            <InputV2
              id={"firstName"}
              label={"First Name"}
              colorModeColors={colorModeColors}
              placeholder={"John"}
              onChange={handleFormChange}
            />
            <InputV2
              id={"lastName"}
              label={"Last Name"}
              colorModeColors={colorModeColors}
              placeholder={"Doe"}
              onChange={handleFormChange}
            />
            <div className="flex gap-2 justify-stretch">
              <DatePickerV2
                id={"birthDate"}
                label={"Birthdate"}
                colorModeColors={colorModeColors}
                onChange={handleFormChange}
              />
              <GenderSelectV2
                id={"gender"}
                label={"Gender"}
                colorModeColors={colorModeColors}
                onChange={handleFormChange}
              />
            </div>
            <InputV2
              id="placeOfBirth"
              label="Place of Birth"
              colorModeColors={colorModeColors}
              placeholder={"New York"}
              onChange={handleFormChange}
            />
          </div>
          <div
            id="middle"
            className="flex-grow w-full xl:w-auto flex flex-col gap-3"
          >
            <InputV2
              id={"countryOfCitizenship"}
              label={"Country of Citizenship"}
              colorModeColors={colorModeColors}
              placeholder={"USA"}
              onChange={handleFormChange}
            />
            <InputV2
              id={"passportNumber"}
              label={"Passport number"}
              colorModeColors={colorModeColors}
              placeholder={"123456789"}
              onChange={handleFormChange}
            />
            <DatePickerV2
              id={"passportDateOfIssue"}
              label={"Date of issue"}
              colorModeColors={colorModeColors}
              onChange={handleFormChange}
            />
            <DatePickerV2
              id={"passportDateOfExpiry"}
              label={"Date of expiry"}
              colorModeColors={colorModeColors}
              onChange={handleFormChange}
            />
          </div>
          <div
            id="right"
            className="flex-grow w-full xl:w-auto flex flex-col items-center justify-evenly gap-3"
          >
            <RadioButtonGroupV2
              colorModeColors={colorModeColors}
              studentImages={studentImages}
              setActualImage={setActualImage}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <img
              src={actualImage}
              alt="student"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        </form>
        <div
          id="buttonGroup"
          className="w-full flex justify-between gap-10 max-h-10"
        >
          <SaveButtonV2 buttonTitle={buttonTitle} onClick={handleSaveClick} />
          <div className="flex gap-3 justify-end md:w-full xl:w-2/3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModalV2;
