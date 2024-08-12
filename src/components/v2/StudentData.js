import React, { useEffect, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import DataDisplayField from "./DataDisplayField";
import axios from "axios";
import UserModalV2 from "./UserModalV2";
import toast, { Toaster } from "react-hot-toast";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Validity from "./Validity";

const StudentData = ({
  colorModeColors,
  user,
  setIsAddStudentActive,
  API_URL,
  studentId,
  setStudentId,
  setUser,
}) => {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "-",
    lastName: "-",
    birthDate: "-",
    placeOfBirth: "-",
    countryOfCitizenship: "-",
    gender: "-",
    passportNumber: "-",
    passportDateOfIssue: "-",
    passportDateOfExpiry: "-",
  });
  const [userImages, setUserImages] = useState({
    passport: "https://placehold.co/300.png?text=?",
    selfie: "https://placehold.co/20.png?text=?",
  });

  function base64ToBlob(base64) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
  }

  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [studentUserWasModified, setStudentUserWasModified] = useState(1);
  useEffect(() => {
    setDataIsLoaded(false);
    axios
      .get(`${API_URL}/studentUser/${user.username}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        const studentId = res.data;
        axios
          .get(`${API_URL}/students/${studentId}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          })
          .then((res) => {
            setUserData(res.data);
            axios
              .get(`${API_URL}/files/combined/${res.data.id}`, {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                },
              })
              .then((imageRes) => {
                const passportImage = URL.createObjectURL(
                  base64ToBlob(imageRes.data.passportImage)
                );
                const selfieImage = URL.createObjectURL(
                  base64ToBlob(imageRes.data.selfieImage)
                );
                setUserImages({ passport: passportImage, selfie: selfieImage });
                setDataIsLoaded(true);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [studentUserWasModified]);
  const [isModalActive, setIsModalActive] = useState(false);

  const deleteStudent = () => {
    if (userData.id === "") {
      return;
    }
    const studentId = userData.id;
    axios
      .delete(`${API_URL}/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        setUserData({
          id: "",
          firstName: "-",
          lastName: "-",
          birthDate: "-",
          placeOfBirth: "-",
          countryOfCitizenship: "-",
          gender: "-",
          passportNumber: "-",
          passportDateOfIssue: "-",
          passportDateOfExpiry: "-",
        });
        setUserImages({
          passport: "https://placehold.co/300.png?text=?",
          selfie: "https://placehold.co/20.png?text=?",
        });
        toast.success("Student deleted successfully!");
        setStudentUserWasModified(-1 * studentUserWasModified);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      id="studentData"
      className="flex flex-col h-full w-full justify-center items-start"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <Toaster />
      {isModalActive && (
        <>
          {userData.id === "" ? (
            <UserModalV2
              mode={"add"}
              colorModeColors={colorModeColors}
              studentId={userData.id}
              setStudentId={setStudentId}
              modalTitle={"Add student"}
              buttonTitle={"Save"}
              isAddStudentActive={isModalActive}
              setIsAddStudentActive={setIsModalActive}
              API_URL={API_URL}
              setUser={setUser}
              studentUserWasModified={studentUserWasModified}
              setStudentUserWasModified={setStudentUserWasModified}
              setIsModalActive={setIsModalActive}
            />
          ) : (
            <UserModalV2
              mode={"edit"}
              colorModeColors={colorModeColors}
              studentId={userData.id}
              setStudentId={setStudentId}
              modalTitle={"Edit student"}
              buttonTitle={"Save changes"}
              isEditActive={isModalActive}
              setIsEditActive={setIsModalActive}
              API_URL={API_URL}
              setUser={setUser}
              studentUserWasModified={studentUserWasModified}
              setStudentUserWasModified={setStudentUserWasModified}
              setIsModalActive={setIsModalActive}
            />
          )}
        </>
      )}
      <div className="flex justify-between pl-32 w-5/6 items-center">
        <div
          id="title"
          className="text-4xl font-inter font-bold select-none"
          style={{ color: colorModeColors.title }}
        >
          <div className="flex items-start gap-2">
            <span>Student data</span>
            <Validity
              validity={userData.valid !== "" ? userData.valid : "Invalid"}
              colorModeColors={colorModeColors}
            />
          </div>
        </div>
        <div className="userInfo flex gap-3 items-center">
          <img
            src={userImages.selfie}
            alt="Selfie"
            className="w-16 h-16 object-cover rounded-full border-[3px] border-creme p-[2px]"
          />
        </div>
      </div>
      <div className="p-16 flex gap-16 ml-16 w-5/6">
        <div className="left flex flex-col gap-6 w-full">
          <DataDisplayField
            label="First name"
            content={userData.firstName}
            colors={colorModeColors}
          />
          <DataDisplayField
            label="Last name"
            content={userData.lastName}
            colors={colorModeColors}
          />
          <div className="flex gap-6 items-center">
            <DataDisplayField
              label="Birth date"
              content={userData.birthDate}
              colors={colorModeColors}
            />
            <DataDisplayField
              label={"Gender"}
              content={userData.gender}
              colors={colorModeColors}
            />
          </div>
          <DataDisplayField
            label={"Place of Birth"}
            content={userData.placeOfBirth}
            colors={colorModeColors}
          />
        </div>
        <div className="right flex flex-col gap-6 w-full">
          <DataDisplayField
            label={"Country of Citizenship"}
            content={userData.countryOfCitizenship}
            colors={colorModeColors}
          />
          <DataDisplayField
            label={"Passport number"}
            content={userData.passportNumber}
            colors={colorModeColors}
          />
          <DataDisplayField
            label={"Date of issue"}
            content={userData.passportDateOfIssue}
            colors={colorModeColors}
          />
          <DataDisplayField
            label={"Date of expiry"}
            content={userData.passportDateOfExpiry}
            colors={colorModeColors}
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src={userImages.passport}
            alt="Passport"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div
          id="addButton"
          className="flex items-center gap-2 pt-2 pb-2 pl-4 pr-4 ml-32 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
          onClick={() => setIsModalActive(true)}
        >
          {userData.id === "" ? <PlusIcon /> : <EditIcon basic={true} />}

          <span className="font-inter font-semibold select-none">
            {userData.id === "" ? "Add" : "Edit"}
          </span>
        </div>
        {userData.id !== "" && (
          <button
            id="deleteStudentUserButton"
            className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-xl hover:cursor-pointer border-2 border-red-500"
            onClick={deleteStudent}
          >
            <DeleteIcon basic={true} />
            <span className="font-inter font-medium select-none 2xl:text-base xl:text-base md:text-sm text-red-500">
              Delete
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentData;
