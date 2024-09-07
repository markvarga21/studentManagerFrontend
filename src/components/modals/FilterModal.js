import { useEffect, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import SimpleTextInput from "../inputs/SimpleTextInput";
import DateRangeInput from "../inputs/DateRangeInput";
import axios from "axios";
import CountrySelectInput from "../inputs/CountrySelectInput";
import SimpleGenderInput from "../inputs/SimpleGenderInput";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FilterModal = ({
  colors,
  setIsModalOpen,
  setStudents,
  changed,
  setChanged,
  API_URL,
  setFilterCount,
}) => {
  const [t, i18n] = useTranslation("global");
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsModalOpen]);
  useEffect(() => {
    loadFilterDataFromLocalStorage();
  }, []);

  const loadFilterDataFromLocalStorage = () => {
    const filter = JSON.parse(localStorage.getItem("filter"));
    if (!filter) {
      return;
    }
    document.getElementById("filter-name").value = filter.name;
    document.getElementById("filter-birthdate-from").value =
      filter.birthdate.from;
    document.getElementById("filter-birthdate-to").value = filter.birthdate.to;
    document.getElementById("filter-birthplace").value = filter.placeOfBirth;
    document.getElementById("filter-gender").value = filter.gender;
    document.getElementById("filter-cizitenship").value =
      filter.countryOfCitizenship;
    console.log(filter.countryOfCitizenship);
    document.getElementById("filter-passportNumber").value =
      filter.passportNumber;
    document.getElementById("filter-passportIssue-from").value =
      filter.passportIssue.from;
    document.getElementById("filter-passportIssue-to").value =
      filter.passportIssue.to;
    document.getElementById("filter-passportExpiration-from").value =
      filter.passportExpiration.from;
    document.getElementById("filter-passportExpiration-to").value =
      filter.passportExpiration.to;
  };

  const navigate = useNavigate();
  const applyFilter = (e) => {
    e.preventDefault();
    const filterName = document.getElementById("filter-name").value;
    const birthDateFrom = document.getElementById(
      "filter-birthdate-from"
    ).value;
    const birthDateTo = document.getElementById("filter-birthdate-to").value;
    const placeOfBirth = document.getElementById("filter-birthplace").value;
    console.log(placeOfBirth);
    const gender = document.getElementById("filter-gender").value;
    const passportNumber = document.getElementById(
      "filter-passportNumber"
    ).value;
    const passportIssueFrom = document.getElementById(
      "filter-passportIssue-from"
    ).value;
    const passportIssueTo = document.getElementById(
      "filter-passportIssue-to"
    ).value;
    const passportExpirationFrom = document.getElementById(
      "filter-passportExpiration-from"
    ).value;
    const passportExpirationTo = document.getElementById(
      "filter-passportExpiration-to"
    ).value;
    const countryOfCitizenship =
      document.getElementById("filter-cizitenship").value;
    const filterObject = {
      name: filterName,
      birthdate: {
        from: birthDateFrom,
        to: birthDateTo,
      },
      placeOfBirth: placeOfBirth,
      gender: gender,
      countryOfCitizenship: countryOfCitizenship,
      passportNumber: passportNumber,
      passportIssue: {
        from: passportIssueFrom,
        to: passportIssueTo,
      },
      passportExpiration: {
        from: passportExpirationFrom,
        to: passportExpirationTo,
      },
    };

    localStorage.setItem("filter", JSON.stringify(filterObject));

    axios
      .get(`${API_URL}/students`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        const students = res.data.content;
        const filteredStudents = students.filter((student) => {
          return (
            (filterName === "" ||
              String(student.firstName + " " + student.lastName)
                .toLowerCase()
                .includes(filterName.toLowerCase())) &&
            (passportNumber === "" ||
              student.passportNumber.includes(passportNumber)) &&
            (birthDateFrom === "" ||
              new Date(student.birthDate).getTime() >=
                new Date(birthDateFrom).getTime()) &&
            (birthDateTo === "" ||
              new Date(student.birthDate).getTime() <=
                new Date(birthDateTo).getTime()) &&
            (placeOfBirth === "" ||
              student.placeOfBirth
                .toLowerCase()
                .includes(placeOfBirth.toLowerCase())) &&
            (gender === "" || student.gender === gender) &&
            (countryOfCitizenship === "" ||
              student.countryOfCitizenship
                .toLowerCase()
                .includes(countryOfCitizenship.toLowerCase())) &&
            (passportIssueFrom === "" ||
              new Date(student.passportDateOfIssue).getTime() >=
                new Date(passportIssueFrom).getTime()) &&
            (passportIssueTo === "" ||
              new Date(student.passportDateOfIssue).getTime() <=
                new Date(passportIssueTo).getTime()) &&
            (passportExpirationFrom === "" ||
              new Date(student.passportDateOfExpiry).getTime() >=
                new Date(passportExpirationFrom).getTime()) &&
            (passportExpirationTo === "" ||
              new Date(student.passportDateOfExpiry).getTime() <=
                new Date(passportExpirationTo).getTime())
          );
        });
        setStudents(filteredStudents);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user");
        navigate("/");
        localStorage.setItem("activeNav", "homeNav");
        console.error(err);
      });
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setChanged(-1 * changed);
    localStorage.removeItem("filter");
    setFilterCount(0);
    setIsModalOpen(false);
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center z-20 absolute top-0 left-0 cursor-default"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(80, 80, 80, 0.4)",
      }}
    >
      <div
        className="max-h-[90%] flex flex-col 2xl:w-2/5 xl:w-3/5 h-6/7 p-10 rounded-xl overflow-auto"
        style={{ backgroundColor: colors.tableHeader }}
      >
        <div className="flex w-full justify-between pb-4">
          <span className="text-3xl font-bold" style={{ color: colors.title }}>
            {t("filterPanel.title")}
          </span>
          <CloseIcon
            color={colors.icon}
            handleClick={() => setIsModalOpen(false)}
          />
        </div>
        <form className="filter-form flex flex-col gap-3">
          <div className="flex w-full gap-8">
            <SimpleTextInput
              id={"filter-name"}
              label={t("filterPanel.name.label")}
              placeholder={t("filterPanel.name.placeholder")}
              colorModeColors={colors}
            />
            <SimpleTextInput
              id={"filter-passportNumber"}
              label={t("userModal.inputs.passportNumber.label")}
              placeholder={t("userModal.inputs.passportNumber.placeholder")}
              colorModeColors={colors}
            />
          </div>
          <DateRangeInput
            id={"filter-birthdate"}
            label={t("userModal.inputs.dateOfBirth.label")}
            colorModeColors={colors}
          />
          <div className="w-full flex gap-4">
            <SimpleTextInput
              id={"filter-birthplace"}
              label={t("userModal.inputs.placeOfBirth.label")}
              placeholder={t("userModal.inputs.placeOfBirth.placeholder")}
              colorModeColors={colors}
            />
            <SimpleGenderInput colorModeColors={colors} />
          </div>
          <SimpleTextInput
            id={"filter-cizitenship"}
            label={t("userModal.inputs.countryOfCitizenship.label")}
            placeholder={t("userModal.inputs.countryOfCitizenship.placeholder")}
            colorModeColors={colors}
          />
          <DateRangeInput
            id={"filter-passportIssue"}
            label={t("userModal.inputs.passportDateOfIssue.label")}
            colorModeColors={colors}
          />
          <DateRangeInput
            id={"filter-passportExpiration"}
            label={t("userModal.inputs.passportDateOfExpiry.label")}
            colorModeColors={colors}
          />
          <div className="flex w-full gap-3">
            <SecondaryButton
              colors={colors}
              buttonTitle={t("filterPanel.buttons.clear")}
              onclick={clearFilters}
            />
            <PrimaryButton
              buttonTitle={t("filterPanel.buttons.apply")}
              onclick={applyFilter}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
