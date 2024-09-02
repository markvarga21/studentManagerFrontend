import React, { useEffect, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import DataDisplayField from "../util/DataDisplayField";
import axios from "axios";
import UserModal from "../modals/UserModal";
import toast, { Toaster } from "react-hot-toast";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Validity from "../util/Validity";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../modals/ConfirmationModal";
import FadeIn from "react-fade-in";
import Loading from "../util/Loading";

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
  const [t, i18n] = useTranslation("global");
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
                setDataIsLoaded(true);
                console.error(error);
              });
          })
          .catch((err) => {
            setDataIsLoaded(true);
            console.error(err);
          });
      })
      .catch((error) => {
        setDataIsLoaded(true);
        console.error(error);
      });
  }, [studentUserWasModified]);
  const [isModalActive, setIsModalActive] = useState(false);

  const deleteStudent = () => {
    setDataIsLoaded(true);
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
        setConfirmIsOpen(false);
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
        toast.success(t("toast.success.student.delete"));
        setStudentUserWasModified(-1 * studentUserWasModified);
      })
      .catch((err) => console.error(err));
  };
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  return (
    <div
      id="studentData"
      className="flex flex-col h-full w-full justify-center items-start"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      {!dataIsLoaded && <Loading text={t("myDataPage.loading")} />}
      {confirmIsOpen && (
        <ConfirmationModal
          confirmClick={deleteStudent}
          closeClick={() => setConfirmIsOpen(false)}
          colors={colorModeColors}
        />
      )}
      <Toaster />
      {isModalActive && (
        <>
          {userData.id === "" ? (
            <UserModal
              mode={"add"}
              colorModeColors={colorModeColors}
              studentId={userData.id}
              setStudentId={setStudentId}
              modalTitle={t("userModal.title.add")}
              buttonTitle={t("userModal.submit.add")}
              isAddStudentActive={isModalActive}
              setIsAddStudentActive={setIsModalActive}
              API_URL={API_URL}
              setUser={setUser}
              studentUserWasModified={studentUserWasModified}
              setStudentUserWasModified={setStudentUserWasModified}
              setIsModalActive={setIsModalActive}
            />
          ) : (
            <UserModal
              mode={"edit"}
              colorModeColors={colorModeColors}
              studentId={userData.id}
              setStudentId={setStudentId}
              modalTitle={t("userModal.title.edit")}
              buttonTitle={t("userModal.submit.edit")}
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
            <span data-testid={"myData-title"}>{t("myDataPage.title")}</span>
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
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.firstName.label")}
              content={userData.firstName}
              colors={colorModeColors}
              dataTestId={"display-firstName"}
            />
          </FadeIn>
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.lastName.label")}
              content={userData.lastName}
              colors={colorModeColors}
              dataTestId={"display-lastName"}
            />
          </FadeIn>
          <div className="flex gap-6 items-center">
            <FadeIn className="w-full">
              <DataDisplayField
                label={t("userModal.inputs.dateOfBirth.label")}
                content={userData.birthDate}
                colors={colorModeColors}
                dataTestId={"display-birthDate"}
              />
            </FadeIn>
            <FadeIn className="w-full">
              <DataDisplayField
                label={t("userModal.inputs.gender.label")}
                content={userData.gender}
                colors={colorModeColors}
                dataTestId={"display-gender"}
              />
            </FadeIn>
          </div>
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.placeOfBirth.label")}
              content={userData.placeOfBirth}
              colors={colorModeColors}
              dataTestId={"display-placeOfBirth"}
            />
          </FadeIn>
        </div>
        <div className="right flex flex-col gap-6 w-full">
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.countryOfCitizenship.label")}
              content={userData.countryOfCitizenship}
              colors={colorModeColors}
              dataTestId={"display-countryOfCitizenship"}
            />
          </FadeIn>
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.passportNumber.label")}
              content={userData.passportNumber}
              colors={colorModeColors}
              dataTestId={"display-passportNumber"}
            />
          </FadeIn>
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.passportDateOfIssue.label")}
              content={userData.passportDateOfIssue}
              colors={colorModeColors}
              dataTestId={"display-passportDateOfIssue"}
            />
          </FadeIn>
          <FadeIn>
            <DataDisplayField
              label={t("userModal.inputs.passportDateOfExpiry.label")}
              content={userData.passportDateOfExpiry}
              colors={colorModeColors}
              dataTestId={"display-passportDateOfExpiry"}
            />
          </FadeIn>
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
          data-testid={"addData-button"}
        >
          {userData.id === "" ? <PlusIcon /> : <EditIcon basic={true} />}

          <span className="font-inter font-semibold select-none">
            {dataIsLoaded
              ? userData.id === ""
                ? t("myDataPage.add")
                : t("myDataPage.edit")
              : "..."}
          </span>
        </div>
        {userData.id !== "" && (
          <button
            id="deleteStudentUserButton"
            className="w-1/3 xl:w-auto flex items-center justify-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-xl hover:cursor-pointer border-2 border-red-500"
            onClick={() => setConfirmIsOpen(true)}
          >
            <DeleteIcon basic={true} strokeWidth={"1.7"} />
            <span className="font-inter font-medium select-none 2xl:text-base xl:text-base md:text-sm text-red-500">
              {dataIsLoaded ? t("myDataPage.delete") : "..."}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentData;
